import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TwoFactorAuthPage = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();
  const { data_id, data_mail } = useParams();

  const handleVerification = async (data) => {
    const { code } = data; // Get the verification code from the form data

    try {
      const res = await axios.post(
        "http://localhost:3000/user/api/auth/otp/validate",
        {
          user_id: data_id,
          token: code, // Use the verification code entered by the user
        }
      );

      if (res.data.statusCode === 200) {
        console.log("Login successfully");
        navigate(`/UserProfilePage/${data_id}/${data_mail}`);
      } else {
        setError("Please check your credentials.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while validating the code.");
    }
  };

  const handleResendCode = async () => {
    try {
      // Send a request to resend the verification code
      await axios.post("/api/resend-2fa-code");

      alert("Verification code has been resent.");
    } catch (error) {
      console.error(error);
      // Handle error
      alert("Failed to resend verification code");
    }
  };

  return (
    <div>
      {error ? (
        <div>
          <h2>Two-Factor Authentication Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Two-Factor Authentication</h2>
          <form onSubmit={handleSubmit(handleVerification)}>
            <input
              type="text"
              {...register("code", { required: true })}
              placeholder="Enter Verification Code"
            />
            <button type="submit">Verify</button>
          </form>
          <button onClick={handleResendCode}>Resend Code</button>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuthPage;
