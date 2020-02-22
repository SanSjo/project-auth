import React, { useState } from 'react'
// import { Link } from "react-router-dom";
import './login.css'
import MemberPage from 'components/MemberPage' // --van´s profile

const URL = 'http://localhost:8080/sessions'

export const Login = ({ props })  => {
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const [loggedInUser, setLoggedInUser] = useState(null)

 // To log in an exicting member
const handleFormSubmit = event => {
  event.preventDefault();

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify({email, password }),
        headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => setLoggedInUser(json))
    .catch(err => console.log('error:', err))
  };

if (loggedInUser === null) {
  // If user is logged out, show login form
  return (
    <section>
      <form className="loginForm" submitForm={handleFormSubmit}>
        <h1><strong>Member login</strong></h1>
        <h2>Welcome back - we've missed you!</h2>
        <div className="loginContainer">  
            <label >Username/Email:  </label>
            <input value={email} placeholder="Enter Email"type="email" name="email" onChange={event => {setEmail(event.target.value)}} required></input>
        
            <label>Password:     </label>
            <input value={password} placeholder="Enter Password" type="password"  name="password" onChange={event => {setPassword(event.target.value)}} required> 
            </input>
            <button onClick={handleFormSubmit} type="submit">Login</button>
        </div>
      </form>
    </section>
  )
} else {
  // If user is logged in, show profile
  return (<MemberPage loggedInUser={loggedInUser}/>);
}
}

export default Login