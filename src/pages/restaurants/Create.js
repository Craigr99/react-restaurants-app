import axios from "../../config/index";
import { Row, Col, Button, Icon, Card } from "react-materialize";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Create = (props) => {
  let navigate = useNavigate();
  const [coordinates, setCoordinates] = useState([]);
  let token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const onChange = (e) => {
    console.log(e);
    let value = e.target.value;
    setCoordinates(value.split(","));
    setValue("address.coord", coordinates);
  };
  const onSubmit = (restaurant) => {
    restaurant.address.coord = [
      restaurant.address.longitude,
      restaurant.address.latitude,
    ];
    delete restaurant.address.longitude;
    delete restaurant.address.latitude;

    // console.log(restaurant);
    // console.log(token);
    axios
      .post(
        "/restaurants",
        { restaurant },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
    navigate("/restaurants");
    // props.onToastToggled(true);
  };

  return (
    <Row className="mt3">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          title="Add a new Restaurant"
        >
          {/* <h3>Add a new Restaurant</h3> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="input-field" s={12}>
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
                {/* Errors */}
                {errors.name?.type === "required" && (
                  <span className="red-text">This field is required</span>
                )}
                {errors.name?.type === "minLength" && (
                  <span className="red-text">
                    This field should be more than 4 characters.
                  </span>
                )}
              </Col>

              <Col className="input-field" s={12}>
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
                {/* Errors */}
                {errors.borough?.type === "required" && (
                  <span className="red-text">This field is required</span>
                )}
                {errors.borough?.type === "minLength" && (
                  <span className="red-text">
                    This field should be more than 4 characters.
                  </span>
                )}
              </Col>
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
                {/* Errors */}
                {errors.cuisine?.type === "required" && (
                  <span className="red-text">This field is required</span>
                )}
                {errors.cuisine?.type === "minLength" && (
                  <span className="red-text">
                    This field should be more than 4 characters.
                  </span>
                )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input
                  type="number"
                  className={
                    ("validate",
                    errors.address && errors.address.building ? "invalid" : "")
                  }
                  {...register("address.building", {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                  })}
                />
                <label htmlFor="address.building">Building</label>
                {/* Errors */}
                {errors.address &&
                  errors.address.building?.type === "required" && (
                    <span className="red-text">This field is required</span>
                  )}
                {errors.address &&
                  errors.address.building?.type === "minLength" && (
                    <span className="red-text">
                      This field should be more than 3 characters.
                    </span>
                  )}
                {errors.address &&
                  errors.address.building?.type === "maxLength" && (
                    <span className="red-text">
                      This field should be less than 10 characters.
                    </span>
                  )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input
                  type="number"
                  className={
                    ("validate",
                    errors.address && errors.address.zipcode ? "invalid" : "")
                  }
                  {...register("address.zipcode", {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                  })}
                />
                <label htmlFor="address.zipcode">Zipcode</label>
                {/* Errors */}
                {errors.address &&
                  errors.address.zipcode?.type === "required" && (
                    <span className="red-text">This field is required</span>
                  )}
                {errors.address &&
                  errors.address.zipcode?.type === "minLength" && (
                    <span className="red-text">
                      This field should be more than 3 characters.
                    </span>
                  )}
                {errors.address &&
                  errors.address.zipcode?.type === "maxLength" && (
                    <span className="red-text">
                      This field should be less than 10 characters.
                    </span>
                  )}
              </Col>
              <Col className="input-field col s12">
                <input
                  type="text"
                  className={
                    ("validate",
                    errors.address && errors.address.street ? "invalid" : "")
                  }
                  {...register("address.street", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="address.street">Street</label>
                {/* Errors */}
                {errors.address &&
                  errors.address.street?.type === "required" && (
                    <span className="red-text">This field is required</span>
                  )}
                {errors.address &&
                  errors.address.street?.type === "minLength" && (
                    <span className="red-text">
                      This field should be more than 4 characters.
                    </span>
                  )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input
                  type="number"
                  className={
                    ("validate",
                    errors.address && errors.address.longitude ? "invalid" : "")
                  }
                  {...register("address.longitude", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="longitude">Longitude</label>
                {/* Errors */}
                {errors.address &&
                  errors.address.longitude?.type === "required" && (
                    <span className="red-text">This field is required</span>
                  )}
                {errors.address &&
                  errors.address.longitude?.type === "minLength" && (
                    <span className="red-text">
                      This field should be more than 4 characters.
                    </span>
                  )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input
                  type="number"
                  className={
                    ("validate",
                    errors.address && errors.address.latitude ? "invalid" : "")
                  }
                  {...register("address.latitude", {
                    required: true,
                    minLength: 4,
                  })}
                />
                <label htmlFor="latitude">Latitude</label>
                {/* Errors */}
                {errors.address &&
                  errors.address.latitude?.type === "required" && (
                    <span className="red-text">This field is required</span>
                  )}
                {errors.address &&
                  errors.address.latitude?.type === "minLength" && (
                    <span className="red-text">
                      This field should be more than 4 characters.
                    </span>
                  )}
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <Button waves="light" className="col s12 blue darken-1">
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
