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
        className="white"
        alignLinks="right"
        id="mobile-nav"
        brand={
          <Link className="brand-logo black-text" to="/">
            Restauranty
          </Link>
        }
        menuIcon={<Icon className="black-text">menu</Icon>}
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
        <Link to="/restaurants" className="sidenav-close">
          <span className="blue-text text-darken-1">Restaurants</span>
        </Link>
        {/* IF user is logged OUT */}
        {!props.authenticated ? (
          <Link to="/login" className="sidenav-close">
            <span className="blue-text text-darken-1">Login</span>
          </Link>
        ) : (
          ""
        )}
        {!props.authenticated ? (
          <Link to="/register" className="sidenav-close">
            <span className="blue-text text-darken-1">Register</span>
          </Link>
        ) : (
          ""
        )}

        {/* IF user is logged IN */}
        {props.authenticated ? (
          <NavItem className="sidenav-close">
            <span
              className="blue-text text-darken-1"
              onClick={() => {
                props.onAuthenticated(false);
                navigate("/login");
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
