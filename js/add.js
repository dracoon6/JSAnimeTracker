// Add Page Logic

let submittedData = null;

document.addEventListener('DOMContentLoaded', () => {
    loadPrefilledData();
    setupFormSubmission();
});

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

function setupFormSubmission() {
    const form = document.getElementById('addForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm();
    });
}

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
