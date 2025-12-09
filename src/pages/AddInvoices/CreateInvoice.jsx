import { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dateOfSale: "",
    clientName: "",
    clientPhone: "",
    websiteName:"",
    websiteLink: "",
    totalAmount: "",
    receivedAmount: "",
    paymentType: "cash",
    validityEnd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto calculate dueAmount (frontend display only)
  const dueAmount =
    Number(form.totalAmount || 0) - Number(form.receivedAmount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        dateOfSale: form.dateOfSale || new Date(),
        validityEnd: form.validityEnd || undefined,
        totalAmount: Number(form.totalAmount),
        receivedAmount: Number(form.receivedAmount),
      };

      const res = await axios.post(API_ENDPOINTS.CREATE_INVOICE, payload, {
        withCredentials: true,
      });

      toast.success("Invoice created successfully!");
      navigate("/admin-dashboard/all-invoices"); // redirect to invoice list
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating invoice");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Create New Invoice</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Date */}
        <div>
          <label className="block font-medium">Date of Sale</label>
          <input
            type="date"
            name="dateOfSale"
            value={form.dateOfSale}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="block font-medium">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Client Phone */}
        <div>
          <label className="block font-medium">Client Phone</label>
          <input
            type="text"
            name="clientPhone"
            value={form.clientPhone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      <div>
  <label className="block font-medium">Website Name</label>
  <input
    type="text"
    name="websiteName"
    placeholder="Website Name"
    className="w-full p-3 border rounded"
    value={form.websiteName}
    onChange={handleChange} // <-- use existing handleChange
    required
  />
</div>


        {/* Website Link */}
        <div>
          <label className="block font-medium">Website Link</label>
          <input
            type="text"
            name="websiteLink"
            value={form.websiteLink}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block font-medium">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={form.totalAmount}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Received Amount */}
        <div>
          <label className="block font-medium">Received Amount</label>
          <input
            type="number"
            name="receivedAmount"
            value={form.receivedAmount}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Due Amount (auto) */}
        <div>
          <label className="block font-medium">Due Amount</label>
          <input
            type="number"
            className="w-full border rounded p-2 bg-gray-100"
            value={dueAmount}
            disabled
          />
        </div>

        {/* Payment Type */}
        <div>
          <label className="block font-medium">Payment Type</label>
          <select
            name="paymentType"
            value={form.paymentType}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="upi">UPI</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Validity End (Optional) */}
        <div>
          <label className="block font-medium">Validity End (Optional)</label>
          <input
            type="date"
            name="validityEnd"
            value={form.validityEnd}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice ;
