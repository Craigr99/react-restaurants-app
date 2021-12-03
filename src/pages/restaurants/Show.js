import axios from "../../config/index";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Row, Col, Button, Icon } from "react-materialize";

const Show = () => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  let token = localStorage.getItem("token");

  useEffect(() => {
    console.log(token);
    axios
      .get(`/restaurants/${id}`)
      .then((res) => {
        console.log(res.data.restaurant);
        setRestaurant(res.data.restaurant);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  if (!restaurant) return null;

  return (
    <div className="mt3">
      <Row>
        <Col s={12} l={8}>
          <img
            l={{ height: "400px" }}
            className="responsive-img"
            src="https://materializecss.com/images/sample-1.jpg"
            alt="restaurant"
          />
        </Col>
        <Col s={12} l={4}>
          <div className="red">map goes here</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            small
            className="blue darken-1"
            node="button"
            style={{
              marginRight: "5px",
            }}
            waves="light"
          >
            Edit Restaurant
            <Icon left>edit</Icon>
          </Button>
          <Button
            small
            className="red darken-1"
            node="button"
            style={{
              marginRight: "5px",
            }}
            waves="light"
          >
            Delete Restaurant
            <Icon left>delete</Icon>
          </Button>
          <h4>{restaurant.name}</h4>
          <p className="grey-text">
            {restaurant.address.building + " " + restaurant.address.street},{" "}
            {restaurant.borough}
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <div>test</div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h5>Grades and Reviews</h5>
        </Col>
      </Row>
    </div>
  );
};
export default Show;
