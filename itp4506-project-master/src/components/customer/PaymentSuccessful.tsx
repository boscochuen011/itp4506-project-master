import React from "react";
import './PaymentSuccessful.css';
import { useNavigate } from "react-router-dom";
import ginRestImage from "../../images/Value_Set_for_2.jpg";
import confirm from "../../images/confirm.png";

export function PaymentSuccessful() {
  const navigate = useNavigate();

  const handleTrackOrder = () => {
    navigate("/online-tracking");
  };

  return (
    <div className="PaymentSuccessful">
      <div className="order-details-container">
      <div className="SF-header">
          <h2 className="bold-text">Payment Successful</h2>
          <span className="orderId">ID: NM197722</span>
        </div>
        <div className="SF-square">
          <div className="SF-content-container">
            <img
              src={ginRestImage}
              alt="Restaurant"
              className="SF-restaurant-img"
            />
            <div className="text-container">
              <h3 className="restaurant-name">TamJai SamGor</h3>
              <ul className="food-list">
                <li>Value Set for 2</li>
            
              </ul>
              <hr className="divider" />
              <p className="delivery-fee">Delivery fee: $15</p>
              <p className="total-cost">Total cost: $55.40</p>
            </div>
          </div>
        </div>
        <div className="SF-confirm-container">
          <img
            src={confirm}
            alt="Confirm"
            className="confirm-img"
          />
          <button className="Track-button" onClick={handleTrackOrder}>Track Order</button>
        </div>
      </div>
    </div>
  );
}