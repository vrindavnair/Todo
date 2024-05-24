
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasktodo = () => {
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:6000/api/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    const addTask = async () => {
        try {
            const { data } = await axios.post('http://localhost:6000/api/tasks', { description, completed: false });
            setTasks([...tasks, data]);
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    const updateTask = async (id) => {
        try {
            const task = tasks.find(t => t._id === id);
            const { data } = await axios.put(`http://localhost:6000/api/tasks/${id}`, { ...task, completed: !task.completed });
            setTasks(tasks.map(t => t._id === id ? data : t));
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:6000/api/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.description}
                        </span>
                        <button onClick={() => updateTask(task._id)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasktodo;


