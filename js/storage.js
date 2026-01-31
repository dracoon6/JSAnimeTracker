// Local Storage Management
// This module handles all persistent data storage using browser's localStorage API
// It includes recursive functions for deep cloning and object traversal

const STORAGE_KEYS = {
    COLLECTION: 'animeCollection',
    LAST_ADDED: 'lastAddedTitle',
    USER_SCORES: 'userScores'
};

/**
 * Custom error class for storage-related errors
 * Provides specific error handling for data persistence failures
 */
class StorageError extends Error {
    constructor(message) {
        super(message);
        this.name = 'StorageError';
    }
}

/**
 * Deep clone an object recursively
 * Demonstrates recursion by traversing nested object properties
 * @param {*} obj - Object to deep clone
 * @returns {*} Deep cloned copy of the object
 */
function deepClone(obj) {
    // Base case: handle primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    // Handle objects - recursive call
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]); // Recursive call
        }
    }
    return cloned;
}

/**
 * Recursively search for a value in nested object properties
 * Demonstrates recursive traversal of object tree structure
 * @param {Object} obj - Object to search in
 * @param {*} searchValue - Value to find
 * @returns {boolean} True if value found in any nested property
 */
function searchInObject(obj, searchValue) {
    if (obj === null || typeof obj !== 'object') {
        return obj === searchValue;
    }
    
    // Recursive case: check all properties
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (searchInObject(obj[key], searchValue)) {
                return true;
            }
        }
    }
    return false;
}

class StorageManager {
    /**
     * Retrieve the complete anime collection from localStorage
     * @returns {Array} Array of anime objects or empty array if none exist
     */
    static getCollection() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.COLLECTION);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            throw new StorageError('Failed to retrieve collection from storage: ' + error.message);
        }
    }

    /**
     * Save the complete collection to localStorage
     * @param {Array} collection - Array of anime objects to save
     * @throws {StorageError} If save operation fails
     */
    static saveCollection(collection) {
        try {
            if (!Array.isArray(collection)) {
                throw new StorageError('Collection must be an array');
            }
            localStorage.setItem(STORAGE_KEYS.COLLECTION, JSON.stringify(collection));
        } catch (error) {
            throw new StorageError('Failed to save collection: ' + error.message);
        }
    }

    /**
     * Add a new anime item to the collection
     * @param {Object} item - Anime object to add
     * @returns {Object} The added item with generated id and timestamp
     * @throws {StorageError} If item is invalid or save fails
     */
    static addToCollection(item) {
        try {
            if (!item || typeof item !== 'object') {
                throw new StorageError('Invalid item: must be an object');
            }
            
            const collection = this.getCollection();
            item.id = Date.now().toString();
            item.dateAdded = new Date().toISOString();
            
            // Use deep clone to avoid reference issues
            const itemCopy = deepClone(item);
            collection.push(itemCopy);
            this.saveCollection(collection);
            localStorage.setItem(STORAGE_KEYS.LAST_ADDED, JSON.stringify(itemCopy));
            return itemCopy;
        } catch (error) {
            throw new StorageError('Failed to add item to collection: ' + error.message);
        }
    }

    /**
     * Get the most recently added anime
     * @returns {Object|null} The last added anime or null if none exist
     */
    static getLastAdded() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.LAST_ADDED);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            throw new StorageError('Failed to retrieve last added item: ' + error.message);
        }
    }

    /**
     * Get statistics about the collection using array methods
     * @returns {Object} Object containing total, watching, completed counts and last added item
     */
    static getCollectionStats() {
        try {
            const collection = this.getCollection();
            return {
                total: collection.length,
                watching: collection.filter(item => item.status === 'Watching').length,
                completed: collection.filter(item => item.status === 'Completed').length,
                lastAdded: this.getLastAdded()
            };
        } catch (error) {
            throw new StorageError('Failed to calculate stats: ' + error.message);
        }
    }

    /**
     * Find the highest rated anime using reduce()
     * @returns {Object|null} The anime with the highest score or null if none exist
     */
    static getTopRatedAnime() {
        try {
            const collection = this.getCollection();
            if (collection.length === 0) return null;
            return collection.reduce((top, current) => {
                const topScore = top.score || 0;
                const currentScore = current.score || 0;
                return currentScore > topScore ? current : top;
            });
        } catch (error) {
            throw new StorageError('Failed to find top rated anime: ' + error.message);
        }
    }

    /**
     * Remove an anime item from the collection by id
     * @param {string} id - The id of the anime to remove
     * @throws {StorageError} If removal fails
     */
    static removeFromCollection(id) {
        try {
            let collection = this.getCollection();
            collection = collection.filter(item => item.id !== id);
            this.saveCollection(collection);
        } catch (error) {
            throw new StorageError('Failed to remove item from collection: ' + error.message);
        }
    }

    /**
     * Update an existing anime item in the collection
     * @param {string} id - The id of the anime to update
     * @param {Object} updates - Object containing properties to update
     * @returns {Object|null} The updated anime object or null if not found
     * @throws {StorageError} If update fails
     */
    static updateCollectionItem(id, updates) {
        try {
            let collection = this.getCollection();
            const index = collection.findIndex(item => item.id === id);
            if (index !== -1) {
                collection[index] = { ...collection[index], ...updates };
                this.saveCollection(collection);
                return collection[index];
            }
            return null;
        } catch (error) {
            throw new StorageError('Failed to update collection item: ' + error.message);
        }
    }
}
