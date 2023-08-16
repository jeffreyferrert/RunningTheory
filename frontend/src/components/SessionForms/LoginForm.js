import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './SessionForm.css';
import { login } from '../../store/session';
// import { login, clearSessionErrors } from '../../store/session';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    return () => {
      dispatch(sessionActions.clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo@gmail.com", password: "password" }))
  }

  return (
    <>
      <div className="li-main-container">

        <div className="li-form-container">

          <form onSubmit={handleSubmit} >
            <h3>Access your account</h3>

            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>

            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <div className="errors">{error?.email}</div>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <div className="errors">{error?.password}</div>

            <button type="submit" className="li-login">Log In</button>
          </form>

          <button onClick={demoUser} className="li-login">Demo User</button>
        </div>

        <div className="redirect-su">
          Don’t have an account?
          <Link to="signup" className="link"> Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;