const Todo = require("../models/todo.model");

exports.createTodo = (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err, todo) => {
        if (err || !todo) {
          return res.status(400).json({
            error: "something went wrong",
          });
        }
        res.json({ todo });
      });
    };

exports.getTodo = (req, res) => {
    return res.json(req.todo);
  };

exports.updateTodo = (req, res) => {
const todo = req.todo;
    todo.task = req.body.task;
    todo.save((err, todo) => {
      if (err || !todo) {
        return res.status(400).json({
          error: "something went wrong",
        });
      }
      res.json(todo);
    });
  };

  exports.deleteTodo = (req, res) => {
    const todo = req.todo;
    todo.remove((err, todo) => {
      if (err || !todo) {
        return res.status(400).json({
          error: "something went wrong",
        });
      }
      res.json({
        todo_deleted: todo,
        message: "Todo deleted successfully!",
      });
    });
  };