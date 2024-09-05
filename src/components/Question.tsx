import { Question as QuestionInterface } from '../interface';
import Options from './Options';

interface Props {
  question: QuestionInterface;
  onAnswer: (n: number) => void;
  answer: number | null;
}

function Question({ question, onAnswer, answer }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} onAnswer={onAnswer} answer={answer} />
    </div>
  );
}

export default Question;
