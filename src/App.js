// import { Row, Col, Card, CardTitle } from "react-materialize";
import "./style/spacing-helper.css";
import "materialize-css/dist/css/materialize.min.css";
import "./style/App.css";
import NavBar from "./components/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES
import LoginPage from "./pages/user/Login.js";
import RegisterPage from "./pages/user/Register.js";

const App = () => {
  return (
    <div className="grey lighten-4">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;