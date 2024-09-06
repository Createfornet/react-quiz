interface Props {
  onNextQuestion: () => void;
  onFinish: () => void;
  answer: number | null;
  index: number;
  numQuestions: number;
}

function NextButton({
  onNextQuestion,
  onFinish,
  answer,
  index,
  numQuestions,
}: Props) {
  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <button onClick={() => onNextQuestion()} className='btn btn-ui'>
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button onClick={() => onFinish()} className='btn btn-ui'>
        Finish
      </button>
    );
}

export default NextButton;
