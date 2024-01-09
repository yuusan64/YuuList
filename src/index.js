import { Stickywall } from './stickywall.js';
import './style.css';
import { TaskDomManager } from './taskDomManager.js';
import {TaskManager} from './taskmanager.js'

const taskManager = new TaskManager();

document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.createElement('div');
    navbar.id = 'navbar';
    const title = document.createElement('h1');
    title.textContent = 'Todo List';
    navbar.appendChild(title);
    document.body.appendChild(navbar);
    //create sideBar

    const sidebar=document.createElement('div');
    sidebar.id='sidebar';
    const sidebarList=document.createElement('ul');
    const menuItems = ['Home', 'Projects', 'Lists', 'StickyWall'];

    menuItems.forEach(item=>{
        console.log("hi")
        const listItem=document.createElement('li');
        listItem.textContent=item;
        listItem.id=item.toLowerCase();
        listItem.addEventListener('click', ()=> loadContent(item));
        sidebarList.appendChild(listItem);
    });
    
     
    sidebar.appendChild(sidebarList);

    

   
   

    const mainContent=document.createElement('div');
    mainContent.id='mainContent';
   

    const content=document.createElement('div');
    content.id='content';
    content.appendChild(sidebar);
    content.appendChild(mainContent);
    document.body.appendChild(content);

function loadContent(contentName){
    
    mainContent.innerHTML="";
    const content=document.createElement('div');
    mainContent.appendChild(content);
    if(contentName=="StickyWall"){
        new Stickywall(mainContent.id);
    }
    
    else if(contentName=="Home"){

    const inputContainer = document.createElement('div');
    inputContainer.id = 'taskInputContainer';
    const taskListContainer = document.createElement('div');
    taskListContainer.id = 'taskListContainer';    

    // Create input field for new tasks
    const newTaskInput = document.createElement('input');
    newTaskInput.id = 'newTaskDescription';
    newTaskInput.placeholder = 'Enter a new task';
 
    inputContainer.appendChild(newTaskInput);

    const taskDomManager = new TaskDomManager(taskManager, taskListContainer, showModal);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.id = 'addTaskButton';
    mainContent.appendChild(addTaskButton);

    addTaskButton.addEventListener('click', () => {
        showModal(taskDomManager);
    });
    mainContent.appendChild(taskListContainer);
  }

  else if(contentName ==="Lists"){
    let lists=document.getElementById('lists');
    let ul=document.createElement('ul');
    let work=document.createElement('li');
    work.id='work';
    work.textContent='- Work';
    let personal=document.createElement('li');
    personal.textContent='- Personal';
    personal.id='personal';
    let createProject=document.createElement('li');
    createProject.textContent=' + Create Project';
    createProject.id='create-project';
    
    ul.appendChild(work);
    ul.appendChild(personal);
    ul.appendChild(createProject);
    
    lists.appendChild(ul);

    createProject.onclick=CreateProject();

    
  }
}

loadContent('Home');
loadContent('Lists');

function showModal(taskDomManager,isEdit = false, task = {}) {

    const modal = document.createElement('div');
    modal.id = 'taskModal';
    modal.className = 'modal';

    // Create and add a form to the modal
    const form = document.createElement('form');
    modal.appendChild(form);

    // Description input
    const descriptionInput = document.createElement('input');
    descriptionInput.id = 'modalDescription';
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Enter task description';
    descriptionInput.value = isEdit ? task.description : '';
    form.appendChild(descriptionInput);

    // Detail input
    const detailInput = document.createElement('textarea');
    detailInput.id = 'modalDetail';
    detailInput.placeholder = 'Enter task details';
    detailInput.value = isEdit ? task.detail : '';
    form.appendChild(detailInput);

    // Due date input
    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'modalDueDate';
    dueDateInput.type = 'date';
    dueDateInput.value = isEdit ? task.dueDate : '';
    form.appendChild(dueDateInput);

    // Priority select
    const priorityInput = document.createElement('select');
    priorityInput.id = 'modalPriority';
    ['High', 'Medium', 'Low'].forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        if (isEdit && task.priority === priority) {
            option.selected = true;
        }
        priorityInput.appendChild(option);
    });
    form.appendChild(priorityInput);

    // Add Task/Save Changes button
    const submitButton = document.createElement('button');
    submitButton.textContent = isEdit ? 'Save Changes' : 'Add Task';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Form submission event
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
    
        // Extract values from the form inputs
        const description = descriptionInput.value.trim();
        const detail = detailInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
    
        if (isEdit) {
            // Update existing task
            taskManager.updateTask(task.id, description, priority, detail, dueDate);
        } else {
            // Add new task
            taskManager.addNewTask(description, priority, detail, dueDate);
        }
    
        // Refresh the task list to reflect the changes
        taskDomManager.refreshTaskList();
    
        // Close the modal
        document.body.removeChild(modal);
    }
};
});






