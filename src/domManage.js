import { Task } from './task.js';
import { TaskList } from './tasklist.js';
export class TaskDomManager{

    constructor(taskManager, rootElement){
        this.taskManager=taskManager;
        this.rootElement=rootElement;
    }

    addTaskToDOM(task){
        //create task element
        const taskElement=document.createElement('div');
        taskElement.id=`task-${task.id}`;
        taskElement.className='task';
        
        //checkbox
        const checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.checked=task.isCompleted;
        checkbox.onchange=()=> toggleTaskStatus(task.id);
        taskElement.appendChild(checkbox);

        //description
        const description=document.createElement('span');
        if(task.isCompleted){
            description.classList.add('completed');
        }
        description.textContent=task.description;
        taskElement.appendChild(description);


        //delete button
        const deleteButton= document.createElement('button');
        deleteButton.textContent='Delete';
        deleteButton.onclick=()=> deleteTaskfromDOM(task.id);
        taskElement.appendChild(deleteButton);


        this.rootElement.appendChild(taskElement);
    }


    refreshTaskList(){
        this.rootElement.innerHTML ='';
        this.taskManager.taskList.tasks.forEach(task => {
            this.addTaskToDOM(task);
        });
    }

    removeTaskFromDom(taskId){
        const taskElement=document.getElementById(`task-${taskId}`);
        if(taskElement){
            this.rootElement.removeChild(taskElement);
        }
    }

}