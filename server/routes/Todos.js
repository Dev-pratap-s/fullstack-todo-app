    const express = require('express');
    const router = express.Router();

    // Import controllers
    const { createTodo } = require("../controllers/createTodo");
    const { getTodo, getTodoById } = require("../controllers/getTodo");
    const { updateTodo } = require("../controllers/updatetodo");
    const { deleteTodo } = require("../controllers/deletetodo");

    const { auth } = require("../middleware/authMiddleware");

    router.post("/createTodo", auth, createTodo);
    router.get("/getTodo", auth, getTodo);
    router.get("/getTodo/:id", auth, getTodoById);
    router.put("/updateTodo/:id", auth, updateTodo);
    router.delete("/deletetodo/:id", auth, deleteTodo);


    module.exports = router;
