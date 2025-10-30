import React, { useEffect, useState } from 'react';
import { ListView, type ColumnProps, Toast, LoadingSpinner } from '../../components';
import type { ListItem } from '../../components/ListView/listView.types';
import { fetchInvoiceList, fetchInvoicesByCustomerEmail, generatePaymentLink } from '../../data/invoiceProvider';
import { Colour, FontSize, FontWeight } from '../../assets';
import InvoiceModal from './InvoiceModal';
import InvoicesFilterModal from './InvoicesFilterModal';
import type { InvoiceFilterCriteria } from './invoice.types';
import { useNavigate } from 'react-router-dom';

interface InvoiceListViewProps {
  styles?: React.CSSProperties;
  accountType: 'manager' | 'customer';
}

const InvoiceListViewContainerStyles: React.CSSProperties = {
  padding: '10px 20px',
  minHeight: '80vh',
};

export const InvoiceListView: React.FC<InvoiceListViewProps> = ({ styles, accountType }) => {
  const [invoiceList, setInvoiceList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filters, setFilters] = useState<InvoiceFilterCriteria[]>([]);
  const navigate = useNavigate();

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await fetchInvoiceList();
      setError(null);
      setInvoiceList(data.map((invoice) => ({ id: invoice.id.toString(), data: invoice })));
    } catch (error) {
      setInvoiceList([]);
      setError(error?.toString() ?? 'Failed to fetch repositories.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoicesByFilter = async (filters: InvoiceFilterCriteria[]) => {
    setLoading(true);
    try {
      const customerEmail = localStorage.getItem('customer_email');
      if (!customerEmail) {
        setInvoiceList([]);
        setError('Customer email not found in local storage.');
        setLoading(false);
        navigate('/login');
        return;
      }
      const data = await fetchInvoicesByCustomerEmail(customerEmail);
      setError(null);
      setInvoiceList(data.map((invoice) => ({ id: invoice.id.toString(), data: invoice })));
    } catch (error) {
      setInvoiceList([]);
      setError(error?.toString() ?? 'Failed to fetch repositories.');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentLink = async (invoiceId: number) => {
    try {
      const paymentLink = await generatePaymentLink(invoiceId);
      // Update the invoice list with the new payment link
      setInvoiceList((prevList) =>
        prevList.map((item) =>
          item.id === invoiceId.toString()
            ? { ...item, data: { ...item.data, payment_link: paymentLink } }
            : item
        )
      );
    } catch (error) {
      console.error('Failed to generate payment link:', error);
    }
  };

  const handleInvoiceListItemClick = (item: ListItem) => {
  };

  const handleCreateInvoiceClick = () => {
    setShowCreateInvoiceModal(true);
  };

  const handleInvoiceModalClose = () => {
    fetchInvoices();
    setShowCreateInvoiceModal(false);
  };

  const handleFilterInvoiceClick = () => {
    setShowFilterModal(true);
  };

  const handleGeneratePaymentLinkClicked = (invoiceId: string) => {
    getPaymentLink(Number(invoiceId));
  }

  useEffect(() => {
    if (accountType === 'manager') {
      fetchInvoices();
    } else if (localStorage.getItem('customer_email')) {
      // This is a hack for now. Ideally we would want to have a separate component under customerPaymentsPage and also filters need to be implemented
      fetchInvoicesByFilter(filters);
    }
  }, []);

  const columnProps: ColumnProps[] = [
    {
      key: 'id',
      label: 'Invoice ID',
      type: 'text',
    },
    {
      key: 'customer_fullname',
      label: 'Full Name',
      type: 'text',
    },
    {
      key: 'customer_email',
      label: 'Email',
      type: 'text',
    },
    {
      key: 'invoice_date',
      label: 'Invoice Date',
      type: 'date',
      sortable: true,
      style: {
        fontSize: FontSize.xsmall,
      }
    },
    {
      key: 'due_date',
      label: 'Due Date',
      type: 'date',
      sortable: true,
      style: {
        fontSize: FontSize.xsmall,
      }
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'number',
      sortable: true,
    },
    {
      key: 'currency',
      label: 'Currency',
      type: 'text',
    },
    {
      key: 'paid_amount',
      label: 'Paid Amount',
      type: 'number',
      sortable: true,
    },
    {
      key: 'payment_link',
      label: 'Payment Link',
      type: 'text',
      render: (item) => (
        <>
          {item?.data?.paid_amount != null && item.data.amount - item.data.paid_amount === 0 ? (
            <span style={{ color: Colour.textGreen, fontWeight: FontWeight.bold }}>PAID</span>
          ) : (
            <>
            {item?.data?.payment_link ? (
              <a href={item.data.payment_link} target="_blank" rel="noopener noreferrer" style={{ color: Colour.backgroundBlue }}>Pay Here</a>
              ) : (
                <button
                  onClick={() => handleGeneratePaymentLinkClicked(item!.id)}
                  style={{ fontSize: FontSize.xsmall, background: Colour.backgroundBlue, color: Colour.textWhite }}>Generate</button>
              )}
            </>
          )
          }
        </>
      )
    },
    {
      key: 'paid_date',
      label: 'Payment Date',
      type: 'date',
      sortable: true,
      placeholder: 'Unpaid',
      style: {
        fontSize: FontSize.xsmall,
      }
    },
    {
      key: 'createdAt',
      label: 'Created At',
      type: 'date',
      sortable: true,
      style: {
        fontSize: FontSize.xsmall,
      }
    },
  ];

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ ...styles, ...InvoiceListViewContainerStyles }}>
          { error ? <Toast type="error" message={error}/> : (
            <>
              <div style={{ marginBottom: '10px', fontWeight: FontWeight.bold, fontSize: FontSize.large }}>
                Invoice List
              </div>
              {accountType === 'manager' && (
                <div className='action-bar' style={{ marginBottom: '10px', textAlign: 'left' }}>
                  <button style={{fontSize: FontSize.small, background: Colour.backgroundBlue}} onClick={handleCreateInvoiceClick}>╋ Create New Invoice</button>
                  <button style={{fontSize: FontSize.small, marginLeft: '10px', borderColor: Colour.textLightGrey}} onClick={handleFilterInvoiceClick}>Filter</button>
                </div>
              )}
              <ListView items={invoiceList} columnProps={columnProps} onItemClick={handleInvoiceListItemClick}/>
            </>
          )}
          {accountType === 'manager' && (
            <>
            <InvoiceModal isOpen={showCreateInvoiceModal} editMode={true} onClose={handleInvoiceModalClose} />
            <InvoicesFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} filters={filters} onApplyFilters={setFilters} />
            </>
          )}
        </div>
        
      )}
    </div>
  );
};