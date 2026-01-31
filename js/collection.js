// Collection Page Logic
// Manages display of user's anime collection with filtering, grid layout, and detail modals

let currentFilter = 'all';
let allCollection = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCollection();
    setupFilterButtons();
    setupModal();
});

/**
 * Retrieve and display the complete anime collection from storage
 */
function loadCollection() {
    allCollection = StorageManager.getCollection();
    displayCollection(allCollection);
}

/**
 * Display anime items as a grid with cards showing title, type, status, and rating
 * Maps collection array to HTML cards using template literals
 * @param {Array} items - Array of anime objects to display
 */
function displayCollection(items) {
    const grid = document.getElementById('collectionGrid');
    
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <p>No titles in your collection yet.</p>
                <a href="add.html" class="btn-primary" style="margin-top: 1rem;">Add Your First Title</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="anime-card" onclick="openModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <img src="${item.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'300\'><rect width=\'100%\' height=\'100%\' fill=\'%23ddd\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'14\' fill=\'%23666\'>No Image</text></svg>'}" 
                 alt="${item.title}" class="anime-card-image" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'300\'><rect width=\'100%\' height=\'100%\' fill=\'%23f8d7da\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'14\' fill=\'%23722\'>Image+Error</text></svg>'">
            <div class="anime-card-content">
                <div class="anime-card-title">${item.title}</div>
                <span class="anime-card-type">${item.type}</span>
                <span class="anime-card-status">${item.status}</span>
                <div class="anime-card-rating">${item.score ? '⭐ ' + item.score : '⭐ N/A'}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Attach event listeners to filter buttons for filtering by media type
 * Uses event delegation for dynamically added buttons
 */
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            currentFilter = e.target.dataset.filter;
            filterCollection();
        });
    });
}

/**
 * Filter collection based on current filter selection (All, TV, Movie, Manga)
 * Uses array filter() method to find matching items
 */
function filterCollection() {
    let filtered = allCollection;
    
    if (currentFilter !== 'all') {
        filtered = allCollection.filter(item => item.type === currentFilter);
    }
    
    displayCollection(filtered);
}

/**
 * Setup modal functionality including close button and background click handlers
 */
function setupModal() {
    const modal = document.getElementById('detailModal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

/**
 * Open detail modal with anime information
 * Populates modal fields with selected anime data
 * @param {Object} item - The anime object to display details for
 */
function openModal(item) {
    const modal = document.getElementById('detailModal');
    
    document.getElementById('modalImage').src = item.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'400\'><rect width=\'100%\' height=\'100%\' fill=\'%23ddd\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'16\' fill=\'%23666\'>No Image</text></svg>';
    document.getElementById('modalImage').onerror = function() { this.onerror=null; this.src = 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'400\'><rect width=\'100%\' height=\'100%\' fill=\'%23f8d7da\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'16\' fill=\'%23722\'>Image+Error</text></svg>' };
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalType').textContent = `Type: ${item.type}`;
    document.getElementById('modalStatus').textContent = `Status: ${item.status}`;
    document.getElementById('modalScore').textContent = `Score: ${item.score || 'N/A'}/10`;
    document.getElementById('modalStudio').textContent = item.studio || 'Unknown';
    document.getElementById('modalSynopsis').textContent = item.synopsis || 'No synopsis available.';
    document.getElementById('modalEpisodes').textContent = item.episodes || 'Unknown';
    
    modal.classList.add('active');
}

/**
 * Close the detail modal by removing active class
 */
function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active');
}
