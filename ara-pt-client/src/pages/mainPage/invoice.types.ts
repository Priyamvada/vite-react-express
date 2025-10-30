export interface InvoiceFilterCriteria {
  key: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string | number | boolean;
}

export interface InvoiceModalProps {
  isOpen: boolean;
  editMode?: boolean;
  onClose: () => void;
}

export interface InvoicesFilterModalProps {
  isOpen: boolean;
  filters: InvoiceFilterCriteria[];
  onClose: () => void;
  onApplyFilters: (filters: InvoiceFilterCriteria[]) => void;
}

export type currency = "USD" | "MYR" | "INR" | "IDR" | "THB";
