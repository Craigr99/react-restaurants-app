import axios from "../../config/index";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Button, Icon, Card } from "react-materialize";

const Create = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  let token = localStorage.getItem("token");

  useEffect(() => {
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
    <Row className="mt3">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          title={`Add Review for ${restaurant.name}`}
        ></Card>
      </Col>
    </Row>
  );
};

export default Create;
