import { ChangeEvent, useReducer } from 'react';

interface State {
  count: number;
  step: number;
}

interface Action {
  type: 'inc' | 'dec' | 'setStep' | 'setCount' | 'reset';
  payload?: number;
}

const initialState: State = {
  count: 0,
  step: 1,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.payload ?? 0 };
    case 'setStep':
      return { ...state, step: action.payload ?? 0 };
    case 'reset':
      return initialState;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
