import { Question as QuestionInterface } from './../interface';

interface Props {
  question: QuestionInterface;
  onAnswer: (n: number) => void;
  answer: number | null;
}

function Options({ question, onAnswer, answer }: Props) {
  const hasAnswer = typeof answer === 'number';

  return (
    <div className='options'>
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            hasAnswer
              ? i === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswer}
          key={option}
          onClick={() => onAnswer(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
