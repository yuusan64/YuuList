import { TaskList } from './tasklist.js';
export class TaskManager{

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