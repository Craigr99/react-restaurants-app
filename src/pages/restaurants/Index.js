import axios from "axios";
import { useEffect, useState } from "react";

// const getRandomNumber = () => {
//   return Math.floor(Math.random() * 206);
// };

const Index = () => {
  const [restaurants, setRestaurants] = useState(null);
  useEffect(() => {
    axios
      .get("https://craig-restaurants-api.herokuapp.com/restaurants")
      .then((res) => {
        console.log(res.data.restaurants);
        setRestaurants(res.data.restaurants);
      });
  }, []);

  if (!restaurants) return null;

  return (
    <div>
      <h2>This is the restaurant index</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          {/* <img
            src={
              "https://source.unsplash.com/collection/190727/?sig=" +
              getRandomNumber()
            }
          /> */}
          <p>{restaurant.name}</p>
        </div>
      ))}
    </div>
  );
};
export default Index;
