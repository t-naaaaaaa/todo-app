import React, { useState, ChangeEvent } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface InputTodoProps {
  addTodo: (inputTitle: string) => void
}

const InputTodo = (props: InputTodoProps) => {
  const { addTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(todoTitle);
    setTodoTitle("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mt-3">
        <Form.Control className="fs-5" placeholder="やること" onChange={handleInputChange} value={todoTitle} />
        <Button variant="primary" type="submit" className="fs-5">追加</Button>
      </InputGroup>
    </Form>
  );
}

export default InputTodo;
