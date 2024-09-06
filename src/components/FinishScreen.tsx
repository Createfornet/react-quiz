interface Props {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  onRestart: () => void;
}

function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  onRestart,
}: Props) {
  const percentage = (points / maxPossiblePoints) * 100;

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

      <button className='btn btn-ui' onClick={() => onRestart()}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
