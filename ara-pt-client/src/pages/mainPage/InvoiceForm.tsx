import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createInvoice } from "../../data/invoiceProvider";
import { LoadingSpinner } from "../../components";
import { Colour, FontSize } from "../../assets";
import type { currency } from "./invoice.types";

interface InvoiceFormInputs {
  customer_email: string;
  customer_fullname: string;
  invoice_date: string;
  due_date: string;
  amount: number;
  currency: currency;
}

const InvoiceForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormInputs>();

  const onSubmit: SubmitHandler<InvoiceFormInputs> = async (data) => {
    setLoading(true);

    try {
      const response = await createInvoice(data);
      setSuccessMessage(`Invoice #${response?.id} created successfully!`);
      setLoading(false);
      setError(null);
      reset();
    } catch (error) {
      setError((error as Error).message);
      setSuccessMessage(null);
    } finally {
      // Clear password field after submission for security
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6">

      {loading && <LoadingSpinner/>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"
      style={{ display: loading ? 'none' : 'block', color: Colour.textDarkGrey, fontSize: FontSize.medium }}>
        
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '16px', marginBottom: '16px'}}>
          <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
            {/* Customer Email */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <label className="block text-sm font-medium mb-1">
                Customer Email
              </label>
              <input
                type="email"
                {...register("customer_email", { required: "Email is required" })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.customer_email && (
                <p className="text-red-600 text-sm">
                  {errors.customer_email.message}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <label className="block text-sm font-medium mb-1">
                Customer Full Name
              </label>
              <input
                type="text"
                {...register("customer_fullname", {
                  required: "Full name is required",
                })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.customer_fullname && (
                <p className="text-red-600 text-sm">
                  {errors.customer_fullname.message}
                </p>
              )}
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
            {/* Invoice Date */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <label className="block text-sm font-medium mb-1">Invoice Date</label>
              <input
                type="date"
                {...register("invoice_date", { required: "Invoice date required" })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.invoice_date && (
                <p className="text-red-600 text-sm">
                  {errors.invoice_date.message}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                {...register("due_date", { required: "Due date required" })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.due_date && (
                <p className="text-red-600 text-sm">
                  {errors.due_date.message}
                </p>
              )}
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
            {/* Amount */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { required: "Amount is required" })}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.amount && (
                <p className="text-red-600 text-sm">{errors.amount.message}</p>
              )}
            </div>

            {/* Currency */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                {...register("currency", { required: "Currency required" })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option value="USD">USD</option>
                <option value="MYR">MYR</option>
                <option value="INR">INR</option>
                <option value="IDR">IDR</option>
                <option value="THB">THB</option>
              </select>
              {errors.currency && (
                <p className="text-red-600 text-sm">{errors.currency.message}</p>
              )}
            </div>

          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{backgroundColor: Colour.backgroundBlue, color: Colour.textWhite, padding: '10px 16px', borderRadius: '8px', fontSize: FontSize.medium}}
        >
          {isSubmitting ? "Creating..." : "Create Invoice"}
        </button>
        {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default InvoiceForm;