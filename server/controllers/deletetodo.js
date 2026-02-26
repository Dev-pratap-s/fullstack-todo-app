const Todo = require("../models/Todo");

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // ID ko le liya params se
    
    // Todo ko find karke delete kar rahe hain
    const todo = await Todo.findByIdAndDelete(id);
    
    // Agar todo nahi mila, toh error dikha rahe hain
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
      error: err.message,
    });
  }
};
