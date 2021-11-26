import { Col, Card, Icon, CardTitle } from "react-materialize";

import Button from "./Button";

const RestaurantCard = (props) => {
  return (
    <Col s={12} m={6} key={props.index}>
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
          <Button
            key={props.restaurant}
            waves="light"
            buttonStyle="primary"
            text="View"
          />,

          <Button
            key={props.restaurant.restaurant_id}
            waves="light"
            flat
            buttonStyle="flat-danger"
            text="Delete"
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
          <a href="#">View on Map</a>
        </p>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
