import React, { useState } from 'react';

function PaymentForm({ selectedTier, onPaymentSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentSubmit = () => {
    const paymentData = {
      tier: selectedTier.name,
      cardNumber,
      expiry,
      cvv,
    };

    onPaymentSubmit(paymentData);
  };

  return (
    <div>
      <h2>Enter Payment Information</h2>
      <div>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Expiry Date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>
      <button onClick={handlePaymentSubmit}>Upgrade</button>
    </div>
  );
}

export default PaymentForm;
