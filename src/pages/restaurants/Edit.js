import axios from "../../config/index";
import { Row, Col, Button, Icon, Card } from "react-materialize";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [form, setForm] = useState({});
  const [restaurant, setRestaurant] = useState({});

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.restaurant);
        setRestaurant(res.data.restaurant);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, [id, token]);

  useEffect(() => {
    setForm(restaurant);
  }, [restaurant]);

  if (!restaurant) return null;

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    console.log("form", form);
    // restaurant.address.coord = [
    //   restaurant.address.longitude,
    //   restaurant.address.latitude,
    // ];
    // delete restaurant.address.longitude;
    // delete restaurant.address.latitude;

    // // console.log(restaurant);
    // // console.log(token);
    // axios
    //   .put(
    //     `/restaurants/${id}`,
    //     { form },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     reset();
    //   })
    //   .catch((err) => {
    //     console.log(`error: ${err}`);
    //   });
    // navigate("/restaurants");
    // // props.onToastToggled(true);
  };

  return (
    <Row className="mt3">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          title="Edit Restaurant"
        >
          <form onSubmit={onSubmit}>
            <Row>
              <Col className="input-field" s={12}>
                <input
                  name="name"
                  type="text"
                  onChange={handleForm}
                  defaultValue={form.name}
                  value={form.name}
                />
                <label className="active" htmlFor="name">
                  Restaurant Name
                </label>
              </Col>

              <Col className="input-field" s={12}>
                <input
                  name="borough"
                  type="text"
                  onChange={handleForm}
                  defaultValue={form.borough}
                />
                <label htmlFor="borough" className="active">
                  Borough
                </label>
              </Col>
              <Col className="input-field col s12">
                <input name="cuisine" type="text" onChange={handleForm} />
                <label className="active" htmlFor="cuisine">
                  Cuisine
                </label>
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input type="number" onChange={handleForm} />
                <label className="active" htmlFor="address.building">
                  Building
                </label>
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input type="number" onChange={handleForm} />
                <label className="active" htmlFor="address.zipcode">
                  Zipcode
                </label>
              </Col>
              <Col className="input-field col s12">
                <input type="text" />
                <label className="active" htmlFor="address.street">
                  Street
                </label>
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input type="number" />
                <label className="active" htmlFor="longitude">
                  Longitude
                </label>
              </Col>
              <Col className="input-field" s={12} l={6}>
                <input type="number" />
                <label className="active" htmlFor="latitude">
                  Latitude
                </label>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <Button waves="light" className="col s12 blue darken-1">
                  update
                </Button>
              </Col>
            </Row>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default Edit;
