import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./login.css";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin, setPassword, setUsername, username, password, user } =
    useContext(AppContext);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter full information");
    }

    await handleLogin();
  };
  return (
    <>
      <div className="login-span">
        <div class="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="error-message">
            <div class="user-box">
              <label htmlFor="username"></label>
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && <div>{error}</div>}
            </div>

            <div class="user-box">
              <label htmlFor="password"></label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div>{error}</div>}
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
