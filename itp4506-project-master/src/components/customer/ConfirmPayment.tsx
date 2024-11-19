import React, { useState } from "react";
import "./ConfirmPayment.css";
import { useNavigate } from "react-router-dom";
import sushiImage from "../../images/Value_Set_for_2.jpg";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function ConfirmPayment() {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState("Bosco Chuen");
  const [cardNumber, setCardNumber] = useState("3500 1234 5678 0000");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { clearCart } = useShoppingCart();

  const handlePaymentConfirmation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
  
    navigate("/payment-successful");  
  };
  

  const products = [
    {
      image: sushiImage,
      title: "TamJai SamGor",
      description: "Value Set for 2",
      price: "$40.40",
    },

  ];
  const subtotal = products
    .reduce((acc, product) => {
      return acc + 15 + parseFloat(product.price.replace("$", ""));
    }, 0)
    .toFixed(2);


  return (
    <div className="CM-container">
      <div className="CM-shopping-cart">
        <h2>Shopping Cart</h2>
        {products.map((product, index) => (
          <div className="CM-product" key={index}>
            <img src={product.image} alt="product-image" />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="product-controls">
                <span>Total: {product.price}</span>
                <div className="quantity-controls"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="delivery">Delivery: $15</div>
        <div className="subtotal">Total: ${subtotal}</div>
      </div>

      <div className="CM-payment">
        <h2>Payment</h2>
        <form onSubmit={handlePaymentConfirmation}>
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" value="cod" /> Cash On Delivery
              (COD)
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="online"
                defaultChecked
              />{" "}
              Online Payment
            </label>
          </div>
      
  <div className="card-details">
    <label htmlFor="cardholder-name">Name on Card</label>
    <input 
      type="text" 
      id="cardholder-name" 
      placeholder="John Doe" 
      value={cardName}
      onChange={(e) => setCardName(e.target.value)}
      required 
    />

    <label htmlFor="card-number">Credit/Debit Card Number</label>
    <input 
      type="text" 
      id="card-number" 
      placeholder="1234 5678 9012 3456" 
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)}
      required 
    />

    <label htmlFor="exp-date">Card Expiry Date</label>
    <input 
      type="text" 
      id="exp-date" 
      placeholder="MM/YY" 
      value={expiryDate}
      onChange={(e) => setExpiryDate(e.target.value)}
      required 
    />

    <label htmlFor="cvv">Security Code (CVV)</label>
    <input 
      type="text" 
      id="cvv" 
      placeholder="CVV"
      value={cvv}
      onChange={(e) => setCvv(e.target.value)}
      required 
    />
  </div>


          <div className="CP-button-container">
            <button
              className="CM-back-button"
              onClick={() => navigate("/confirm-address")}
            >
              Back
            </button> 
            <button type="submit" className="CM-button" onClick={() => clearCart()}>
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
