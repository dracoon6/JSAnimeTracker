// Data Initialization Script
// Provides sample anime titles and helper functions for testing and initialization
// Call initializeCollectionFromJikan() in browser console to populate with enriched sample data

const SAMPLE_ANIME = [
  "Attack on Titan",
  "Death Note",
  "Demon Slayer",
  "Jujutsu Kaisen",
  "Steins;Gate",
  "My Hero Academia",
  "Tokyo Ghoul",
  "Fullmetal Alchemist: Brotherhood",
  "Ergo Proxy",
  "Vinland Saga",
  "Cowboy Bebop",
  "Neon Genesis Evangelion",
  "Code Geass",
  "Spy × Family",
  "Mob Psycho 100"
];

// Additional sample manga titles (titles-only)
const SAMPLE_MANGA = [
  "One Piece",
  "Berserk",
  "Monster",
  "Vagabond",
  "20th Century Boys"
];

/**
 * Fetch info from Jikan API by title and media type (anime|manga)
 * @param {string} title
 * @param {string} mediaType - 'anime' or 'manga'
 * @returns {Promise<Object|null>} { imageUrl, synopsis, episodes, chapters, type, studio, authors, score }
 */
async function fetchJikanInfo(title, mediaType = 'anime') {
  try {
    const path = mediaType === 'manga' ? 'manga' : 'anime';
    const endpoint = `https://api.jikan.moe/v4/${path}?q=${encodeURIComponent(title)}&limit=1`;
    const resp = await fetch(endpoint);
    if (!resp.ok) return null;
    const data = await resp.json();
    const item = data.data && data.data[0];
    if (!item) return null;

    // Map common fields, with manga-specific fallbacks
    const imageUrl = item.images?.jpg?.image_url || null;
    const synopsis = item.synopsis || item.title || null;
    const score = item.score || null;

    if (mediaType === 'manga') {
      return {
        imageUrl,
        synopsis,
        chapters: item.chapters || null,
        type: item.type || 'Manga',
        authors: item.authors && item.authors[0] ? item.authors[0].name : null,
        score
      };
    }

    // anime
    return {
      imageUrl,
      synopsis,
      episodes: item.episodes || null,
      type: item.type || null,
      studio: item.studios && item.studios[0] ? item.studios[0].name : null,
      score
    };
  } catch (err) {
    console.warn('Jikan fetch failed for', title, mediaType, err);
    return null;
  }
}

/**
 * Small delay to avoid hammering the API
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Initialize collection by enriching SAMPLE_ANIME with data from Jikan API
 * Call this in the console: initializeCollectionFromJikan()
 * Returns true if successful, false otherwise
 */
async function initializeCollectionFromJikan() {
  try {
    const collection = [];
    // Combine anime and manga sample lists into a single array with media type
    const combined = [];
    SAMPLE_ANIME.forEach(s => combined.push({ title: typeof s === 'string' ? s : s.title, media: (typeof s === 'object' && s.media) ? s.media : 'anime' }));
    if (typeof SAMPLE_MANGA !== 'undefined' && Array.isArray(SAMPLE_MANGA)) {
      SAMPLE_MANGA.forEach(s => combined.push({ title: s, media: 'manga' }));
    }

    for (let i = 0; i < combined.length; i++) {
      const entry = combined[i];
      const title = entry.title;
      const media = entry.media || 'anime';
      // Be polite to the API
      await sleep(350);
      const info = await fetchJikanInfo(title, media);

      const item = {
        id: Date.now().toString() + i,
        title: title,
        type: info?.type || (media === 'manga' ? 'Manga' : null),
        status: 'Plan to Watch',
        episodes: media === 'anime' ? (info?.episodes || null) : null,
        chapters: media === 'manga' ? (info?.chapters || null) : null,
        score: info?.score || null,
        synopsis: info?.synopsis || '',
        studio: media === 'anime' ? (info?.studio || 'Unknown') : null,
        authors: media === 'manga' ? (info?.authors || null) : null,
        imageUrl: info?.imageUrl || null,
        dateAdded: new Date().toISOString()
      };

      collection.push(item);
    }

    localStorage.setItem('animeCollection', JSON.stringify(collection));
    localStorage.setItem('lastAddedTitle', JSON.stringify(collection[collection.length - 1]));

    console.log('✅ Collection initialized with enriched anime data (Jikan).');
    console.log('📊 Stats:');
    console.log('   Total titles:', collection.length);
    console.log('   Completed:', collection.filter(a => a.status === 'Completed').length);
    console.log('   Currently Watching:', collection.filter(a => a.status === 'Watching').length);
    console.log('   On Hold:', collection.filter(a => a.status === 'On Hold').length);
    console.log('   Plan to Watch:', collection.filter(a => a.status === 'Plan to Watch').length);

    return true;
  } catch (error) {
    console.error('❌ Error initializing collection from Jikan:', error);
    return false;
  }
}

/**
 * Clear all collection data from localStorage
 * Prompts user for confirmation before deletion
 * Removes COLLECTION, LAST_ADDED, and USER_SCORES from storage
 */
function clearCollection() {
  if (confirm('Are you sure you want to clear your entire collection? This cannot be undone.')) {
    localStorage.removeItem('animeCollection');
    localStorage.removeItem('lastAddedTitle');
    localStorage.removeItem('userScores');
    console.log('✅ Collection cleared!');
  }
}

/**
 * Get and display collection statistics in console
 * Calculates stats by type, status, and average score
 * Uses forEach and filter array methods for analysis
 * @returns {Object|null} Statistics object or null if no collection exists
 */
function getCollectionStats() {
  const data = localStorage.getItem('animeCollection');
  if (!data) {
    console.log('No collection found');
    return null;
  }
  
  const collection = JSON.parse(data);
  const stats = {
    total: collection.length,
    byType: {},
    byStatus: {},
    averageScore: 0
  };
  
  let totalScore = 0;
  let scoredCount = 0;
  
  collection.forEach(anime => {
    // Type stats
    stats.byType[anime.type] = (stats.byType[anime.type] || 0) + 1;
    
    // Status stats
    stats.byStatus[anime.status] = (stats.byStatus[anime.status] || 0) + 1;
    
    // Score calculation
    if (anime.score) {
      totalScore += anime.score;
      scoredCount++;
    }
  });
  
  stats.averageScore = scoredCount > 0 ? (totalScore / scoredCount).toFixed(2) : 0;
  
  console.log('📊 Collection Statistics:');
  console.log('   Total Titles:', stats.total);
  console.log('   By Type:', stats.byType);
  console.log('   By Status:', stats.byStatus);
  console.log('   Average Score:', stats.averageScore);
  
  return stats;
}

// Auto-run on page load if data doesn't exist
document.addEventListener('DOMContentLoaded', () => {
  const hasData = localStorage.getItem('animeCollection');
  if (!hasData && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    console.log('💡 Tip: Run initializeCollectionFromJikan() in console to populate with sample data');
  }
});
