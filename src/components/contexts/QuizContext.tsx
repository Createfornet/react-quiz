import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Question } from '../../interface';

interface Context extends State {
  dispatch: React.Dispatch<Action>;
  numQuestions: number;
  maxPossiblePoints: number;
}

interface State {
  questions: Question[];
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
  payload?: Question[] | number;
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

const QuizContext = createContext({} as Context);

function QuizContextProvider({ children }: { children: ReactNode }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        maxPossiblePoints,
        numQuestions
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error('QuizContext was used outside of QuizProvider');
  return context;
}

export { QuizContextProvider, useQuiz };
