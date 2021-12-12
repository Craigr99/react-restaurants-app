import axios from "../../config/index";
import { Row, Col, Button, Icon, Card, ProgressBar } from "react-materialize";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = (props) => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [restaurantForm, setRestaurantForm] = useState({});
  const [addressForm, setAddressForm] = useState({});

  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, [id, token]);

  // Set form values
  useEffect(() => {
    setRestaurantForm({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      borough: restaurant.borough,
    });
  }, [restaurant]);

  useEffect(() => {
    setAddressForm({
      building: restaurant.address ? restaurant.address.building : "",
      zipcode: restaurant.address ? restaurant.address.zipcode : "",
      street: restaurant.address ? restaurant.address.street : "",
      longitude: restaurant.address ? restaurant.address.coord[0] : 0,
      latitude: restaurant.address ? restaurant.address.coord[1] : 0,
    });
  }, [restaurant]);

  if (!restaurant) return null;

  const handleForm = (e) => {
    setRestaurantForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddressForm = (e) => {
    setAddressForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    console.log("restaurant form", restaurantForm);

    console.log("here");
    addressForm.coord = [
      parseFloat(addressForm.longitude) || 0,
      parseFloat(addressForm.latitude) || 0,
    ];
    delete addressForm.longitude;
    delete addressForm.latitude;

    console.log("address form", addressForm);
    console.log(addressForm.coord);

    axios
      .put(
        "/restaurants/",
        {
          restaurant_id: id,
          restaurant: {
            name: restaurantForm.name,
            cuisine: restaurantForm.cuisine,
            borough: restaurantForm.borough,
            address: {
              building: addressForm.building,
              street: addressForm.street,
              zipcode: addressForm.zipcode,
              coord: addressForm.coord,
            },
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
    navigate(`/restaurants/${id}`, { replace: true });
    props.onToastToggled("Restaurant Updated!", "grey darken-1");
  };

  const PreLoader = () => {
    return (
      <Row>
        <Col s={12}>
          <ProgressBar />
        </Col>
      </Row>
    );
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
                {restaurantForm.name || !loading ? (
                  <>
                    <input
                      name="name"
                      type="text"
                      onChange={handleForm}
                      value={restaurantForm.name || ""}
                      required
                    />
                    <label className="active" htmlFor="name">
                      Restaurant Name
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>

              <Col className="input-field" s={12}>
                {restaurantForm.borough || !loading ? (
                  <>
                    <input
                      name="borough"
                      type="text"
                      onChange={handleForm}
                      value={restaurantForm.borough || ""}
                      required
                    />
                    <label htmlFor="borough" className="active">
                      Borough
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>
              <Col className="input-field col s12">
                {restaurantForm.cuisine || !loading ? (
                  <>
                    <input
                      name="cuisine"
                      type="text"
                      onChange={handleForm}
                      value={restaurantForm.cuisine || ""}
                      required
                    />
                    <label className="active" htmlFor="cuisine">
                      Cuisine
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                {addressForm.building || !loading ? (
                  <>
                    <input
                      name="building"
                      type="number"
                      value={addressForm.building || ""}
                      onChange={handleAddressForm}
                      required
                    />
                    <label className="active" htmlFor="building">
                      Building
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                {addressForm.zipcode || !loading ? (
                  <>
                    <input
                      name="zipcode"
                      type="number"
                      value={addressForm.zipcode || ""}
                      onChange={handleAddressForm}
                      required
                    />
                    <label className="active" htmlFor="zipcode">
                      Zipcode
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>

              <Col className="input-field col s12">
                {addressForm.street || !loading ? (
                  <>
                    <input
                      name="street"
                      type="text"
                      value={addressForm.street || ""}
                      onChange={handleAddressForm}
                      required
                    />
                    <label className="active" htmlFor="street">
                      Street
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>

              <Col className="input-field" s={12} l={6}>
                {addressForm.longitude || !loading ? (
                  <>
                    <input
                      name="longitude"
                      type="number"
                      value={addressForm.longitude || ""}
                      onChange={handleAddressForm}
                      required
                    />
                    <label className="active" htmlFor="longitude">
                      Longitude (eg. -98.7654)
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
              </Col>
              <Col className="input-field" s={12} l={6}>
                {addressForm.latitude || !loading ? (
                  <>
                    <input
                      name="latitude"
                      type="number"
                      value={addressForm.latitude || ""}
                      onChange={handleAddressForm}
                      required
                    />
                    <label className="active" htmlFor="latitude">
                      Latitude (eg. 12.3456)
                    </label>
                  </>
                ) : (
                  <PreLoader />
                )}
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
