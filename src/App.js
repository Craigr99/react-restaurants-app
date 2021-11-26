import { useState, useEffect } from "react";
import "./style/spacing-helper.css";
import "materialize-css/dist/css/materialize.min.css";
import "./style/App.css";
import NavBar from "./components/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES
import HomePage from "./pages/Home.js";
import LoginPage from "./pages/user/Login.js";
import RegisterPage from "./pages/user/Register.js";
import RestaurantIndex from "./pages/restaurants/Index.js";
import RestaurantShow from "./pages/restaurants/Show.js";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);
    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token", token);
    }
  };

  return (
    <div className="grey lighten-4">
      <Router>
        <NavBar
          onAuthenticated={onAuthenticated}
          authenticated={authenticated}
        />
        <main className="container margin top-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  onAuthenticated={onAuthenticated}
                  authenticated={authenticated}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage
                  onAuthenticated={onAuthenticated}
                  authenticated={authenticated}
                />
              }
            />
            <Route path="/restaurants" element={<RestaurantIndex />} />
            <Route path="/restaurants/:id" element={<RestaurantShow />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
