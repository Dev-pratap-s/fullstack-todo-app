import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../service/api";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout"); // backend logout route
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", borderBottom: "1px solid #ccc" }}>
      {user ? (
        <>
          <Link to="/">Todos</Link>
          <Link to="/create">Create Todo</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}