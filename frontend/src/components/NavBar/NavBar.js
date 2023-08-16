import { NavLink, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../assets/rt-logo5.png"
import { useState } from "react";
import lupa from "../assets/lupa.png"
import './NavBar.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/session';


function NavBar() {
  const sessionUser = useSelector(state => state.session.user);
  const [input, setInput] = useState('')
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/tracks?search=${input}`);
    setInput('');
  }

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <NavLink to="/profile" className="topbar-login">My Profile</NavLink>
        <NavLink to="/tracks" onClick={logoutUser} className="topbar-signup">Logout</NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div>
          <NavLink to="/login" className="topbar-login">Log in</NavLink>
          <NavLink to="/signup" className="topbar-signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="topbar-container">
        <div className="tb-initial">

          <NavLink exact to="/" className="topbar-logo">
            <img className="topbar-logo-img" src={logo} alt="so_icon" height="30px" />
          </NavLink>

          <ol className="topbar-options">
            <li className="topbar-options-li"><a href="/tracks">Tracks</a></li>
            <li className="topbar-options-li"><a href="/about">About</a></li>
          </ol>
        </div>

        {location.pathname !== '/' && (
          <form onSubmit={handleSubmit} className="topbar-form }" >
            <input
              type="text"
              placeholder="Search..."
              maxLength="240"
              className="topbar-search"
              value={input}
              onChange={(e) => setInput(e.target.value)} />
            <img src={lupa} alt="lupa" className="topbar-lupa" />
            <button type='submit' hidden />
          </form>
        )}

        {sessionLinks}

      </div>
    </>
  );
}

export default NavBar;