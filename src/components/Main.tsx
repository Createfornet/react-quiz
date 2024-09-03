import { useEffect, useReducer } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  questions: object[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
}

interface Action {
  type: 'dataReceived' | 'dataFailed';
  payload?: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

const initialState: State = {
  questions: [],
  status: 'loading',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload ?? [], status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
  }
}

function Main({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data: Question[]) =>
        dispatch({ type: 'dataReceived', payload: data })
      )
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <main className='main'>
      {children}
      {state.questions.length}
    </main>
  );
}

export default Main;
