import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import './SessionForm.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as sessionActions from "../../store/session"


const SignUpForm = () => {
  const dispatch = useDispatch("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const sessionUser = useSelector(state => state.session.user)


  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(sessionActions.clearSessionErrors());
    };
  }, [dispatch]);

  if (sessionUser) return <Redirect to='/tracks' />

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = false;

    if (!email) {
      setEmailError("Email is required");
      errors = true;
    } else {
      setEmailError(null);
    }
    if (!username) {
      setUsernameError("Username is required");
      errors = true;
    } else {
      setUsernameError(null);
    }
    if (!password) {
      setPasswordError("Password is required");
      errors = true;
    } else {
      setPasswordError(null);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      errors = true;
    } else {
      setConfirmPasswordError(null);
    }

    if (!errors) {
      dispatch(sessionActions.signup({ username: username, email: email, password: password }))
    }

  };

  return (
    <>
      <div className="su-main-container">
        <div className="right-panel">

          <form onSubmit={handleSubmit} className="su-form" noValidate="novalidate">
            <h3>Create your account</h3>
            <div className="su-form-container">

              <label>
                Name
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>

              {usernameError && <div className="errors">{usernameError}</div>}

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

              <label>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>

              {confirmPasswordError && <div className="errors">{confirmPasswordError}</div>}

              <button type="submit" className="su-signup">Sign Up</button>
            </div>

          </form>

          <div className="redirect-su">
            Already have an account?
            <Link to="login" className="link"> Log in</Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default SignUpForm;