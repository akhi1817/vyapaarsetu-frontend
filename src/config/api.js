const baseurl = import.meta.env.VITE_API_URL;


const API_ENDPOINTS ={
        
    LOGIN_USER:`${baseurl}/api/auth/login`,
    LOGOUT_USER:`${baseurl}/api/auth/logout`,
    CHECK_AUTH:`${baseurl}/api/auth/protected`,
    SEND_OTP:`${baseurl}/api/auth/register/send-otp`,
    VERIFY_OTP:`${baseurl}/api/auth/register/verify-otp`,
    SEND_MESSAGE:`${baseurl}/api/auth/send-message`,

}

export default API_ENDPOINTS;
