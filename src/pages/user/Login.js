import { useState } from "react";
import { Row, Col, Card, Icon, Checkbox, Button } from "react-materialize";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/index.js";

const LoginPage = (props) => {
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
      .post("/users/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data.auth_token);
        props.onAuthenticated(true, res.data.auth_token);
        navigate("/restaurants");
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        if (err.response.data.error) {
          setResponseErrors(err.response.data.error);
          console.log(responseErrors);
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
          title="Login to your Account"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className={("validate", errors.email ? "invalid" : "")}
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
                <label htmlFor="password">Password</label>
                {/* Errors */}
                {errors.password?.type === "required" && (
                  <span className="red-text">This field is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="red-text">
                    Password should be at least 8 characters long.
                  </span>
                )}

                {responseErrors ? (
                  <>
                    <br />
                    <span className="red-text">{responseErrors}</span>
                  </>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Checkbox
                  id="remember-me"
                  label="Remember Me"
                  value="remember"
                />
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
                  Login
                </Button>
              </Col>
            </Row>
            <div className="center">
              <div>
                <a href="/#">
                  <b>Forgot Password?</b>
                </a>
                <div className="divider my3"></div>
              </div>
              <div>
                <p>Don't have an account?</p>
                <Link to="/register">
                  <b>Register</b>
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
