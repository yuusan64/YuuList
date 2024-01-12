export function setupCreateProject() {
    const createProject = document.getElementById('create-project');
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

        createProject.parentNode.insertBefore(projectContainer, createProject);
        createProject.style.display = 'none';
    });
}

function addNewProject(projectName, createProject) {
    if (projectName.trim() === '') {
        alert('Project name cannot be empty');
        return;
    }
    let newProject = document.createElement('li');
    newProject.textContent = projectName;
    let lists = document.getElementById('lists');
    // lists.appendChild(newProject);
    createProject.parentNode.insertBefore(newProject, createProject);
    
    saveProjects();

    let deleteButton=document.createElement('button');
    deleteButton.textContent='X';
    deleteButton.onclick=()=>{
        newProject.remove();
        saveProjects();
    }
    newProject.appendChild(deleteButton);

}

function saveProjects(){
    let projects=[];
    document.querySelectorAll('#lists li').forEach(li =>{
        projects.push(li.textContent);
    });
    localStorage.setItem('projects', JSON.stringify(projects));

}
function revertCreateProject(createProjectButton, projectContainer) {
    if (projectContainer) {
        projectContainer.remove();
    }
    createProjectButton.style.display = 'block';
}