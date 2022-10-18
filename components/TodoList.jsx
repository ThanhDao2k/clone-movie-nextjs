import React, {useState} from 'react';
import Todo from "./Todo";

function TodoList({data, handleUpdate,handleDelete}) {
    const [isEdit, setIsEdit] = useState(null)
    return (
        <div style={{
            overflowY: 'scroll', height: '750px'
        }}>
            {
                data?.length > 0 ? (data?.map(todo => <Todo todo={todo} handleDelete={handleDelete} handleUpdate={handleUpdate} isEdit={isEdit} setIsEdit={setIsEdit}  />)) : (
                    <h2>Loading....</h2>)
            }
        </div>
    );
}

export default TodoList;