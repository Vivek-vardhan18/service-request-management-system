import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        Service Request System
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        {role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;