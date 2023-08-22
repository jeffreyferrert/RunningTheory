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
  const error = useSelector(state => state.errors.session)
  const sessionUser = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    return () => {
      dispatch(sessionActions.clearSessionErrors());
    };
  }, [dispatch]);

  if (sessionUser) return <Redirect to='/tracks' />

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signup({ username: username, email: email, password: password }))
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

  return (
    <>
      <div className="su-main-container">

        <div className="right-panel">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>

          <form onSubmit={handleSubmit} className="su-form" noValidate>
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

              <div className="errors">{error?.username}</div>

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

              <label>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>

              <div className="errors">{error?.password}</div>

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