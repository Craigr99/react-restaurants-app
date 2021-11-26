import { Row, Col, Card, Icon } from "react-materialize";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

const RegisterPage = (props) => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://craig-restaurants-api.herokuapp.com/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.auth_token);
        props.onAuthenticated(true, res.data.auth_token);
        navigate("/restaurants");
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // if (err.response.data.error) {
        //   setResponseErrors(err.response.data.error);
        //   console.log(responseErrors);
        // }
      });
  };

  return (
    <Row>
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
                  node="button"
                  type="submit"
                  waves="light"
                  buttonStyle="primary col s12"
                  text="Register"
                />
              </Col>
            </Row>
            <div className="center">
              <div className="margin">
                <a href="/#">
                  <b>Forgot Password?</b>
                </a>
                <div className="divider margin top-20 bottom-20"></div>
              </div>
              <div className="margin">
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
