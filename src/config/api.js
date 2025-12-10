const baseurl = import.meta.env.VITE_API_URL;

const API_ENDPOINTS = {

  // AUTH
  LOGIN_USER:`${baseurl}/api/auth/login`,
  LOGOUT_USER:`${baseurl}/api/auth/logout`,
  CHECK_AUTH:`${baseurl}/api/auth/protected`,
  SEND_OTP:`${baseurl}/api/auth/register/send-otp`,
  VERIFY_OTP:`${baseurl}/api/auth/register/verify-otp`,
  SEND_MESSAGE:`${baseurl}/api/auth/send-message`,

  // 📌 INVOICE APIs
  CREATE_INVOICE: `${baseurl}/api/invoices`,
  GET_INVOICES: `${baseurl}/api/invoices`,
  GET_INVOICE_BY_ID: (id) => `${baseurl}/api/invoices/${id}`,
  UPDATE_INVOICE: (id) => `${baseurl}/api/invoices/${id}`,
  UPDATE_PAYMENT: (id) => `${baseurl}/api/invoices/${id}/payment`,
  DELETE_INVOICE: (id) => `${baseurl}/api/invoices/${id}`,

  // ⭐ NEW FEATURES
  GET_WHATSAPP_LINK: (id) => `${baseurl}/api/invoices/${id}/whatsapp`,
  GET_MONTHLY_SALES: `${baseurl}/api/invoices/stats/monthly`,
  GET_PAYMENT_STATUS: `${baseurl}/api/invoices/stats/payment-status`,
  GET_YEARLY_REVENUE: `${baseurl}/api/invoices/stats/yearly`,
};

export default API_ENDPOINTS;
