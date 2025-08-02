import React, { useState } from "react";
import "./SignUpPage.scss";
import Banner from "../../components/common/Banner/Banner";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../api/apiService";
import { useAuth } from "../../context/AuthProvider";
interface UserData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface RegisterResponse {
  token: string;
  userId: number;
}

const SignUpPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError("Invalid email format");
      return false;
    }

    if (
      !userData.userName ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (userData.password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await apiService.post<RegisterResponse>(
        "/auth/register",
        userData
      );
      sessionStorage.setItem("authToken", response.token);
      sessionStorage.setItem("userId", response.userId.toString());
      login(response.token);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data);
      console.error("Registration failed", error.response);
    }
  };

  return (
    <>
      <Banner
        bannerImageUrl="https://static.wixstatic.com/media/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg/v1/fill/w_980,h_769,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg"
        alignment="center"
        isDarken={true}
        bannerHeight={200}
      />
      <div className="sign-up-component">
        <div className="sign-up-container">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignUp}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password*</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password*</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label>User Name*</label>
              <input
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the following <a href="#">Terms & Conditions</a> /{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Create Account</button>
            </div>
          </form>
          <div className="signin-link">
            Already have an account? <Link to="/sing-in">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
