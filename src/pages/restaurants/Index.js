import axios from "../../config/index";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Icon } from "react-materialize";
import RestaurantCard from "../../components/RestaurantCard";
import Map from "../../components/Map";
import { useNavigate, useParams } from "react-router-dom";

const Index = (props) => {
  let navigate = useNavigate();
  let { page } = useParams();

  if (!page) page = 0;

  const [restaurants, setRestaurants] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    axios
      .get(`/restaurants?page=${page}`)
      .then((res) => {
        setRestaurants(res.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSetCoordinates = (data) => {
    setCoordinates(data);
  };

  if (!restaurants) return null;

  return (
    <div>
      <Row>
        <Col>
          <h3 className="flex">
            <span className="mr2">List of Restaurants</span>
            {props.authenticated ? (
              <Button
                className="blue accent-1"
                floating
                icon={<Icon>add</Icon>}
                large
                node="button"
                waves="light"
                onClick={() => navigate("/restaurants/create")}
              />
            ) : (
              ""
            )}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col m={12} l={6}>
          <Row>
            {restaurants.map((restaurant, i) => {
              return (
                <RestaurantCard
                  authenticated={props.authenticated}
                  restaurant={restaurant}
                  onToastToggled={props.onToastToggled}
                  index={i}
                  key={i}
                  handleSetCoordinates={handleSetCoordinates}
                />
              );
            })}
          </Row>
          <div className="flex justify-between">
            <button
              onClick={() => {
                page--;
                navigate(`/restaurants/page=${page}`);
                window.scrollTo(0, 0);
              }}
            >
              back
            </button>
            <button
              onClick={() => {
                page++;
                navigate(`/restaurants/page=${page}`);
                window.scrollTo(0, 0);
              }}
            >
              forward
            </button>
          </div>
        </Col>
        <Col m={6} className="hide-on-med-and-down show-on-large">
          <Map coordinates={coordinates} />
        </Col>
      </Row>
    </div>
  );
};
export default Index;
