import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import Map from './components/Map/Map';
import WorldMap from './components/WorldMap/WorldMap';

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
          <WorldMap/>
        </Route>

        <Route exact path="/profile">
          <ProfilePage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
