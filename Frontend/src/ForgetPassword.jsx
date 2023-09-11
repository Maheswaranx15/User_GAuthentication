import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/forgot-password', {
        email: email,
      });

      if (response.status === 200) {
        setMessage('Password reset email sent successfully!');
       
        const responseData = response.data;
        console.log(`bohoibh`,responseData);
         navigate("/login");
      } else {
        setMessage('Failed to send password reset email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while sending the password reset email.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Forgot Password</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
