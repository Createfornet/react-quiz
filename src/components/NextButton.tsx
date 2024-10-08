import { useQuiz } from './contexts/QuizContext';

function NextButton() {
  const { answer, index, numQuestions, dispatch } = useQuiz();

  function handleNextQuestion() {
    dispatch({ type: 'nextQuestion' });
  }

  function handleFinishQuestion() {
    dispatch({ type: 'finish' });
  }

  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <button onClick={handleNextQuestion} className='btn btn-ui'>
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button onClick={handleFinishQuestion} className='btn btn-ui'>
        Finish
      </button>
    );
}

export default NextButton;
