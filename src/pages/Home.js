import { Button } from "react-materialize";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="center flex flex-column">
      <h1 className="bold">Welcome to Restauranty!</h1>
      <p className="flow-text">
        A site where you can view restaurants from around the world!
      </p>
      <h6>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
        consequuntur quisquam quae corporis tenetur, numquam perferendis
        consequatur possimus mollitia exercitationem praesentium!
      </h6>
      <Link to={"/restaurants"}>
        <Button className="mt3 grey darken-4" waves="light">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default Home;
