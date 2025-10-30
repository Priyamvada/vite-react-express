import React, { useEffect, useState } from 'react';
import { login } from '../../data/authProvider';
import { LoadingSpinner } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useCookie } from '../../hooks';
import { Colour } from '../../assets';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const activeUsername = useCookie('username');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      const response = await login(username, password);
      setSuccessMessage(response.message);
      setError(null);
      navigate('/'); // Redirect to main page on successful login
    } catch (error) {
      setError((error as Error).message);
      setSuccessMessage(null);
    } finally {
      // Clear password field after submission for security
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeUsername) {
      navigate('/'); // Redirect to main page if already logged in
    }
  }, [navigate, activeUsername]);

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
        {loading ? <LoadingSpinner /> : <button style={{backgroundColor: Colour.backgroundBlue}} type="submit">Login</button> }
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default LoginPage;