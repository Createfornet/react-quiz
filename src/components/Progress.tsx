interface Props {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}

function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: Props) {
  return (
    <header className='progress'>
      <progress
        max={numQuestions}
        value={index + Number(typeof answer === 'number')}
      />

      <p>
        Qestion <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
