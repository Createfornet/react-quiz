import { useEffect } from 'react';

interface Props {
  onTick: () => void;
  secondsRemaining: number;
}

function Timer({ onTick, secondsRemaining }: Props) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(onTick, 1000);
      return () => clearInterval(id);
    },
    [onTick]
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
