import React from 'react';

import './css/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/style.css';

import Header from './components/Header';
import TodoApp from './components/TodoApp';

const App = () => {
  return (
    <>
      <Header />
      <TodoApp />
    </>
  );
}

export default App;
