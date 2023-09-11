import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [usernameOrEmail, setusernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/user/login', { usernameOrEmail, password })
      .then((res) => {
        const responseData = res.data.list;
        console.log('login:', responseData._id);
        if (res.data.statusCode === 200) {
          if (res.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            let data_id = responseData._id;
            let data_mail = responseData.email;
            if (responseData.otp_enabled) {
              navigate(`/Twofactor/${data_id}/${data_mail}`);
            } else {
              navigate(`/UserProfilePage/${data_id}/${data_mail}`);
            }
          }
        } else {
          setError('Login failed. Please check your credentials.');
        }
      })
      .catch((err) => {
        console.log(`error`, err);
        setError('An error occurred while logging in.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usernameOrEmail">
              <strong>Username/Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Username or Email"
              autoComplete="off"
              name="usernameOrEmail"
              className="form-control rounded-0"
              onChange={(e) => setusernameOrEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>

        <Link to="/forgot-password" className="btn btn-link text-decoration-none">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

export default Login;
