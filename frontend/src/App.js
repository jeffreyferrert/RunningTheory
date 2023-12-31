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
import TrackComposeEdit from './components/Tracks/TrackComposeEdit';
import TrackShowPage from './components/TrackShowPage';

import { getCurrentUser } from './store/session';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import AboutUs from './components/About';


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
        <Route exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <Route exact path="/tracks" component={Tracks} />
        <ProtectedRoute exact path="/tracks/new" component={TrackCompose} />
        <ProtectedRoute exact path="/tracks/:trackId" component={TrackShowPage}/>
        <ProtectedRoute exact path="/tracks/:trackId/edit" component={TrackComposeEdit}/>
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/about" component={AboutUs}/>
      </Switch>
    </>
  );
}

export default App;