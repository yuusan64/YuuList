import { TaskDomManager } from "./taskDomManager";

import { loadTasksForProject, attachEventListenersToSidebar, setActiveMenuItem } from "./index";

export function setupCreateProject() {
  
    const createProject = document.getElementById('add-project');
    if (!createProject) {
        return;
    }

    createProject.addEventListener('click', () => {
        // Create a container for new project elements
        const projectContainer = document.createElement('div');
        projectContainer.id = 'project-container';

        let inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Project Name';
        projectContainer.appendChild(inputField);

        let addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => {
        
            addNewProject(inputField.value, createProject);
            revertCreateProject(createProject, projectContainer);
        });
        projectContainer.appendChild(addButton);

        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => revertCreateProject(createProject, projectContainer));
        projectContainer.appendChild(cancelButton);

        createProject.parentNode.insertBefore(projectContainer,createProject);
        createProject.style.display = 'none';
    });
}

function addNewProject(projectName, createProject) {
   
    if (projectName.trim() === '') {
        alert('Project name cannot be empty');
        return;
    }
    let newProject = document.createElement('li');
    const proectNameSpan=document.createElement('span');
    proectNameSpan.textContent=projectName;
    proectNameSpan.classList.add('projectName');
    newProject.appendChild(proectNameSpan);
  
   

    
    
    
    newProject.id = projectName.toLowerCase().replace(' ', '-');
    newProject.classList.add('sidebar-menu-item', 'custom-project');
    createProject.parentNode.insertBefore(newProject, createProject);
    newProject.addEventListener('click', () => {
        localStorage.setItem('currentProject', projectName);
        loadTasksForProject(projectName, mainContent);
    });
    saveProjects();
    // lists.appendChild(newProject);


    let deleteButton=document.createElement('button');
    deleteButton.classList.add("delete-project");
    deleteButton.onclick=()=>{
        newProject.remove();
        saveProjects();
    }
    newProject.appendChild(deleteButton);
   
    let lists = document.getElementById('lists');
    
    saveProjects();

    loadTasksForProject(projectName, mainContent);
    attachEventListenersToSidebar();
}

export function saveProjects() {
    let projects = [];
    document.querySelectorAll('#lists li').forEach(li => {
        const projectNameSpan = li.querySelector('.projectName');
        if (projectNameSpan) {
            projects.push(projectNameSpan.textContent);
        }
    });
    localStorage.setItem('projects', JSON.stringify(projects));
}


function revertCreateProject(createProjectButton, projectContainer) {
    if (projectContainer) {
        projectContainer.remove();
    }
    createProjectButton.style.display = 'block';
}

