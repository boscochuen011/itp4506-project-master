import { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';
import "./Profile.css";

export function Profile() {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [message, setMessage] = useState<string>('');

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleUserForm = (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("passwords do not match");
            return;
        }
        alert("User information saved");
    };

    const handlePaymentForm = (event: React.FormEvent) => {
        event.preventDefault();

        alert("Payment information saved");
    };


  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Information</h2>
        <form onSubmit={handleUserForm}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value="Bosco" required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value="098-765-4321" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value="michael.smith@example.com" required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value="123 Main St, City, State, ZI" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type={isPasswordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="profile-eye-icon" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <AiFillEye/> : <AiFillEyeInvisible />}
            </span>
            </div>
            <div className="form-group">
            <label>Confirm Password</label>
            <input type={isConfirmPasswordVisible ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <span className="profile-eye-icon" onClick={toggleConfirmPasswordVisibility}>
                {isConfirmPasswordVisible ? <AiFillEye/> : <AiFillEyeInvisible />}
            </span>
          </div>
          {message && 
            <div className="error_display">
                <i className="error_icon"><BiSolidError /></i>
                <span className="massage">{message}</span>
            </div>
          }
          <button className="profile-save" type="submit">Save</button>
        </form>
      </div>

      <div className="profile-card">
        <h2>Payment Information</h2>
        <form onSubmit={handlePaymentForm}>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" required placeholder="0000 0000 0000 0000"/>
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="month" required placeholder="MM/YY"/>
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="password" required pattern="\d{3}" placeholder="000"/>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}