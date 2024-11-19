import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Slider, { CustomArrowProps } from "react-slick"; // Import Slider type here
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FoodCarousel } from "../common/FoodCarousel";
import "./BrowseMenus.css";
import GoldLabel from "../../images/GoldLabel-rest.png";
import Zeppelin from "../../images/Zeppelin-rest.png";
import Gin from "../../images/Gin-rest.png";
import Chatpoint from "../../images/Chatpoint-rest.png";
import Tomato from "../../images/Tomato-rest.png";
import SamGor from "../../images/SamGor-rest.png";

import pizza from "../../images/pizza.png";
import cake from "../../images/cake.png";
import coffee from "../../images/coffee.png";
import sushi from "../../images/sushi.png";
import Chicken from "../../images/Chicken.png";
import Curry from "../../images/Curry.jpeg";
import Dessert from "../../images/Dessert.jpeg";
import Burgers from "../../images/Burgers.jpeg";
import Cakes from "../../images/Cakes.jpeg";
import Cantonese from "../../images/Cantonese.jpeg";

import { NavLink } from "react-router-dom";
export function BrowseMenus() {
  const sliderRef = useRef<Slider | null>(null);
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [time, setTime] = useState(180);

  let timer: number | NodeJS.Timer | undefined;
  useEffect(() => {
    if (time > 0) {
      timer = setInterval(() => setTime(time - 1), 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [time]);

  return (
    <div className="BrowseMenus">
      <FoodCarousel />
      <div className="search">
        <div>
          <span>🔎</span>
          <input type="text" placeholder="What you want to eat?"></input>
        </div>
        <button className="search-btn">Search</button>
      </div>

      <div style={{ display: time <= 10 ? 'none' : '' }}>


      <div className="header">
        <h2>
          <strong>Get 25% off</strong>
        </h2>
      </div>

      <div className="discount-section">
          <div className="timer">
            <p>
              Time is running out! {Math.floor(time / 60)}:
              {("0" + (time % 60)).slice(-2)}
            </p>
          </div>

        <div className="Restaurant-box">
          <div className="box-item">
            <img className="restaurant-image" src={GoldLabel} alt="GoldLabel" />
            <div className="contect-box">
              <h3>Gold Label</h3>
              <p>4.4/5 (3000+)</p>
              <strong>$$$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 15 Delivery</p>
            </div>
          </div>
        </div>

        <div className="Restaurant-box">
          <div className="box-item">
            <img className="restaurant-image" src={Zeppelin} alt="Zeppelin" />
            <div className="contect-box">
              <h3>Zeppelin Hot Dog</h3>
              <p>4.5/5 (3000+)</p>
              <strong>$$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 15 Delivery fee</p>
            </div>
          </div>
        </div>

         <div className="Restaurant-box">
          <NavLink to="/restaurant-menus" className="nav-link">
            <div className="box-item">
              <img className="restaurant-image" src={SamGor} alt="SamGor" />
              <div className="contect-box">
                <h3>TamJai SamGor</h3>
                <p>5/5 (3000+)</p>
                <strong>$$</strong>
                <p>Cha Chaan Teng</p>
                <p>🚲HK$ 15 Delivery fee</p>
              </div>
            </div>
          </NavLink>
        </div>


        
      </div>

      </div>


      <div className="header">
        <h2>
          <strong>Popular Restaurant</strong>
        </h2>
        <a href="#" className="more-tab">
          more
        </a>
      </div>

      <div className="restaurant-section">
        <div className="Restaurant-box">
          <div className="box-item">
            <img className="restaurant-image" src={GoldLabel} alt="GoldLabel" />
            <div className="contect-box">
              <h3>Gold Label</h3>
              <p>4.4/5 (3000+)</p>
              <strong>$$$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 5 Delivery fee</p>
            </div>
          </div>
        </div>
        <div className="Restaurant-box">
          <div className="box-item">
            <img className="restaurant-image" src={Zeppelin} alt="Zeppelin" />
            <div className="contect-box">
              <h3>Zeppelin Hot Dog</h3>
              <p>4.5/5 (3000+)</p>
              <strong>$$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 15 Delivery fee</p>
            </div>
          </div>
        </div>
        <div className="Restaurant-box">
          <div className="box-item">
            <img className="restaurant-image" src={Gin} alt="Gin" />
            <div className="contect-box">
              <h3>Gin Curry</h3>
              <p>3/5 (3000+)</p>
              <strong>$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 25 Delivery fee</p>
            </div>
          </div>
        </div>
        <div className="Restaurant-box">
          <div className="box-item">
            <img
              className="restaurant-image"
              src={Chatpoint}
              alt="Restaurant D"
            />
            <div className="contect-box">
              <h3>Chatpoint</h3>
              <p>3.2/5 (3000+)</p>
              <strong>$$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 10 Delivery fee</p>
            </div>
          </div>
        </div>
        <div className="Restaurant-box">
          <NavLink to="/restaurant-menus" className="nav-link">
            <div className="box-item">
              <img className="restaurant-image" src={SamGor} alt="SamGor" />
              <div className="contect-box">
                <h3>TamJai SamGor</h3>
                <p>5/5 (3000+)</p>
                <strong>$$</strong>
                <p>Cha Chaan Teng</p>
                <p>🚲HK$ 10 Delivery fee</p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="Restaurant-box">
          <div className="box-item">
            <img className="restaurant-image" src={Tomato} alt="Tomato" />
            <div className="contect-box">
              <h3>Tomato Club</h3>
              <p>3.2/5 (3000+)</p>
              <strong>$$$</strong>
              <p>Cha Chaan Teng</p>
              <p>🚲HK$ 10 Delivery fee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <h2>
          <strong>Your favourite cuisines</strong>{" "}
        </h2>
        <a href="#" className="more-tab">
          more
        </a>
      </div>
      <div className="favourite-section">
        <div className="favourite-box">
          <div className="box-item">
            <img className="favourite-image" src={pizza} alt="pizza" />
          </div>
          <div className="favourite-contect-box">
            <h3>Pizza</h3>
          </div>
        </div>
        <div className="favourite-box">
          <div className="box-item">
            <img className="favourite-image" src={cake} alt="cake" />
            <div className="favourite-contect-box">
              <h3>Cake</h3>
            </div>
          </div>
        </div>
        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img className="favourite-image" src={coffee} alt="coffee" />
            </div>
            <div className="favourite-contect-box">
              <h3>Coffee</h3>
            </div>
          </div>
        </div>
        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img className="favourite-image" src={sushi} alt="sushi" />
            </div>
            <div className="favourite-contect-box">
              <h3>Sushi</h3>
            </div>
          </div>
        </div>

        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img className="favourite-image" src={Chicken} alt="Chicken" />
            </div>
            <div className="favourite-contect-box">
              <h3>Chicken</h3>
            </div>
          </div>
        </div>
        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img
                className="favourite-image"
                src={Dessert}
                alt="Restaurant A"
              />
            </div>
          </div>
          <div className="favourite-contect-box">
            <h3>Dessert</h3>
          </div>
        </div>

        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img
                className="favourite-image"
                src={Burgers}
                alt="Restaurant A"
              />
            </div>
          </div>
          <div className="favourite-contect-box">
            <h3>Burgers</h3>
          </div>
        </div>

        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img className="favourite-image" src={Cakes} alt="Restaurant A" />
            </div>
          </div>
          <div className="favourite-contect-box">
            <h3>Cakes</h3>
          </div>
        </div>

        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img
                className="favourite-image"
                src={Cantonese}
                alt="Restaurant A"
              />
            </div>
          </div>
          <div className="favourite-contect-box">
            <h3>Cantonese</h3>
          </div>
        </div>

        <div className="favourite-box">
          <div className="box-item">
            <div>
              <img className="favourite-image" src={Curry} alt="Restaurant A" />
            </div>
          </div>
          <div className="favourite-contect-box">
            <h3>Curry</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
