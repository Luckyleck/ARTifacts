import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fetchCurrentUser } from './store/session';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import Map from './components/Map/Map';
import BackupMap from './components/Map/BackupMap';
import WorldMap from './components/WorldMap/WorldMap';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import './index.css';

export default function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <div className="wrapper">
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

        <Route exact path="/backup">
          <NavBar />
          <BackupMap />
        </Route>

        <Route exact path="/maptest">
          <NavBar />
          <WorldMap />
        </Route>

        <Route path="/:userId">
          <NavBar />
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
}