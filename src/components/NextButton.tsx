interface Props {
  onNextQuestion: () => void;
  answer: number | null;
}

function NextButton({ onNextQuestion, answer }: Props) {
  if (answer === null) return;

  return (
    <button onClick={() => onNextQuestion()} className='btn btn-ui'>
      Next
    </button>
  );
}

export default NextButton;
