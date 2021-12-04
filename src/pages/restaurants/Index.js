import axios from "../../config/index";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Icon, Preloader } from "react-materialize";
import RestaurantCard from "../../components/RestaurantCard";
import Map from "../../components/Map";
import { useNavigate } from "react-router-dom";

const Index = (props) => {
  let navigate = useNavigate();

  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    axios.get("/restaurants").then((res) => {
      console.log(res.data.restaurants);
      setRestaurants(res.data.restaurants);
    });
  }, []);

  if (!restaurants) return null;

  const Loading = () => {
    return <Preloader active color="blue" flashing size="big" />;
  };

  return (
    <div>
      {restaurants ? (
        <>
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
                    onClick={() => navigate("create")}
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
                    <RestaurantCard restaurant={restaurant} index={i} key={i} />
                  );
                })}
              </Row>
            </Col>
            <Col m={6} className="hide-on-med-and-down show-on-large">
              <Map />
            </Col>
          </Row>
        </>
      ) : (
        // Pre-Loader
        <Col s={12}>
          <Loading />
        </Col>
      )}
    </div>
  );
};
export default Index;
