import React, { useState } from "react";
import { Col, Card, Icon, CardTitle, Button } from "react-materialize";
import { Link } from "react-router-dom";

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
          <React.Fragment key={props.index}>
            <Link to={`/restaurants/${props.restaurant._id}`}>
              <Button waves="light" className="blue darken-1">
                View
              </Button>
            </Link>
            {props.authenticated ? (
              <Link to={`/restaurants/${props.restaurant._id}/edit`}>
                <Button waves="light" flat className="orange-text">
                  Edit
                </Button>
              </Link>
            ) : (
              ""
            )}
          </React.Fragment>,
        ]}
      >
        <p>
          {props.restaurant.address.building +
            ", " +
            props.restaurant.address.street +
            ", " +
            props.restaurant.borough}
        </p>
        <Button
          flat
          className="blue-text"
          style={{ padding: 0 }}
          onClick={() => {
            window.scrollTo(0, 0);
            props.handleSetCoordinates(props.restaurant.address.coord);
          }}
        >
          View on Map
        </Button>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
