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
