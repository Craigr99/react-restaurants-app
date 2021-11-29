import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { Row, Col } from "react-materialize";
import RestaurantCard from "../../components/RestaurantCard";
import Map from "../../components/Map";
// const getRandomNumber = () => {
//   return Math.floor(Math.random() * 206);
// };

const Index = () => {
  const [restaurants, setRestaurants] = useState(null);
  useEffect(() => {
    axios
      .get("https://craig-restaurants-api.herokuapp.com/restaurants")
      .then((res) => {
        console.log(res.data.restaurants);
        setRestaurants(res.data.restaurants);
      });
  }, []);

  if (!restaurants) return null;

  return (
    <div>
      <Row>
        <Col>
          <h3>List of Restaurants</h3>
        </Col>
      </Row>
      <Row>
        <Col m={6}>
          <Row>
            {restaurants.map((restaurant, i) => {
              return (
                <RestaurantCard restaurant={restaurant} index={i} key={i} />
              );
            })}
          </Row>
        </Col>
        <Col m={6} style={{ backgroundColor: "red" }}>
          <Col m={12}>
            <Map />
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default Index;
