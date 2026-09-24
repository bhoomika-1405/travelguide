/**
 * TravelGuide - Minimal Persistent IndexedDB Database
 * Stores: trips, itinerary, packing, budget
 */

const DB_NAME = 'TravelGuideDB';
const DB_VERSION = 1;

let dbInstance = null;

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      return resolve(dbInstance);
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      // 1. Trips Store
      if (!db.objectStoreNames.contains('trips')) {
        db.createObjectStore('trips', { keyPath: 'id' });
      }

      // 2. Itinerary Store
      if (!db.objectStoreNames.contains('itinerary')) {
        const itinStore = db.createObjectStore('itinerary', { keyPath: 'id' });
        itinStore.createIndex('trip_id', 'trip_id', { unique: false });
      }

      // 3. Packing Store
      if (!db.objectStoreNames.contains('packing')) {
        const packStore = db.createObjectStore('packing', { keyPath: 'id' });
        packStore.createIndex('trip_id', 'trip_id', { unique: false });
      }

      // 4. Budget Store
      if (!db.objectStoreNames.contains('budget')) {
        const budgetStore = db.createObjectStore('budget', { keyPath: 'id' });
        budgetStore.createIndex('trip_id', 'trip_id', { unique: false });
      }
    };

    request.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };

    request.onerror = (e) => {
      console.error('IndexedDB Error:', e.target.error);
      reject(e.target.error);
    };
  });
}

// Generic CRUD helpers
async function dbPut(storeName, data) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(data);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbGetAll(storeName) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function dbGetByTripId(storeName, tripId) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const index = store.index('trip_id');
    const req = index.getAll(tripId);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function dbDelete(storeName, id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

async function dbClear(storeName) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.clear();
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}
