// Main JavaScript file for Dr. Vinit's academic website

// Data for news articles is provided by data.js; fall back to an empty array if it wasn't loaded.
const resolvedNewsData = typeof newsData !== 'undefined' ? newsData : [];
const resolvedCVData = typeof cvData !== 'undefined' ? cvData : null;

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
                </div>
            </article>
        `;

        previewContainer.innerHTML += newsCardHTML;
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
                </div>
            </article>
        `;
        newsContainer.innerHTML += newsItemHTML;
    });
}

// Function to handle tab navigation
function initializeTabNavigation() {
    const tabs = document.querySelectorAll('nav a');
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
    const tabs = document.querySelectorAll('nav a');
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
    initializePublicationsToggle();
    initializeSmoothScrolling();
    initializeAccessibility();
    initializeResponsiveFeatures();
    initializeLatestNewsPreview();
    renderCV();
    
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
        newsData: resolvedNewsData,
        initializeWebsite
    };
}
