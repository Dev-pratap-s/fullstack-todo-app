import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../service/api";
import { AuthContext } from "../context/AuthContext";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await API.get("/v1/getTodo");
      setTodos(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/v1/deletetodo/${id}`, { withCredentials: true });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await API.get("/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="dashboard">
      
      <div className="top-bar">
        <h2>My Todos</h2>
        <div>
          <Link to="/create" className="create-btn">+ Create Todo</Link>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="todo-grid">
        {todos.length === 0 ? (
          <p className="no-todo">No todos found 🚀</p>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className="todo-card">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>

              <div className="card-actions">
                <Link to={`/update/${todo._id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
