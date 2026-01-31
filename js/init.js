// Data Initialization Script
// Provides sample anime data and helper functions for testing and initialization
// Call initializeCollection() in browser console to populate with 15 sample anime titles

const SAMPLE_ANIME = [
  {
    title: "Attack on Titan",
    type: "TV",
    status: "Completed",
    episodes: 139,
    score: 9,
    synopsis: "After his hometown is destroyed and his mother is killed, young Eren Yeager vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.",
    studio: "Wit Studio",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
  },
  {
    title: "Death Note",
    type: "TV",
    status: "Completed",
    episodes: 37,
    score: 8.5,
    synopsis: "An intelligent high schooler discovers a supernatural notebook that allows him to kill anyone by writing their name, and uses it to pursue his god-like plans.",
    studio: "Madhouse",
    imageUrl: "https://cdn.myanimelist.net/images/anime/9/9453.jpg"
  },
  {
    title: "Demon Slayer",
    type: "TV",
    status: "Watching",
    episodes: 55,
    score: 8.7,
    synopsis: "A young demon slayer embarks on a quest to save his sister, who has been transformed into a demon, and to defeat the demon lord Muzan.",
    studio: "ufotable",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1/43584.jpg"
  },
  {
    title: "Jujutsu Kaisen",
    type: "TV",
    status: "Watching",
    episodes: 50,
    score: 8.5,
    synopsis: "A high schooler swallows a cursed finger and joins a secret organization of Jujutsu sorcerers to fight curse users and find the other 19 fingers of a powerful demon.",
    studio: "MAPPA",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1/52715.jpg"
  },
  {
    title: "Steins;Gate",
    type: "TV",
    status: "Completed",
    episodes: 24,
    score: 9,
    synopsis: "A group of friends discover how to send messages to the past, which results in a dangerous journey through alternate timelines and a race against fate itself.",
    studio: "White Fox",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/30819.jpg"
  },
  {
    title: "My Hero Academia",
    type: "TV",
    status: "Watching",
    episodes: 130,
    score: 7.9,
    synopsis: "In a society where almost everyone has superpowers, a powerless boy dreams of becoming the greatest hero and enrolls in a hero academy.",
    studio: "Bones",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/75815.jpg"
  },
  {
    title: "Tokyo Ghoul",
    type: "TV",
    status: "Completed",
    episodes: 48,
    score: 7.5,
    synopsis: "After a deadly encounter with a ghoul, a teenager is transformed into a half-ghoul and must navigate a world of hidden monsters living in secret in Tokyo.",
    studio: "Studio Pierrot",
    imageUrl: "https://cdn.myanimelist.net/images/anime/2/33731.jpg"
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    type: "TV",
    status: "Completed",
    episodes: 64,
    score: 9.1,
    synopsis: "Two brothers use alchemy to try to resurrect their dead mother, but the experiment goes horribly wrong and they spend years searching for a way to fix their mistakes.",
    studio: "Bones",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1/29114.jpg"
  },
  {
    title: "Ergo Proxy",
    type: "TV",
    status: "Plan to Watch",
    episodes: 23,
    score: 7.2,
    synopsis: "In a post-apocalyptic world, a young Re-L explores dangerous ruins searching for the truth, accompanied by Proxy and a sentient AutoReiv.",
    studio: "Manglobe",
    imageUrl: "https://cdn.myanimelist.net/images/anime/13/20319.jpg"
  },
  {
    title: "Vinland Saga",
    type: "TV",
    status: "Completed",
    episodes: 24,
    score: 8.9,
    synopsis: "A young Viking warrior seeks revenge against the man who killed his father, but his journey takes him on a path toward something much greater.",
    studio: "WIT Studio",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1/50271.jpg"
  },
  {
    title: "Cowboy Bebop",
    type: "TV",
    status: "Completed",
    episodes: 26,
    score: 8.8,
    synopsis: "A group of bounty hunters travel across space in their ship Bebop, taking on jobs and living a life of adventure and mystery.",
    studio: "Sunrise",
    imageUrl: "https://cdn.myanimelist.net/images/anime/4/19644.jpg"
  },
  {
    title: "Neon Genesis Evangelion",
    type: "TV",
    status: "Completed",
    episodes: 26,
    score: 7.6,
    synopsis: "Teenage pilots must operate giant robots called Evangelions to protect humanity from mysterious beings known as Angels.",
    studio: "Gainax",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1/7711.jpg"
  },
  {
    title: "Code Geass",
    type: "TV",
    status: "On Hold",
    episodes: 50,
    score: 7.8,
    synopsis: "A young man gains the power to command anyone to obey him, and uses this ability in a rebellion against an oppressive empire.",
    studio: "Sunrise",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1/13662.jpg"
  },
  {
    title: "Spy × Family",
    type: "TV",
    status: "Watching",
    episodes: 25,
    score: 8.3,
    synopsis: "A spy, an assassin, and a psychic girl with no connection form an unlikely family to infiltrate and survive high society.",
    studio: "CloverWorks",
    imageUrl: "https://cdn.myanimelist.net/images/anime/14/96303.jpg"
  },
  {
    title: "Mob Psycho 100",
    type: "TV",
    status: "Completed",
    episodes: 25,
    score: 8.6,
    synopsis: "A psychic middle schooler suppresses his powers to live a normal life, but keeps getting pulled into supernatural adventures.",
    studio: "Bones",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/87882.jpg"
  }
];

/**
 * Initialize collection with 15 sample anime titles
 * Populates localStorage with predefined anime data for testing
 * Call this function in browser console: initializeCollection()
 * @returns {boolean} True if initialization successful, false otherwise
 */
function initializeCollection() {
  try {
    const collection = [];
    
    SAMPLE_ANIME.forEach((anime, index) => {
      const item = {
        id: Date.now().toString() + index,
        ...anime,
        dateAdded: new Date().toISOString()
      };
      collection.push(item);
    });
    
    localStorage.setItem('animeCollection', JSON.stringify(collection));
    
    // Set the last added to the last item
    localStorage.setItem('lastAddedTitle', JSON.stringify(collection[collection.length - 1]));
    
    console.log('✅ Collection initialized with 15 anime titles!');
    console.log('📊 Stats:');
    console.log('   Total titles:', collection.length);
    console.log('   Completed:', collection.filter(a => a.status === 'Completed').length);
    console.log('   Currently Watching:', collection.filter(a => a.status === 'Watching').length);
    console.log('   On Hold:', collection.filter(a => a.status === 'On Hold').length);
    console.log('   Plan to Watch:', collection.filter(a => a.status === 'Plan to Watch').length);
    
    return true;
  } catch (error) {
    console.error('❌ Error initializing collection:', error);
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
    console.log('💡 Tip: Run initializeCollection() in console to populate with sample data');
  }
});
