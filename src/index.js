import { Stickywall } from './stickywall.js';
import './style.css';
import { TaskDomManager } from './taskDomManager.js';
import {TaskManager} from './taskmanager.js'
import { setupCreateProject } from './projectCreator.js';
import { isThisWeek } from "date-fns";

let taskDomManager;
const taskManager = new TaskManager();
   
class ListController{
    constructor(mainContent){
        this.mainContent=mainContent;
    }

    render(){
    let lists=document.getElementById('lists');
    
    if(!lists){
        lists=document.createElement('div');
        lists.id="lists";
        mainContent.appendChild(lists);
    }

    let ul=document.createElement('ul');
    let work=document.createElement('li');
    work.id='work';
    work.textContent='- Work';
    let personal=document.createElement('li');
    personal.textContent='- Personal';
    personal.id='personal';
    let createProject=document.createElement('li');
    createProject.textContent=' + Add Project';
    createProject.id='create-project';
    
    ul.appendChild(work);
    ul.appendChild(personal);
    ul.appendChild(createProject);
    
    lists.appendChild(ul);
}
}


document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.createElement('div');
    mainContent.id = 'mainContent';

    
    
    const taskListContainer = document.createElement('div');
    taskListContainer.id = 'taskListContainer';
    taskDomManager = new TaskDomManager(taskManager, taskListContainer, showModal);
    
    //load tasks from localStorage

    taskManager.loadTasks(); 

    const navbar = setupNavbar();
    const sidebar = setupSidebar(mainContent,taskDomManager);

    const content = document.createElement('div');
    content.id = 'content';
    content.appendChild(sidebar);
    content.appendChild(mainContent);

    document.body.appendChild(navbar);
    document.body.appendChild(content);

    loadHomeContent(mainContent,taskDomManager); // Load home content by default
    setupCreateProject();
    loadProjects();
});

function setupNavbar() {
    const navbar = document.createElement('div');
    navbar.id = 'navbar';
    
    const title = document.createElement('h1');
    title.textContent = 'Todo List';
    navbar.appendChild(title);

    return navbar;
}

function setupSidebar(mainContent, taskDomManager) {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    const sidebarList = document.createElement('ul');
    const menuItems = ['Home', 'Today', 'This Week', 'Lists', 'StickyWall'];

    menuItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.id = item.toLowerCase();

        if (item === 'Lists') {
            // Create a sublist for 'Lists'
            const sublist = document.createElement('ul');
            const subItems = ['Work', 'Personal', 'Add Project'];

            subItems.forEach(subItem => {
                const subListItem = document.createElement('li');
                subListItem.textContent = subItem;
                sublist.appendChild(subListItem);

                if (subItem === 'Add Project') {
                    subListItem.id = 'create-project';
                }
            });

            listItem.appendChild(sublist);
        }

        listItem.addEventListener('click', () => {
            if (item !== 'Lists') {
                loadContent(item, mainContent, taskDomManager);
            }
        });

        sidebarList.appendChild(listItem);
    });

    sidebar.appendChild(sidebarList);
    return sidebar;
}



function loadContent(contentName, mainContent, taskDomManager) {
   

    switch(contentName.toLowerCase()) {
        case 'home':
            loadHomeContent(mainContent, taskDomManager);
            break;
        case 'today':
            loadTodayContent(mainContent);
            break;
        case 'this week':
            loadThisWeekContent(mainContent);
            break;

        case 'lists':
            loadListsContent(mainContent);    
    }
}

function loadHomeContent(mainContent, taskDomManager) {

let taskListContainer = document.getElementById('taskListcontainer');
mainContent.innerHTML="";
if(!taskListContainer){
       
        const taskListContainer = document.createElement('div');
        taskListContainer.id = 'taskListContainer';    
    
        const inputContainer = document.createElement('div');
        inputContainer.id = 'taskInputContainer';
    
        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.id = 'addTaskButton';
        inputContainer.appendChild(addTaskButton);

        addTaskButton.addEventListener('click', () => {
            showModal(taskDomManager);
        });
       
        inputContainer.appendChild(addTaskButton);

        mainContent.appendChild(inputContainer);
        mainContent.appendChild(taskListContainer);

       
}
    //always refresh task list when rendered
    mainContent.appendChild(taskDomManager.rootElement);
    taskDomManager.refreshTaskList();   
    
}

function loadTodayContent(mainContent) {
    mainContent.innerHTML="";

    const todayTaskListContainer=document.createElement('div');
    todayTaskListContainer.id='todayTaskListContainer';
    mainContent.appendChild(todayTaskListContainer);

    const todayTasks = taskManager.getTasksForToday();
    console.log(todayTasks);
    if (todayTasks.length === 0) {
        mainContent.innerHTML = "<p>No tasks due today.</p>";
    } else {
        
        todayTasks.forEach(task => {
            const todayTaskDomManager= new TaskDomManager(taskManager, todayTaskListContainer, showModal)
            todayTaskDomManager.addTaskToDOM(task);
        });
    }
}

function loadThisWeekContent(mainContent) {
    console.log("Imcalled")
    mainContent.innerHTML="";

    const thisWeekContainer=document.createElement('div');
    thisWeekContainer.id="thisWeekContainer";
    mainContent.appendChild(thisWeekContainer);

    const thisWeekTasks= taskManager.getTasksForWeek();

    if(thisWeekTasks.length===0){
        mainContent.innerHTML = "<p>No tasks due this week.</p>";
    } else{

        thisWeekTasks.forEach(task=>{
            
            const thisWeekDomManager=new TaskDomManager(taskManager, thisWeekContainer, showModal)
            thisWeekDomManager.addTaskToDOM(task); 
        })
    }

}

function loadListsContent(mainContent){
    let lists=document.getElementById('lists');
    
    if(!lists){
        lists=document.createElement('div');
        lists.id="lists";
        mainContent.appendChild(lists);
    }
    
  

}


function showModal(taskDomManager,isEdit = false, task = {}) {

    const modal = document.createElement('div');
    modal.id = 'taskModal';
    modal.className = 'task-modal';

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
}


function loadProjects(){
    
    const projects=JSON.parse(localStorage.getItem('projects')) || [];
    const lists=document.getElementById('lists');

    projects.forEach(projectName=>{
        let projectItem=document.createElement('li');
        projectItem.textContent=projectName;
        lists.appendChild(projectItem);
    })



}

/*



*/
