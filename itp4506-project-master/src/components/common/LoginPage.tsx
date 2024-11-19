import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';
import usersData from '../../json/users.json';
import Logo from "../../images/Logo.png";
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from "../context/ShoppingCartContext";

export function LoginPage() {
  const [userType, setUserType] = useState<string>("customer");
  const [isRegistering, setRegistering] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [user, setUser] = useState(usersData);

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleUserType = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const target = event.target as HTMLButtonElement;
    setUserType(target.id);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (isRegistering) {
      if (password !== confirmPassword) {
        setMessageType('error');
        setMessage("passwords do not match");
        return;
      }
      const terms = (document.querySelector('input[name="terms"]') as HTMLInputElement).checked;
      if (!terms) {
        setMessageType('error');
        setMessage("please accept terms and conditions");
        return;
      }
      alert("registration successful");
    } else {
      let usernameInput = (document.querySelector('input[name="username"]') as HTMLInputElement).value;
      let passwordInput = (document.querySelector('input[name="password"]') as HTMLInputElement).value;

      const userExist = user.users.find((userData) => {
        return userData.username === usernameInput && userData.password === passwordInput;
      });
      
      if (!userExist) {
        setMessageType('error');
        setMessage("Invalid username or password");
        return;
      }
  
      if (userExist.type !== userType) {
        setMessageType('error');
        setMessage("Incorrect user type");
        return;
      }

      /* Save user login data */
      localStorage.setItem('userType', userType);
      localStorage.setItem('username', usernameInput);
  
      setMessageType('success');
      setMessage("login successful, 3 seconds to redirect");
      setTimeout(() => {
        switch(userType) {
          case 'customer':
            navigate('/browse-menus');
            break;
          case 'restaurant':
            navigate('/manage-order');
            break;
          case 'delivery':
            navigate('/delivery-Instructions');
            break;
          default:
            navigate('/error-page');
        }
      }, 3000);
    }
  };

  const toggleRegistering = () => {
    setRegistering(!isRegistering);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="LoginPage">
      <div className="restaurant-bg"></div>
      <img src={Logo} className="logo" alt="Logo" />
      <div className="login-form">
        <form onSubmit={handleForm}>
          <div className="login-display">
            <div className="login-title">
              Yummy <span className="highlight">Restaurant</span> Group
            </div>
            <div>
              <div className="subtitle">{isRegistering ? "Create for an account" : "Please log in for an account"}</div>
              <label htmlFor="userType" className="label-blue">
                User type:
              </label>
              <div className="user-type">
                <button id="customer" onClick={handleUserType} className={userType === 'customer' ? 'selected' : ''}>Customer</button>
                <button id="restaurant" onClick={handleUserType} className={userType === 'restaurant' ? 'selected' : ''}>Restaurant</button>
                <button id="delivery" onClick={handleUserType} className={userType === 'delivery' ? 'selected' : ''}>Delivery Personnel</button>
              </div>
              {isRegistering ? (
                <>
                  {userType === 'customer' ? (
                    <>
                      <label htmlFor="email" className="label-blue">Email:</label>
                      <input type="email" id="email" name="email" className="rounded-input" required />
                      <label htmlFor="name" className="label-blue">Name:</label>
                      <input type="text" id="name" name="name" className="rounded-input" required/>
                    </>
                  ) : (
                    <>
                      <label htmlFor="restaurantName" className="label-blue">Restaurant Name:</label>
                      <input type="text" id="restaurantName" name="restaurantName" className="rounded-input" required/>
                      <label htmlFor="address" className="label-blue">Address:</label>
                      <input type="text" id="address" name="address" className="rounded-input" required/>
                      {userType === 'delivery' ? (
                        <>
                          <label htmlFor="accessNumber" className="label-blue">Restaurant Access Rights Number:</label>
                          <input type="number" id="accessNumber" name="accessNumber" className="rounded-input" required/>
                        </>
                      ) : null}
                    </>
                  )}
                  <label htmlFor="phoneNumber" className="label-blue">Phone Number:</label>
                  <input type="number" id="phoneNumber" name="phoneNumber" className="rounded-input" required/>
                  <label htmlFor="password" className="label-blue">Password:</label>
                  <div className="password-field">
                    <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" className="rounded-input" required 
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isPasswordVisible ? (
                      <AiFillEye className="eye-icon" onClick={togglePasswordVisibility} />
                    ) : (
                      <AiFillEyeInvisible className="eye-icon" onClick={togglePasswordVisibility} />
                    )}
                  </div>
                  <label htmlFor="confirmPassword" className="label-blue">Confirm Password:</label>
                  <div className="password-field">
                    <input type={isConfirmPasswordVisible ? "text" : "password"} id="password" name="password" className="rounded-input" required 
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      {isConfirmPasswordVisible ? (
                        <AiFillEye className="eye-icon" onClick={toggleConfirmPasswordVisibility} />
                      ) : (
                        <AiFillEyeInvisible className="eye-icon" onClick={toggleConfirmPasswordVisibility} />
                      )}
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="username" className="label-blue">
                    Username:
                  </label>
                    <input type="text" id="username" name="username" className="rounded-input" required/>
                    <label htmlFor="password" className="label-blue">Password:</label>
                    <div className="password-field">
                      <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" className="rounded-input" required 
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                      {isPasswordVisible ? (
                        <AiFillEye className="eye-icon" onClick={togglePasswordVisibility} />
                      ) : (
                        <AiFillEyeInvisible className="eye-icon" onClick={togglePasswordVisibility} />
                      )}
                    </div>
                </>
              )}
              <div className="remember-display">
                <input type="checkbox" name={isRegistering ? "terms" : "remember"} className="remember" />
                <span className="remember">
                    {isRegistering ? 
                        <span onClick={toggleModal} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                            Accepting the terms and conditions</span> 
                        : <span>Remember me</span>
                    }
                </span>
                <span className="create-account" onClick={() => {
                    setPassword('');
                    setConfirmPassword('');
                    toggleRegistering(); 
                    setMessageType(null);
                }}>
                    {isRegistering ? "Already have an account?" : "Don't have an account?"}
                </span>
                <Modal isOpen={showModal} toggle={toggleModal}>
                  <ModalHeader toggle={toggleModal}><strong>Terms and Conditions</strong></ModalHeader>
                  <ModalBody>
                    <p><strong>Terms and Conditions for Yummy Restaurant Group Limited</strong></p>
                    <p><strong>1. Acceptance of Terms</strong><br />
                      By using the services provided by Yummy Restaurant Group Limited (from now on referred to as "Yummy"), you agree to these Terms and Conditions ("Terms") and Yummy's Privacy Policy. If you disagree with any part of these Terms, you should discontinue using our services immediately.</p>
                    <p><strong>2. Registration and Account Security</strong><br />
                      When registering for an account with Yummy, you agree to provide accurate, current, and complete information. It is your responsibility to maintain the security of your account credentials. You are responsible for all activities that occur under your account.</p>
                    <p><strong>3. Use of Services</strong><br />
                      Yummy's services are intended for personal, non-commercial use. Misuse of the services, including but not limited to fraudulent orders, is strictly prohibited and may result in account suspension or termination.</p>
                    <p><strong>4. Orders and Deliveries</strong><br />
                      When you place an order through Yummy's platform, it is an offer to purchase the products at the price displayed at the time of order, including delivery fees. Yummy reserves the right to reject any orders at its sole discretion. Delivery times provided are estimates, and Yummy is not liable for any delays.</p>
                    <p><strong>5. Payment</strong><br />
                      All orders must be paid via the methods available on our platform. All transactions are subject to the approval of the payment provider.</p>
                    <p><strong>6. Liability</strong><br />
                      Yummy is not liable for any injury, illness, or harm from consuming meals ordered through our platform. We are a platform connecting customers, restaurants, and delivery personnel, and we do not control the actions of these independent parties.</p>
                    <p><strong>7. Changes to the Terms</strong><br />
                      Yummy reserves the right to revise these Terms at any time. Changes will be effective upon posting the revised Terms on our platform. Your continued use of the services after such posting will constitute acceptance of the revised Terms.</p>
                    <p><strong>8. Governing Law</strong><br />
                      The laws of Hong Kong govern these Terms. Any disputes arising out of these Terms will be subject to the exclusive jurisdiction of the courts in Hong Kong.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                  </ModalFooter>
                </Modal>
              </div>
              {messageType && 
                <div className={messageType === 'error' ? 'error_display' : 'success_display'}>
                    {messageType === 'error' &&
                        <i className="error_icon"><BiSolidError /></i>
                    }
                    {messageType === 'success' &&
                        <i className="success_icon"><AiFillCheckCircle /></i>
                      
                    }
                    <span className="massage">{message}</span>
                </div>
              }
              <div>
                <input type="submit" className="login" value={isRegistering ? "Register" : "Login"} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}