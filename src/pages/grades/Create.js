import axios from "../../config/index";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Icon,
  Card,
  Select,
  Textarea,
  Button,
} from "react-materialize";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Create = (props) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [form, setForm] = useState({});
  const [sliderValue, setSliderValue] = useState({});

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/restaurants/${id}`)
      .then((res) => {
        console.log(res.data.restaurant);
        setRestaurant(res.data.restaurant);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  if (!restaurant) return null;

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSliderChange = (value) => {
    setSliderValue({
      textValue: value[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sliderValue);

    console.log(form);

    axios
      .post(
        "/grades",
        {
          restaurant_id: id,
          grade: form.grade,
          score: parseFloat(sliderValue.textValue),
          comment: form.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/restaurants/${id}`);
        props.onToastToggled("Grade Posted!", "green");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Row className="mt3">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          title={`Add Review for ${restaurant.name}`}
        >
          <form action="#" onSubmit={handleSubmit}>
            <Row>
              <Col className="input-field" s={12}>
                <Nouislider
                  range={{ min: 0, max: 10 }}
                  step={0.5}
                  start={0}
                  connect
                  className="blue"
                  tooltips
                  onSlide={handleSliderChange}
                />
                <p className="grey-text">Restaurant Score (0-10)</p>
              </Col>

              <Col className="input-field" s={12}>
                <Select
                  name="grade"
                  className="col s12"
                  label="Grade"
                  multiple={false}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value="A"
                  onChange={handleForm}
                  required
                >
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="F">F</option>
                </Select>
              </Col>

              <Col className="input-field" s={12}>
                <Textarea
                  name="comment"
                  label="Write a comment (optional)..."
                  s={12}
                  onChange={handleForm}
                />
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <Button className="blue col s12">Post</Button>
              </Col>
            </Row>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default Create;
