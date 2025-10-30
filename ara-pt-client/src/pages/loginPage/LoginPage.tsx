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
  const [customerEmail, setCustomerEmail] = useState<string>('');

  const handleSubmitManagerLogin = async (event: React.FormEvent) => {
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

  const handleSubmitCustomerLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    localStorage.setItem('customer_email', customerEmail);
    navigate('/customerPayment');
  };

  useEffect(() => {
    if (activeUsername) {
      navigate('/'); // Redirect to main page if already logged in
    }
  }, [navigate, activeUsername]);

  return (
    <>
    <h1>Ara Payment and Invoice Management</h1>
    <div style={{ height: '50vh', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', gap: '50px' }}>
      <div style={{ display: 'flex', flex: 3, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid ${Colour.borderLightGrey}` }}>
        <h2 style={{padding: '0 20px'}}>Log into your Finance Manager Account</h2>
        <form onSubmit={handleSubmitManagerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <label htmlFor="username" style={{flex: 1}}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ flex: 2 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <label htmlFor="password" style={{flex: 1}}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ flex: 2 }}
            />
          </div>
          {loading ? <LoadingSpinner /> : <button style={{backgroundColor: Colour.backgroundBlue}} type="submit">Login</button> }
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      </div>


      <div style={{ display: 'flex', flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Complete your Online Payments in a click</h2>
        <form onSubmit={handleSubmitCustomerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <label htmlFor="You email ID" style={{flex: 1}}>Email:</label>
            <input
              type="email"
              id="customer_email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              style={{ flex: 2 }}
            />
          </div>
          {loading ? <LoadingSpinner /> : <button style={{backgroundColor: Colour.backgroundBlue}} type="submit">Quick Pay</button> }
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;