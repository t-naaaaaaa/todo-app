const express = require("express");
const app = express();
const port = 80;
const todoPath = "/todo";
const helmet = require("helmet");
require("dotenv").config();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let todo_item = [
  { id: 1, title: "買い物", status: false },
  { id: 2, title: "掃除", status: false },
  { id: 3, title: "課題", status: false },
  { id: 4, title: "ジム", status: true },
];

app.get(todoPath, (req, res) => {
  res.json(todo_item);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
