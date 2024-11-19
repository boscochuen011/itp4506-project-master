import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import FoodItems from "../../json/tamJaiFood.json";
import { FoodItem } from "../common/FoodItem";
import { NewFoodItem } from "../common/NewFoodItem";

type FoodItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
};


export function ManageMenus() {
    const [foodItems, setFoodItems] = useState(() => {
      const savedItems = localStorage.getItem('foodItems');
      return savedItems ? JSON.parse(savedItems) : FoodItems;
    });

    // 保存菜单项到 localStorage
    useEffect(() => {
      localStorage.setItem('foodItems', JSON.stringify(foodItems));
    }, [foodItems]);

    // 添加新菜单项
    const addFoodItem = (name: string, description: string, price: number, imgUrl: string) => {
      const newFoodItem: FoodItemType = { id: Date.now(), name, description, price, imgUrl };
      setFoodItems([...foodItems, newFoodItem]);
    };  

    const deleteFoodItem = (id: number) => {
      setFoodItems(foodItems.filter((foodItem: { id: number; }) => foodItem.id !== id));
    };

    const handleSaveItem = (id: number, newName: string, newDescription: string, newPrice: number, newImgUrl: string) => {
      setFoodItems((currentItems: any[]) => currentItems.map(item => {
          return item.id === id ? { ...item, name: newName, description: newDescription, price: newPrice, imgUrl: newImgUrl } : item;
      }));
  };
  

    return (
      <div className="ManageMenus">
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

          <NewFoodItem onAdd={addFoodItem} /> 
          <Row md={2} xs={1} lg={3} className="g-3">
            {foodItems.map((foodItem: FoodItemType) => (
              <Col key={foodItem.id}>
                <FoodItem {...foodItem} onDelete={deleteFoodItem} onSave={handleSaveItem} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
  