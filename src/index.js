import './style.css';
import { TaskDomManager } from './taskDomManager.js';
import {TaskManager} from './taskmanager.js'

document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('taskInputContainer');
    const taskListContainer = document.getElementById('taskListContainer');

    // Create input field for new tasks
    const newTaskInput = document.createElement('input');
    newTaskInput.id = 'newTaskDescription';
    newTaskInput.placeholder = 'Enter a new task';
 
    inputContainer.appendChild(newTaskInput);

    // Initialize TaskManager and TaskDomManager
    const taskManager = new TaskManager();
    const taskDomManager = new TaskDomManager(taskManager, taskListContainer);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.id = 'addTaskButton';
    inputContainer.appendChild(addTaskButton);
    document.getElementById('addTaskButton').addEventListener('click', () => {
        const description = newTaskInput.value;
        taskManager.addNewTask(description);
        newTaskInput.value="";
        taskDomManager.refreshTaskList();
        
    });

  
});