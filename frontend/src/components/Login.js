import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import './login.css';
import { useHistory } from 'react-router';

const URL = 'https://authorisation-app.herokuapp.com/sessions';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();

  // To log in an exicting member
  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((json) => {
            throw new Error(json);
          });
        }
      })
      // .then(({ accessToken }) => {
      //   window.localStorage.setItem('accessToken', accessToken);
      //   onLoggedIn();
      // })
      .then((user) => {
        if (user['message']) {
          setErrorMsg(user.message);
        } else {
          window.localStorage.setItem('userId', user.userId);
          window.localStorage.setItem('accessToken', user.accessToken);

          if (email < 0) {
            return alert('Please fill in email and password');
          } else {
            history.push('/MemberPage');
          }
        }
      })
      .catch((err) => console.log('error:', err));
  };

  // If user is logged out, show login form
  return (
    <section>
      <form className="loginForm" onSubmit={handleFormSubmit}>
        <h1>
          <strong>Member login</strong>
        </h1>
        <h2>Welcome back - we've missed you!</h2>
        <div className="loginContainer">
          <label>Username/Email: </label>
          <input
            value={email}
            placeholder="Enter Email"
            minLength="0"
            type="email"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          ></input>

          <label>Password: </label>
          <input
            value={password}
            placeholder="Enter Password"
            type="password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          ></input>
          {errorMsg && <div className="error-message"> {errorMsg} </div>}

          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
