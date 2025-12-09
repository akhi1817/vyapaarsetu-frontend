import { useEffect, useState, useRef } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, FileDown, Eye, Trash2, PlusCircle, Printer } from "lucide-react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const printRef = useRef();

  // ---------------------------
  // Fetch All Invoices
  // ---------------------------
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.GET_INVOICES, {
        withCredentials: true,
      });
      setInvoices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ---------------------------
  // Delete Invoice
  // ---------------------------
  const deleteInvoice = async (id) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_INVOICE(id), { withCredentials: true });
      toast.success("Invoice deleted");
      fetchInvoices();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // ---------------------------
  // Print Invoice
  // ---------------------------
const printInvoice = (inv) => {
  const content = `
  <html>
    <head>
      <title>Invoice ${inv.invoiceNo}</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: #fff;
        }

        .container {
          width: 820px;
          margin: auto;
          padding: 25px 35px;
          border: 1px solid #ccc;
        }

        /* HEADER WITH LOGO */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header img {
          height: 70px;
        }

        .header .company-title {
          text-align: right;
          font-size: 16px;
          font-weight: bold;
          line-height: 1.4;
        }

        /* TOP TITLE */
        .title-box {
          text-align: center;
          margin-bottom: 30px;
        }
        .title-box h1 {
          font-size: 28px;
          margin: 0;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .title-box .subtitle {
          margin-top: 5px;
          font-size: 13px;
          color: #666;
        }

        /* DETAILS & BILL TO */
        .details-section {
          width: 100%;
          border-top: 2px solid #000;
          border-bottom: 2px solid #000;
          padding: 10px 0;
          margin-bottom: 25px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }

        .col {
          width: 48%;
        }

        .label {
          font-weight: bold;
          margin-bottom: 3px;
          font-size: 13px;
        }

        .value {
          font-size: 14px;
          margin-bottom: 3px;
        }

        /* TABLE */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        th {
          background: #f0f0f0;
          padding: 8px;
          border: 1px solid #000;
          font-size: 14px;
          text-align: left;
        }

        td {
          padding: 8px;
          border: 1px solid #000;
          font-size: 14px;
        }

        /* TOTALS BOX */
        .totals-box {
          width: 250px;
          float: right;
          margin-top: 20px;
          border: 1px solid #000;
        }

        .totals-box div {
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          font-size: 14px;
          border-bottom: 1px solid #000;
        }

        .totals-box div:last-child {
          border-bottom: none;
          font-weight: bold;
          background: #f9f9f9;
        }

        /* NOTES */
        .notes {
          margin-top: 40px;
          font-size: 14px;
        }

        /* SIGNATURE */
        .signature-box {
          margin-top: 60px;
          text-align: right;
        }
        .signature-box img {
          height: 70px;
        }
        .signature-label {
          margin-top: 5px;
          font-size: 14px;
          font-weight: bold;
        }

        /* THANK YOU */
        .thanks {
          margin-top: 40px;
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 3px;
        }
      </style>

    </head>
    <body>

      <div class="container">

        <!-- HEADER WITH LOGO -->
        <div class="header">
          <img src="/logo.png" alt="Logo">

          <div class="company-title">
            Vyapaarsetu Business Solutions<br>
            Phone: 8177819283<br>
            Email: vyapaarsetu2025@gmail.com
          </div>
        </div>

        <!-- TOP TITLE -->
        <div class="title-box">
          <h1>WEB DESIGN INVOICE</h1>
          <div class="subtitle">THANK YOU</div>
        </div>

        <!-- DETAILS -->
        <div class="details-section">
          <div class="row">
            <div class="col">
              <div class="label">DATE:</div>
              <div class="value">${new Date(inv.dateOfSale || inv.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="col">
              <div class="label">INVOICE NO:</div>
              <div class="value">${inv.invoiceNo}</div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="label">FROM:</div>
              <div class="value"><strong>Vyapaarsetu Business Solutions</strong></div>
              <div class="value">Phone: 8177819283</div>
              <div class="value">Email: vyapaarsetu2025@gmail.com</div>
            </div>

            <div class="col">
              <div class="label">BILL TO:</div>
              <div class="value"><strong>${inv.clientName}</strong></div>
              <div class="value">Phone: ${inv.clientPhone}</div>
              <div class="value">Website: ${inv.websiteName}</div>
              <div class="value">Link: ${inv.websiteLink}</div>
            </div>
          </div>
        </div>

        <!-- MAIN TABLE -->
        <table>
          <thead>
            <tr>
              <th style="width:50%">DESCRIPTION</th>
              <th style="width:15%">AMOUNT</th>
              <th style="width:15%">RECEIVED</th>
              <th style="width:15%">DUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${inv.websiteName} – Web Design Service</td>
              <td>₹${inv.totalAmount}</td>
              <td>₹${inv.receivedAmount}</td>
              <td>₹${inv.dueAmount}</td>
            </tr>
          </tbody>
        </table>

        <!-- TOTALS BOX -->
        <div class="totals-box">
          <div><span>SUBTOTAL</span><span>₹${inv.totalAmount}</span></div>
          <div><span>DISCOUNT</span><span>₹0</span></div>
          <div><span>TOTAL</span><span>₹${inv.totalAmount}</span></div>
        </div>

        <div style="clear: both;"></div>

        <!-- SIGNATURE -->
        <div class="signature-box">
          <img src="/signature.png" alt="Signature">
          <div class="signature-label">Authorized Signature</div>
        </div>

        <div class="thanks">THANK YOU</div>

      </div>

    </body>
  </html>
  `;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};





  // ---------------------------
  // Filter invoices
  // ---------------------------
  const filteredInvoices = (invoices || []).filter((inv) =>
    inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
    inv.invoiceNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
        <Link
          to="/admin-dashboard/create-invoice"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Create Invoice
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by client or invoice no..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">Invoice No</th>
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-6">
                  <Loader2 className="animate-spin w-10 h-10 text-blue-600 mx-auto" />
                </td>
              </tr>
            ) : filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50">
                  <td className="p-3 border font-semibold">{inv.invoiceNo}</td>
                  <td className="p-3 border">{inv.clientName}</td>
                  <td className="p-3 border">₹{inv.totalAmount}</td>
                  <td className="p-3 border">{new Date(inv.dateOfSale || inv.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 border flex items-center justify-center gap-3">
                    <Link to={`/invoices/${inv._id}`} className="text-blue-600 hover:text-blue-800" title="View Invoice">
                      <Eye size={20} />
                    </Link>
                    {API_ENDPOINTS.EXPORT_INVOICE_PDF && (
                      <a
                        href={API_ENDPOINTS.EXPORT_INVOICE_PDF(inv._id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                        title="Download PDF"
                      >
                        <FileDown size={20} />
                      </a>
                    )}
                    <button onClick={() => printInvoice(inv)} className="text-indigo-600 hover:text-indigo-800" title="Print Invoice">
                      <Printer size={20} />
                    </button>
                    <button onClick={() => deleteInvoice(inv._id)} className="text-red-600 hover:text-red-800" title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
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
