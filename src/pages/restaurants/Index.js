import axios from "axios";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    axios.get("http://localhost:8000/restaurants").then((res) => {
      console.log(res);
    });
  });
  return (
    <div>
      <h2>This is the restaurant index</h2>
    </div>
  );
};

export default Index;
