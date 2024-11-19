import React, { useState } from "react";
import "./ConfirmAddress.css";
import locationImage from "../../images/Location.png";
import { useNavigate } from "react-router-dom";

function DeliveryTimeSelector() {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const getUpcomingDates = (days: number) => {
    const result = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      result.push({
        value: `${yyyy}-${mm}-${dd}`,
        label: date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })
      });
    }
    return result;
  };

  const getTimeOptions = () => {
    const result = [];
    for (let i = 0; i < 24; i += 0.5) {
      const hour = Math.floor(i);
      const minute = (i - hour) * 60;
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      result.push({
        value: timeStr,
        label: timeStr + (hour < 12 ? ' AM' : ' PM')
      });
    }
    return result;
  };

  return (
    <div className="delivery-container">
      <div className="date-time">
        <h2 className="CA-text">Delivery time</h2>
        <DropDown 
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          options={getUpcomingDates(7)}
        />
        <DropDown 
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          options={getTimeOptions()}
        />
      </div>
    </div>
  );
}

interface DropDownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string, label: string }[];
}

function DropDown({value, onChange, options}: DropDownProps) {
  return (
    <label className="delivery-label">
      <select
        className="delivery-select"
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}


export function ConfirmAddress() {
  const navigate = useNavigate();
  const [slided, setSlided] = useState(false);

  const handleButtonClick = () => {
    setSlided(true);
    setTimeout(() => {
      navigate("/confirm-payment");
      window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <div className={`Address ${slided ? "slided" : ""}`}>
      <div className="ConfirmAddress">
        <h1 className="CA-bold-text">Edit your delivery address</h1>
        <img src={locationImage} alt="Location" className="stretch-image" />
        
        <AddressInput />
        <DeliveryTimeSelector />
        <PersonalDetails />

        <div className="CA-button-container">
          <button className="CA-confirm-button" onClick={handleButtonClick}>
            Confirm Address
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressInput() {
  return (
    <div className="address-container">
      <div className="search">
        <input type="text" placeholder="Delivery address" />
        <button className="loc-edit-button">Edit</button>
      </div>
    </div>
  );
}
function PersonalDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Bosco Chuen");
  const [email, setEmail] = useState("bosco.chuen@gmail.com");
  const [phone, setPhone] = useState("+852 53300440");

  return (
    <div className="delivery-container">
      <div className="head">
        <h2 className="CA-text">Personal details</h2>
        <div>
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {isEditing ? (
      <div className="input-container">
<input className="detail-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input className="detail-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="detail-input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        </div>
      ) : (
        <div>
          <p className="detail-text">{name}</p>
          <p className="detail-text">{email}</p>
          <p className="detail-text">{phone}</p>
        </div>
      )}
    </div>
  );
}

export default PersonalDetails;





