import { TaskManager } from "./taskmanager";
export class TaskDomManager {
    constructor(taskManager, rootElement, showModalFunction) {
        
        this.taskManager = taskManager;
        this.tasks = taskManager.taskList.tasks;
        this.rootElement = rootElement;//DOM element where tasks will be displayed
        this.showModal = showModalFunction;
    }

    //create DOM elements for task and append to root
    addTaskToDOM(task) { 

        const taskElement = document.createElement('div');
        taskElement.id = `task-${task.id}`;
        taskElement.className = 'task';
        
        // Description
        const description = document.createElement('span');
        description.textContent = task.description;
        taskElement.appendChild(description);

        const buttons=document.createElement('div');
        buttons.id='buttons';
    
        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => this.showModal(this,true, task);
        buttons.appendChild(editButton);
        
    
        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => this.deleteTaskFromDOM(task.id);
        buttons.appendChild(deleteButton);
        taskElement.appendChild(buttons);
    
        this.rootElement.appendChild(taskElement);

    }
    

    deleteTaskFromDOM(taskId) {
        this.taskManager.deleteTask(taskId);
        this.removeTaskFromDom(taskId);
    }

    refreshTaskList() {
        this.rootElement.innerHTML = '';

        //sort tasks(uncompleted first, then completed tasks)
        const sortedTasks = this.taskManager.taskList.tasks.slice().sort((a, b) => {  
            return a.isCompleted - b.isCompleted;
            //if a.isCompleted and b.isCompleted both true(or both false), returns 0--->no change
            //if a.isCompleted true and b.isCompleted false, returns 0-1 = -1. So a will come before b
            //if a.isCompleted false and b.isCompleted true, returns 1-0=1. So a will come after b
        });
        sortedTasks.forEach(task => {
            this.addTaskToDOM(task);
        });
       
    }

    removeTaskFromDom(taskId) {
        const taskElement = document.getElementById(`task-${taskId}`);
        if (taskElement) {
            this.rootElement.removeChild(taskElement);
        }
    }
}
