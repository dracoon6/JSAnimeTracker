// Add Page Logic
// Handles form submission and validation for adding new anime titles to collection

let submittedData = null;

document.addEventListener('DOMContentLoaded', () => {
    loadPrefilledData();
    setupFormSubmission();
});

/**
 * Load and populate form fields with pre-filled data from session storage
 * Used when navigating from search results
 * Includes error handling for malformed data
 */
function loadPrefilledData() {
    const prefilledData = sessionStorage.getItem('prefilledData');
    
    if (prefilledData) {
        try {
            const data = JSON.parse(prefilledData);
            document.getElementById('title').value = data.title || '';
            document.getElementById('type').value = data.type || '';
            document.getElementById('imageUrl').value = data.imageUrl || '';
            sessionStorage.removeItem('prefilledData');
        } catch (error) {
            console.error('Error loading prefilled data:', error);
        }
    }
}

/**
 * Attach form submission handler to the add form
 * Prevents default form submission and handles validation
 */
function setupFormSubmission() {
    const form = document.getElementById('addForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitForm();
    });
}

/**
 * Collect form data, validate required fields, and add to collection
 * Displays confirmation result and scrolls to it
 * Throws informative error if validation fails
 */
/**
 * Query Jikan API for anime information based on title.
 * Returns null if no useful data is found.
 * @param {string} title
 * @returns {Promise<Object|null>} { imageUrl, synopsis, episodes, type, studio }
 */
async function fetchJikanAnime(title) {
    try {
        const endpoint = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`;
        const response = await fetch(endpoint);
        if (!response.ok) return null;
        const json = await response.json();
        const item = json.data && json.data[0];
        if (!item) return null;
        return {
            imageUrl: item.images?.jpg?.image_url || null,
            synopsis: item.synopsis || null,
            episodes: item.episodes || null,
            type: item.type || null,
            studio: item.studios && item.studios[0] ? item.studios[0].name : null
        };
    } catch (error) {
        console.warn('Jikan lookup failed:', error);
        return null;
    }
}

async function submitForm() {
    const formData = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        status: document.getElementById('status').value,
        episodes: document.getElementById('episodes').value || null,
        score: document.getElementById('score').value ? parseFloat(document.getElementById('score').value) : null,
        synopsis: document.getElementById('synopsis').value,
        imageUrl: document.getElementById('imageUrl').value,
        studio: document.getElementById('studio')?.value || 'Unknown'
    };
    
    // Validate required fields
    if (!formData.title || !formData.type || !formData.status) {
        alert('Please fill in all required fields (Title, Type, Status)');
        return;
    }
    
    // Try to enrich missing data from Jikan API when possible
    try {
        const needsEnrich = !formData.imageUrl || !formData.synopsis || !formData.episodes || formData.studio === 'Unknown';
        if (needsEnrich) {
            const info = await fetchJikanAnime(formData.title);
            if (info) {
                formData.imageUrl = formData.imageUrl || info.imageUrl || formData.imageUrl;
                formData.synopsis = formData.synopsis || info.synopsis || formData.synopsis;
                formData.episodes = formData.episodes || info.episodes || formData.episodes;
                formData.type = formData.type || info.type || formData.type;
                formData.studio = formData.studio === 'Unknown' ? (info.studio || 'Unknown') : formData.studio;
            }
        }
    } catch (err) {
        console.warn('Enrichment failed, proceeding with provided data', err);
    }

    // Add to collection
    submittedData = StorageManager.addToCollection(formData);
    
    // Show result
    showResult();
    
    // Scroll to result
    setTimeout(() => {
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

/**
 * Display the submission result with confirmation message
 * Shows the submitted anime details and hides the form
 * Provides navigation back to collection
 */
function showResult() {
    const form = document.getElementById('addForm');
    const resultSection = document.getElementById('resultSection');
    const resultCard = document.getElementById('resultCard');
    
    // Hide form
    form.style.display = 'none';
    
    // Build result HTML
    const resultHTML = `
        <div class="result-card">
            <h3>${submittedData.title}</h3>
            <div class="result-item">
                <strong>Type:</strong>
                <span>${submittedData.type}</span>
            </div>
            <div class="result-item">
                <strong>Status:</strong>
                <span>${submittedData.status}</span>
            </div>
            ${submittedData.episodes ? `
            <div class="result-item">
                <strong>Episodes:</strong>
                <span>${submittedData.episodes}</span>
            </div>
            ` : ''}
            ${submittedData.score ? `
            <div class="result-item">
                <strong>Your Score:</strong>
                <span>${submittedData.score}/10</span>
            </div>
            ` : ''}
            ${submittedData.synopsis ? `
            <div class="result-item">
                <strong>Synopsis:</strong>
                <span>${submittedData.synopsis}</span>
            </div>
            ` : ''}
        </div>
    `;
    
    resultCard.innerHTML = resultHTML;
    resultSection.style.display = 'block';
}
