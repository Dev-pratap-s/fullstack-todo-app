const Todo = require("../models/Todo");


// 🔹 GET ALL TODOS (Logged in user ke)
exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
      message: "User todos fetched successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// 🔹 GET SINGLE TODO BY ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user, // ensure user sirf apna todo dekhe
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo fetched successfully",
    });

  } catch (error) {
    console.error(error);

    // invalid ObjectId case
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};