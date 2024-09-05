interface Props {
  numQuestions: number;
  onStart: () => void;
}

function StartScreen({ numQuestions = 0, onStart }: Props) {
  return (
    <div className='start'>
      <h2>Welcome to the react quiz!</h2>
      <h3>{numQuestions} question to test your react mastery</h3>
      <button className='btn btn-ui' onClick={onStart}>
        Lets start
      </button>
    </div>
  );
}

export default StartScreen;
