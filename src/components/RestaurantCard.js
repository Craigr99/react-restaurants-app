import React from "react";
import { Col, Card, Icon, CardTitle, Button } from "react-materialize";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 206);
  };
  return (
    <Col s={12} m={6}>
      <Card
        title={props.restaurant.name}
        closeIcon={<Icon>close</Icon>}
        header={
          <CardTitle
            image={"https://source.unsplash.com/collection/190727/?sig="}
            reveal
            waves="light"
          />
        }
        reveal={
          <div className="flex flex-column my3">
            <div className="flex items-center">
              <div>
                <Icon className="grey-text mr2">restaurant</Icon>
              </div>
              <div>
                <p className="grey-text m0">
                  Cuisine
                  <br />
                  <span className="black-text bold">
                    {props.restaurant.cuisine}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center mt3">
              <div>
                <Icon className="grey-text mr2">place</Icon>
              </div>
              <div>
                <p className="grey-text m0">
                  Location
                  <br />
                  <span className="black-text bold">
                    {props.restaurant.borough}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center mt3">
              <div>
                <Icon className="grey-text mr2">map</Icon>
              </div>
              <div>
                <p className="grey-text m0">
                  Co-Ordinates
                  <br />
                  <span className="black-text bold">
                    {props.restaurant.address.coord[0]},{" "}
                    {props.restaurant.address.coord[1]}
                  </span>
                </p>
              </div>
            </div>
          </div>
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
