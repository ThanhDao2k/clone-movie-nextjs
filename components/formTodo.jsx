import React, {useState} from 'react';

function FormTodo({handleClick}) {
    const [newTodo, setNewTodo] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        const todo = {
            title: newTodo,
            completed: false
        }
        handleClick?.(todo)
        setNewTodo('')
    }
    const handleChange = (e) => {
        setNewTodo(e.target.value)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={newTodo} name="newTodo" onChange={handleChange}
                   style={{width: '100%', height: '30px', padding: '5px', fontSize: '16px'}}/>
        </form>
    );
}

export default FormTodo;