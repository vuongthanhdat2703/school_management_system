
import './login.css'
import React, { useState } from 'react';
import { Navigate as Redirect } from "react-router-dom"

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter full information")
    }
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.message === 'Login success!')
    setRedirect(true)
  else
    setRedirect(false)
};
if (redirect) {
  return <Redirect  to="/home" />
}

  return (
    <>
      <div className='login-span'>
        <div class="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className='error-message'>
            <div class="user-box" >
              <label htmlFor='username' ></label>
              <input
                type="text"
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)} />
              {error && <div>{error}</div>}
            </div>

            <div class="user-box">
              <label htmlFor='password'></label>
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div>{error}</div>}
            </div>
            <button className='button' type="submit"  >Submit</button>
          </form>

        </div>
      </div>
    </>
  )
}
export default Login


