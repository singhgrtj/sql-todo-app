import React from 'react'

function Todo({ todo, deleteTodo }) {


    return (
        <div className="todo-div" id={todo.map((todo) => todo.id)}>
            <li>{todo.map((todo) => todo.todo)}</li>
            <button className="deleteButton" onClick={deleteTodo} >DELETE</button>
        </div>
    )
}

export default Todo
