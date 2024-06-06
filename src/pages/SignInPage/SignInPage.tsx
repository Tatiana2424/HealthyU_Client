import React, { useState } from 'react';
import './SignInPage.scss';
import Banner from '../../components/common/Banner/Banner';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import { useAuth } from '../../context/AuthProvider';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: number;
}

const SignInPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // Додали стан для помилок
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setError(null); // Очищуємо помилки при кожному вводі
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Перевірка валідації електронної пошти
    if (!validateEmail(loginData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await apiService.post<LoginResponse>('https://localhost:7271/api/auth/login', loginData);
      console.log('Login successful', response.token);
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('userId', response.userId.toString());
      login(response.token);
      navigate('/');
    } catch (error: any) {
      setError('Login failed. Please check your email and password'); // Повідомлення про помилку, якщо логін не вдався
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
      <div className="sign-in-component">
        <div className="sign-in-container">
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="form-actions">
              <button type="submit">Sign In</button>
            </div>
          </form>
          <div className="signup-link">
            Don't have an account? <Link to="/sing-up">Sign Up Today</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
