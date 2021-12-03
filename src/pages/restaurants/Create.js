import axios from "../../config/index";
import { Row, Col, Button, Icon, Card } from "react-materialize";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Create = () => {
  let navigate = useNavigate();
  const [coordinates, setCoordinates] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  let token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onChange = (e) => {
    let value = e.target.value;
    setCoordinates(value.split(","));
    setValue("address.coord", coordinates);
  };
  const onSubmit = (restaurant) => {
    console.log(restaurant);
    console.log(token);
    // axios;
    // .post(
    //   "/restaurants",
    //   { restaurant },
    //   {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // )
    // .then((res) => {
    //   console.log(res.data);
    //   reset();
    // })
    // .catch((err) => {
    //   console.log(`error: ${err}`);
    // });
    setisModalOpen(false);
    setSubmitted(true);
    navigate("/restaurants");
  };

  return (
    <Row className="mt3">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          // title="Card title"
        >
          <h3>Add a new Restaurant</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="input-field col s12">
                <input
                  name="name"
                  type="text"
                  className={("validate", errors.name ? "invalid" : "")}
                  {...register("name", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="name">Restaurant Name</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  name="borough"
                  type="text"
                  className={("validate", errors.borough ? "invalid" : "")}
                  {...register("borough", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="borough">Borough</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  name="cuisine"
                  type="text"
                  className={("validate", errors.cuisine ? "invalid" : "")}
                  {...register("cuisine", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="cuisine">Cuisine</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  type="number"
                  className={("validate", errors.building ? "invalid" : "")}
                  {...register("address.building", {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                  })}
                />
                <label htmlFor="address.building">Building</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  type="number"
                  className={("validate", errors.zipcode ? "invalid" : "")}
                  {...register("address.zipcode", {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                  })}
                />
                <label htmlFor="address.zipcode">Zipcode</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  type="text"
                  className={("validate", errors.street ? "invalid" : "")}
                  {...register("address.street", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="address.street">Street</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  type="text"
                  // className={("validate", errors.coord ? "invalid" : "")}
                  // {...register("address.coord", {
                  //   required: true,
                  // })}
                  onChange={onChange}
                />
                <label htmlFor="address.coord">Co Ordinates</label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <Button
                  modal={submitted ? "close" : ""}
                  waves="light"
                  className="blue darken-1"
                >
                  add
                </Button>
              </Col>
            </Row>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default Create;
