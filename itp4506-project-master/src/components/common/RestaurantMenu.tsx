import { Col, Row } from "react-bootstrap";
import FoodItems from "../../json/tamJaiFood.json";
import "./RestaurantMenu.css";
import { FoodItem } from "./FoodItem";

export function RestaurantMenu() {
  return (
    <div className="RestaurantMenu">
      <div className="menu-item-container">
        <div className="menu-item-display">
          <div>
            <h2>TamJai SamGor Mixian</h2>
            <h6>🚲HK$ 15 Delivery, 👜HK$ 80 Minimum</h6>
          </div>
          <img
            src={"/tamJai-images/logo.jpg"}
            alt="Logo"
            style={{ height: "100px" }}
          />
        </div>
        <div className="list-container">
          <div className="search-container">
            <span>🔎</span>
            <input type="text" placeholder="Search in menu" name="search" />
          </div>
          <div className="list-bar">
            <ul>
              <li>Popular</li>
              <li>Promotional Item</li>
              <li>Sets</li>
              <li>Side Dishes</li>
              <li>Drinks</li>
            </ul>
          </div>
        </div>

        <h4>Popular</h4>
        <Row md={2} xs={1} lg={3} className="g-3">
          {FoodItems.map((foodItem) => (
            <Col key={foodItem.id}>{<FoodItem {...foodItem} />}</Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
