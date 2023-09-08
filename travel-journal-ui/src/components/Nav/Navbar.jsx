import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <h1>Travel Journal</h1>
      <button
        type="button"
        onClick={() => {
          setIsAuthenticated(false);
          navigate("/login");
        }}
        className="logout"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
