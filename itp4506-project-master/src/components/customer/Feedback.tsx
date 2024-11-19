import React, { useState } from "react";
import "./Feedback.css";

import Delivery from "../../images/Delivery.png";

export function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarHover = (starNumber: number) => {
    setHoverRating(starNumber);
  };

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
  };

  return (
    <div className="feedback-page">
      <div className="welcome-section">
        <img
          src={Delivery}
          alt="Delivery Completed"
          className="welcome-image"
        />
        <div className="FB-text">  <h2>Your order has been delivered!</h2>
        <p>Thank you for your patronage! We hope you enjoy your meal.</p></div>
       
      </div>
      <hr className="separator-line" />
      <h1 className="f-title ">Customer Feedback</h1>

      <div className="rating-section">
        <p className="rating-title">Please rate our service:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <span
              key={starNumber}
              className={`star ${
                starNumber <= (hoverRating || rating) ? "active" : ""
              }`}
              onMouseEnter={() => handleStarHover(starNumber)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleStarClick(starNumber)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>

      <div className="feedback-section">
        <p className="feedback-title">Please leave your feedback:</p>
        <textarea className="feedback-input"></textarea>
        <div className="sb">
                  <button className="submit-button">Submit</button>
        </div>

      </div>
    </div>
  );
}
