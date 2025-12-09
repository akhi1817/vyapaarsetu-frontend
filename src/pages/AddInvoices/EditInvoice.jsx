import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";
import { Loader2, ArrowLeft, FileDown, Pencil, CheckCircle, XCircle } from "lucide-react";

export default function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInvoice = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.GET_INVOICE(id), {
        withCredentials: true,
      });
      setInvoice(res.data.invoice || res.data);
    } catch (err) {
      toast.error("Failed to load invoice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const updateStatus = async (status) => {
    try {
      await axios.put(
        `${API_ENDPOINTS.GET_INVOICE(id)}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success(`Status updated to ${status}`);
      fetchInvoice();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );

  if (!invoice)
    return <p className="text-center pt-20 text-gray-500">Invoice not found</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex gap-3">
          <a
            href={API_ENDPOINTS.EXPORT_INVOICE_PDF(invoice._id)}
            target="_blank"
            className="bg-green-600 px-4 py-2 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FileDown size={18} /> PDF
          </a>

          <Link
            to={`/invoices/edit/${invoice._id}`}
            className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Pencil size={18} /> Edit
          </Link>
        </div>
      </div>

      {/* Invoice Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Invoice #{invoice.invoiceNo}
        </h2>
        <p className="text-gray-500">
          Date: {new Date(invoice.createdAt).toLocaleDateString()}
        </p>

        {/* Status Badge */}
        <span
          className={`mt-3 inline-block px-3 py-1 rounded-full text-white text-sm ${
            invoice.status === "PAID"
              ? "bg-green-600"
              : invoice.status === "DUE"
              ? "bg-red-500"
              : "bg-blue-600"
          }`}
        >
          {invoice.status}
        </span>

        {/* Status Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => updateStatus("PAID")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <CheckCircle size={18} /> Mark Paid
          </button>

          <button
            onClick={() => updateStatus("DUE")}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <XCircle size={18} /> Mark Due
          </button>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">Client Details</h3>
        <p>{invoice.client?.name}</p>
        <p>{invoice.client?.email}</p>
        <p>{invoice.client?.address}</p>
        <p>GSTIN: {invoice.client?.gstin}</p>
      </div>

      {/* Amount Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="font-semibold mb-3">Amounts</h3>

        <div className="flex justify-between py-1">
          <span>Total Amount:</span>
          <span>₹{invoice.totalAmount}</span>
        </div>

        <div className="flex justify-between py-1">
          <span>Tax:</span>
          <span>₹{invoice.totalTax}</span>
        </div>

        <div className="flex justify-between py-1 font-semibold text-lg">
          <span>Grand Total:</span>
          <span>₹{invoice.totalAmount + invoice.totalTax}</span>
        </div>

        <div className="flex justify-between py-1 text-blue-700 font-bold">
          <span>Due:</span>
          <span>₹{invoice.totalDue}</span>
        </div>
      </div>
    </div>
  );
}
