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


  const getLinks = () => {
    if (loggedIn) {
      return (

        <div className="links-nav">
          <div id='user-name-container'>
            <div id='user-name'>{user.username}</div>
          </div>
          <Link id='all-tracks' className='button-link' to={'/tracks'}>All Tracks</Link>
          <Link className='button-link' to={'/profile'}>Profile</Link>
          <Link className='button-link' to={'/tracks/new'}>Create a Track</Link>
          <button id='logout-button' className='button-link' onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link id='signup' className='button-link' to={'/signup'}>Signup</Link>
          <Link className='button-link' to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
    <div id='all-nav'>
      <div id='navbar-main'>
    
        <div id='logo-container' >
        <Link to='/'>  <img id='main-logo' src='/rt-logo4.png'></img> </Link>
      
        </div>
        {getLinks()}
      </div>
    </div>
    </>
  );
}

export default NavBar;