// Home Page Logic

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadSpotlight();
});

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

    const imageUrl = topRated.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image';
    
    spotlightCard.innerHTML = `
        <img src="${imageUrl}" alt="${topRated.title}" class="spotlight-image" onerror="this.src='https://via.placeholder.com/300x400?text=Error'">
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
