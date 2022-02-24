import React, { useState, useEffect } from 'react';
import './Todo.css';
import Task from './components/Task';
import CreateTask from './components/CreateTask'
function App()
 {
  
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            id:Math.floor(Math.random() *1000),
            title: "Eat",
            completed: true
        },
        {
            id:Math.floor(Math.random() *1000),
            title: "Sleep",
            completed: true
        },
        {
            id:Math.floor(Math.random() *1000),
            title: "Relax",
            completed: false
        }
    ]);

    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) },[tasks]);


    const addTask = title => {
        const newTasks = [...tasks, { id:Math.floor(Math.random() *1000),title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const editTask = (id,newName) => {
      
      const editedTaskList = tasks.map(task => {
        if (id === task.id) {
          return { ...task, title: newName }
        }
        return task;
      });
      setTasks(editedTaskList);
  };
		    
    

    return (
        <div className="todo-container" data-testid="app">
            <div className="header">Pending task(s) ({tasksRemaining})</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    editTask={editTask}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}



export default App;