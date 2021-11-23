import { Row, Col, Card, Icon, Checkbox, Button } from "react-materialize";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Row className="container">
      <Col s={12} m={6} offset={"m3"}>
        <Card
          className="white"
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName=""
          title="Login"
        >
          <form className="white " onSubmit={handleSubmit(onSubmit)}>
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
                  node="button"
                  type="submit"
                  waves="light"
                  className="col s12"
                >
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;