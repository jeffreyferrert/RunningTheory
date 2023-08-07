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
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])

    useEffect(() => {
      return () => {
        dispatch(clearSessionErrors());
      };
    }, [dispatch]);

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        


        if (password === passCheck) {
            setErrors([]);

            dispatch(signup({username: username, email: email, password: password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) {
                
                    setErrors(data.errors)
                } else if (data) {
                    setErrors([data])
                } else {
                    setErrors([res.statusText])
                } 

              
            })
        }

       return setErrors(['Passwords do not match'])
    };

    console.log(errors)

    const getErrorField = (field) => {
   
        if (errors) {
        return errors.find((error) => {
            return error.includes(field)
        })
    } 
    }

    // debugger;

    return (

      <>
      <div id='sign-form-contents'>
          <div id='sign-box'>
              <form id='form-sign-up' onSubmit={handleSubmit}>
        
                  <h2 id='create-header'>Create Account</h2>
                  <div id='sign-buttons'>
                      <label id='text-text'>Your Name
                          <input
                              id={getErrorField("Username") ? "signup-field-errors" : 'name-text'}
                              placeholder="First and last name"
                              type='text'
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                          />
                      </label>
                      {getErrorField("Username") ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i> {getErrorField('Username')}</span> : null}
                      <br />
                      <label id='text-text'>Email
                          <input
                              id={getErrorField("Email") ? "signup-field-errors" : 'emails-text'}
                              type='text'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </label>
                      {getErrorField("Email") ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i> {getErrorField('Email')}</span> : null}
                      <br />
                      <label id='text-text'>Password
                          <input
                              id={getErrorField("Password") ? "signup-field-errors" : 'pass-texts'}
                              placeholder="At least 6 characters"
                              type='password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </label>
                      {getErrorField("Password") ? <span id='signup-error'><i id="a-icon a-icon-alert" ></i> {getErrorField('Password')}</span> : null}
                      <br />
                      <label id='text-text'>Re-enter password
                          <input
                              id='pass-texts'
                              type='password'
                              value={passCheck}
                              onChange={(e) => setpassCheck(e.target.value)}
                          />
                      </label>
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