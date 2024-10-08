import { useEffect } from 'react';
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
import { useQuiz } from './contexts/QuizContext';

function App() {
  const { status, dispatch } = useQuiz();

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data: QuestionInterface[]) =>
        dispatch({ type: 'dataReceived', payload: data })
      )
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}

        {status === 'error' && <Error />}

        {status === 'ready' && <StartScreen />}

        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
