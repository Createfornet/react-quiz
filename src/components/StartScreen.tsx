import { useQuiz } from './contexts/QuizContext';

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  function handleStartQuiz() {
    dispatch({ type: 'start' });
  }

  return (
    <div className='start'>
      <h2>Welcome to the react quiz!</h2>
      <h3>{numQuestions} question to test your react mastery</h3>
      <button className='btn btn-ui' onClick={handleStartQuiz}>
        Lets start
      </button>
    </div>
  );
}

export default StartScreen;
