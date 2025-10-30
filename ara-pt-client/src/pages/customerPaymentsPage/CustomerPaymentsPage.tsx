import React from 'react';
import { InvoiceListView } from '../mainPage/InvoiceListView';
import PageHeader from '../../components/PageHeader/PageHeader';
import { logout } from '../../data/authProvider';
import { useNavigate } from 'react-router-dom';

const CustomerPaymentsPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleHeaderButtonClick = async () => {
    setLoading(true);
    try {
      const response = await logout();
      console.log(response.message);
      localStorage.removeItem('customer_email');
      navigate('/login');
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      // Clear password field after submission for security
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
      title="Make your payments"
      subtitle="Make your payments in 1 click via the payment links"
      onButtonClick={handleHeaderButtonClick}
      buttonText="Logout"
      displayName={localStorage.getItem('customer_email') || undefined}
      loading={loading}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InvoiceListView accountType={'customer'} />
    </div>
  );
};

export default CustomerPaymentsPage;