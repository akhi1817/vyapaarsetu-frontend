import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable"; // <-- import only, DON'T assign anything


import API_ENDPOINTS from "../../config/api";

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  // ✅ Fetch Invoices
  const fetchInvoices = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.GET_ALL_INVOICES, {
        withCredentials: true,
      });
      setInvoices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to fetch invoices");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ✅ Delete Invoice
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_INVOICE(id), {
        withCredentials: true,
      });
      toast.success("Invoice deleted successfully");
      fetchInvoices();
    } catch (err) {
      toast.error("Failed to delete invoice");
    }
  };

  // ✅ Export all invoices to Excel
  const handleExportExcel = () => {
    if (!invoices.length) {
      toast.error("No invoices to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(invoices);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
    XLSX.writeFile(workbook, "Invoices.xlsx");
  };

  // ✅ Export single invoice to PDF
// ✅ REPLACE ONLY THIS FUNCTION IN YOUR FILE

const handleExportPDF = (invoice) => {
  const doc = new jsPDF("p", "mm", "a4");
  const logo = new Image();
  logo.src = "/logo.png";

  logo.onload = () => {
    // ===== Header Section =====
    doc.addImage(logo, "PNG", 15, 10, 25, 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Vyapaarsetu Business Solutions", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Pimpri, Pune", 105, 27, { align: "center" });
    doc.text("Email: vyapaarsetu2025@gmail.com | Phone: 8177819283", 105, 33, { align: "center" });

    doc.setDrawColor(180);
    doc.line(15, 40, 195, 40);

    // ===== Invoice Title =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("INVOICE", 15, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // ===== Client Information =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Client Information", 15, 64);
    doc.setDrawColor(200);
    doc.line(15, 66, 70, 66);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Client Name: ${invoice.clientName}`, 15, 74);
    doc.text(`Project Name: ${invoice.projectName}`, 15, 82);
    doc.text(`Client Email: ${invoice.clientEmail}`, 15, 90);

    // ===== Payment Summary Box =====
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.6);
    doc.rect(15, 98, 180, 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Payment Summary", 20, 106);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Total Amount: ${invoice.totalAmount}`, 20, 115);
    doc.text(`Remaining Amount: ${invoice.remainingAmount}`, 20, 123);
    doc.text(`Payment Mode: ${invoice.paymentMode}`, 20, 131);

    // ===== Details Table =====
    doc.autoTable({
      startY: 145,
      head: [["Field", "Value"]],
      body: [
        ["Live Link", invoice.liveLink || "N/A"],
        ["Base Price", `${invoice.basePrice || "N/A"}`],
        ["Discount (%)", `${invoice.discountPercent || 0}%`],
        ["Subscription Duration", invoice.subscriptionDuration || "N/A"],
        ["Maintenance/Month", `${invoice.maintenancePerMonth || "N/A"}`],
        ["Advance Paid", `${invoice.advancePaid || "N/A"}`],
        ["Notes", invoice.notes || "N/A"],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 5,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60 },
        1: { cellWidth: 120 },
      },
    });

    // ===== Footer Section =====
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setDrawColor(200);
    doc.line(15, finalY - 5, 195, finalY - 5);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.text("Thank you for your business!", 15, finalY);
    doc.text("For queries, contact Vyapaarsetu Business Solutions.", 15, finalY + 6);

    doc.setFontSize(9);
    doc.text("This is a computer-generated invoice, no signature required.", 15, finalY + 14);

    doc.save(`Invoice_${invoice.clientName}_${invoice._id}.pdf`);
  };
};




  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Invoices</h2>
        <button
          onClick={handleExportExcel}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Export All to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Project</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Remaining</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((inv) => (
                <tr key={inv._id} className="text-center border-t">
                  <td className="p-2 border">{inv.clientName}</td>
                  <td className="p-2 border">{inv.projectName}</td>
                  <td className="p-2 border">₹{inv.totalAmount}</td>
                  <td className="p-2 border">₹{inv.remainingAmount}</td>
                  <td className="p-2 border flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() =>
                        navigate(`/admin-dashboard/edit-invoice/${inv._id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(inv._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleExportPDF(inv)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
