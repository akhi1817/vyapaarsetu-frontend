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
    clientEmail: "",
    websiteName: "",
    websiteLink: "",
    totalAmount: "",
    discountType: "flat",
    discountValue: 0,
    receivedAmount: "",
    paymentType: "cash",
    upiId: "",
    chequeNo: "",
    otherPaymentDetails: "",
    validityEnd: "",
    dueDate: "",
    notes: "",
    termsAndConditions: "",
    maintenanceAmount: "",
    maintenanceDueDate: "",
  });

  // Auto calculate discounted total
  const finalTotal = Math.max(
    form.discountType === "percent"
      ? Number(form.totalAmount || 0) -
        (Number(form.totalAmount || 0) * Number(form.discountValue || 0)) / 100
      : Number(form.totalAmount || 0) - Number(form.discountValue || 0),
    0
  );

  const dueAmount = Math.max(Number(finalTotal) - Number(form.receivedAmount || 0), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: discount should not exceed totalAmount
    if (form.discountType === "flat" && Number(form.discountValue) > Number(form.totalAmount)) {
      toast.error("Discount cannot exceed total amount");
      return;
    }

    // Validation: receivedAmount <= finalTotal
    if (Number(form.receivedAmount) > finalTotal) {
      toast.error("Received amount cannot be greater than final payable amount");
      return;
    }

    try {
      const payload = {
        dateOfSale: form.dateOfSale || new Date(),
        clientName: form.clientName,
        clientPhone: form.clientPhone,
        clientEmail: form.clientEmail || undefined,

        websiteName: form.websiteName,
        websiteLink: form.websiteLink,

        totalAmount: Number(form.totalAmount),
        discount: {
          amount: Number(form.discountValue),
          discountType: form.discountType,
        },

        receivedAmount: Number(form.receivedAmount),
        paymentType: form.paymentType,

        paymentDetails:
          form.paymentType === "upi"
            ? { upiId: form.upiId }
            : form.paymentType === "cheque"
            ? { chequeNo: form.chequeNo }
            : form.paymentType === "other"
            ? { info: form.otherPaymentDetails }
            : {},

        validityEnd: form.validityEnd || undefined,
        dueDate: form.dueDate || undefined,

        maintenance: form.maintenanceAmount
          ? {
              amount: Number(form.maintenanceAmount),
              nextDueDate: form.maintenanceDueDate,
            }
          : undefined,

        notes: form.notes || "",
        termsAndConditions:
          form.termsAndConditions ||
          " 1.Annual and Monthly Subscription:All annual and monthly subscription payments must be made on time. Delayed or missed payments may lead to service interruption until the outstanding balance is cleared.<br/> 3. Payment & Refund Policy:All payments are final and non-refundable. Project work, hosting, or maintenance services will only commence after receipt of the required advance or subscription payment. <br/>4. Renewals, Maintenance & Service Continuity:Domain, hosting, maintenance, and other recurring services must be renewed before their due dates. Non-renewal may result in downtime, data loss, or permanent deletion of services, for which the company will not be held responsible.",
      };

      const res = await axios.post(API_ENDPOINTS.CREATE_INVOICE, payload, {
        withCredentials: true,
      });

      toast.success("Invoice created successfully!");
      navigate("/admin-dashboard/all-invoices");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating invoice");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-6">Create Invoice</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label className="font-medium">Date of Sale</label>
          <input
            type="date"
            name="dateOfSale"
            className="w-full border p-2 rounded"
            value={form.dateOfSale}
            onChange={handleChange}
          />
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Client Name</label>
            <input
              name="clientName"
              className="w-full border p-2 rounded"
              value={form.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium">Client Phone</label>
            <input
              name="clientPhone"
              className="w-full border p-2 rounded"
              value={form.clientPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium">Client Email (Optional)</label>
            <input
              name="clientEmail"
              className="w-full border p-2 rounded"
              value={form.clientEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="font-medium">Website Name</label>
          <input
            name="websiteName"
            className="w-full border p-2 rounded"
            value={form.websiteName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Website Link</label>
          <input
            name="websiteLink"
            className="w-full border p-2 rounded"
            value={form.websiteLink}
            onChange={handleChange}
            required
          />
        </div>

        {/* Amount + Discount */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-medium">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={form.totalAmount}
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium">Discount Type</label>
            <select
              name="discountType"
              value={form.discountType}
              className="w-full border p-2 rounded"
              onChange={handleChange}
            >
              <option value="flat">Flat</option>
              <option value="percent">Percent (%)</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Discount Value</label>
            <input
              type="number"
              name="discountValue"
              value={form.discountValue}
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const value = Number(e.target.value);
                if (form.discountType === "flat" && value > Number(form.totalAmount)) {
                  toast.error("Discount cannot exceed total amount");
                  return;
                }
                handleChange(e);
              }}
            />
          </div>
        </div>

        {/* Final Total */}
        <div>
          <label className="font-medium">Final Total</label>
          <input
            disabled
            className="w-full border p-2 bg-gray-100 rounded"
            value={finalTotal || 0}
          />
        </div>

        {/* Received */}
        <div>
          <label className="font-medium">Received Amount</label>
          <input
            type="number"
            name="receivedAmount"
            className="w-full border p-2 rounded"
            value={form.receivedAmount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Due Amount */}
        <div>
          <label className="font-medium">Due Amount</label>
          <input
            disabled
            className="w-full border p-2 bg-gray-100 rounded"
            value={dueAmount}
          />
        </div>

        {/* Payment Type */}
        <div>
          <label className="font-medium">Payment Type</label>
          <select
            name="paymentType"
            value={form.paymentType}
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="cheque">Cheque</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Payment Details */}
        {form.paymentType === "upi" && (
          <div>
            <label className="font-medium">UPI ID</label>
            <input
              name="upiId"
              className="w-full border p-2 rounded"
              value={form.upiId}
              onChange={handleChange}
            />
          </div>
        )}

        {form.paymentType === "cheque" && (
          <div>
            <label className="font-medium">Cheque No.</label>
            <input
              name="chequeNo"
              className="w-full border p-2 rounded"
              value={form.chequeNo}
              onChange={handleChange}
            />
          </div>
        )}

        {form.paymentType === "other" && (
          <div>
            <label className="font-medium">Payment Details</label>
            <input
              name="otherPaymentDetails"
              className="w-full border p-2 rounded"
              value={form.otherPaymentDetails}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Due Date */}
        <div>
          <label className="font-medium">Payment Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="w-full border p-2 rounded"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>

        {/* Validity */}
        <div>
          <label className="font-medium">Website Validity End</label>
          <input
            type="date"
            name="validityEnd"
            className="w-full border p-2 rounded"
            value={form.validityEnd}
            onChange={handleChange}
          />
        </div>

        {/* Maintenance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Yearly Maintenance Amount</label>
            <input
              type="number"
              name="maintenanceAmount"
              className="w-full border p-2 rounded"
              value={form.maintenanceAmount}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-medium">Next Maintenance Due Date</label>
            <input
              type="date"
              name="maintenanceDueDate"
              className="w-full border p-2 rounded"
              value={form.maintenanceDueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            className="w-full border p-2 rounded"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {/* Terms */}
        <div>
          <label className="font-medium">Terms & Conditions</label>
          <textarea
            name="termsAndConditions"
            rows={3}
            className="w-full border p-2 rounded"
            value={form.termsAndConditions}
            onChange={handleChange}
            placeholder="Default: Website comes with validity and yearly maintenance applies."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
