const baseurl = import.meta.env.VITE_API_URL;


const API_ENDPOINTS ={
        
    LOGIN_USER:`${baseurl}/api/auth/login`,
    LOGOUT_USER:`${baseurl}/api/auth/logout`,
    CHECK_AUTH:`${baseurl}/api/auth/protected`,
    SEND_OTP:`${baseurl}/api/auth/register/send-otp`,
    VERIFY_OTP:`${baseurl}/api/auth/register/verify-otp`,
    SEND_MESSAGE:`${baseurl}/api/auth/send-message`,



      // -------- INVOICE --------
  CREATE_INVOICE: `${baseurl}/api/invoices/create-invoice`,
  GET_ALL_INVOICES: `${baseurl}/api/invoices/get-all-invoices`,
  GET_INVOICE: (id) => `${baseurl}/api/invoices/get-invoice/${id}`,
  UPDATE_INVOICE: (id) => `${baseurl}/api/invoices/update-invoice/${id}`,
  DELETE_INVOICE: (id) => `${baseurl}/api/invoices/delete-invoice/${id}`,
  EXPORT_INVOICES_EXCEL: `${baseurl}/api/invoices/export/excel`,
  EXPORT_INVOICE_PDF: (id) => `${baseurl}/api/invoices/export/invoice/${id}`,

}

export default API_ENDPOINTS;
