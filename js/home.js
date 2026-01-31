// Home Page Logic
// Displays collection statistics and top-rated anime showcase on home page

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadSpotlight();
});

/**
 * Load and display collection statistics including total count, watching, completed
 * Uses StorageManager to retrieve stats and populate DOM elements
 */
function loadStats() {
    const stats = StorageManager.getCollectionStats();
    
    document.getElementById('totalTitles').textContent = stats.total;
    document.getElementById('watching').textContent = stats.watching;
    document.getElementById('completed').textContent = stats.completed;
    
    const lastAddedElement = document.getElementById('lastAdded');
    if (stats.lastAdded) {
        lastAddedElement.textContent = stats.lastAdded.title || 'Unknown';
    } else {
        lastAddedElement.textContent = 'None';
    }
}

/**
 * Load and display the top-rated anime in spotlight section
 * Uses StorageManager.getTopRatedAnime() to find highest-rated title
 * Displays anime details with image, synopsis, and metadata
 */
function loadSpotlight() {
    const topRated = StorageManager.getTopRatedAnime();
    const spotlightCard = document.getElementById('spotlightCard');
    
    if (!topRated) {
        spotlightCard.innerHTML = `
            <div class="spotlight-loading">
                No anime added yet. <a href="collection.html">Add one to get started!</a>
            </div>
        `;
        return;
    }

    const imageUrl = topRated.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'400\'><rect width=\'100%\' height=\'100%\' fill=\'%23ddd\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'16\' fill=\'%23666\'>No Image</text></svg>';
    
    spotlightCard.innerHTML = `
        <img src="${imageUrl}" alt="${topRated.title}" class="spotlight-image" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'400\'><rect width=\'100%\' height=\'100%\' fill=\'%23f8d7da\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'16\' fill=\'%23722\'>Image+Error</text></svg>'">
        <div class="spotlight-info">
            <h3>${topRated.title}</h3>
            <p>${topRated.synopsis || 'No synopsis available.'}</p>
            <div class="spotlight-meta">
                <span>
                    <strong>Type</strong>
                    ${topRated.type}
                </span>
                <span>
                    <strong>Status</strong>
                    ${topRated.status}
                </span>
                <span>
                    <strong>Rating</strong>
                    ${'★'.repeat(Math.floor(topRated.score || 0))}
                </span>
            </div>
            <p><strong>Your Score:</strong> ${topRated.score ? topRated.score + '/10' : 'Not rated'}</p>
        </div>
    `;
}
