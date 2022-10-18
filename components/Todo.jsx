import React, {useState} from 'react';

const todoStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '17px',
    borderBottom: '1px solid black'
}

function Todo({todo, handleUpdate, handleDelete, setIsEdit, isEdit}) {
    const [textUpdate, setTextUpdate] = useState(todo.title)
    return (<div style={todoStyle} key={todo.id}>
        <div style={{fontSize: '16px', color: 'blue', width: '50px'}}>{todo.id}</div>
        {
            isEdit === todo.id ? <div style={{width: '100%', display: 'flex'}}>
                    <input type="text" value={textUpdate} onChange={e => setTextUpdate(e.target.value)}
                           style={{width: '100%'}}/>
                    <button onClick={() => {
                        handleUpdate(todo.id, textUpdate)
                        setIsEdit('')
                    }
                    }>Update
                    </button>
                    <button onClick={() => setIsEdit('')}>Cancel</button>
                </div> :
                <>
                    <div style={{fontSize: '16px', width: '100%'}}>{todo.title}</div>
                    {todo.completed ? <div style={{color: 'yellow'}}>T</div> : <div style={{color: 'red'}}>F</div>}
                    <button onClick={() =>
                        setIsEdit(todo.id)
                    }>Edit
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>remove</button>
                </>
        }

    </div>);
}

export default Todo;