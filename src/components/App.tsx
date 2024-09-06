import { useEffect, useReducer } from 'react';
import Main from './Main';
import Header from './Header';
import Error from './Error';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Question from './Question';
import { Question as QuestionInterface } from './../interface';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

interface State {
  questions: QuestionInterface[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

interface Action {
  type:
    | 'dataReceived'
    | 'dataFailed'
    | 'start'
    | 'selectAnswer'
    | 'nextQuestion'
    | 'finish'
    | 'restart'
    | 'tick';
  payload?: QuestionInterface[] | number;
}

const SECS_PER_QUESTION = 20;

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state: State, action: Action): State {
  const question = state.questions[state.index];

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: typeof action.payload === 'object' ? action.payload : [],
        status: 'ready',
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'selectAnswer':
      return {
        ...state,
        answer: typeof action.payload === 'number' ? action.payload : null,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };

    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        highscore: state.highscore,
        questions: state.questions,
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? 'finished' : state.status,
      };
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data: QuestionInterface[]) =>
        dispatch({ type: 'dataReceived', payload: data })
      )
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  function handleStartQuiz() {
    dispatch({ type: 'start' });
  }

  function handleSelectAnswer(i: number) {
    if (index + 1 >= maxPossiblePoints) dispatch({ type: 'finish' });
    else dispatch({ type: 'selectAnswer', payload: i });
  }

  function handleNextQuestion() {
    dispatch({ type: 'nextQuestion' });
  }

  function handleFinishQuestion() {
    dispatch({ type: 'finish' });
  }

  function handleRestart() {
    dispatch({ type: 'restart' });
  }

  function handleTick() {
    dispatch({ type: 'tick' });
  }

  return (
    <div className='app'>
      <Header />

      {/* {points} */}

      <Main>
        {status === 'loading' && <Loader />}

        {status === 'error' && <Error />}

        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} onStart={handleStartQuiz} />
        )}

        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              onAnswer={handleSelectAnswer}
              answer={answer}
            />
            <Footer>
              <Timer onTick={handleTick} secondsRemaining={secondsRemaining} />
              <NextButton
                onNextQuestion={handleNextQuestion}
                onFinish={handleFinishQuestion}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            onRestart={handleRestart}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
