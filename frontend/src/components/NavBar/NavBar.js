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
          
      

          {menu ? <> <div id='main-drop-cont' onMouseEnter={open} onMouseLeave={close}> <div id='user-all-container'> <div id='user-profile'><Link id='user-name'  to={'/profile'}><span id='user'>{user.username[0]}</span></Link></div> <div id='all-track' >
            <Link id='all-tracks'  to={'/tracks'}><span id='track-color'>All Tracks</span></Link>
          </div></div>

          
          <div>
            <Link className='button-link' to={'/profile'}>My Profile</Link>
          </div>
          <div>
            <Link className='button-link' to={'/tracks/new'}>Create Track</Link>
          </div>
          <div>
            <Link className='button-link' onClick={logoutUser}>Logout</Link>
          </div> </div> </> : <div id='main-drop-cont' onMouseEnter={open} onMouseLeave={close}> <div id='user-all-container'> <div id='user-profile'><Link id='user-name' to={'/profile'}><span id='user'>{user.username[0]}</span></Link></div> <div id='all-track' >
            <Link id='all-tracks'  to={'/tracks'}><span id='track-color'>All Tracks</span></Link>
          </div></div></div> }

        </div>
      );
    } else {
      return (
        <div className="links-auth">


          {menu ? <>
           <div id='main-drop-cont' onMouseEnter={open} onMouseLeave={close}> 
            <div id='all-track'>
            <Link id='all-tracks' className='button-link' to={'/tracks'}>All Tracks</Link>
            </div>

            <div><Link id='signup' className='button-link' to={'/signup'}>Signup</Link></div>
           <div> <Link id='login' className='button-link' to={'/login'}>Login</Link></div>
        </div>
        </> :<div id='main-drop-cont' onMouseEnter={open} onMouseLeave={close}> 
            <div id='all-track'>
            <Link id='all-tracks' className='button-link' to={'/tracks'}>All Tracks</Link>
            </div> </div> }
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