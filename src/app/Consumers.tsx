import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import NavBar from '../components/NavBar';
import { useAuthContext } from '../features/Auth/AuthProvider';
import LessonsSubscriber from '../features/Lessons/LessonsSubscriber';
import Routes from './routes';

const Consumers = () => {
  const { state: authStatus } = useAuthContext();

  return (
    <>
      {authStatus === 'idle' && <LoadingPage />}
      {authStatus === 'signedIn' && (
        <LessonsSubscriber />
      )}
      {authStatus !== 'idle' && (
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      )}
    </>
  );
};

export default Consumers;
