import { useCallback, useEffect } from 'react';
import { useQuiz } from './contexts/QuizContext';

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const tickTock = useCallback(
    function () {
      dispatch({ type: 'tick' });
      console.log(1);
    },
    [dispatch]
  );

  useEffect(
    function () {
      const id = setInterval(tickTock, 1000);
      return () => clearInterval(id);
    },
    [tickTock]
  );

  return (
    <div className='timer'>
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;
