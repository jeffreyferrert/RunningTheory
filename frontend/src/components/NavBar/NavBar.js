import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user)
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [menu, setMenu] = useState(false)

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/tracks?search=${input}`);
    setInput('');
  }

  const open = () => {

    setMenu(true)

  }


  const close = () => {

    setMenu(false)

  }

  const main = () => {
    if (location.pathname !== '/') {
      return (
        <div id='nav-search-container'>
          <form onSubmit={handleSubmit}>
            <input
              id='nav-search'
              type="text"
              placeholder="Search..."
              value={input}
              onChange={(e) => setInput(e.target.value)} />
            <button type='submit' hidden />
          </form>
        </div>
      )
    }
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          {/* <div id='user-name-container'></div> */}
          
          <div id='drop-container' onMouseEnter={open} onMouseLeave={close}>
          
          </div>

          {menu ? <> <div id='main-drop-cont'> <div id='all-track' onMouseEnter={open} onMouseLeave={close}>
            <Link id='all-tracks' className='button-link' to={'/tracks'}>All Tracks</Link>
          </div>
          
          <div>
            <Link className='button-link' to={'/profile'}>{user.username}</Link>
          </div>
          <div>
            <Link className='button-link' to={'/tracks/new'}>Create a Track</Link>
          </div>
          <div>
            <Link className='button-link' onClick={logoutUser}>Logout</Link>
          </div> </div> </> : <div id='main-drop-cont'>  <div id='all-track' onMouseEnter={open} onMouseLeave={close}>
            <Link id='all-tracks' className='button-link' to={'/tracks'}>All Tracks</Link>
          </div> </div> }
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link id='all-tracks' className='button-link' to={'/tracks'}>All Tracks</Link>

          <Link id='signup' className='button-link' to={'/signup'}>Signup</Link>
          <Link id='login' className='button-link' to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div id='all-nav'>
        <div id='navbar-main'>
          <div id='logo-container' >
            <Link to='/'>  <img id='main-logo' alt='im' src='/rt-logo4.png'></img> </Link>
          </div>
          {main()}
          {getLinks()}
        </div>
      </div>
    </>
  );
}

export default NavBar;