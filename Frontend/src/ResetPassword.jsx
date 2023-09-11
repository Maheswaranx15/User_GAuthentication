import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function ResetPassword() {
  const id = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const resetPassword = async () => {
    console.log(`iiiiiiiii`,id.id);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/reset-password`, {
        user_id: id,
        password: password,
      });

      if (response.status === 200) {
        setMessage('Password reset successful. You can now log in with your new password.');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Reset Password</h2>
        {message && <div className="alert alert-info">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="password">
            <strong>New Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            autoComplete="off"
            name="password"
            className="form-control rounded-0"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword">
            <strong>Confirm Password</strong>
          </label>
          <input
            type="password"
            placeholder="Confirm your new password"
            autoComplete="off"
            name="confirmPassword"
            className="form-control rounded-0"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={resetPassword} // Trigger the resetPassword function on button click
          className="btn btn-success w-100 rounded-0"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
