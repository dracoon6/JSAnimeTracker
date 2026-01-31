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
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm();
    });
}

/**
 * Collect form data, validate required fields, and add to collection
 * Displays confirmation result and scrolls to it
 * Throws informative error if validation fails
 */
function submitForm() {
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
