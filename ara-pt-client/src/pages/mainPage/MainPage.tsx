import React from 'react';
import { InvoiceListView } from './InvoiceListView';
import PageHeader from '../../components/PageHeader/PageHeader';
import { logout } from '../../data/authProvider';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleHeaderButtonClick = async () => {
    setLoading(true);
    try {
      const response = await logout();
      console.log(response.message);
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
      title="Accounts Receivable Manager"
      subtitle="System to manage your Micro Lending Company's Accounts Receivable, create and view invoices and efficiently generate payment links"
      onButtonClick={handleHeaderButtonClick}
      buttonText="Logout"
      loading={loading}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InvoiceListView />
    </div>
  );
};

export default MainPage;