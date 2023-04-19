import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import Map from './components/Map/Map';
import MapTest from './components/World Map';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { fetchCurrentUser } from './store/session';

import './index.css';
import ProfilePage from './components/ProfilePage/ProfilePage';

export default function App() {
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

        <Route path="/:userId">
          <ProfilePage />
        </Route>
      </Switch>
    </>
  );
}