import React, { useEffect, useState } from 'react';
// import { fetchRepoList, RepoItem } from '../../data/repoListDataProvider';
import { ListView, type ColumnProps, Toast, LoadingSpinner } from '../../components';
import type { ListItem } from '../../components/ListView/listView.types';
import { fetchInvoiceList } from '../../data/invoiceProvider';
import { Colour, FontSize, FontWeight } from '../../assets';
import InvoiceModal from './InvoiceModal';
import InvoicesFilterModal from './InvoicesFilterModal';
import type { InvoiceFilterCriteria } from './invoice.types';
import { set } from 'react-hook-form';

interface InvoiceListViewProps {
  styles?: React.CSSProperties;
}

const InvoiceListViewContainerStyles: React.CSSProperties = {
  padding: '10px 20px',
  minHeight: '80vh',
};

export const InvoiceListView: React.FC<InvoiceListViewProps> = ({ styles }) => {
  const [invoiceList, setInvoiceList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filters, setFilters] = useState<InvoiceFilterCriteria[]>([]);

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

  useEffect(() => {
    fetchInvoices();
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
              <div className='action-bar' style={{ marginBottom: '10px', textAlign: 'left' }}>
                <button style={{fontSize: FontSize.small, background: Colour.backgroundBlue}} onClick={handleCreateInvoiceClick}>╋ Create New Invoice</button>
                <button style={{fontSize: FontSize.small, marginLeft: '10px', borderColor: Colour.textLightGrey}} onClick={handleFilterInvoiceClick}>Filter</button>
              </div>
              <ListView items={invoiceList} columnProps={columnProps} onItemClick={handleInvoiceListItemClick}/>
            </>
          )}
          <InvoiceModal isOpen={showCreateInvoiceModal} editMode={true} onClose={handleInvoiceModalClose} />
          <InvoicesFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} filters={filters} onApplyFilters={setFilters} />
        </div>
        
      )}
    </div>
  );
};