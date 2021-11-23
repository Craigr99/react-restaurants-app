import "materialize-css/dist/css/materialize.min.css";
import { Navbar, Icon } from "react-materialize";
import { M } from "materialize-css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Navbar
        centerChildren
        className="white"
        alignLinks="right"
        id="mobile-nav"
        brand={
          <a className="brand-logo black-text" href="/">
            Restauranty
          </a>
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
        <Link to="/login" className="sidenav-close">
          <span className="blue-text text-darken-1">Login</span>
        </Link>
        <Link to="/register" className="sidenav-close">
          <span className="blue-text text-darken-1">Register</span>
        </Link>
      </Navbar>
    </nav>
  );
};

export default NavBar;
