import {axiosInstance as axios, isAxiosError} from './axiosInstance';

export interface InvoiceItem {
  id: number;
  customer_email: string;
  customer_fullname: string;
  invoice_date: string;
  due_date: string;
  amount: number;
  currency: 'USD' | 'MYR' | 'INR' | 'IDR' | 'THB';
  paid_amount: number;
  payment_link?: string;
  paid_date?: string;
  created_by_id: number;
  createdAt: string;
  updatedAt: string;
}

function convertToInvoiceItem(invoice: any): InvoiceItem {
  return invoice as InvoiceItem;
}

export async function fetchInvoiceList(): Promise<InvoiceItem[]> {
  try {
    const response = await axios.get('/invoices');
    return response.data.invoices.map((invoice: any): InvoiceItem => convertToInvoiceItem(invoice));
  } catch (error) {
    console.error('Failed to fetch invoice list:', error);
    throw error;
  }
}

export async function createInvoice(invoiceData: Omit<InvoiceItem, 'id' | 'paid_amount' | 'paid_date' | 'payment_link' | 'createdAt' | 'updatedAt' | 'created_by_id'>): Promise<InvoiceItem> {
  try {
    const response = await axios.post('/invoice', invoiceData);
    return convertToInvoiceItem(response.data.invoice);
  } catch (error) {
    console.error('Failed to create invoice:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || 'Creating invoice failed. Please try again.';
    }
    throw new Error(errorMessage);
  }
}

export async function fetchInvoicesByCustomerEmail(customerEmail: string): Promise<InvoiceItem[]> {
  try {
    const response = await axios.get(`/invoices_by_email?customer_email=${encodeURIComponent(customerEmail)}`);
    return response.data.invoices.map((invoice: any): InvoiceItem => convertToInvoiceItem(invoice));
  } catch (error) {
    console.error('Failed to fetch invoices for customer:', error);
    throw error;
  }
}

export async function generatePaymentLink(invoiceId: number): Promise<string> {
  try {
    const response = await axios.get(`/generate-payment-link/?invoiceId=${invoiceId}`);
    return response.data.payment_link;
  } catch (error) {
    console.error('Failed to generate payment link:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || 'Generating payment link failed. Please try again.';
    }
    throw new Error(errorMessage);
  }
}