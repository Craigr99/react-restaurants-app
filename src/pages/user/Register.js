import { Row, Col, Card, Icon, Button } from "react-materialize";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/index.js";
import { useState } from "react";

const RegisterPage = (props) => {
  let navigate = useNavigate();
  const [responseErrors, setResponseErrors] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.auth_token);
        props.onAuthenticated(true, res.data.auth_token);
        navigate("/restaurants");
        props.onToastToggled("Registered Successfully!");
      })
      .catch((err) => {
        if (err) {
          setResponseErrors(
            "Error - User with this email already exists in the database."
          );
        }
      });
  };

  return (
    <Row className="mt3">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          className="white"
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName=""
          title="Register an Account"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  className={("validate", errors.name ? "invalid" : "")}
                  {...register("name", { required: true, minLength: 4 })}
                />
                <label htmlFor="name">Full Name</label>
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
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className={
                    ("validate",
                    errors.email || responseErrors ? "invalid" : "")
                  }
                  {...register("email", { required: true, minLength: 5 })}
                />
                <label htmlFor="email">Email</label>
                {/* Errors */}
                {errors.email?.type === "required" && (
                  <span className="red-text">This field is required</span>
                )}
                {errors.email?.type === "minLength" && (
                  <span className="red-text">
                    This field should be more than 5 characters.
                  </span>
                )}
                {responseErrors ? (
                  <span className="red-text">{responseErrors}</span>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className={("validate", errors.password ? "invalid" : "")}
                  {...register("password", { required: true, minLength: 8 })}
                />
                {/* Errors */}
                {errors.password?.type === "required" && (
                  <span className="red-text">This field is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="red-text">
                    Password should be at least 8 characters long.
                  </span>
                )}
                <label htmlFor="password">Password</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <label>
                    <input type="checkbox" />
                    <span>
                      I agree with{" "}
                      <span className="blue-text lighen-2">Terms </span>
                      and
                      <span className="blue-text lighen-2"> Privacy</span>
                    </span>
                  </label>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="input-field col s12">
                <Button
                  className="blue darken-1 col s12"
                  node="button"
                  type="submit"
                  waves="light"
                >
                  Register
                </Button>
              </Col>
            </Row>
            <div className="center">
              <div>
                <div className="divider"></div>
              </div>
              <div className="mt3">
                <p>Already have an account?</p>
                <Link to="/login">
                  <b>Login</b>
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
