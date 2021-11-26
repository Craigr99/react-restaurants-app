import { useParams } from "react-router";
const Show = () => {
  let { id } = useParams();
  //   const [restaurants, setRestaurants] = useState(null);
  //   useEffect(() => {
  //     axios
  //       .get("https://craig-restaurants-api.herokuapp.com/restaurants")
  //       .then((res) => {
  //         console.log(res.data.restaurants);
  //         setRestaurants(res.data.restaurants);
  //       });
  //   }, []);

  //   if (!restaurants) return null;

  return (
    <div>
      <h2>Restairant index</h2>
      {id}
      {/* <Row>
        <Col>
          <h3>List of Restaurants</h3>
        </Col>
      </Row>
      <Row>
        <Col m={6}>
          <Row>
            {restaurants.map((restaurant, i) => {
              return <RestaurantCard restaurant={restaurant} index={i} />;
            })}
          </Row>
        </Col>
        <Col m={6} style={{ backgroundColor: "red" }}>
          <Col m={3}>Map goes here</Col>
        </Col>
      </Row> */}
    </div>
  );
};
export default Show;
