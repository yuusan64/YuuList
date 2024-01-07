export class Task{
    constructor(id,description, isCompleted=false){
        this.id=id;
        this.description=description;
        this.isCompleted=isCompleted
    }

    toggleCompletion=()=>{this.isCompleted!=this.isCompleted};

}
