import axios from "../../config/index";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Icon,
  Collection,
  CollectionItem,
  Modal,
} from "react-materialize";
import Map from "../../components/Map.js";

const Show = (props) => {
  let { id } = useParams();
  let navigate = useNavigate();
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

  const deleteRestaurant = () => {
    console.log(id);
    console.log("btn click");

    axios
      .delete(`/restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          restaurant_id: id,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/restaurants");
        props.onToastToggled("Restaurant Deleted!", "red darken-1");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 206);
  };

  return (
    <div className="mt3">
      <Row>
        <Col s={12} l={8}>
          <img
            className="responsive-img"
            src={
              "https://source.unsplash.com/collection/190727/?sig=" +
              getRandomNumber()
            }
            alt="restaurant"
            height="400px"
          />
        </Col>
        <Col l={4} className="hide-on-med-and-down">
          <div>
            <Map coordinates={restaurant.address.coord} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.authenticated ? (
            <>
              <Link to={`/restaurants/${id}/edit`}>
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
              </Link>
              <Modal
                actions={[
                  <Button flat modal="close" node="button" waves="green">
                    Close
                  </Button>,
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header="Are You Sure?"
                id="Modal-10"
                open={false}
                options={{
                  dismissible: true,
                  endingTop: "10%",
                  inDuration: 250,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  opacity: 0.5,
                  outDuration: 250,
                  preventScrolling: true,
                  startingTop: "4%",
                }}
                trigger={
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
                }
              >
                <p>You are about to delete restaurant: {restaurant.name}.</p>
                <p>Are you sure you want to continue?</p>
                <Button className="mr2 red darken-1" onClick={deleteRestaurant}>
                  Delete
                </Button>
                <Button
                  className="grey darken-1"
                  modal="close"
                  node="button"
                  waves="light"
                >
                  Cancel
                </Button>
              </Modal>
            </>
          ) : (
            ""
          )}

          <h4>{restaurant.name}</h4>
          <p className="grey-text">
            {restaurant.address.building + " " + restaurant.address.street},{" "}
            {restaurant.borough}
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col s={12}>
          <div className="mt2">
            <div className="flex items-center flex-wrap my3">
              <div className="flex items-center">
                <div>
                  <Icon className="grey-text mr2">restaurant</Icon>
                </div>
                <div>
                  <p className="grey-text m0">
                    Cuisine
                    <br />
                    <span className="black-text bold">
                      {restaurant.cuisine}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml4">
                  <Icon className="grey-text mr2">place</Icon>
                </div>
                <div>
                  <p className="grey-text m0">
                    Location
                    <br />
                    <span className="black-text bold">
                      {restaurant.borough}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml4">
                  <Icon className="grey-text mr2">map</Icon>
                </div>
                <div>
                  <p className="grey-text m0">
                    Co-Ordinates
                    <br />
                    <span className="black-text bold">
                      {restaurant.address.coord[0]},{" "}
                      {restaurant.address.coord[1]}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="flex items-center mt3 mb2">
            <h5 className="my0 mr2">Grades and Reviews</h5>
            {props.authenticated ? (
              <Link to={`/grades/${restaurant._id}/create`}>
                <Button className="blue" node="button" small>
                  <Icon left>add</Icon>
                  Grade
                </Button>
              </Link>
            ) : (
              ""
            )}
          </span>
          <Row>
            {restaurant.grades.map((grade) => {
              return (
                <Col s={12} m={6} key={grade.date}>
                  <Collection>
                    <CollectionItem>
                      <div className="sm-flex justify-between items-center">
                        <blockquote>
                          <h6>{moment(grade.date).format("MMMM Do YYYY")}</h6>
                          <span className="blue-text text-accent-4">
                            {grade.user_name ? grade.user_name : "John Doe"}
                          </span>
                        </blockquote>
                        <div className="flex items-center">
                          <div className="center-align mr3">
                            <p>Score:</p>
                            <h5 className="bold blue-text text-accent-4">
                              {grade.score}
                            </h5>
                          </div>
                          <div className="center-align">
                            <p>Grade:</p>
                            <h5 className="bold blue-text text-accent-4">
                              {grade.grade}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <p className="flow-text">{grade.comment}</p>
                    </CollectionItem>
                  </Collection>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Show;
