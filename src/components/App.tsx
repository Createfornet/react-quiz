import { useEffect, useReducer } from 'react';
import Main from './Main';
import Header from './Header';
import Error from './Error';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Question from './Question';
import { Question as QuestionInterface } from './../interface';
import NextButton from './NextButton';

interface State {
  questions: QuestionInterface[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: null | number;
  points: number;
}

interface Action {
  type:
    | 'dataReceived'
    | 'dataFailed'
    | 'start'
    | 'selectAnswer'
    | 'nextQuestion';
  payload?: QuestionInterface[] | number;
}

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
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
      return { ...state, status: 'active' };

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
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

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
    dispatch({ type: 'selectAnswer', payload: i });
  }

  function handleNextQuestion() {
    dispatch({ type: 'nextQuestion' });
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
            <Question
              question={questions[index]}
              onAnswer={handleSelectAnswer}
              answer={answer}
            />
            <NextButton onNextQuestion={handleNextQuestion} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
