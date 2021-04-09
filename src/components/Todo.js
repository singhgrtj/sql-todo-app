import React from 'react'

function Todo({ todo, onClick }) {
    return <li onClick={onClick}>{todo}</li>
}

export default Todo
