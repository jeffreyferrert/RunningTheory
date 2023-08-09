import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import './SessionForm.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { signup, clearSessionErrors } from '../../store/session';


const SignUpForm = () => {

  const dispatch = useDispatch("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passCheck, setpassCheck] = useState("")
  const error = useSelector(state => state.errors.session)
  const sessionUser = useSelector(state => state.session.user)




  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  if (sessionUser) return <Redirect to='/' />




  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setpassCheck;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    if (password === passCheck) {

      dispatch(signup({ username: username, email: email, password: password }))

    }

  };


  return (

    <>
      <div id='sign-form-contents'>
        <div id='sign-box'>
          <form id='form-sign-up' onSubmit={handleSubmit}>

            <h2 id='create-header'>Create Account</h2>
            <div id='sign-buttons'>
              <label id='text-text'>Your Name
                <input
                  id={error?.username ? "signup-field-errors" : 'name-text'}
                  placeholder="First and last name"
                  type='text'
                  value={username}
                  onChange={update('username')}
                />
              </label>
              {error?.username ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i>{error?.username}</span> : null}
              <br />
              <label id='text-text'>Email
                <input
                  id={error?.email ? "signup-field-errors" : 'emails-text'}
                  type='text'
                  value={email}
                  onChange={update('email')}
                />
              </label>
              {error?.email ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i> {error?.email}</span> : null}
              <br />
              <label id='text-text'>Password
                <input
                  id={error?.password ? "signup-field-errors" : 'pass-texts'}
                  placeholder="At least 6 characters"
                  type='password'
                  value={password}
                  onChange={update('password')}
                />
              </label>
              {error?.password ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i> {error?.password}</span> : null}
              <br />
              <label id='text-text'>Re-enter password
                <input
                  id='pass-texts'
                  type='password'
                  value={passCheck}
                  onChange={update("password2")}
                />
              </label>
              {password !== passCheck ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i>Password does not match</span> : null}
            </div>
            <br />
            <div id='signup-button-box'>
              <input type='submit' value='Continue' id='signup-button' />
            </div>
            <br />
            <div id='redirect-sign-in'>
              <span>Already have an account?</span>
              <span id='re-spacer'></span>
              <Link to='/login'>
                <span>Sign In</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>

  )

}


export default SignUpForm;