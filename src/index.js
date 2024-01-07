console.log("I'n running")

import { Task } from './task.js';
import { TaskList } from './tasklist.js';
import { TaskDomManager } from './domManage.js';

class TaskManager{

  constructor(){
    this.taskList=new TaskList();
  }

  addNewTask(description){
    this.taskList.addTask(description);
  }

  deleteTask(taskID){
    this.taskList.removeTask(taskID);
  }

  toggleTaskStatus(taskId) {
    this.taskList.toggleTaskCompletion(taskId);
  }


}


class StickyWall{
constructor(title,desc){
    this.title=title;
    this.desc=desc;
}
}


const taskManager= new TaskManager();
const taskDomManager= new TaskDomManager(taskManager, document.getElementById('task'));

function addNewTask(description){
    taskManager.addNewTask(description);
    taskDomManager.refreshTaskList();
}

export function deleteTaskFromDOM(taskId){
    taskManager.deleteTask(taskId);
    taskDomManager.removeTaskFromDOM(taskId);
}

function toggleTaskStatus(taskId){
    taskManager.toggleTaskStatus(taskId);
    taskDomManager.refreshTaskList();
}