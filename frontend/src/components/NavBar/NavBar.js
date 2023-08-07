import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/tracks?search=${input}`);
    setInput('');

  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
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
      <h1>Running Theory</h1>
      {/* <br /> */}
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)} />
          <button type='submit' hidden/>

      </form>
      {getLinks()}

    </>
  );
}

export default NavBar;