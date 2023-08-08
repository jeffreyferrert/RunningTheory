import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './SessionForm.css';
import { login } from '../../store/session';
// import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
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

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

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
    const demoEmail = "demo@gmail.com";
    const demoPassword = "password";
    dispatch(login({ email: demoEmail, password: demoPassword }));
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    dispatch(login({email: "demo-user@appacademy.io", password: "starwars"}))
  }

  return (

    // <form className="session-form" onSubmit={handleSubmit}>
    //   <h2>Log In Form</h2>
    //   <div className="errors">{errors?.email}</div>
    //   <label>
    //     <span>Email</span>
    //     <input type="text"
    //       value={email}
    //       onChange={update('email')}
    //       placeholder="Email"
    //     />
    //   </label>
    //   <div className="errors">{errors?.password}</div>
    //   <label>
    //     <span>Password</span>
    //     <input type="password"
    //       value={password}
    //       onChange={update('password')}
    //       placeholder="Password"
    //     />
    //   </label>
    //   <input
    //     type="submit"
    //     value="Log In"
    //     disabled={!email || !password}
    //   />
    // </form>

    <div className="login-main-container">
      <div className="login-form-container">

        <form onSubmit={handleSubmit} >

          <ul>
            {/* {errors.map(error => <li key={error}>{error}</li>)} */}
          </ul>
          <div className="errors">{error?.email}</div>
          <label>
            Email
            <input
              type="text"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={update('email')}
              required
            />
          </label>

          <span></span><br />
          <div className="errors">{error?.password}</div>
          <label>
            Password
            <input
              type="password"
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={update('password')}
              required
            />
          </label>

          <button type="submit" className="login-btn">Log In</button>

        </form>
        <button onClick={handleDemoUser} className="login-btn">Demo User</button>
    </div>

        <div className="redirect-su">
          Don’t have an account?
          <Link to="signup" className="link"> Sign up</Link>
          
        </div>
        <div className="hi">
              hi
        </div>
         {/* <input
      type="submit"
      value="Demo User"
      onSubmit={handleDemoUser}
      disabled={!email || !password} /> */}
    </div>
  );
}

export default LoginForm;