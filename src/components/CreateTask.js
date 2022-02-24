import React, { useState } from 'react';
function CreateTask({ addTask }) {
    const [value, setValue] = useState("");
    
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                data-testid="todo-add"

                onChange={e => setValue(e.target.value)}
            />

            <button style={{display:"none"}} type="submit" data-testid="todo-add-submit">Submit</button>
        </form>
    );
}
export default CreateTask;