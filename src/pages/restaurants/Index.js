import axios from "../../config/index";
import React, { useRef, useState, useEffect } from "react";
import {
  M,
  Row,
  Col,
  Button,
  Icon,
  ProgressBar,
  Preloader,
  Toast,
  Modal,
  Card,
  Link,
} from "react-materialize";
import RestaurantCard from "../../components/RestaurantCard";
import Map from "../../components/Map";
import { useNavigate } from "react-router-dom";

// const getRandomNumber = () => {
//   return Math.floor(Math.random() * 206);
// };

const Index = (props) => {
  let navigate = useNavigate();

  const [restaurants, setRestaurants] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const onToastToggled = (props) => {
    window.M.toast({ html: "Restaurant Added!" }, 100);
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
        <Col s={12}>
          <Loading />
        </Col>
      )}
    </div>
  );
};
export default Index;
