import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Tracks from './components/Tracks/Tracks';
import Profile from './components/Profile/Profile';
import TrackCompose from './components/Tracks/TrackCompose';

import { getCurrentUser } from './store/session';

import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import TracksIndex from './components/Tracks/TracksIndex';
import TrackShowPage from './components/TrackShowPage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>

        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/tracks" component={Tracks} />
        <ProtectedRoute exact path={"/tracks/:trackId"} component={TrackShowPage}/>
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/tracks/new" component={TrackCompose} />
      </Switch>
    </>
  );
}

export default App;