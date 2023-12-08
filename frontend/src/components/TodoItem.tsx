import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface TodoItemProps {
  id: number,
  title: string,
  status: boolean,
  deleteTodo: (id: number) => void,
  checkTodo: (id: number, title: string, status: boolean) => void
}

const TodoItem = (props: TodoItemProps) => {
  const {
    id,
    title,
    status,
    deleteTodo,
    checkTodo,
  } = props;

  return (
    <InputGroup className="mt-2">
      <InputGroup.Text>
        <Form.Check
          className="mt-0"
          checked={status}
          onChange={() => checkTodo(id, title, status)}
        />
      </InputGroup.Text>
      <span
        className={`form-control fs-5 ${
          status && "complete-item-text"
        }`}
      >
        {title}
      </span>
      <Button
        type="button"
        variant="outline-danger"
        onClick={() => deleteTodo(id)}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
    </InputGroup>
  );
}

export default TodoItem;
