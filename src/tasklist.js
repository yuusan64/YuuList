import {Task} from './task';
export class TaskList{
    constructor(){
       this.tasks=[];
     }
     
     addTask(description, priority, detail, dueDate){
       const id=this.tasks.length+1;
       const newTask= new Task(id, description, priority, detail, dueDate);
       this.tasks.push(newTask);
     }
   
     removeTask(taskId){
       this.tasks=this.tasks.filter(task=>task.id!==taskId);
     }
     getTask(taskId) {
       return this.tasks.find(task => task.id === taskId);
     }
     toggleTaskCompletion(taskId) {
       const task = this.getTask(taskId);
       if (task) {
           task.toggleCompletion();
       }
     }
   }
   
   