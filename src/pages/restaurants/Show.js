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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt3">
      <Row>
        <Col s={12} l={8}>
          <img
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
        <Col>
          <div className="mt2">
            <div className="flex items-center">
              <div>
                <Icon className="grey-text mr2">restaurant</Icon>
              </div>
              <div>
                <p className="grey-text">
                  Cuisine
                  <br />
                  <span className="black-text bold">{restaurant.cuisine}</span>
                </p>
              </div>

              <div className="ml4">
                <Icon className="grey-text mr2">place</Icon>
              </div>
              <div>
                <p className="grey-text">
                  Location
                  <br />
                  <span className="black-text bold">{restaurant.borough}</span>
                </p>
              </div>

              <div className="ml4">
                <Icon className="grey-text mr2">map</Icon>
              </div>
              <div>
                <p className="grey-text">
                  Co-Ordinates
                  <br />
                  <span className="black-text bold">
                    {restaurant.address.coord[0]}, {restaurant.address.coord[1]}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Grades and Reviews</h5>
          <Row>
            {restaurant.grades.map((grade) => {
              return (
                <Col s={12} key={grade.date}>
                  <Collection>
                    <CollectionItem>
                      <h6>{moment(grade.date).format("MMMM Do YYYY")}</h6>
                      <p>
                        <span className="bold">Score:</span> {grade.score}
                      </p>
                      <p>
                        <span className="bold">Grade:</span> {grade.grade}
                      </p>
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
