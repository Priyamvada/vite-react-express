import React, { useState } from 'react';
import { login } from '../../data/authProvider';
import { LoadingSpinner } from '../../components';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      const response = await login(username, password);
      setSuccessMessage(response.message);
      setError(null);

      // If a token is returned, store it (e.g., in localStorage)
      if (response.token) {
        localStorage.setItem('jwtToken', response.token);
        // Redirect or perform other actions after successful login
        console.log('Login successful! Token:', response.token);
      }

    } catch (error) {
      setError((error as Error).message);
      setSuccessMessage(null);
    } finally {
      // Clear password field after submission for security
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loading ? <LoadingSpinner /> : <button type="submit">Login</button> }
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default LoginPage;