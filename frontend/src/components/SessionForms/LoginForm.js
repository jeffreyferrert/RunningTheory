import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './SessionForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    return () => {
      dispatch(sessionActions.clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = false;

    if (!email) {
      setEmailError("Email is required");
      errors = true;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      errors = true;
    } else {
      setPasswordError("");
    }
    if (!errors) {
      dispatch(sessionActions.login({ email, password })).then(() => {
      });
    } else if (emailError) {
      setLoginError("User credentials are incorrect");
    }
  };

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ email: "demo@gmail.com", password: "password" }))
  }

  return (
    <>
      <div className="li-main-container">
        <div className="li-form-container">

          <form onSubmit={handleSubmit} noValidate="novalidate">
            <h3>Access your account</h3>

            {loginError && <div className="errors">{loginError}</div>}

            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {emailError && <div className="errors">{emailError}</div>}

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {passwordError && <div className="errors">{passwordError}</div>}

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