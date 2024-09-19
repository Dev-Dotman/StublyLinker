import React, { useState, useRef, useEffect } from "react";
import "./OtpModal.css";

const OtpModal = ({ otpReceived, handleClose, handleSubmitOtp, resend }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    // Automatically open the modal when OTP is received
    if (otpReceived) {
      // Focus on the first input field
      inputsRef.current[0].focus();
    }
  }, [otpReceived]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    // Allow alphanumeric characters
    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input when filled
      if (index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    const { value } = e.target;

    if (e.key === "Backspace") {
      if (value === "") {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      } else {
        // Clear the current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData
      .getData("Text")
      .replace(/[^a-zA-Z0-9]/g, "") // Allow only alphanumeric characters
      .split("")
      .slice(0, 6);

    setOtp(pastedOtp);
    pastedOtp.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = char;
      }
    });
    inputsRef.current[pastedOtp.length - 1].focus();
  };

  const handleSubmit = () => {
    // Combine OTP fields into a single string
    const enteredOtp = otp.join("");
    handleSubmitOtp(enteredOtp); // Pass OTP back to parent component for validation
  };

  const handleResend = () => {
    resend();
  };

  if (!otpReceived) return null; // Do not display the modal if OTP is not received

  return (
    <div className="otp-modal">
      <div className="otp-modal-content">
        <h3>Enter the OTP sent to your email</h3>
        <div className="otp-inputs">
          {otp.map((_, index) => (
            <input
              type="text"
              key={index}
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              onPaste={handlePaste}
              className="otp-input"
            />
          ))}
        </div>
        <button className="btn" onClick={handleSubmit}>
          Submit OTP
        </button>
        <button className="btn" onClick={handleResend}>
          Resend OTP
        </button>
        <button className="btn-close" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
