import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Signup() {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setconfirm_password] = useState(""); 
    const [referralCode, setReferralCode] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!acceptTerms) {
        alert("Please accept the terms and conditions.");
        return;
      }
      if (password !== confirm_password) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      axios
        .post("http://localhost:3000/user/register", {
          username,
          email,
          password,
          confirm_password,
          referralCode,
        })
        .then((res) => {
          console.log(res.data);
          const responseData = res.data;
          navigate(`/verify/${responseData.user}`) ; 
        })
        .catch((err) => console.log(err));
    };
    
    
    
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="username"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="mb-3">
                        <label htmlFor="confirm_password">
                            <strong>Confirm Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            className="form-control rounded-0"
                            onChange={(e) => setconfirm_password(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="referralCode">
                            <strong>Referral Code</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Referral Code"
                            autoComplete="off"
                            name="referralCode"
                            className="form-control rounded-0"
                            onChange={(e) => setReferralCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="acceptTerms"
                            onChange={() => setAcceptTerms(!acceptTerms)}
                            checked={acceptTerms}
                        />
                        <label className="form-check-label" htmlFor="acceptTerms">
                            <strong>I agree to Accept Terms</strong>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
