// Local Storage Management

const STORAGE_KEYS = {
    COLLECTION: 'animeCollection',
    LAST_ADDED: 'lastAddedTitle',
    USER_SCORES: 'userScores'
};

class StorageManager {
    static getCollection() {
        const data = localStorage.getItem(STORAGE_KEYS.COLLECTION);
        return data ? JSON.parse(data) : [];
    }

    static saveCollection(collection) {
        localStorage.setItem(STORAGE_KEYS.COLLECTION, JSON.stringify(collection));
    }

    static addToCollection(item) {
        const collection = this.getCollection();
        item.id = Date.now().toString();
        item.dateAdded = new Date().toISOString();
        collection.push(item);
        this.saveCollection(collection);
        localStorage.setItem(STORAGE_KEYS.LAST_ADDED, JSON.stringify(item));
        return item;
    }

    static getLastAdded() {
        const data = localStorage.getItem(STORAGE_KEYS.LAST_ADDED);
        return data ? JSON.parse(data) : null;
    }

    static getCollectionStats() {
        const collection = this.getCollection();
        return {
            total: collection.length,
            watching: collection.filter(item => item.status === 'Watching').length,
            completed: collection.filter(item => item.status === 'Completed').length,
            lastAdded: this.getLastAdded()
        };
    }

    static getTopRatedAnime() {
        const collection = this.getCollection();
        if (collection.length === 0) return null;
        return collection.reduce((top, current) => {
            const topScore = top.score || 0;
            const currentScore = current.score || 0;
            return currentScore > topScore ? current : top;
        });
    }

    static removeFromCollection(id) {
        let collection = this.getCollection();
        collection = collection.filter(item => item.id !== id);
        this.saveCollection(collection);
    }

    static updateCollectionItem(id, updates) {
        let collection = this.getCollection();
        const index = collection.findIndex(item => item.id === id);
        if (index !== -1) {
            collection[index] = { ...collection[index], ...updates };
            this.saveCollection(collection);
            return collection[index];
        }
        return null;
    }
}
