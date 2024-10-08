import { useQuiz } from './contexts/QuizContext';

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;

  function handleRestart() {
    dispatch({ type: 'restart' });
  }

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage < 100 && percentage >= 80) emoji = '🎉';
  if (percentage < 80 && percentage >= 50) emoji = '👻';
  if (percentage < 50 && percentage > 0) emoji = '🤔';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.floor(percentage)}%) {emoji}
      </p>

      <p className='highscore'>High score: {highscore} points</p>

      <button className='btn btn-ui' onClick={handleRestart}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
