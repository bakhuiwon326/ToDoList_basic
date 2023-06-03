import React, { useState } from "react";

function AddTodo({addItem}){
    const [newTodo, setNewTodo] = useState({title:""});
    
    const handleChange = (event) => {
        setNewTodo({
            ...newTodo,
            [event.target.name]: event.target.value
        });
    };

    const handleAddClick = (event) => {
        addItem(newTodo);
        setNewTodo({id:0, title:"", done:false});
    };

    return(
        <>
            <input type="text" name="title" value={newTodo.title} onChange={handleChange} />
            <button onClick={handleAddClick}>ToDo추가</button>
        </>
    )
}

export default AddTodo;