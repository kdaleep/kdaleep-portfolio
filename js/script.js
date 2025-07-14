document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    openMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });
    
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load projects from JSON
    loadProjects();
});

async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        
        const projects = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p class="text-gray-500 col-span-3 text-center">No projects to display.</p>';
            return;
        }
        
        projectsContainer.innerHTML = projects.map(project => `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="relative pb-[56.25%] h-0 overflow-hidden">
                    ${project.youtubeEmbed ? `
                        <iframe class="absolute top-0 left-0 w-full h-full" 
                            src="https://www.youtube.com/embed/${project.youtubeEmbed}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="lazy"
                            title="${project.title}">
                        </iframe>
                    ` : `
                        <img class="absolute top-0 left-0 w-full h-full object-cover" 
                            src="${project.image || 'https://picsum.photos/400/200?random=' + Math.random()}" 
                            alt="${project.title}"
                            loading="lazy">
                    `}
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-500">${project.date || 'No date'}</p>
                            <h3 class="mt-1 text-lg font-semibold text-gray-900">${project.title}</h3>
                        </div>
                        ${project.tags ? `
                            <div class="flex flex-wrap gap-1">
                                ${project.tags.map(tag => `
                                    <span class="px-2 py-1 text-xs font-semibold bg-gray-100 rounded">${tag}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <p class="mt-2 text-gray-600">${project.description || 'No description available.'}</p>
                    ${project.links ? `
                        <div class="mt-4 flex flex-wrap gap-2">
                            ${project.links.map(link => `
                                <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                                    class="text-sm px-3 py-1 rounded-md ${link.type === 'demo' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors">
                                    ${link.type === 'demo' ? 'Live Demo' : 'View Code'}
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = `
            <p class="text-red-500 col-span-3 text-center">Failed to load projects. Please try again later.</p>
        `;
    }
}