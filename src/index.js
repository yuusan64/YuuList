import { Stickywall } from './stickywall.js';
import './style.css';
import { TaskDomManager } from './taskDomManager.js';
import {TaskManager} from './taskmanager.js'
import { setupCreateProject, saveProjects} from './projectCreator.js';
import { isThisWeek } from "date-fns";

let taskDomManager;
const taskManager = new TaskManager();

document.addEventListener('DOMContentLoaded', () => {
   
    const mainContent = document.createElement('div');
    mainContent.id = 'mainContent';
    
    const footer = document.createElement('footer');
    footer.className = 'footer';

    const iconImg = document.createElement('div');
    iconImg.classList.add('iconImg');
    iconImg.alt = 'GitHub Icon';
    

    const text = document.createTextNode(' Copyright @yuusan64 ')
    const bar=document.createTextNode("|");
    const iconSrc=document.createElement('div');
    iconSrc.textContent=' Icons by '
    const icons=document.createElement('a');
    icons.textContent="Icons8"
    icons.href="https://icons8.com/";
    icons.style.color="#5cb85c";

    let left=document.createElement('div');
    left.appendChild(iconImg);
    left.appendChild(text);
    footer.appendChild(left);

    footer.appendChild(bar);

    let right=document.createElement('div');
    right.appendChild(iconSrc);
    right.appendChild(icons);
    right.id="right";
    left.id="left";

    footer.appendChild(right);

    document.body.appendChild(footer);
    

    const taskListContainer = document.createElement('div');
    taskListContainer.id = 'taskListContainer';
    taskDomManager = new TaskDomManager(taskManager, taskListContainer, createModal);
    
    //load tasks from localStorage

    const sidebar = setupSidebar(mainContent,taskDomManager);
  

    const content = document.createElement('div');
    content.id = 'content';
    content.appendChild(sidebar);
    content.appendChild(mainContent);

    document.body.appendChild(content);

    loadHomeContent(mainContent,taskDomManager); // Load home content by default
    setupCreateProject();
    taskManager.loadTasks();  // Load tasks from localStorage
    loadProjects(mainContent); // Then load projects

   const currentProject = localStorage.getItem('currentProject');
    if (currentProject) {
        loadTasksForProject(currentProject, mainContent);
    } 
    else{
        loadHomeContent(mainContent, taskDomManager); // Load home content by default
    }


});


function setupSidebar(mainContent, taskDomManager) {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    const title = document.createElement('h1');
    
   
    
    const yuuSpan = document.createElement('span');
    yuuSpan.textContent = 'Yuu';
    yuuSpan.className = 'yuu-title';
    title.appendChild(yuuSpan);
    
    const listSpan = document.createElement('span');
    listSpan.textContent = 'List';
    listSpan.className = 'list-title';
    title.appendChild(listSpan);

    sidebar.appendChild(title);
    const todoIcon=document.createElement('div');
    todoIcon.classList.add('todo-icon');

    title.appendChild(todoIcon);
    

    const sidebarList = document.createElement('ul');                                              
    const menuItems = ['Home', 'Today', 'This Week', 'Lists', 'StickyWall'];                       
    
    menuItems.forEach(item => {
       
        
        if (item === 'Lists') {
            const listItem = document.createElement('ul');
            listItem.id = item.toLowerCase();
            const listTitle=document.createElement('div');
            listTitle.id=item.toLowerCase()+"-items";
            listTitle.textContent=item;
           listItem.appendChild(listTitle);

            
            const sublist = document.createElement('ul');
            sublist.id="sublist";
           
            const subItems = ['Work', 'Personal', 'Add Project'];
            subItems.forEach(subItem => {
                const subListItem = document.createElement('li');
                subListItem.textContent = subItem;
                subListItem.id = subItem.toLowerCase().replace(' ', '-');
                

                sublist.appendChild(subListItem);
                listItem.appendChild(sublist);
               
                   
                    
                    subListItem.addEventListener('click', ()=>{
                        
                        if(subItem !== 'Add Project'){
                            subListItem.classList.add('projectName', 'sidebar-menu-item');
                        loadTasksForProject(subItem, mainContent);
                    }
                    })
                

           
                
            });
            sidebarList.appendChild(listItem);
            
            
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.id = item.toLowerCase();
            listItem.classList.add('sidebar-menu-item');
        
            listItem.addEventListener('click', () => {
               
                if (item.toLowerCase() === 'home') {
                    localStorage.removeItem('currentProject');
                    loadHomeContent(mainContent, taskDomManager);
                } else {
                    loadContent(item, mainContent, taskDomManager);
                }
            });
           
        sidebarList.appendChild(listItem);   
        }
    });

    sidebar.appendChild(sidebarList);
    
    attachEventListenersToSidebar();
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
        case 'stickywall':
            loadStickyWallContent(mainContent);
            break;    
        
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
        
        const modal = document.createElement('div');
        modal.id = 'taskModal';
        modal.className = 'task-modal';
        addTaskButton.addEventListener('click', () => {
            createModal(taskDomManager);
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
    
    if (todayTasks.length === 0) {
        mainContent.innerHTML = "<p>No tasks due today.</p>";
    } else {
        
        todayTasks.forEach(task => {
            const todayTaskDomManager= new TaskDomManager(taskManager, todayTaskListContainer, createModal)
            todayTaskDomManager.addTaskToDOM(task);
        });
    }
}

function loadThisWeekContent(mainContent) {
    
    mainContent.innerHTML="";

    const thisWeekContainer=document.createElement('div');
    thisWeekContainer.id="thisWeekContainer";
    mainContent.appendChild(thisWeekContainer);

    const thisWeekTasks= taskManager.getTasksForWeek();

    if(thisWeekTasks.length===0){
        mainContent.innerHTML = "<p>No tasks due this week.</p>";
    } else{

        thisWeekTasks.forEach(task=>{
            
            const thisWeekDomManager=new TaskDomManager(taskManager, thisWeekContainer, createModal)
            thisWeekDomManager.addTaskToDOM(task); 
        })
    }

}

export function loadTasksForProject(projectName, mainContent) {
    
    const tasks = taskManager.getTasksByProject(projectName);
    // Clear previous content
    mainContent.innerHTML = ''; 

    // Create a new task list container
    const taskListContainer = document.createElement('div');
    taskListContainer.id = 'taskListContainer';
    mainContent.appendChild(taskListContainer);

    // Initialize TaskDomManager with the new container
    taskDomManager = new TaskDomManager(taskManager, taskListContainer, createModal);

    // Check if tasks are found
    if (tasks.length === 0 && projectName!=='Add Project') {
       
        mainContent.innerHTML = `<p>No tasks for ${projectName}.</p>`;
    } else {
        // Refresh task list to display tasks for selected project
        taskDomManager.refreshFilteredTaskList(tasks);
    }
}


function showModal(){

    const overlay=document.getElementById('overlay');
    let modal=document.getElementById('taskModal');
    overlay.style.display='block';
    modal.style.display='block';
}

function createModal(taskDomManager,isEdit = false, task = {}) {


    let modal=document.getElementById('taskModal');
    let overlay=document.getElementById('overlay');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'taskModal';
        modal.className = 'task-modal';
        document.body.appendChild(modal);

        overlay = createOverlay();
    }
    modal.innerHTML="";
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

    const projectDropdown=document.createElement('select');
    projectDropdown.id='modalProject';
    document.querySelectorAll('.projectName').forEach(li=>{
        if(li.textContent!=="Add Project"){
        const option=document.createElement('option');
        option.value =li.textContent;
        option.textContent=li.textContent;

        if(isEdit && task.project===li.textContent){
            option.selected=true;
        }
        projectDropdown.appendChild(option);
        }
    });
    form.appendChild(projectDropdown);
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
        const project = document.getElementById('modalProject').value;
        
         // Validation
         if (!description) {
            alert("Please enter a task description.");
            return;
        }
        if (!dueDate) {
            alert("Please select a due date.");
            return;
        }
    
        if (isEdit) {
            // Update existing task
            taskManager.updateTask(task.id, description, priority, detail, dueDate, project);
        } else {
            // Add new task
            taskManager.addNewTask(description, priority, detail, dueDate, project);
        }
    
        // Refresh the task list to reflect the changes
        taskDomManager.refreshTaskList();
    
        // Close the modal
        hideModal(overlay);
    };

    showModal();
}

function createOverlay(){
    
    let overlay= document.getElementById('div');
    if(!overlay){
    overlay=document.createElement('div');
    overlay.id='overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => hideModal(overlay));
    }
    return overlay;
 }
function hideModal(overlay){
    let modal=document.getElementById('taskModal');
    
        modal.style.display='none';
    
    
    overlay.style.display='none';
}

function loadStickyWallContent(mainContent){
    // Clear existing content
    mainContent.innerHTML="";

    new Stickywall(mainContent, 'stickywall-container');
}

function loadProjects(mainContent) {
    let storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const defaultProjects = ['Work', 'Personal'];

    // Filter out default projects from stored projects
    let customProjects = storedProjects.filter(p => !defaultProjects.includes(p));

    // Remove 'Add Project' if it exists in stored projects
    customProjects = customProjects.filter(p => p !== 'Add Project');
    
    
    // Combine default projects with custom projects, and add 'Add Project' at the end
    let projects = [...defaultProjects, ...customProjects, 'Add Project'];

    const lists = document.getElementById('lists');
    lists.innerHTML = ''; // Clear existing content
 
    projects.forEach(projectName => {
        
        let projectItem = document.createElement('li');
        if(projectName!=='Add Project'){
            projectItem.classList.add('projectName', 'sidebar-menu-item');
        }
            
        
        projectItem.id = projectName.toLowerCase().replace(' ', '-');
        projectItem.textContent = projectName;
        // Append a delete button for custom projects, not for default projects and 'Add Project'
        if (!defaultProjects.includes(projectName) && projectName !== 'Add Project') {
            projectItem.classList.add('custom-project');
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-project');
            deleteButton.onclick = () => {
                projectItem.remove();
                saveProjects();
            };
projectItem.appendChild(deleteButton);
       
        }
            projectItem.addEventListener('click', ()=>{
            
                localStorage.setItem('currentProject', projectName);
                loadTasksForProject(projectName, mainContent);
              
            });
            

        lists.appendChild(projectItem);
    });
    setupCreateProject();
    attachEventListenersToSidebar();
   
}

export function attachEventListenersToSidebar() {
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
        item.addEventListener('click', function() {
            setActiveMenuItem(this);
        });
    });
}

export function setActiveMenuItem(clickedItem) {
    // Remove 'active' class from all items
  
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add 'active' class to the clicked item
    clickedItem.classList.add('active');
}