import React, { useState} from 'react';

const ToDoList=()=>{
    const[tasks, setTasks]=useState([])
    const[newTask,setNewTask]=useState('')
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('');

    const handleInputChange=(e)=>{
        setNewTask(e.target.value);
    };

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if (newTask.trim()!==''){
            setTasks([...tasks,{text:newTask,completed:false}]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion=(index)=>{
        const updatedTasks=tasks.map((task,i)=>
        i===index?{...task,completed:!task.completed} : task
        );
        setTasks(updatedTasks);
    };

    const handleEditChange = (e) => {
        setEditText(e.target.value);
    };

    const startEditing = (index) => {
        setEditIndex(index);
        setEditText(tasks[index].text);
    };

    const saveEdit = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editText } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditText('');
    };


    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return(
        <div>
            <h1>ToDO List</h1>
            <form onSubmit={handleFormSubmit}>
            <input type="text" value={newTask} onChange={handleInputChange}
            placeholder="Enter a new task"/>

            <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task,index)=>(
                    <li key={index} style={{ textDecoration:task.completed?'line-through':'none',}}>
                        {editIndex==index?(
                            <div>
                                <input type="text" value={editText} onChange={handleEditChange}/>
                                <button onClick={()=>saveEdit(index)}>Save</button>
                            </div>
                        ):(
                            <div>
                                <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
                                <button onClick={() => startEditing(index)}>Edit</button>
                                <button onClick={() => deleteTask(index)}>Delete</button>
                            </div>

                        )}
                        

                    </li>

                ))}
            </ul>

        </div>
    );
};

export default ToDoList;