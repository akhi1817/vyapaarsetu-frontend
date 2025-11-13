import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    projectName: "",
    liveLink: "",
    basePrice: 0,
    discountPercent: 0,
    isOneTime: false,
    subscriptionDuration: 12,
    maintenancePerMonth: 0,
    advancePaid: 0,
    paymentMode: "UPI",
    notes: "",
  });

  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [perMonthAmount, setPerMonthAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const discountPrice = formData.basePrice * (1 - formData.discountPercent / 100);
    setDiscountedPrice(discountPrice);

    const total = formData.isOneTime
      ? discountPrice
      : discountPrice + formData.maintenancePerMonth * formData.subscriptionDuration;
    setTotalAmount(total);

    const perMonth = formData.isOneTime ? total : total / formData.subscriptionDuration;
    setPerMonthAmount(perMonth);

    const remaining = total - formData.advancePaid;
    setRemainingAmount(remaining >= 0 ? remaining : 0);
  }, [
    formData.basePrice,
    formData.discountPercent,
    formData.isOneTime,
    formData.subscriptionDuration,
    formData.maintenancePerMonth,
    formData.advancePaid,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_ENDPOINTS.CREATE_INVOICE, formData, { withCredentials: true });
      toast.success("Invoice created successfully!");
      navigate("/admin-dashboard/all-invoices");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create invoice");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Invoice</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        
        <div>
          <label className="block mb-1 font-medium">Client Name *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Project Name *</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Live Link</label>
          <input
            type="text"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Base Price *</label>
          <input
            type="number"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Discount (%)</label>
          <input
            type="number"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isOneTime"
            checked={formData.isOneTime}
            onChange={handleChange}
          />
          <label>One-Time Invoice</label>
        </div>

        {!formData.isOneTime && (
          <div>
            <label className="block mb-1 font-medium">Subscription Duration (Months)</label>
            <input
              type="number"
              name="subscriptionDuration"
              value={formData.subscriptionDuration}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        {!formData.isOneTime && (
          <div>
            <label className="block mb-1 font-medium">Maintenance per Month</label>
            <input
              type="number"
              name="maintenancePerMonth"
              value={formData.maintenancePerMonth}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Advance Paid</label>
          <input
            type="number"
            name="advancePaid"
            value={formData.advancePaid}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Mode</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Summary */}
        <div className="md:col-span-2 bg-gray-100 p-4 rounded">
          <p>Discounted Price: ₹{discountedPrice.toFixed(2)}</p>
          <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
          {!formData.isOneTime && <p>Per Month: ₹{perMonthAmount.toFixed(2)}</p>}
          <p>Remaining Amount: ₹{remainingAmount.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded md:col-span-2"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
