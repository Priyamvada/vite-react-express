import React, { useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import { closeButtonStyle, headerStyle, modalStyle, overlayStyle, titleStyle } from "./InvoiceModal.styles";
import type { InvoiceModalProps } from "./invoice.types";

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, editMode, onClose }) => {
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
          <div style={titleStyle}>Create New Invoice</div>
          <button style={closeButtonStyle} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        {editMode && <InvoiceForm />}
        
      </div>
    </div>
  );
};

export default InvoiceModal;