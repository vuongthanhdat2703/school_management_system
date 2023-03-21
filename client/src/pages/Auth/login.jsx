
import './login.css'
import React, { useState } from 'react';
import axios from 'axios'

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
              UserName: username,
              Password: password
            });
            // history.push('/dashboard');
          } catch (error) {
            setError(error.response.data.message);
          }
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
      };


  
    return (
        <>
            <div className='login-span'>
                <div class="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <label htmlFor='username' ></label>
                            <input 
                                type="text" 
                                value={username}
                                placeholder='Username'
                                onChange = {(e) => setUsername(e.target.value)}
                                 />
                        </div>  
                        {error && <div>{error}</div>}
                        <div class="user-box">
                            <label htmlFor='password'></label>
                            <input 
                                type="password" 
                                value={password}
                                placeholder = 'Password'
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <div>{error}</div>}
                        <button className='button' type="submit"  >Submit</button>
                    </form>
                    
            </div>
            </div>
        </>
    )
}
export default Login


