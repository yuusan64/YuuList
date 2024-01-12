import { isThisWeek } from "date-fns";
export class Task{
  constructor(id,description, priority, detail, dueDate, isCompleted=false){
      this.id=id;
      this.description=description;
      this.detail=detail;
      this.priority=priority;
      this.dueDate=dueDate;
      this.isCompleted=isCompleted;
  }

  toggleCompletion=()=>{this.isCompleted=!this.isCompleted};

}


export class TaskList{

  constructor(){
     this.tasks=[];
     this.todayTasks=[];
     this.thisWeek=[];
   }
   
   addTask(description, priority, detail, dueDate){
     const id=this.tasks.length+1;
     const newTask= new Task(id, description, priority, detail, dueDate);
     console.log(dueDate);
     let today = new Date().toISOString().slice(0, 10)
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


export class TaskManager{

    constructor(){
      this.taskList=new TaskList();
    }
  
    loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
          const tasksArray = JSON.parse(savedTasks);
          this.taskList.tasks = tasksArray.map(taskObj => new Task(taskObj.id, taskObj.description, taskObj.priority, taskObj.detail, taskObj.dueDate, taskObj.isCompleted));
      }
    }

    addNewTask(description, priority, detail, dueDate){
      this.taskList.addTask(description, priority, detail, dueDate);
      this.saveTasks(); // Save after adding a new task
    }
  
    deleteTask(taskID){
      this.taskList.removeTask(taskID);
      this.saveTasks(); // Save after deleting a task
    }
  
    toggleTaskStatus(taskId) {
      this.taskList.toggleTaskCompletion(taskId);
      this.saveTasks();// Save task status
    }
  
    updateTask(taskId, newDescription, newPriority, newDetail, newDueDate) {
      const task = this.taskList.getTask(taskId);
      if (task) {
          task.description = newDescription;
          task.priority = newPriority;
          task.detail = newDetail;
          task.dueDate = newDueDate;
      }
      this.saveTasks(); // Save after updating a task
    }
  
    isDueToday(task) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0,0,0,0);

      console.log(`Checking task: ${task.description}, Due Date: ${dueDate}, Today: ${today}`);
        console.log(`Due Date Time: ${dueDate.getTime()}, Today Time: ${today.getTime()}`);

     
      return dueDate.getTime() === today.getTime();
    }

    getTasksForToday() {
      console.log("gettask called")
      return this.taskList.tasks.filter(task => this.isDueToday(task));
    }

    getTasksForWeek(){
      return this.taskList.tasks.filter(task=>isThisWeek(new Date(task.dueDate)));

    }
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.taskList.tasks));
    }
  }


   