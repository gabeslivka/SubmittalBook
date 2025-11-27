/**
 * SubmittalBook Application
 * Main JavaScript file for browser interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    setupEventListeners();
    console.log('SubmittalBook application initialized');
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
    // New Submittal button
    const newSubmittalBtn = document.getElementById('new-submittal-btn');
    if (newSubmittalBtn) {
        newSubmittalBtn.addEventListener('click', handleNewSubmittal);
    }

    // View All button
    const viewAllBtn = document.getElementById('view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', handleViewAll);
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

/**
 * Handle new submittal button click
 */
function handleNewSubmittal() {
    alert('New Submittal feature coming soon!');
}

/**
 * Handle view all button click
 */
function handleViewAll() {
    alert('View All Submittals feature coming soon!');
}

/**
 * Handle navigation link click
 * @param {Event} event - The click event
 */
function handleNavClick(event) {
    event.preventDefault();
    
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    event.target.classList.add('active');
}
