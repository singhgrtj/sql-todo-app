import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import Header from './components/Header';
import Todo from './components/Todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy; 

  const addTodo = (event) => {
    event.preventDefault();

    setTodos([...todos, input]);

    setInput('');
  }

  const toggleTodo = (event) => {
    event.target.style = "text-decoration-line: line-through;";
  }

  return (
    <div className="App">
      <Header />
      <form>
          <TextField className="input" id="standard-basic" label="Standard" type="text" onChange={event => setInput(event.target.value)} value={input}/>
          <Button className="submit" variant="contained" color="primary" disabled={!input} type="submit" onClick={addTodo}>Add Todo</Button>
      </form>

      <div className="container-todos">
        <div className="container-todos-title">
          <span className="todos-title">({today}) TODO list:</span> 
        </div>
        <ul>
          {todos.map(todo => (
              <Todo key={uuidv4()} todo={todo} onClick={toggleTodo}/>
            ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
