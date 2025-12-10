import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Trash2, PlusCircle, Printer, Edit } from "lucide-react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.GET_INVOICES, { withCredentials: true });
      setInvoices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const deleteInvoice = async (id) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_INVOICE(id), { withCredentials: true });
      toast.success("Invoice deleted");
      fetchInvoices();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

const printInvoice = (inv) => {
  const discountAmount =
    inv.discount?.discountType === "percent"
      ? (inv.totalAmount * inv.discount.amount) / 100
      : inv.discount?.amount || 0;

  const finalTotal = Math.max(inv.totalAmount - discountAmount, 0);
  const firstPayment = inv.receivedAmount || 0;
  const firstDue = Math.max(finalTotal - firstPayment, 0);

  let runningDue = firstDue;

  const paymentRows = (inv.paymentLogs || [])
    .map((log) => {
      const oldDue = runningDue;
      runningDue -= log.amount;
      if (runningDue < 0) runningDue = 0;

      return `
        <tr>
          <td>Partial Payment (${new Date(log.date).toLocaleDateString()})</td>
          <td>₹${log.amount}</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>₹${oldDue}</td>
          <td>${log.paymentType}</td>
        </tr>
      `;
    })
    .join("");

  const defaultTerms = `
    1. Yearly Subscription: Client agrees to pay the annual fee.<br>
    2. Monthly Subscription: Monthly payments must be on time.<br>
  `;

  const content = `
  <html>
  <head>
    <title>Invoice ${inv.invoiceNo}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
      body {
        font-family: 'Inter', sans-serif;
        padding: 24px;
        background: #F1F5F9;
        color: #2D3748;
      }

      .container {
        max-width: 950px;
        margin: auto;
        background: white;
        padding: 28px;
        border-radius: 8px;
        border: 1px solid #CBD5E0;
      }

      .title {
        text-align: center;
        font-size: 26px;
        font-weight: 700;
        color: #1A365D;
        margin-bottom: 6px;
      }

      .line {
        width: 100%;
        height: 3px;
        background: #1A365D;
        margin-bottom: 24px;
        border-radius: 4px;
      }

      .top-row {
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }

      .left-side, .right-side {
        width: 50%;
      }

      .logo-business {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .logo-business img {
        max-height: 80px;
        border-radius: 4px;
      }

      .business-text {
        font-size: 14px;
        line-height: 1.5;
      }

      .business-text strong {
        font-size: 16px;
        color: #1A365D;
      }

      .right-side strong {
        color: #1A365D;
      }

      .info-box {
        border: 1px solid #CBD5E0;
        background: #F8FAFC;
        padding: 16px;
        margin-top: 24px;
        border-radius: 6px;
      }

      .info-title {
        font-size: 17px;
        font-weight: 600;
        color: #1A365D;
        margin-bottom: 10px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 28px;
        font-size: 14px;
      }

      th {
        background: #1A365D;
        color: white;
        padding: 10px;
        font-weight: 500;
        border: 1px solid #2C5282;
      }

      td {
        border: 1px solid #CBD5E0;
        padding: 10px;
        background: white;
      }

      tr:nth-child(even) td {
        background: #F8FAFC;
      }

      .signature {
        margin-top: 40px;
        text-align: right;
        font-weight: 600;
        color: #1A365D;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <div class="title">Professional Web Development Invoice</div>
      <div class="line"></div>

      <div class="top-row">
        <div class="left-side">
          <div class="logo-business">
            <img src="/logo.png" alt="Logo"/>
            <div class="business-text">
              <strong>Vyapaarsetu Business Solutions</strong><br>
              Phone: 8177819283 <br>
              Email: vyapaarsetu2025@gmail.com <br>
              Website: vyapaarsetu-business-solutions.vercel.app
            </div>
          </div>
        </div>

        <div class="right-side">
          <strong>Client Name:</strong> ${inv.clientName} <br>
          <strong>Phone:</strong> ${inv.clientPhone} <br>
          <strong>Email:</strong> ${inv.clientEmail || "-"} <br>
          <strong>Invoice No:</strong> ${inv.invoiceNo} <br>
          <strong>Date:</strong> ${new Date(inv.dateOfSale).toLocaleDateString()}
        </div>
      </div>

      <div class="info-box">
        <div class="info-title">Project Details</div>

        <strong>Website Name:</strong> ${inv.websiteName} <br>
        <strong>Website Link:</strong> ${inv.websiteLink} <br>

        ${
          inv.validityEnd
            ? `<strong>Validity End:</strong> ${new Date(inv.validityEnd).toLocaleDateString()} <br>`
            : ""
        }

        ${
          inv.maintenance?.amount
            ? `<strong>Maintenance Amount:</strong> ₹${inv.maintenance.amount} <br>`
            : ""
        }

        ${
          inv.maintenance?.nextDueDate
            ? `<strong>Next Maintenance Due:</strong> ${new Date(
                inv.maintenance.nextDueDate
              ).toLocaleDateString()} <br>`
            : ""
        }
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Final Total</th>
            <th>Received</th>
            <th>Remaining Due</th>
            <th>Payment Type</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>${inv.websiteName} Web Design Service</td>
            <td>₹${inv.totalAmount}</td>
            <td>₹${discountAmount}</td>
            <td>₹${finalTotal}</td>
            <td>₹${firstPayment}</td>
            <td>₹${firstDue}</td>
            <td>${inv.paymentType || "-"}</td>
          </tr>

          ${paymentRows}
        </tbody>
      </table>

      <div style="margin-top: 24px; font-size: 14px;">
        ${
          inv.notes
            ? `<strong>Notes:</strong> ${inv.notes}<br><br>`
            : ""
        }

        <strong>Terms & Conditions:</strong><br>
        ${inv.termsAndConditions || defaultTerms}
      </div>

      <div class="signature">
        ___________________________<br>
        Authorized Signatory
      </div>

    </div>
  </body>
  </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};





  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link
          to="/admin-dashboard/create-invoice"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <PlusCircle size={20} /> Create Invoice
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by client or invoice no..."
          className="w-full p-3 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Invoice No</th>
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Website</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Received</th>
              <th className="p-3 border">Due</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
  {loading ? (
    <tr>
      <td colSpan={8} className="text-center p-6">
        <Loader2 className="animate-spin w-10 h-10 mx-auto text-blue-600" />
      </td>
    </tr>
  ) : filteredInvoices.length > 0 ? (
    filteredInvoices.map((inv) => {
      const discountAmount =
        inv.discount?.discountType === "percent"
          ? (inv.totalAmount * inv.discount.amount) / 100
          : inv.discount?.amount || 0;

      const finalTotal = Math.max(inv.totalAmount - discountAmount, 0);
      const due = Math.max(finalTotal - inv.receivedAmount, 0);

      return (
        <tr key={inv._id} className="hover:bg-gray-50">
          <td className="p-3 border">{inv.invoiceNo}</td>
          <td className="p-3 border">{inv.clientName}</td>
          <td className="p-3 border">{inv.websiteName}</td>
          <td className="p-3 border">₹{finalTotal}</td>
          <td className="p-3 border">₹{inv.receivedAmount}</td>
          <td
            className={`p-3 border font-semibold ${
              due === 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{due}
          </td>
          <td className="p-3 border">{new Date(inv.dateOfSale).toLocaleDateString()}</td>
          <td className="p-3 border flex justify-center gap-3">
            <Link to={`/admin-dashboard/edit-invoice/${inv._id}`} title="Edit">
              <Edit className="text-green-600" />
            </Link>

            <button onClick={() => printInvoice(inv)} title="Print">
              <Printer className="text-indigo-600" />
            </button>

            <button onClick={() => deleteInvoice(inv._id)} title="Delete">
              <Trash2 className="text-red-600" />
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={8} className="text-center p-6 text-gray-500">
        No invoices found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}
