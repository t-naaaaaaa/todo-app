const express = require("express");
const app = express();
const port = 3000;
const todoPath = "/todo";
const helmet = require("helmet");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rootユーザーのパスワードを入力",
  database: "db_todo_l18",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to MySQL! ");
});

app.get(todoPath, (req, res) => {
  const selectQuery = "SELECT * FROM todo_item";
  connection.query(selectQuery, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.post(todoPath, (req, res) => {
  const { title } = req.body;
  const insertQuery = `
    INSERT INTO todo_item (id, title, status) VALUES
    (null, '${title}', 0)
  `;
  connection.query(insertQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.put(`${todoPath}/:id`, (req, res) => {
  const requestId = Number(req.params.id);
  const { status } = req.body;
  const updateQuery = `
    UPDATE todo_item
    SET    status=${status}
    WHERE  id=${requestId}
  `;
  connection.query(updateQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.delete(`${todoPath}/:id`, (req, res) => {
  const requestId = Number(req.params.id);
  const deleteQuery = `
    DELETE
    FROM   todo_item
    WHERE  id=${requestId}
  `;
  connection.query(deleteQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
