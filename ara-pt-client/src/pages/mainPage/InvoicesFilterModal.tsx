import React, { useEffect } from "react";
import { closeButtonStyle, headerStyle, modalStyle, overlayStyle, titleStyle } from "./invoiceModal.styles";
import type { InvoicesFilterModalProps } from "./invoice.types";
import { Colour, FontSize } from "../../assets";

interface FilterItem {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'ignore' ;
  comparison: ('exists' | 'doesNotExist' | 'equals' | 'contains' | 'before' | 'after' | 'between')[];
}

const filterItems: FilterItem[] = [
  {
    key: 'customer_email',
    label: 'Customer Email',
    type: 'text',
    comparison: ['equals'],
  },
  { 
    key: 'customer_fullname',
    label: 'Customer Full Name',
    type: 'text',
    comparison: ['contains'],
  },
  {
    key: 'invoice_date',
    label: 'Invoice Date',
    type: 'date',
    comparison: ['before', 'after', 'between'],
  },
  {
    key: 'due_date',
    label: 'Due Date',
    type: 'date',
    comparison: ['before', 'after', 'between'],
  },
  {
    key: 'paid_date',
    label: 'Paid Date',
    type: 'ignore',
    comparison: ['doesNotExist', 'exists'],
  }
];

const InvoicesFilterModal: React.FC<InvoicesFilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleOnClickApplyFilters = () => {
    setIsSubmitting(true);
  }
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={titleStyle}>Select Filter Parameters</div>
          <button style={closeButtonStyle} onClick={onClose}>
            ✕
          </button>
        </div>

        {filterItems.map((item) => (
          <div key={item.key} style={{ padding: '10px 20px', color: Colour.textDarkGrey, fontSize: FontSize.medium }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              {item.label}
            </label>
            <select style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
              {item.comparison.map((comp) => (
                <option key={comp} value={comp}>
                  {comp.charAt(0).toUpperCase() + comp.slice(1)}
                </option>
              ))}
            </select>
            {item.type !== 'ignore' && (
              <input
                type={item.type === 'number' ? 'number' : item.type === 'date' ? 'date' : 'text'}
                style={{ width: '100%', padding: '8px' }}
                placeholder={`Enter ${item.label.toLowerCase()}`}
              />
            )}
            
          </div>
        ))}

        <button
          onClick={handleOnClickApplyFilters}
          disabled={isSubmitting}
          style={{backgroundColor: Colour.backgroundBlue, color: Colour.textWhite, padding: '10px 16px', borderRadius: '8px', fontSize: FontSize.medium}}
        >
          {isSubmitting ? "Applying Filters..." : "Apply"}
        </button>

        
      </div>
    </div>
  );
};

export default InvoicesFilterModal;