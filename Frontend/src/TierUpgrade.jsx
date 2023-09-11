import React, { useState } from 'react';
import TierOptions from './TierOptions';
import PaymentForm from './PaymentForm';
import axios from 'axios'; 
import { Link, useNavigate, useParams } from "react-router-dom";

const tiers = [
  { id: 1, name: 'Basic', price: 10 },
  { id: 2, name: 'Pro', price: 20 },
  { id: 3, name: 'Premium', price: 30 },
];

function TierUpgradePage() {
  const data_id = useParams();
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [paymentData, setPaymentData] = useState(null); 
  const navigate = useNavigate();
  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
  };

  const handlePaymentSubmit = () => {
    console.log(data_id);
    axios
      .post("http://localhost:3000/user/tier", {
        user_id: data_id.data_id,
        tier: selectedTier.id,
      })
      .then((res) => {
        console.log(res.data);
        setShowPopup(true); // Show the popup on successful response
      })
      .catch((err) => console.log(err));
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/login')
  };

  return (
    <div>
      <h1>Tier Upgrade Page</h1>
      {selectedTier ? (
        <PaymentForm selectedTier={selectedTier} onPaymentSubmit={handlePaymentSubmit} />
      ) : (
        <TierOptions tiers={tiers} onTierSelect={handleTierSelect} />
      )}


      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Tier Upgrade successfully! Thank you</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TierUpgradePage;
