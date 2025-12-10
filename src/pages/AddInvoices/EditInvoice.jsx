import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";

export default function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPayment, setNewPayment] = useState(0);
  const [paymentType, setPaymentType] = useState("");

  // ---------------------------
  // Fetch invoice by ID
  // ---------------------------
  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ENDPOINTS.GET_INVOICE_BY_ID(id), {
        withCredentials: true,
      });
      setInvoice(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load invoice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  // ---------------------------
  // Handle invoice form changes
  // ---------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [parentKey]: { ...invoice[parentKey], [name]: value },
    });
  };

  // ---------------------------
  // Handle full invoice update
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(API_ENDPOINTS.UPDATE_INVOICE(invoice._id), invoice, {
        withCredentials: true,
      });
      toast.success("Invoice updated successfully");
      navigate("/admin-dashboard/all-invoices");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------
  // Handle adding a new payment
  // ---------------------------
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (newPayment <= 0) {
      toast.error("Enter a valid payment amount");
      return;
    }
    try {
      setSaving(true);

      // ✅ PUT request according to backend route
      await axios.put(
        API_ENDPOINTS.UPDATE_PAYMENT(invoice._id),
        {
          receivedAmount: Number(newPayment),
          paymentType,
        },
        { withCredentials: true }
      );

      toast.success("Payment added successfully");
      setNewPayment(0);
      setPaymentType("");
      fetchInvoice();
    } catch (err) {
      console.error(err);
      toast.error("Payment update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-center p-6">Loading invoice...</div>;
  if (!invoice)
    return (
      <div className="text-center p-6 text-red-600">Invoice not found</div>
    );

  // ---------------------------
  // Calculate totals and due dynamically
  // ---------------------------
  const discountAmount =
    invoice.discount?.discountType === "percent"
      ? (invoice.totalAmount * invoice.discount.amount) / 100
      : invoice.discount?.amount || 0;

  const finalTotal = Math.max(invoice.totalAmount - discountAmount, 0);
  const dueAmount = Math.max(finalTotal - invoice.receivedAmount, 0);

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Edit Invoice - {invoice.invoiceNo}
      </h1>

      {/* ---------------- Full Invoice Form ---------------- */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Client Info */}
        <div>
          <label className="block font-semibold">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={invoice.clientName || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Client Phone</label>
          <input
            type="text"
            name="clientPhone"
            value={invoice.clientPhone || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Website Name</label>
          <input
            type="text"
            name="websiteName"
            value={invoice.websiteName || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Website Link</label>
          <input
            type="text"
            name="websiteLink"
            value={invoice.websiteLink || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Amounts */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={invoice.totalAmount || 0}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Received Amount</label>
            <input
              type="number"
              value={invoice.receivedAmount || 0}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold">Due Amount</label>
            <input
              type="number"
              value={dueAmount}
              disabled
              className={`w-full p-2 border rounded ${
                dueAmount === 0
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              } bg-gray-100`}
            />
          </div>
        </div>

        {/* Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Discount Type</label>
            <select
              name="discountType"
              value={invoice.discount?.discountType || ""}
              onChange={(e) => handleNestedChange(e, "discount")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="percent">Percent</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Discount Amount</label>
            <input
              type="number"
              name="amount"
              value={invoice.discount?.amount || 0}
              onChange={(e) => handleNestedChange(e, "discount")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Update Invoice"}
        </button>
      </form>

      {/* ---------------- Payment Update Form ---------------- */}
      {/* ---------------- Payment Update Form ---------------- */}
<div className="mb-6 p-4 border rounded-lg bg-gray-50">
  <h2 className="text-lg font-bold mb-2">Add Payment</h2>

  {dueAmount === 0 ? (
    <p className="text-green-600 font-semibold">
      ✔ All payments completed — No due left!
    </p>
  ) : (
    <form onSubmit={handlePaymentSubmit} className="grid grid-cols-3 gap-4">
      <div>
        <input
          type="number"
          placeholder="Enter received amount"
          value={newPayment}
          onChange={(e) => setNewPayment(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={dueAmount === 0}
        />
      </div>

      <div>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={dueAmount === 0}
        >
          <option value="">Payment Type</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={saving || dueAmount === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Add Payment"}
        </button>
      </div>
    </form>
  )}
</div>


      {/* ---------------- Payment History ---------------- */}
      <div>
        <h2 className="font-bold text-lg mb-2">Payment History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Payment Type</th>
            </tr>
          </thead>
         <tbody>
  {invoice.paymentLogs?.map((log, idx) => (
    <tr key={idx} className="hover:bg-gray-50">
      <td className="p-2 border">
        {new Date(log.date).toLocaleDateString()}
      </td>
      <td className="p-2 border">₹{log.amount}</td>
      <td className="p-2 border">{log.paymentType}</td>
      <td className="p-2 border text-center">
        <button
          onClick={() => deletePayment(log._id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}

  {invoice.paymentLogs?.length === 0 && (
    <tr>
      <td colSpan={4} className="text-center p-2 text-gray-500">
        No payments yet
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}
