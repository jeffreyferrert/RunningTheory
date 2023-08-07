import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }


  const handleRedirect = () => {
    // e.preventDefault();

    history.push("/")
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <div>{user.username}</div>
          <Link to={'/tracks'}>All Tracks</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/tracks/new'}>Create a Track</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
    <div id='all-nav'>
      <div id='navbar-main'>
  
        <div id='logo-container' onClick={handleRedirect}>
        <img id='main-logo' src='/rt-logo4.png'></img>
        </div>
          {/* <h1>Running Theory</h1> */}
        {getLinks()}
      </div>
    </div>
    </>
  );
}

export default NavBar;