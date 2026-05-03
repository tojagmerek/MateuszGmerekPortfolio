let allProjects = [];

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        allProjects = data.projects;

        const container = document.getElementById('myWork');
        
        data.projects.forEach((project, index) => {
            const div = document.createElement('div');
            div.classList.add('project-card');
            div.setAttribute('data-project-index', index);

            div.innerHTML = `
                <img class="project-image" src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
                </div>
                <p>${project.shortDesc}</p>
                <div>
                <button class="project-btn view-more-btn">Zobacz Więcej</button>
                </div>
            `;

            container.appendChild(div);
        });

        addProjectButtonListeners();

    }
    catch {
        console.error('Nie można załadować projektów.');
    }
}

function addProjectButtonListeners() {
    const buttons = document.querySelectorAll('.view-more-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const index = projectCard.getAttribute('data-project-index');
            const project = allProjects[index];
            
            openProjectWindow(project);
        });
    });
}

function openProjectWindow(project) {
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectImage').src = project.image;
    document.getElementById('projectImage').alt = project.title;
    
    // Wypełnij tagi technologii
    const tagsContainer = document.getElementById('projectTags');
    tagsContainer.innerHTML = project.tags.map(tag => `<span class="window-tag">${tag}</span>`).join('');
    
    document.getElementById('projectFullDesc').textContent = project.fullDesc;
    document.getElementById('projectWebUrl').href = project.webUrl;
    document.getElementById('projectGitUrl').href = project.gitUrl;
    
    const projectWindow = document.querySelector('.project-window');
    projectWindow.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectWindow() {
    const projectWindow = document.querySelector('.project-window');
    projectWindow.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-btn');
    const projectWindow = document.querySelector('.project-window');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectWindow);
    }
    
    if (projectWindow) {
        projectWindow.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-window')) {
                closeProjectWindow();
            }
        });
    }
});

loadProjects();