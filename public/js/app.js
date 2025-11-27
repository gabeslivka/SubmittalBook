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
 * Show a toast notification
 * @param {string} message - The message to display
 */
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Handle new submittal button click
 */
function handleNewSubmittal() {
    showToast('New Submittal feature coming soon!');
}

/**
 * Handle view all button click
 */
function handleViewAll() {
    showToast('View All Submittals feature coming soon!');
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
