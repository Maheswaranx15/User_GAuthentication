import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate, useParams } from "react-router-dom";


function MasterTraderForm() {
  const data_id = useParams();
  const navigate = useNavigate();
  console.log(`user`, data_id);
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [nickname, setNickname] = useState(''); 
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/user/masterTrader', {
        user_id: data_id.data_id,
        nickname,
        avatar,
        email,
        intro: introduction
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setFormSubmitted(true);
          console.log('Form data submitted successfully');
        } else {
          setError('Please check your credentials.');
        }
      })
      .catch((err) => {
        console.error('An error occurred:', err);
        setError('An error occurred while submitting.');
      });

    console.log('Form Data:', { avatar, email, introduction, nickname });
  };

const handleprofile = (e) => {
    navigate(`/login`)
    setAvatar(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Become a Master Trader</h2>
        {formSubmitted ? (
          <div>
            <p>Your form has been submitted successfully!</p>
            <p>Thank you for your submission.</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nickname">
              <strong>Choose a Nickname</strong>
            </label>
            <input
              type="text"
              placeholder="Your nickname"
              name="nickname"
              className="form-control rounded-0"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatar">
              <strong>Select Your Avatar</strong>
            </label>
           
            <div>
              <label>
                <input
                  type="radio"
                  value="avatar1"
                  checked={avatar === 'avatar1'}
                  onChange={handleAvatarChange}
                />
                Avatar 1
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="avatar2"
                  checked={avatar === 'avatar2'}
                  onChange={handleAvatarChange}
                />
                Avatar 2
              </label>
              
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Please Enter Your Email Address</strong>
            </label>
            <input
              type="email"
              placeholder="Your email address"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="introduction">
              <strong>Self Introduction</strong>
            </label>
            <textarea
              placeholder="Tell us about yourself"
              name="introduction"
              className="form-control rounded-0"
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Submit
          </button>
        </form>
        )}
        {error && <p>{error}</p>}
        <div>
        <button onClick={handleprofile}>back</button> 

        </div>

      </div>
    </div>
  );
}

export default MasterTraderForm;
