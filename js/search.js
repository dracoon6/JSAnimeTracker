// Search Page Logic
// Integrates with Jikan API to search and discover anime/manga from external library

let currentCategory = 'anime';
let searchTimeout;

document.addEventListener('DOMContentLoaded', () => {
    setupSearchBox();
    setupCategoryFilters();
});

/**
 * Setup search input with debouncing to avoid excessive API calls
 * Triggers search when user types at least 2 characters
 */
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
        
        // Debounce the search to wait 300ms after user stops typing
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
}

/**
 * Setup category filter buttons to toggle between anime and manga search
 * Toggles active state and updates currentCategory variable
 */
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

/**
 * Search the Jikan API (external library) for anime or manga
 * Includes comprehensive error handling for API failures
 * Uses async/await for clean asynchronous code
 * @param {string} query - Search term entered by user
 */
async function performSearch(query) {
    try {
        const endpoint = currentCategory === 'anime' 
            ? `https://api.jikan.moe/v4/anime?query=${encodeURIComponent(query)}&limit=12`
            : `https://api.jikan.moe/v4/manga?query=${encodeURIComponent(query)}&limit=12`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error('API Error: ' + response.status);
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

/**
 * Display search results as clickable cards with images
 * Uses map() to transform API data into HTML cards
 * @param {Array} results - Array of anime/manga objects from API
 */
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

/**
 * Add selected search result to collection by navigating to add page
 * Stores data in sessionStorage for form pre-population
 * @param {string} title - Title of the anime/manga
 * @param {string} type - Type (TV, Movie, Manga)
 * @param {string} imageUrl - URL to poster image
 */
function addSearchResultToCollection(title, type, imageUrl) {
    // Navigate to add page with pre-filled data
    sessionStorage.setItem('prefilledData', JSON.stringify({
        title: title,
        type: type,
        imageUrl: imageUrl
    }));
    
    window.location.href = 'add.html';
}
