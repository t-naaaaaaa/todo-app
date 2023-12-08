import React, { useState, useEffect } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import TodoItem from './TodoItem';
import InputTodo from './InputTodo';

// JSONサーバー
const API_URL = 'http://localhost:3000/todo/';

interface Todo {
  id: number,
  title: string,
  status: boolean
}

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]); //todoのuseState

  useEffect(() => {
    fetchTodo();
  }, [])

  const fetchTodo = () => {
    fetch(API_URL).then(
      (responseData) => {
        return responseData.json();
    }).then(
      (result) => {
        setTodoList(result);
    });
  }

  const addTodo = (inputTitle: string) => {
    const addData = {
      title: inputTitle,
      status: false
    };

    fetch(API_URL, {
      body: JSON.stringify(addData),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(fetchTodo);
  }

  const deleteTodo = (id: number) => {
    const targetUrl = API_URL + id;

    fetch(targetUrl, {
      method: 'DELETE'
    }).then(fetchTodo);
  }

  const checkTodo = (id: number, title: string, status: boolean) => {
    const targetUrl = API_URL + id;
    const editData = {
      id: id,
      title: title,
      status: !status
    };

    fetch(targetUrl, {
        body: JSON.stringify(editData),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(fetchTodo);
  }


  return (
    <Container className="mt-3 mb-3">
      <Tab.Container defaultActiveKey="first">
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="first">やること</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">完了</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <InputTodo addTodo={addTodo} />
            <div className="todo-list mt-3">
              {todoList.map((todoItem: Todo) => {
                if(!todoItem.status) {
                  return (
                    <TodoItem
                      key={todoItem.id}
                      id={todoItem.id}
                      title={todoItem.title}
                      status={todoItem.status}
                      deleteTodo={deleteTodo}
                      checkTodo={checkTodo}
                    />
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <div className="complete-list mt-3">
              {todoList.map((todoItem: Todo) => {
                if(todoItem.status) {
                  return (
                    <TodoItem
                      key={todoItem.id}
                      id={todoItem.id}
                      title={todoItem.title}
                      status={todoItem.status}
                      deleteTodo={deleteTodo}
                      checkTodo={checkTodo}
                    />
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default TodoApp;
