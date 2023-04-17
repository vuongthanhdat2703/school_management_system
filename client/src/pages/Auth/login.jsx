import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/localstorage";
import { request } from "../../utils/request";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter full information");
    }

    try {
      const response = await request.post("/login", { username, password });
      const data = response.data;

      if (data.message === "Login success!") {
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
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
