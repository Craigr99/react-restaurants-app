import "materialize-css/dist/css/materialize.min.css";
import { Navbar, Icon, NavItem } from "react-materialize";
import "materialize-css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = (props) => {
  let navigate = useNavigate();

  return (
    <nav>
      <Navbar
        centerChildren
        className="blue lighten-1 white-text"
        alignLinks="right"
        id="mobile-nav"
        brand={
          <Link className="brand-logo" to="/">
            Restauranty
          </Link>
        }
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <Link to="/restaurants/page=0" className="sidenav-close">
          <span>Restaurants</span>
        </Link>
        {/* IF user is logged OUT */}
        {!props.authenticated ? (
          <Link to="/login" className="sidenav-close">
            <span>Login</span>
          </Link>
        ) : (
          ""
        )}
        {!props.authenticated ? (
          <Link to="/register" className="sidenav-close">
            <span>Register</span>
          </Link>
        ) : (
          ""
        )}

        {/* IF user is logged IN */}
        {props.authenticated ? (
          <NavItem className="sidenav-close">
            <span
              onClick={() => {
                props.onAuthenticated(false);
                navigate("/login", { replace: true });
                props.onToastToggled("Logged Out Successfully!", "blue");
              }}
            >
              Logout
            </span>
          </NavItem>
        ) : (
          ""
        )}
      </Navbar>
    </nav>
  );
};

export default NavBar;
