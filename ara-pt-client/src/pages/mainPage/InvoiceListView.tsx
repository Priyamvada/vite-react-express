import React, { useEffect, useState } from 'react';
// import { fetchRepoList, RepoItem } from '../../data/repoListDataProvider';
import { ListView, type ColumnProps, Toast, LoadingSpinner } from '../../components';
import type { ListItem } from '../../components/ListView/listView.types';
import { useNavigate } from 'react-router-dom';

interface InvoiceListViewProps {
  styles?: React.CSSProperties;
}

const InvoiceListViewContainerStyles: React.CSSProperties = {
  padding: '10px 20px',
};

export const InvoiceListView: React.FC<InvoiceListViewProps> = ({ styles }) => {
  const [invoiceList, setInvoiceList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleInvoiceListItemClick = (item: ListItem) => {
    // navigate(`/repoDetails/${item.data?.name}`, { state: { message: 'Back to all repositories', repo: item.data as RepoItem | undefined } });
  };

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
    };
    fetchRepos();
  }, []);

  const columnProps: ColumnProps[] = [];

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ ...styles, ...InvoiceListViewContainerStyles }}>
          { error ? <Toast type="error" message={error}/> : (
            <ListView items={invoiceList} columnProps={columnProps} onItemClick={handleInvoiceListItemClick}/>
          )}
        </div>
      )}
    </div>
  );
};