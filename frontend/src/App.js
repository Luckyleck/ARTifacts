import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import Map from './components/Map/Map';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { fetchCurrentUser } from './store/session';

import './index.css';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';

export default function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <Switch>
      <Route exact path="/">
        <NavBar />
        <MainPage />
      </Route>

      <Route exact path="/contact">
        <NavBar />
        <ContactPage />
      </Route>

      <Route exact path="/about">
        <NavBar />
        <AboutPage />
      </Route>
      
      <Route exact path="/explore">
        <NavBar />
        <Map />
      </Route>

      <Route exact path="/:userId">
        <NavBar />
        <ProfilePage />
      </Route>
    </Switch>
  );
}