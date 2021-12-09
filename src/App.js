import { useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./style/App.css";
import NavBar from "./components/Navbar.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//PAGES
import HomePage from "./pages/Home.js";
import LoginPage from "./pages/user/Login.js";
import RegisterPage from "./pages/user/Register.js";
import RestaurantIndex from "./pages/restaurants/Index.js";
import RestaurantShow from "./pages/restaurants/Show.js";
import RestaurantCreate from "./pages/restaurants/Create.js";
import RestaurantEdit from "./pages/restaurants/Edit.js";
import ReviewCreate from "./pages/reviews/Create.js";
import NotFound from "./pages/NotFound.js";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  let protectedRoutes;

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

  const onToastToggled = (text, style) => {
    window.M.toast({ html: text, classes: style || "" }, 1000);
  };

  if (authenticated) {
    protectedRoutes = (
      <>
        <Route
          path="/restaurants/create"
          element={
            authenticated ? (
              <RestaurantCreate onToastToggled={onToastToggled} />
            ) : (
              <Navigate to="*" replace />
            )
          }
        />
        <Route
          path="/restaurants/:id/edit"
          element={
            authenticated ? (
              <RestaurantEdit onToastToggled={onToastToggled} />
            ) : (
              <Navigate to="*" replace />
            )
          }
        />
        <Route
          path="/reviews/:id/create"
          element={
            authenticated ? <ReviewCreate /> : <Navigate to="*" replace />
          }
        />
      </>
    );
  }

  return (
    <div className="grey lighten-4">
      <Router>
        <NavBar
          onAuthenticated={onAuthenticated}
          authenticated={authenticated}
          onToastToggled={onToastToggled}
        />
        <main className="container">
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
                  onToastToggled={onToastToggled}
                />
              }
            />
            <Route
              path="/restaurants"
              exact
              element={<RestaurantIndex authenticated={authenticated} />}
              onToastToggled={onToastToggled}
            />
            <Route
              path="/restaurants/page=:page"
              exact
              element={<RestaurantIndex authenticated={authenticated} />}
              onToastToggled={onToastToggled}
            />
            {protectedRoutes}

            <Route
              path="/restaurants/:id"
              element={
                <RestaurantShow
                  authenticated={authenticated}
                  onToastToggled={onToastToggled}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
