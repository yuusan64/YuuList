import { TaskList } from './tasklist.js';
export class TaskManager{

    constructor(){
      this.taskList=new TaskList();
    }
  
    addNewTask(description, priority, detail, dueDate){
      this.taskList.addTask(description, priority, detail, dueDate);
    }
  
    deleteTask(taskID){
      this.taskList.removeTask(taskID);
    }
  
    toggleTaskStatus(taskId) {
      this.taskList.toggleTaskCompletion(taskId);
    }
  
    updateTask(taskId, newDescription, newPriority, newDetail, newDueDate) {
      const task = this.taskList.getTask(taskId);
      if (task) {
          task.description = newDescription;
          task.priority = newPriority;
          task.detail = newDetail;
          task.dueDate = newDueDate;
      }
  }
  
  }