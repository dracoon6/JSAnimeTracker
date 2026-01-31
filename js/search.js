// Search Page Logic

let currentCategory = 'anime';
let searchTimeout;

document.addEventListener('DOMContentLoaded', () => {
    setupSearchBox();
    setupCategoryFilters();
});

function setupSearchBox() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            document.getElementById('searchResults').innerHTML = 
                '<p class="results-placeholder">Start typing to search for anime or manga...</p>';
            return;
        }
        
        document.getElementById('searchResults').innerHTML = 
            '<div class="search-loading">Searching...</div>';
        
        // Debounce the search
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
}

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            
            const query = document.getElementById('searchInput').value.trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        });
    });
}

async function performSearch(query) {
    try {
        const endpoint = currentCategory === 'anime' 
            ? `https://api.jikan.moe/v4/anime?query=${encodeURIComponent(query)}&limit=12`
            : `https://api.jikan.moe/v4/manga?query=${encodeURIComponent(query)}&limit=12`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error('API Error');
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            document.getElementById('searchResults').innerHTML = 
                '<div class="search-error">No results found for "' + query + '"</div>';
            return;
        }
        
        displaySearchResults(data.data);
        
    } catch (error) {
        console.error('Search error:', error);
        document.getElementById('searchResults').innerHTML = 
            '<div class="search-error">Error performing search. Please try again.</div>';
    }
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    
    resultsContainer.innerHTML = results.map(item => {
        const title = item.title || item.title_english || 'Unknown';
        const image = item.images?.jpg?.image_url || 'https://via.placeholder.com/180x250?text=No+Image';
        const type = item.type || currentCategory.toUpperCase();
        
        return `
            <div class="search-result-card" onclick="addSearchResultToCollection('${title.replace(/'/g, "\\'")}', '${type}', '${image.replace(/'/g, "\\'")}')">
                <img src="${image}" alt="${title}" class="search-result-image" onerror="this.src='https://via.placeholder.com/180x250?text=Error'">
                <div class="search-result-content">
                    <div class="search-result-title">${title}</div>
                    <div class="search-result-type">${type}</div>
                </div>
            </div>
        `;
    }).join('');
}

function addSearchResultToCollection(title, type, imageUrl) {
    // Navigate to add page with pre-filled data
    sessionStorage.setItem('prefilledData', JSON.stringify({
        title: title,
        type: type,
        imageUrl: imageUrl
    }));
    
    window.location.href = 'add.html';
}
