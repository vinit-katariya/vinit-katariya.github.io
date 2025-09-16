// Main JavaScript file for Dr. Vinit's academic website

// Data for news articles is provided by data.js; fall back to an empty array if it wasn't loaded.
const resolvedNewsData = typeof newsData !== 'undefined' ? newsData : [];
const resolvedCVData = typeof cvData !== 'undefined' ? cvData : null;
const resolvedResearchProjects = (typeof researchProjects !== 'undefined' && Array.isArray(researchProjects))
    ? researchProjects
    : [];
const resolvedPublications = (typeof publications !== 'undefined' && Array.isArray(publications))
    ? publications
    : [];

// Helper to format dates for display
function formatNewsDate(dateString) {
    const parsedDate = new Date(dateString);
    if (Number.isNaN(parsedDate.getTime())) {
        return dateString;
    }
    return parsedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render the latest two news items on the Home section
function renderLatestNewsPreview() {
    const previewContainer = document.getElementById('latest-news-preview');
    if (!previewContainer) return;

    previewContainer.innerHTML = '';

    if (!resolvedNewsData.length) {
        previewContainer.innerHTML = '<p class="text-gray-600">No news items available right now. Please check back soon.</p>';
        return;
    }

    const sortedNews = [...resolvedNewsData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);

    sortedNews.forEach(item => {
        const imageSrc = item.image || 'https://placehold.co/600x360/E5E7EB/4B5563?text=News';
        const categoryLabel = item.category
            ? `<span class="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white rounded-full bg-blue-800">${item.category}</span>`
            : '';

        const actionButtons = [];
        if (item.pdfLink) {
            actionButtons.push(`<a href="${item.pdfLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold shadow hover:bg-slate-800">View Details</a>`);
        }
        if (item.contactEmail) {
            actionButtons.push(`<a href="mailto:${item.contactEmail}" class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-500">Contact</a>`);
        }
        const actionsBlock = actionButtons.length
            ? `<div class="mt-4 flex flex-wrap gap-2">${actionButtons.join('')}</div>`
            : '';

        const newsCardHTML = `
            <article class="bg-gray-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
                <div class="bg-white flex items-center justify-center h-56">
                    <img src="${imageSrc}" alt="${item.title}" class="max-h-full max-w-full object-contain p-4">
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <div class="flex items-center justify-between mb-3">
                        ${categoryLabel}
                        <time datetime="${item.date}" class="text-sm text-gray-500">${formatNewsDate(item.date)}</time>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">${item.title}</h3>
                    <p class="text-gray-700 flex-1">${item.description}</p>
                    ${actionsBlock}
                </div>
            </article>
        `;

        previewContainer.innerHTML += newsCardHTML;
    });
}

// Render research projects from structured data
function renderResearchProjects() {
    const projectsContainer = document.getElementById('research-projects');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    if (!resolvedResearchProjects.length) {
        projectsContainer.innerHTML = '<p class="text-gray-600">Research projects will be added soon. Please check back for updates.</p>';
        return;
    }

    resolvedResearchProjects.forEach((project, index) => {
        const projectId = project.id || `project-${index}`;
        const projectLink = document.createElement('a');
        projectLink.href = project.detailPage || '#';
        projectLink.className = 'group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500/40';
        projectLink.dataset.projectId = projectId;

        const imageBlock = document.createElement('div');
        imageBlock.className = 'h-40 rounded-xl bg-slate-900/5 overflow-hidden flex items-center justify-center';
        if (project.image) {
            imageBlock.innerHTML = `<img src="${project.image}" alt="${project.title}" class="h-full w-full object-cover">`;
        } else if (project.focusArea) {
            imageBlock.innerHTML = `<span class="text-sm font-semibold uppercase tracking-wider text-slate-500">${project.focusArea}</span>`;
        } else {
            imageBlock.innerHTML = '<span class="text-sm font-semibold text-slate-400">Coming Soon</span>';
        }

        const textBlock = document.createElement('div');
        textBlock.className = 'space-y-2';
        if (project.subtitle || project.focusArea) {
            textBlock.innerHTML += `<p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${project.subtitle || project.focusArea}</p>`;
        }
        textBlock.innerHTML += `<h3 class="text-xl font-display font-semibold text-slate-900">${project.title}</h3>`;
        if (project.summary) {
            textBlock.innerHTML += `<p class="text-sm text-slate-600 leading-relaxed">${project.summary}</p>`;
        }

        const footerBlock = document.createElement('div');
        footerBlock.className = 'inline-flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-slate-900';
        footerBlock.innerHTML = 'View project <span aria-hidden="true">&rarr;</span>';

        projectLink.appendChild(imageBlock);
        projectLink.appendChild(textBlock);
        projectLink.appendChild(footerBlock);

        projectsContainer.appendChild(projectLink);
    });
}

// Render CV details from structured data
function renderCV() {
    if (!resolvedCVData) return;

    const cvContainer = document.getElementById('cv-content');
    const cvIntro = document.getElementById('cv-introduction');
    const downloadBtn = document.getElementById('cv-download-btn');

    if (downloadBtn && resolvedCVData.downloadUrl) {
        downloadBtn.setAttribute('href', resolvedCVData.downloadUrl);
    }

    if (cvIntro && resolvedCVData.introduction) {
        cvIntro.textContent = resolvedCVData.introduction;
    }

    if (!cvContainer) {
        return;
    }

    const renderEducation = () => {
        if (!resolvedCVData.education?.length) return '';
        const items = resolvedCVData.education.map(item => `
            <div class="border-l-4 border-blue-800 pl-4">
                <h4 class="text-xl font-semibold text-gray-900">${item.degree}</h4>
                <p class="text-gray-700">${item.institution} &middot; ${item.location}</p>
                <p class="text-sm text-gray-500 mt-1">${item.year}</p>
                <p class="text-sm text-gray-600 mt-2">${item.details}</p>
            </div>
        `).join('');
        return createCVSection('Education', items);
    };

    const renderPositions = () => {
        if (!resolvedCVData.academicPositions?.length) return '';
        const items = resolvedCVData.academicPositions.map(item => `
            <div class="border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h4 class="text-xl font-semibold text-gray-900">${item.title}</h4>
                <p class="text-gray-700">${item.organization}</p>
                <p class="text-sm text-gray-500 mt-1">${item.period}</p>
                ${renderBulletList(item.bullets)}
            </div>
        `).join('');
        return createCVSection('Academic & Research Experience', items);
    };

    const renderTeaching = () => {
        if (!resolvedCVData.teachingExperience?.length) return '';
        const items = resolvedCVData.teachingExperience.map(item => `
            <div class="border border-gray-200 rounded-xl p-5">
                <h4 class="text-lg font-semibold text-gray-900">${item.role}</h4>
                <p class="text-gray-700">${item.organization}</p>
                <p class="text-sm text-gray-500 mt-1">${item.period}</p>
                ${item.courses?.length ? `<ul class="list-disc list-inside text-gray-600 mt-3 space-y-1">${item.courses.map(course => `<li>${course}</li>`).join('')}</ul>` : ''}
            </div>
        `).join('');
        return createCVSection('Teaching Experience', items);
    };

    const renderIndustry = () => {
        if (!resolvedCVData.industryExperience?.length) return '';
        const items = resolvedCVData.industryExperience.map(item => `
            <div class="border border-gray-200 rounded-xl p-5 bg-white">
                <h4 class="text-lg font-semibold text-gray-900">${item.role}</h4>
                <p class="text-gray-700">${item.organization}</p>
                <p class="text-sm text-gray-500 mt-1">${item.period}</p>
                ${renderBulletList(item.bullets)}
            </div>
        `).join('');
        return createCVSection('Industry Experience', items);
    };

    const renderAwards = () => {
        if (!resolvedCVData.awards?.length) return '';
        const items = `<ul class="list-disc list-inside space-y-1 text-gray-700">${resolvedCVData.awards.map(award => `<li>${award}</li>`).join('')}</ul>`;
        return createCVSection('Awards & Affiliations', items);
    };

    const renderService = () => {
        if (!resolvedCVData.professionalService?.length) return '';
        const items = `<ul class="list-disc list-inside space-y-1 text-gray-700">${resolvedCVData.professionalService.map(item => `<li>${item}</li>`).join('')}</ul>`;
        return createCVSection('Professional Service', items);
    };

    cvContainer.innerHTML = [
        renderEducation(),
        renderPositions(),
        renderTeaching(),
        renderIndustry(),
        renderAwards(),
        renderService()
    ].filter(Boolean).join('');
}

function createCVSection(title, content) {
    if (!content) return '';
    return `
        <section class="space-y-4">
            <h3 class="text-2xl font-semibold text-gray-900">${title}</h3>
            <div class="space-y-4">${content}</div>
        </section>
    `;
}

function renderBulletList(items = []) {
    if (!items.length) return '';
    return `<ul class="list-disc list-inside text-gray-600 mt-3 space-y-1">${items.map(point => `<li>${point}</li>`).join('')}</ul>`;
}

// Function to render news items
function renderNews(filter = 'most-recent') {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    
    newsContainer.innerHTML = ''; // Clear previous content

    let filteredNews = [...resolvedNewsData]; // Create a copy to avoid modifying original array

    if (filter === '2025') {
        filteredNews = filteredNews.filter(item => new Date(item.date).getFullYear() === 2025);
    }

    // Sort by date in descending order for "Most Recent" and for general display
    filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));

    filteredNews.forEach(item => {
        const imageSrc = item.image || 'https://placehold.co/320x200/E5E7EB/4B5563?text=News';
        const formattedDate = formatNewsDate(item.date);
        const categoryLabel = item.category
            ? `<span class="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white rounded-full bg-blue-800">${item.category}</span>`
            : '';

        const actionButtons = [];
        if (item.pdfLink) {
            actionButtons.push(`<a href="${item.pdfLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold shadow hover:bg-slate-800">View Details</a>`);
        }
        if (item.contactEmail) {
            actionButtons.push(`<a href="mailto:${item.contactEmail}" class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-500">Contact</a>`);
        }
        const actionsBlock = actionButtons.length
            ? `<div class="mt-4 flex flex-wrap gap-2">${actionButtons.join('')}</div>`
            : '';

        const newsItemHTML = `
            <article class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col lg:flex-row gap-6 news-card">
                <div class="w-full lg:w-56 flex items-center justify-center bg-gray-100 rounded-lg p-4">
                    <img src="${imageSrc}" alt="${item.title}" class="max-h-44 w-full object-contain">
                </div>
                <div class="flex-1 flex flex-col">
                    <div class="flex items-center justify-between mb-3 gap-4">
                        ${categoryLabel}
                        <time datetime="${item.date}" class="text-sm text-gray-500 whitespace-nowrap">${formattedDate}</time>
                    </div>
                    <h3 class="font-bold text-xl mb-2 text-gray-900">${item.title}</h3>
                    <p class="text-gray-600 leading-relaxed flex-1">${item.description}</p>
                    ${actionsBlock}
                </div>
            </article>
        `;
        newsContainer.innerHTML += newsItemHTML;
    });
}

// Render a single news flash banner if available
function renderNewsFlash() {
    const flashContainer = document.getElementById('news-flash-banner');
    if (!flashContainer) return;

    const flashItem = resolvedNewsData.find(item => item.flash === true);
    if (!flashItem) {
        flashContainer.classList.add('hidden');
        return;
    }

    const { title, description, pdfLink, contactEmail } = flashItem;
    const ctaButtons = [];
    if (pdfLink) {
        ctaButtons.push(`<a href="${pdfLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition">View Details</a>`);
    }
    if (contactEmail) {
        ctaButtons.push(`<a href="mailto:${contactEmail}" class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-500 transition">Contact</a>`);
    }

    flashContainer.classList.remove('hidden');
    flashContainer.innerHTML = `
        <article class="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-3">
                <span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <div class="space-y-1">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Research Opportunity</p>
                    <h2 class="text-lg font-semibold text-slate-900">${title}</h2>
                    <p class="text-sm text-slate-600">${description}</p>
                </div>
            </div>
            ${ctaButtons.length ? `<div class="flex flex-wrap gap-2">${ctaButtons.join('')}</div>` : ''}
        </article>
    `;
}

function renderPublications() {
    const featuredContainer = document.getElementById('publications-featured');
    if (!featuredContainer) return;

    const moreContainer = document.getElementById('more-publications');
    const toggleButton = document.getElementById('toggle-publications-btn');

    featuredContainer.innerHTML = '';
    if (moreContainer) {
        moreContainer.innerHTML = '';
    }

    const sortedPublications = [...resolvedPublications].sort((a, b) => (b.year || 0) - (a.year || 0));

    const primaryItems = sortedPublications.filter(item => item.visible !== false);
    const secondaryItems = sortedPublications.filter(item => item.visible === false);

    const buildPublicationCard = (item) => {
        const yearBadge = item.year
            ? `<span class="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">${item.year}</span>`
            : '';
        const typeBadge = item.type
            ? `<span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">${item.type}</span>`
            : '';

        return `
            <article class="border border-slate-100 rounded-2xl p-5 bg-white/90 shadow-sm">
                <div class="flex flex-wrap items-center gap-2 mb-3">
                    ${yearBadge}
                    ${typeBadge}
                </div>
                <h3 class="text-lg font-semibold text-slate-900">
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:text-sky-700 transition-colors">${item.title}</a>
                </h3>
            </article>
        `;
    };

    if (primaryItems.length) {
        featuredContainer.innerHTML = primaryItems.map(buildPublicationCard).join('');
    } else {
        featuredContainer.innerHTML = '<p class="text-sm text-slate-600">No publications available yet.</p>';
    }

    const hasHidden = secondaryItems.length > 0;
    if (moreContainer) {
        moreContainer.innerHTML = secondaryItems.map(buildPublicationCard).join('');
    }

    if (toggleButton) {
        if (!hasHidden) {
            toggleButton.classList.add('hidden');
        } else {
            toggleButton.classList.remove('hidden');
            toggleButton.textContent = moreContainer && moreContainer.classList.contains('hidden') ? 'See More' : 'See Less';
        }
    }
}

// Function to handle tab navigation
function initializeTabNavigation() {
    const tabs = document.querySelectorAll('nav a[data-tab]');
    const contents = document.querySelectorAll('main section[data-content]');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            // Prevent the default link behavior
            event.preventDefault();
            
            // Remove active class from all tabs and hide all content
            tabs.forEach(item => {
                item.classList.remove('border-gray-900');
                item.classList.add('border-transparent');
            });
            
            contents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Add active class to the clicked tab
            event.target.classList.remove('border-transparent');
            event.target.classList.add('border-gray-900');
            
            // Show the corresponding content
            const tabName = event.target.dataset.tab;
            const targetContent = document.querySelector(`section[data-content="${tabName}"]`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('fade-in');
            }

            // If the News tab is clicked, render the news items
            if (tabName === 'news') {
                const newsFilter = document.getElementById('news-filter');
                renderNews(newsFilter ? newsFilter.value : 'most-recent');
            } else if (tabName === 'cv') {
                renderCV();
            }
        });
    });
}

// Function to initialize news filter
function initializeNewsFilter() {
    const newsFilter = document.getElementById('news-filter');
    if (newsFilter) {
        newsFilter.addEventListener('change', (event) => {
            renderNews(event.target.value);
        });
    }
}

// Function to initialize publications toggle
function initializePublicationsToggle() {
    const morePublicationsDiv = document.getElementById('more-publications');
    const togglePublicationsBtn = document.getElementById('toggle-publications-btn');
    
    if (togglePublicationsBtn && morePublicationsDiv) {
        togglePublicationsBtn.addEventListener('click', () => {
            const isHidden = morePublicationsDiv.classList.contains('hidden');
            if (isHidden) {
                morePublicationsDiv.classList.remove('hidden');
                morePublicationsDiv.classList.add('fade-in');
                togglePublicationsBtn.textContent = 'See Less';
            } else {
                morePublicationsDiv.classList.add('hidden');
                togglePublicationsBtn.textContent = 'See More';
            }
        });
    }
}

// Function to initialize smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Function to initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation for tabs
    const tabs = document.querySelectorAll('nav a[data-tab]');
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const nextIndex = e.key === 'ArrowRight' ? 
                    (index + 1) % tabs.length : 
                    (index - 1 + tabs.length) % tabs.length;
                tabs[nextIndex].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });
}

// Function to initialise the latest news preview interactions
function initializeLatestNewsPreview() {
    renderLatestNewsPreview();

    const viewAllNewsBtn = document.getElementById('view-all-news-btn');
    if (viewAllNewsBtn) {
        viewAllNewsBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const newsTab = document.querySelector('nav a[data-tab="news"]');
            if (newsTab) {
                newsTab.click();
                setTimeout(() => {
                    const newsSection = document.querySelector('section[data-content="news"]');
                    if (newsSection) {
                        newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 60);
            }
        });
    }
}

// Function to handle responsive navigation
function initializeResponsiveFeatures() {
    // Handle window resize events
    window.addEventListener('resize', () => {
        // Adjust layout if needed
        const container = document.querySelector('.container');
        if (container && window.innerWidth < 768) {
            container.classList.add('px-4');
        }
    });
}

// Main initialization function
function initializeWebsite() {
    // Initialize all components
    initializeTabNavigation();
    initializeNewsFilter();
    renderPublications();
    initializePublicationsToggle();
    initializeSmoothScrolling();
    initializeAccessibility();
    initializeResponsiveFeatures();
    initializeLatestNewsPreview();
    renderNewsFlash();
    renderCV();
    renderResearchProjects();
    
    // Set initial active tab to "Home"
    const homeTab = document.querySelector('a[data-tab="home"]');
    if (homeTab) {
        homeTab.click();
    }
    
    // Add loading animation to body
    document.body.classList.add('fade-in');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderNews,
        renderLatestNewsPreview,
        renderCV,
        renderPublications,
        renderNewsFlash,
        renderResearchProjects,
        newsData: resolvedNewsData,
        initializeWebsite
    };
}
