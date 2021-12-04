import { Col, Card, Icon, CardTitle } from "react-materialize";
import { Link } from "react-router-dom";
import Button from "./Button";

const RestaurantCard = (props) => {
  return (
    <Col s={12} m={6}>
      {/* <img
      //   src={
      //     "https://source.unsplash.com/collection/190727/?sig=" +
      //     getRandomNumber()
      //   }
      // /> */}
      <Card
        title={props.restaurant.name}
        closeIcon={<Icon>close</Icon>}
        header={
          <CardTitle
            image="https://materializecss.com/images/sample-1.jpg"
            reveal
            waves="light"
          />
        }
        reveal={
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        }
        revealIcon={<Icon>more_vert</Icon>}
        actions={[
          <Link to={`/restaurants/${props.restaurant._id}`} key={props.index}>
            <Button waves="light" buttonStyle="primary" text="View" />
          </Link>,
          <Button
            waves="light"
            flat
            buttonStyle="flat-danger"
            text="Delete"
            key={props.index + 1}
          />,
        ]}
      >
        <p>
          {props.restaurant.address.building +
            ", " +
            props.restaurant.address.street +
            ", " +
            props.restaurant.borough}
        </p>
        <p>
          <a href="/">View on Map</a>
        </p>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
