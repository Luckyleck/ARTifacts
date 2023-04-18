import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SessionForm';
import Map from './components/Map/Map';
import MapTest from './components/World Map';

import { fetchCurrentUser } from './store/session';

import './index.css';
import ProfilePage from './components/ProfilePage/ProfilePage';

const App = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        
        <Route exact path="/explore">
          <Map />
        </Route>

        <Route exact path="/maptest">
          <MapTest/>
        </Route>

        <Route exact path="/profile">
          <ProfilePage/>
        </Route>

        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
