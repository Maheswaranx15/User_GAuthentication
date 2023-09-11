import React, { useState } from 'react';

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.ok) {
        setMessage('Password updated successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Password update failed.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>

      <label>
        Old Password:
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </label>

      <br />

      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>

      <br />

      <button onClick={handleChangePassword}>Change Password</button>

      <p>{message}</p>
    </div>
  );
}

export default UpdatePassword;
