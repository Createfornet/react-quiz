import { useQuiz } from './contexts/QuizContext';

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();
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
