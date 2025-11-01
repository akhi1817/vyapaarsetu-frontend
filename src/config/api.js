const baseurl = import.meta.env.VITE_API_URL;


const API_ENDPOINTS ={
        
    LOGIN_USER:`${baseurl}/auth/login`,
    LOGOUT_USER:`${baseurl}/auth/logout`,
    CHECK_AUTH:`${baseurl}/auth/protected`,
    SEND_OTP:`${baseurl}/auth/register/send-otp`,
    VERIFY_OTP:`${baseurl}/auth/register/verify-otp`,
    SEND_MESSAGE:`${baseurl}/auth/send-message`,

}

export default API_ENDPOINTS;
