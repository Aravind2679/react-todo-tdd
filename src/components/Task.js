import React, { useState} from 'react';
import {AiFillEdit,AiFillDelete,AiOutlineCheckCircle} from "react-icons/ai"
function Task({ task, index, completeTask, removeTask,editTask }) 
{
 
  const [newName, setNewName] = useState('');
  const [isEditing, setEditing] = useState(false);
  console.log(isEditing+" "+task.title);
  const view= (<div
                   data-testid={"todo-class-"+task.title} className={task.completed ? "task completed" : "task not-completed" }
                  style={{ textDecoration: task.completed ? "line-through" : "" }}
              >
                  {task.title}
                 

                  <button  data-testid={"delete-button-"+task.title} style={{ background: "red" }} onClick={() => removeTask(index)}><AiFillDelete/></button>
                  <button  data-testid={"todo-"+task.title} style={{ background: "green" }} onClick={() => completeTask(index)}><AiOutlineCheckCircle/></button>
                  <button  data-testid={"todo-edit-"+task.title} onClick={() => setEditing(true)}><AiFillEdit /></button>


               </div>
              );

    function handleChange(e) {
      setNewName(e.target.value);
     
    }

    function handleSubmit(e) {
      e.preventDefault();
      if(newName.length>0)
      editTask(task.id,newName);
      setNewName("");
      setEditing(false);
    }
  const edit= (
               <form onSubmit={handleSubmit}>
               <input
                    id={task.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    data-testid={"todo-edit-input-"+task.title}
                    autoFocus
               />
               <div className="btn-group">
              <button
                type="button"
                className="btn todo-cancel"
                onClick={() => setEditing(false)}
              >
                Cancel
                <span className="visually-hidden">renaming {task.title}</span>
              </button>
              <button type="submit" className="btn btn__primary todo-edit">
                Save
                <span className="visually-hidden">new name for {task.title}</span>
              </button>
            </div>

              </form>
  );
    return (
               isEditing?edit:view
           );
}

export default Task;