/**
 * OMDC Offline Database
 *
 * IndexedDB wrapper for offline-first data persistence.
 * Used by e-Kiosk and Mobile App to:
 * - Cache booking data when offline
 * - Store queue entries locally
 * - Sync with server when online
 *
 * This ensures e-Kiosk APK works even without internet connection.
 */

const DB_NAME = "omdc-offline-db";
const DB_VERSION = 1;

// Object stores (tables)
const STORES = {
  bookings: "bookings", // Offline booking queue
  queue: "queue", // Queue entries (kiosk)
  patients: "patients", // Walk-in patient registrations
  payments: "payments", // Offline payment records
  cache: "cache", // General API response cache
} as const;

type StoreName = (typeof STORES)[keyof typeof STORES];

let dbInstance: IDBDatabase | null = null;

/** Open (or create) the IndexedDB database */
function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB not available"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object stores with indexes
      if (!db.objectStoreNames.contains(STORES.bookings)) {
        const store = db.createObjectStore(STORES.bookings, { keyPath: "id" });
        store.createIndex("status", "status", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.queue)) {
        const store = db.createObjectStore(STORES.queue, { keyPath: "id" });
        store.createIndex("status", "status", { unique: false });
        store.createIndex("number", "number", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.patients)) {
        const store = db.createObjectStore(STORES.patients, { keyPath: "id" });
        store.createIndex("phone", "phone", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.payments)) {
        const store = db.createObjectStore(STORES.payments, { keyPath: "id" });
        store.createIndex("status", "status", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.cache)) {
        db.createObjectStore(STORES.cache, { keyPath: "key" });
      }
    };
  });
}

/** Generic CRUD operations */
async function dbGet<T>(store: StoreName, key: string): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const request = tx.objectStore(store).get(key);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

async function dbGetAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const request = tx.objectStore(store).getAll();
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });
}

async function dbPut<T extends Record<string, unknown>>(store: StoreName, value: T): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDelete(store: StoreName, key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbClear(store: StoreName): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Get items by index value */
async function dbGetByIndex<T>(store: StoreName, indexName: string, value: IDBValidKey): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const index = tx.objectStore(store).index(indexName);
    const request = index.getAll(value);
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });
}

// ============ Public API ============

export const offlineDB = {
  // Bookings
  saveBooking: (booking: { id: string; status: string; createdAt: string }) =>
    dbPut(STORES.bookings, booking),
  getBookings: () => dbGetAll<{ id: string; status: string }>(STORES.bookings),
  getPendingBookings: () => dbGetByIndex<{ id: string }>(STORES.bookings, "status", "pending"),
  deleteBooking: (id: string) => dbDelete(STORES.bookings, id),

  // Queue
  saveQueueEntry: (entry: { id: string; status: string; number: string }) =>
    dbPut(STORES.queue, entry),
  getQueue: () => dbGetAll<{ id: string; status: string; number: string }>(STORES.queue),
  getWaitingQueue: () => dbGetByIndex<{ id: string }>(STORES.queue, "status", "waiting"),
  clearQueue: () => dbClear(STORES.queue),

  // Patients (walk-in)
  savePatient: (patient: { id: string; phone: string }) => dbPut(STORES.patients, patient),
  getPatients: () => dbGetAll<{ id: string; phone: string }>(STORES.patients),
  findPatientByPhone: (phone: string) =>
    dbGetByIndex<{ id: string }>(STORES.patients, "phone", phone),

  // Payments
  savePayment: (payment: { id: string; status: string }) => dbPut(STORES.payments, payment),
  getPayments: () => dbGetAll<{ id: string; status: string }>(STORES.payments),
  getPendingPayments: () => dbGetByIndex<{ id: string }>(STORES.payments, "status", "pending"),

  // Cache (API responses)
  getCached: <T>(key: string) => dbGet<T & { key: string; expiry: number }>(STORES.cache, key),
  setCached: (key: string, data: unknown, ttlMs: number) =>
    dbPut(STORES.cache, { key, data, expiry: Date.now() + ttlMs }),
  clearCache: () => dbClear(STORES.cache),

  // Utility
  isAvailable: () => typeof indexedDB !== "undefined",
};
