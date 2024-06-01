import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file

function LoginPage({ setTab, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/sign-in", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (data.status) {
        console.log('Login successful:', data);
        onLogin(data); // Pass user data to parent component
        setTab('Admin');
      } else {
        setError(data.msg); // Display error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  const handleLogout = () => {
    setTab('');
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <div className="login-input-container">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </label>
      </div>
      <div className="login-input-container">
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
      </div>
      <div className="login-button-container">
        <button onClick={handleLogin} className="login-button">Login</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default LoginPage;

