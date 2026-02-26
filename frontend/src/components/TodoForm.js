import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../service/api";
import "../styles/TodoForm.css";   // 👈 Import CSS

export default function TodoForm({ fetchTodos }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        try {
          const res = await API.get(`/v1/getTodo/${id}`, { withCredentials: true });
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
        } catch (err) {
          console.error(err);
          navigate("/");
        }
      };
      fetchTodo();
    }
  }, [id, navigate]);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (id) {
      await API.put(`/v1/updateTodo/${id}`, { title, description }, { withCredentials: true });
    } else {
      await API.post("/v1/createTodo", { title, description }, { withCredentials: true });
    }

    setTitle("");
    setDescription("");
    if (fetchTodos) fetchTodos();
    navigate("/");
  } catch (err) {
    console.error(err.response || err);
    alert(err.response?.data?.message || "Error saving todo");
  }
};

  return (
    <div className="todo-page">
      <div className="todo-card">
        <form onSubmit={handleSubmit}>
          <h2>{id ? "Update Todo" : "Create New Todo"}</h2>

          <input
            className="todo-input"
            placeholder="Enter Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <textarea
            className="todo-input"
            placeholder="Enter Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button className="todo-btn" type="submit">
            {id ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}
