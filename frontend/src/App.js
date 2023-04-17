import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import './index.css';
import SignupForm from './components/SessionForms/SignupForm';
import LoginForm from './components/SessionForms/LoginForm';

const App = () => {
  return (
    <>
    <NavBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route path="/signup">
          <SignupForm />
        </Route>
        
        <Route path="/signin">
          <LoginForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;