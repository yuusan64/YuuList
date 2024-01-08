export class TaskDomManager {
    constructor(taskManager, rootElement) {
        this.taskManager = taskManager;
        this.rootElement = rootElement;
    }

    addTaskToDOM(task) {
        const taskElement = document.createElement('div');
        taskElement.id = `task-${task.id}`;
        taskElement.className = 'task';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isCompleted;
        checkbox.onchange = () => this.taskManager.toggleTaskStatus(task.id);
        taskElement.appendChild(checkbox);

        const description = document.createElement('span');
        if (task.isCompleted) {
            description.classList.add('completed');
        }
        description.textContent = task.description;
        taskElement.appendChild(description);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => this.deleteTaskFromDOM(task.id);
        taskElement.appendChild(deleteButton);

        this.rootElement.appendChild(taskElement);
    }

    deleteTaskFromDOM(taskId) {
        this.taskManager.deleteTask(taskId);
        this.removeTaskFromDom(taskId);
    }

    refreshTaskList() {
        this.rootElement.innerHTML = '';
        this.taskManager.taskList.tasks.forEach(task => {
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
