import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import './index.css';
import SignupForm from './components/SessionForms/SignupForm';
import LoginForm from './components/SessionForms/LoginForm';
import Map from './components/Map/Map';

const App = () => {
  return (
    <>
    <NavBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
          <Map />
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