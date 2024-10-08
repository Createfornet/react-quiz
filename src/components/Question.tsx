import { useQuiz } from './contexts/QuizContext';
import Options from './Options';

function Question() {
  const { index, answer, questions, dispatch, maxPossiblePoints } = useQuiz();
  const question = questions[index];

  function handleSelectAnswer(i: number) {
    if (index + 1 >= maxPossiblePoints) dispatch({ type: 'finish' });
    else dispatch({ type: 'selectAnswer', payload: i });
  }

  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        onAnswer={handleSelectAnswer}
        answer={answer}
      />
    </div>
  );
}

export default Question;
