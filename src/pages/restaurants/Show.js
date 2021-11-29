import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const Show = () => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  let token = localStorage.getItem("token");

  useEffect(() => {
    console.log(token);
    axios
      .get(`https://craig-restaurants-api.herokuapp.com/restaurants/${id}`)
      .then((res) => {
        console.log(res.data.restaurant);
        setRestaurant(res.data.restaurant);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  if (!restaurant) return null;

  return (
    <div>
      <h2>Restairant show</h2>
      {restaurant.name}
      {/* <Row>
        <Col>
          <h3>List of Restaurants</h3>
        </Col>
      </Row>
      <Row>
        <Col m={6}>
          <Row>
            {restaurants.map((restaurant, i) => {
              return <RestaurantCard restaurant={restaurant} index={i} />;
            })}
          </Row>
        </Col>
        <Col m={6} style={{ backgroundColor: "red" }}>
          <Col m={3}>Map goes here</Col>
        </Col>
      </Row> */}
    </div>
  );
};
export default Show;
