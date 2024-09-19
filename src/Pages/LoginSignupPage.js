import React, { useContext, useState } from "react";
import "./LoginSignupPage.css";
import { AuthContext } from "../Contexts/AuthProvider";
import IpAdress from "../Config/IpAdress";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import OtpModal from "./OtpModal";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const { login, isAuthenticated } = useContext(AuthContext);
  const ip = IpAdress.ip;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [otpReceived, setOtpReceived] = useState(false);
  const [counter, setCounter] = useState(0);
  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // State for signup form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErr("");
  };

  // Function to handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${ip}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        const token = data.accessToken;
        const decoded = jwtDecode(data.accessToken);
        if (data.accessToken) {
          login(data.accessToken);
        } else {
          console.error(data.message);
        }
      } else {
        setErr(data.error);
      }
    } catch (error) {
      setErr("An error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const requestBody = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: signupEmail.trim(),
    password: signupPassword,
  };

  const handleOtpSubmit = (enteredOtp) => {
    console.log("OTP entered:", enteredOtp);
    console.log("OTP ", otp);
    const details = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: signupEmail.trim(),
      password: signupPassword,
    };
    console.log(details);
    if (otp === enteredOtp) {
      fetch(`${ip}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: signupEmail.trim(),
          password: signupPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response as needed
          alert("Registration Successful");
          console.log(data);
          setIsLogin(true);
          setErr("");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Registration Failed");
          setErr(error);
        });
    } else {
      const num = counter + 1;
      setCounter(num);
      if (counter === 3) {
        alert("OTP limit exceeded, Try again later");
        navigate("Login");
      } else {
        alert("Otp Incorrect try again");
        setOtp(["", "", "", "", "", ""]);
      }
    }
    setOtpReceived(false); // Close the modal after OTP is submitted
  };

  const handleCloseModal = () => {
    setOtpReceived(false); // Close modal
  };

  const sendOTP = async (email) => {
    const url = `${ip}/send-otp`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const otp = data.otp;
      setOtpReceived(true);
      alert("An OTP has been sent to your email");
      setOtp(data.otp);
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      setErr(
        "Sorry we can't create your account right now \n Do give us a moment then try again :)"
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log("Signup first name:", firstName);
    console.log("Signup last name:", lastName);
    console.log("Signup email:", signupEmail);
    console.log("Signup password:", signupPassword);

    // You can call the sendOTP function here with signupEmail
    sendOTP(signupEmail);
  };

  return (
    <div className="container3">
      {loading && (
        <div className="loading-overlay">
          <div className="backg">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <OtpModal
        otpReceived={otpReceived}
        handleClose={handleCloseModal}
        handleSubmitOtp={handleOtpSubmit}
        resend={sendOTP}
      />
      <div className="form-container">
        {isLogin ? (
          <form className="form" onSubmit={handleLoginSubmit}>
            <h2>Login to your Stubly account :)</h2>
            <h4
              style={{
                color: "red",
              }}
            >
              {err}
            </h4>
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  id="login-password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p className="toggle">
              Don't have an account? <span onClick={toggleForm}>Sign Up</span>
            </p>
            <p
              className="continue-without-signin"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", color: "#007BFF" }}
            >
              Continue without signing in
            </p>
          </form>
        ) : (
          <form className="form" onSubmit={handleSignupSubmit}>
            <h2>Create your stubly account :)</h2>
            <h4
              style={{
                color: "red",
              }}
            >
              {err}
            </h4>
            <div className="input-group">
              <label htmlFor="signup-firstname">First Name</label>
              <input
                type="text"
                id="signup-firstname"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="signup-lastname">Last Name</label>
              <input
                type="text"
                id="signup-lastname"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="signup-password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  id="signup-password"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                >
                  {showSignupPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button type="submit" className="btn">
              Sign Up
            </button>
            <p className="toggle">
              Already have an account? <span onClick={toggleForm}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignupPage;
