// Collection Page Logic

let currentFilter = 'all';
let allCollection = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCollection();
    setupFilterButtons();
    setupModal();
});

function loadCollection() {
    allCollection = StorageManager.getCollection();
    displayCollection(allCollection);
}

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
            <img src="${item.imageUrl || 'https://via.placeholder.com/200x300?text=No+Image'}" 
                 alt="${item.title}" class="anime-card-image" onerror="this.src='https://via.placeholder.com/200x300?text=Error'">
            <div class="anime-card-content">
                <div class="anime-card-title">${item.title}</div>
                <span class="anime-card-type">${item.type}</span>
                <span class="anime-card-status">${item.status}</span>
                <div class="anime-card-rating">${item.score ? '⭐ ' + item.score : '⭐ N/A'}</div>
            </div>
        </div>
    `).join('');
}

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

function filterCollection() {
    let filtered = allCollection;
    
    if (currentFilter !== 'all') {
        filtered = allCollection.filter(item => item.type === currentFilter);
    }
    
    displayCollection(filtered);
}

function setupModal() {
    const modal = document.getElementById('detailModal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function openModal(item) {
    const modal = document.getElementById('detailModal');
    
    document.getElementById('modalImage').src = item.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image';
    document.getElementById('modalImage').onerror = function() { this.src = 'https://via.placeholder.com/300x400?text=Error'; };
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalType').textContent = `Type: ${item.type}`;
    document.getElementById('modalStatus').textContent = `Status: ${item.status}`;
    document.getElementById('modalScore').textContent = `Score: ${item.score || 'N/A'}/10`;
    document.getElementById('modalStudio').textContent = item.studio || 'Unknown';
    document.getElementById('modalSynopsis').textContent = item.synopsis || 'No synopsis available.';
    document.getElementById('modalEpisodes').textContent = item.episodes || 'Unknown';
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active');
}
