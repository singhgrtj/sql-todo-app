import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { v4 } from 'uuid';

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

  useEffect(() => {
    const url = "http://localhost:3001/todos";
    
    fetchTodo(url);
  }, [])

  const fetchTodo = async (url) => {
    await fetch(url, {
      method: 'GET'
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setTodos(data.map((d) => 
        [
        {'id': d.id, 
        'todo': d.todo, 
        'date': d.date}
        ]
      ));
    })
    .catch((err) => {
        console.error(err);
    });
  }

  const addTodo = (event) => {
    event.preventDefault();

    const url = "http://localhost:3001/";

    const addNew = async (url) => {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': v4(), 'todo': input, 'date': today})
      })
      .then((res) => {
          return res.json();
      })
      .then((data) => {
        setTodos([...todos, [{
          'id': data.id, 
          'todo': data.todo, 
          'date': data.date
        }]])
      })
      .catch((err) => {
          console.error(err);
      });
    }

    addNew(url);
    setInput('');
  }

  const deleteTodo = (event) => {
    event.preventDefault();
    let selectedTodoID = event.target.parentNode.id;

    const url = 'http://localhost:3001/todo/delete';
    
    const deleteTodo = async (url) => {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': selectedTodoID})
      })
      .then((res) => {
          return res.json();
      })
      .then((data) => {
        const url = "http://localhost:3001/todos";
        fetchTodo(url);
      })
      .catch((err) => {
          console.error(err);
      });
    }

    deleteTodo(url);
    
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
        <div className="container-todos-list">
          {todos.map(todo => (
              <Todo key={v4()} id={todo.id} todo={todo} deleteTodo={deleteTodo}/>
            ))}
        </div>
      </div>

    </div>
  );
}

export default App;
