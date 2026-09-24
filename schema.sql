-- TravelGuide Minimal Database Schema

CREATE TABLE IF NOT EXISTS trips (
    id TEXT PRIMARY KEY,
    destination TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    duration INTEGER NOT NULL,
    budget REAL NOT NULL,
    currency TEXT DEFAULT '$',
    travellers_type TEXT NOT NULL,
    travellers_count INTEGER NOT NULL,
    travel_style TEXT,
    accommodation TEXT,
    pace TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS itinerary (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    day_number INTEGER NOT NULL,
    city TEXT NOT NULL,
    hotel TEXT,
    morning_activity TEXT,
    afternoon_activity TEXT,
    evening_activity TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS packing (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    item TEXT NOT NULL,
    category TEXT NOT NULL,
    is_checked INTEGER DEFAULT 0,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS budget (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    category TEXT NOT NULL,
    item_name TEXT NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);
