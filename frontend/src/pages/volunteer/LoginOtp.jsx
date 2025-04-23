import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  volunteerLoginVerify,
  volunteerLoginVerifyResend,
} from "../../redux/Actions/volunteerAction";
import toastOptions, { successToastOptions } from "../../constants/toast";

const LoginOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error, isVolAuthenticated } = useSelector(
    (state) => state.volunteer
  );

  useEffect(() => {
    if (!id) {
      navigate(`/volunteer/login`);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isVolAuthenticated) {
      navigate(`/volunteer/Dashboard`);
    }
  }, [isVolAuthenticated, navigate]);

  useEffect(() => {
    if (message) {
      toast.success(message, successToastOptions);
      dispatch({ type: "CLEAR_MESSAGE" });
      if (typeof message === "string" && message.includes("Login Successful")) {
        toast.success(message, successToastOptions);
        dispatch({ type: "CLEAR_MESSAGE" });
        navigate("/volunteer/dashboard");
      }
    }
    if (error) {
      toast.error(error, toastOptions);
      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [message, error, dispatch, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6)
      .split("");
    
    if (pasteData.some(char => isNaN(parseInt(char)))) {
      toast.error("Please paste digits only", toastOptions);
      return;
    }

    const newOtp = [...otp];
    pasteData.forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const lastFilledIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      toast.error("Invalid verification link", toastOptions);
      return;
    }
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter all 6 digits", toastOptions);
      return;
    }
    dispatch(volunteerLoginVerify(id, otpValue));
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    
    if (!id) {
      toast.error("Invalid verification link", toastOptions);
      return;
    }
    dispatch(volunteerLoginVerifyResend(id));
    setCountdown(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Login Verification
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm"
                autoComplete="off"
              />
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ${
                loading || otp.join("").length !== 6 
                  ? "opacity-70 cursor-not-allowed" 
                  : "transform hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Login"
              )}
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4 pt-2">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={`flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 focus:outline-none transition-colors duration-200 ${
                countdown > 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {countdown > 0 
                ? `Resend code in ${countdown}s` 
                : "Resend verification code"}
            </button>
            
            <a
              href="/volunteer/login"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Return to login
            </a>
          </div>
        </form>
        
        <div className="text-center text-xs text-gray-400 mt-8">
          Having trouble? Contact our support team for assistance
        </div>
      </div>
    </div>
  );
};

export default LoginOtp;