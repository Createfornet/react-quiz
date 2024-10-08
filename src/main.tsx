import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import { QuizContextProvider } from './components/contexts/QuizContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
  </StrictMode>
);
