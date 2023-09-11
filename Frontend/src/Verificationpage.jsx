import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function VerificationPage() {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();
  const id = useParams();

  const handleSubmit = (e) => {
    console.log(`iiiiiiiiiii`,id[0].id);
    e.preventDefault();
    axios
      .post(`http://localhost:3000/user/verify/${id.id}`,{otp})
      .then((res) => {
        console.log(res.data);
        if(res.data.statusCode === 200){
          navigate("/");
        }
      else {
          alert("Verification code is incorrect. Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="verificationCode">
              <strong>Verification Code</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Verification Code"
              autoComplete="off"
              name="verificationCode"
              className="form-control rounded-0"
              onChange={(e) => setotp(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Verify
          </button>
        </form>
        <p>Already Have an Account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default VerificationPage;
