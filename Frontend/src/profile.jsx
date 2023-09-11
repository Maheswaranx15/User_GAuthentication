import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';

function UserProfilePage() {
  const [password, setPassword] = useState('');
  const [isGauthEnabled, setIsGauthEnabled] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [verificationResult, setVerificationResult] = useState(null); 
  const { data_id, data_mail } = useParams();
  const navigate = useNavigate();

  console.log(`iiiiiiiiiii`, data_mail, data_id);

  useEffect(() => {
    if (isGauthEnabled) {
      axios
        .post('http://localhost:3000/user/api/auth/otp/generate', {
          user_id: data_id,
          token: data_mail,
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            console.log(res.data.base32_secret);
            setSecretKey(res.data.base32_secret);
            console.log('OTP generated successfully');
          } else {
            setError('Please check your credentials.');
          }
        })
        .catch((err) => {
          console.error('An error occurred:', err);
          setError('An error occurred while generating OTP.');
        });
    }
  }, [isGauthEnabled, data_id, data_mail]);

  const handleToggleGauth = () => {
    setIsGauthEnabled(!isGauthEnabled);
    setVerificationResult(null); 
  };

  const handleDisableGauth = () => {
    axios
      .post('http://localhost:3000/user/api/auth/otp/disable', {
        user_id: data_id,
        token: token, 
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log('2FA Disabled successfully');
          setIsGauthEnabled(false);
          setSecretKey('');
          setVerificationResult(null); 
        } else {
          setError('Please check your credentials.');
        }
      })
      .catch((err) => {
        console.error('An error occurred:', err);
        setError('An error occurred while disabling Gauth.');
      });
  };

  const handlePasswordUpdate = () => {
  };

  const handleVerify = () => {

    axios
      .post('http://localhost:3000/user/api/auth/otp/verify', {
        user_id: data_id,
        token: token, 
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setVerificationResult('Authentication successful');
        } else {
          setVerificationResult('Authentication failed. Please check your OTP.');
        }
      })
      .catch((err) => {
        console.error('An error occurred:', err);
        setVerificationResult('An error occurred while verifying OTP.');
      });
  };

  const handleLogout = () => {
    navigate(`/login`); 
  };

  const handleMasterTrade = () => {
    navigate(`/MasterTraderForm/${data_id}`); 
  };

  const  handletier = () => {
    navigate(`/TierUpgradePage/${data_id}`); 
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={handlePasswordUpdate}>Update Password</button>
      <br />
      <br />
      <button onClick={handleMasterTrade}>Become a MasterTrader</button>
      <br />
      <br />
      <button onClick={handleToggleGauth}>
        {isGauthEnabled ? 'Disable Gauth' : 'Enable Gauth'}
      </button>
      <br />
      <br />
      {secretKey && <p>Secret Key: {secretKey}</p>}
      <br />
      <br />  
      {isGauthEnabled && secretKey && (
        <QRCode
          value={`otpauth://totp/WexTrade:${data_mail}?secret=${secretKey}`}
          size={128}
        />
      )}

      <br />
      <br />

    
      {isGauthEnabled && (
        <div>
          <input
            type="text"
            placeholder="Enter Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={handleVerify}>Verify</button>
        </div>
      )}



<button onClick={handleDisableGauth}>Disable Gauth</button>

      {verificationResult && <p>{verificationResult}</p>}
      {error && <p>{error}</p>}


      <button onClick={handletier}>UpgradeTier</button> 


      <button onClick={handleLogout}>Logout</button> 
    </div>
    
  );
}

export default UserProfilePage;
