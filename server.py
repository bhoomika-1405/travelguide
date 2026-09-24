import os
import sys
import json
import sqlite3
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

DB_PATH = os.path.join(os.path.dirname(__file__), 'travelguide.db')
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), 'schema.sql')
PORT = 5000

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db():
    with get_db() as conn:
        with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
            conn.executescript(f.read())
        
        # Check if seed data needed
        cur = conn.execute("SELECT COUNT(*) as cnt FROM trips")
        if cur.fetchone()['cnt'] == 0:
            seed_initial_data(conn)

def seed_initial_data(conn):
    # Seed Kyoto trip
    trip_id = "trip-kyoto"
    conn.execute('''
        INSERT INTO trips (id, title, destination, start_date, end_date, duration, budget, currency, travellers_type, travellers_count, travel_style, accommodation, pace, cover_img, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        trip_id, "Blossoms & Temples Voyage", "Kyoto & Osaka, Japan", "Oct 12, 2026", "Oct 17, 2026", 5, 2200, "$",
        "Couple / Pair", 2, "Cultural & Historic", "Traditional Ryokan / Boutique Hotel", "Relaxed & Slow",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80", "Upcoming"
    ))

    # Seed Amalfi & Swiss trips
    conn.execute('''
        INSERT INTO trips (id, title, destination, start_date, end_date, duration, budget, currency, travellers_type, travellers_count, travel_style, accommodation, pace, cover_img, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        "trip-amalfi", "Sunny Lemon Groves & Cliffside Strolls", "Amalfi Coast, Italy", "Jun 20, 2026", "Jun 27, 2026", 7, 2900, "€",
        "Couple / Pair", 2, "Romantic Getaway", "Lemon Orchard Sea-view B&B", "Relaxed & Slow",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80", "Upcoming"
    ))
    conn.execute('''
        INSERT INTO trips (id, title, destination, start_date, end_date, duration, budget, currency, travellers_type, travellers_count, travel_style, accommodation, pace, cover_img, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        "trip-swiss", "Alpine Meadow Train Adventure", "Interlaken & Zermatt, Switzerland", "Aug 10, 2025", "Aug 16, 2025", 6, 2400, "$",
        "Friends", 3, "Adventure & Nature", "Mountain Log Cabin Lodge", "Active & Packed",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80", "Past"
    ))

    # Seed Itinerary Days for Kyoto
    itinerary_days = [
        (1, "Kyoto (Gion & Higashiyama)", "Ryokan Gion Yuraku 🍵",
         "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80", "First Matcha in Gion 🌸",
         json.dumps({"time": "09:00 AM", "tag": "Sightseeing", "title": "Kiyomizu-dera Wooden Stage", "notes": "Stroll up through Ninenzaka slope before crowds arrive."}),
         json.dumps({"time": "02:00 PM", "tag": "Café & Craft", "title": "Traditional Green Tea Ceremony & Tatami Rest", "notes": "Hidden teahouse overlooking a koi pond."}),
         json.dumps({"time": "06:30 PM", "tag": "Food & Stroll", "title": "Lantern-lit Gion Evening & Kaiseki Dinner", "notes": "Wander along Shirakawa canal."}),
         json.dumps(["Wear comfortable slip-on shoes for temple visits.", "Pickup an ICOCA transit card at Kyoto station."])),
        (2, "Kyoto (Arashiyama)", "Ryokan Gion Yuraku 🍵",
         "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80", "Whispering Bamboos 🎋",
         json.dumps({"time": "08:00 AM", "tag": "Nature & Zen", "title": "Sagano Bamboo Forest & Tenryu-ji Garden", "notes": "Catch early morning light."}),
         json.dumps({"time": "01:30 PM", "tag": "Wildlife & Views", "title": "Iwatayama Monkey Park & Togetsukyo Bridge", "notes": "Gentle hike up to feed wild macaques."}),
         json.dumps({"time": "07:00 PM", "tag": "Dinner", "title": "Warm Yudofu (Tofu Hot Pot) Dinner", "notes": "Riverside dining."}),
         json.dumps(["Rent bicycles near Saga-Arashiyama station."])),
        (3, "Kyoto to Nara", "Ryokan Gion Yuraku 🍵",
         "https://images.unsplash.com/photo-1478436127897-769e00d0c715?w=600&auto=format&fit=crop&q=80", "Endless Torii Gates ⛩️",
         json.dumps({"time": "07:30 AM", "tag": "Spiritual Path", "title": "1,000 Vermilion Torii Gates of Inari", "notes": "Hike up sacred trails."}),
         json.dumps({"time": "01:00 PM", "tag": "Day Excursion", "title": "JR Train to Nara Deer Park & Todai-ji", "notes": "Feed shika senbei crackers to gentle deer."}),
         json.dumps({"time": "06:30 PM", "tag": "Snacks", "title": "Naramachi Old Merchant Quarter Walk", "notes": "Handmade washi paper and mochi."}),
         json.dumps(["Hold onto paper maps around deer!"])),
        (4, "Osaka (Dotonbori)", "Cross Hotel Osaka 🏮",
         "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&auto=format&fit=crop&q=80", "Neon Dotonbori Nights 🐙",
         json.dumps({"time": "10:00 AM", "tag": "Castle History", "title": "Osaka Castle Park & Stone Moats", "notes": "Climb up for panoramic views."}),
         json.dumps({"time": "02:30 PM", "tag": "Vintage Vibes", "title": "Retro Shinsekai & Tsutenkaku Tower", "notes": "Old-school arcade games and kushikatsu."}),
         json.dumps({"time": "07:00 PM", "tag": "Street Feast", "title": "Dotonbori Street Food Marathon", "notes": "Glico Man photo and piping hot takoyaki."}),
         json.dumps(["Don't double dip kushikatsu sauce!"])),
        (5, "Osaka (Umeda & Keepsakes)", "Cross Hotel Osaka 🏮",
         "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop&q=80", "Farewell Keepsakes 💌",
         json.dumps({"time": "09:30 AM", "tag": "Skyline", "title": "Umeda Sky Building Floating Observatory", "notes": "Futuristic glass escalator."}),
         json.dumps({"time": "01:00 PM", "tag": "Shopping", "title": "Grand Front & Hankyu Stationery Haul", "notes": "Cute washi tape and matcha treats."}),
         json.dumps({"time": "05:00 PM", "tag": "Departure", "title": "Haruka Express to Kansai Airport", "notes": "Write final journal entries."}),
         json.dumps(["Keep coin purses ready for gachapon!"]))
    ]
    for d in itinerary_days:
        conn.execute('''
            INSERT INTO itinerary (id, trip_id, day_number, city, hotel, photo, photo_caption, morning_activity, afternoon_activity, evening_activity, tips)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (f"itin-{trip_id}-{d[0]}", trip_id, d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]))

    # Seed Packing Items
    packing = [
        (1, trip_id, "Passport & flight e-tickets", "essentials", 1),
        (2, trip_id, "Travel insurance card", "essentials", 1),
        (3, trip_id, "Wallet, cash & foreign cards", "essentials", 1),
        (4, trip_id, "Comfortable walking sneakers", "clothing", 1),
        (5, trip_id, "Light pastel cardigan / jacket", "clothing", 1),
        (6, trip_id, "Slip-on socks for temple floors", "clothing", 0),
        (7, trip_id, "Cute day dresses / comfy linen shirts", "clothing", 0),
        (8, trip_id, "Travel sunscreen & lip balm", "toiletries", 1),
        (9, trip_id, "Pocket wet wipes & sanitizer", "toiletries", 0),
        (10, trip_id, "Camera & extra memory card", "electronics", 0),
        (11, trip_id, "Universal power plug adapter", "electronics", 1),
        (12, trip_id, "Travel scrapbook notebook & glue pen", "scrapbook", 1),
        (13, trip_id, "Cute washi tapes & colored pens", "scrapbook", 0)
    ]
    for p in packing:
        conn.execute("INSERT INTO packing (id, trip_id, item, category, is_checked) VALUES (?, ?, ?, ?, ?)",
                     (f"pack-{p[0]}", p[1], p[2], p[3], p[4]))

    # Seed Budget
    budget = [
        (1, trip_id, "Kyoto Ryokan 3 Nights (Boutique)", "Accommodation", 720),
        (2, trip_id, "Osaka Hotel 2 Nights", "Accommodation", 340),
        (3, trip_id, "JR Shinkansen & Transit Cards", "Transport", 210),
        (4, trip_id, "Matcha Tea & Kaiseki Dinner Experience", "Food & Drinks", 160),
        (5, trip_id, "Street Food & Dotonbori Treats", "Food & Drinks", 95),
        (6, trip_id, "Temple Tickets & Castle Entry Passes", "Activities", 45),
        (7, trip_id, "Ceramics & Scrapbook Stationery", "Shopping & Souvenirs", 70)
    ]
    for b in budget:
        conn.execute("INSERT INTO budget (id, trip_id, item_name, category, amount) VALUES (?, ?, ?, ?, ?)",
                     (f"budget-{b[0]}", b[1], b[2], b[3], b[4]))
    conn.commit()


class RequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(__file__), **kwargs)

    def _set_headers(self, status=200, content_type='application/json'):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def _read_json(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length > 0:
            body = self.rfile.read(content_length)
            return json.loads(body.decode('utf-8'))
        return {}

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/trips':
            with get_db() as conn:
                rows = conn.execute("SELECT * FROM trips ORDER BY created_at DESC").fetchall()
                trips = [dict(r) for r in rows]
                self._set_headers(200)
                self.wfile.write(json.dumps(trips).encode('utf-8'))
            return

        elif path.startswith('/api/trips/'):
            trip_id = path.split('/')[3]
            with get_db() as conn:
                trip = conn.execute("SELECT * FROM trips WHERE id = ?", (trip_id,)).fetchone()
                if not trip:
                    self._set_headers(404)
                    self.wfile.write(json.dumps({"error": "Trip not found"}).encode('utf-8'))
                    return

                itinerary_rows = conn.execute(
                    "SELECT * FROM itinerary WHERE trip_id = ? ORDER BY day_number ASC", (trip_id,)
                ).fetchall()
                itinerary = []
                for r in itinerary_rows:
                    itinerary.append({
                        "id": r["id"],
                        "trip_id": r["trip_id"],
                        "dayNumber": r["day_number"],
                        "city": r["city"],
                        "hotel": r["hotel"],
                        "photo": r["photo"],
                        "photoCaption": r["photo_caption"],
                        "morning": json.loads(r["morning_activity"]) if r["morning_activity"] else {},
                        "afternoon": json.loads(r["afternoon_activity"]) if r["afternoon_activity"] else {},
                        "evening": json.loads(r["evening_activity"]) if r["evening_activity"] else {},
                        "tips": json.loads(r["tips"]) if r["tips"] else []
                    })

                packing_rows = conn.execute("SELECT * FROM packing WHERE trip_id = ?", (trip_id,)).fetchall()
                packing = [{"id": r["id"], "trip_id": r["trip_id"], "text": r["item"], "category": r["category"], "checked": bool(r["is_checked"])} for r in packing_rows]

                budget_rows = conn.execute("SELECT * FROM budget WHERE trip_id = ?", (trip_id,)).fetchall()
                budget = [{"id": r["id"], "trip_id": r["trip_id"], "name": r["item_name"], "category": r["category"], "amount": r["amount"]} for r in budget_rows]

                result = {
                    "trip": dict(trip),
                    "itinerary": itinerary,
                    "packing": packing,
                    "budget": budget
                }
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode('utf-8'))
            return

        # Serve static frontend files
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        data = self._read_json()

        if path == '/api/trips':
            # Create trip
            trip_id = data.get('id') or f"trip-{int(os.urandom(4).hex(), 16)}"
            with get_db() as conn:
                conn.execute('''
                    INSERT INTO trips (id, title, destination, start_date, end_date, duration, budget, currency, travellers_type, travellers_count, travel_style, accommodation, pace, cover_img, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    trip_id,
                    data.get('title'),
                    data.get('destination'),
                    data.get('start_date'),
                    data.get('end_date'),
                    data.get('duration', 5),
                    data.get('budget', 2000),
                    data.get('currency', '$'),
                    data.get('travellers_type', 'Solo'),
                    data.get('travellers_count', 1),
                    data.get('travel_style', 'Cultural & Historic'),
                    data.get('accommodation', 'Boutique Hotel'),
                    data.get('pace', 'Relaxed & Slow'),
                    data.get('cover_img', ''),
                    data.get('status', 'Upcoming')
                ))

                # Save itinerary if provided
                itinerary_list = data.get('itinerary', [])
                for day in itinerary_list:
                    itin_id = day.get('id') or f"itin-{trip_id}-{day.get('dayNumber', 1)}"
                    conn.execute('''
                        INSERT INTO itinerary (id, trip_id, day_number, city, hotel, photo, photo_caption, morning_activity, afternoon_activity, evening_activity, tips)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        itin_id,
                        trip_id,
                        day.get('dayNumber', 1),
                        day.get('city', ''),
                        day.get('hotel', ''),
                        day.get('photo', ''),
                        day.get('photoCaption', ''),
                        json.dumps(day.get('morning', {})),
                        json.dumps(day.get('afternoon', {})),
                        json.dumps(day.get('evening', {})),
                        json.dumps(day.get('tips', []))
                    ))

                conn.commit()
            self._set_headers(201)
            self.wfile.write(json.dumps({"success": True, "id": trip_id}).encode('utf-8'))
            return

        elif '/packing' in path:
            trip_id = path.split('/')[3]
            item_id = data.get('id') or f"pack-{int(os.urandom(3).hex(), 16)}"
            with get_db() as conn:
                conn.execute('''
                    INSERT OR REPLACE INTO packing (id, trip_id, item, category, is_checked)
                    VALUES (?, ?, ?, ?, ?)
                ''', (
                    str(item_id),
                    trip_id,
                    data.get('text', data.get('item', '')),
                    data.get('category', 'essentials'),
                    1 if data.get('checked', False) else 0
                ))
                conn.commit()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "id": item_id}).encode('utf-8'))
            return

        elif '/budget' in path:
            trip_id = path.split('/')[3]
            item_id = data.get('id') or f"budget-{int(os.urandom(3).hex(), 16)}"
            with get_db() as conn:
                conn.execute('''
                    INSERT OR REPLACE INTO budget (id, trip_id, item_name, category, amount)
                    VALUES (?, ?, ?, ?, ?)
                ''', (
                    str(item_id),
                    trip_id,
                    data.get('name', data.get('item_name', '')),
                    data.get('category', 'Food & Drinks'),
                    float(data.get('amount', 0))
                ))
                conn.commit()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "id": item_id}).encode('utf-8'))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path
        data = self._read_json()

        if path.startswith('/api/trips/'):
            trip_id = path.split('/')[3]
            fields = []
            values = []
            allowed = ['title', 'destination', 'start_date', 'end_date', 'duration', 'budget', 'currency', 'travellers_type', 'travellers_count', 'travel_style', 'accommodation', 'pace', 'cover_img', 'status']
            for k in allowed:
                if k in data:
                    fields.append(f"{k} = ?")
                    values.append(data[k])
            
            if fields:
                values.append(trip_id)
                with get_db() as conn:
                    conn.execute(f"UPDATE trips SET {', '.join(fields)} WHERE id = ?", values)
                    conn.commit()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path.startswith('/api/trips/'):
            trip_id = path.split('/')[3]
            with get_db() as conn:
                conn.execute("DELETE FROM trips WHERE id = ?", (trip_id,))
                conn.execute("DELETE FROM itinerary WHERE trip_id = ?", (trip_id,))
                conn.execute("DELETE FROM packing WHERE trip_id = ?", (trip_id,))
                conn.execute("DELETE FROM budget WHERE trip_id = ?", (trip_id,))
                conn.commit()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            return

        elif path.startswith('/api/packing/'):
            item_id = path.split('/')[3]
            with get_db() as conn:
                conn.execute("DELETE FROM packing WHERE id = ?", (str(item_id),))
                conn.commit()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            return

        elif path.startswith('/api/budget/'):
            item_id = path.split('/')[3]
            with get_db() as conn:
                conn.execute("DELETE FROM budget WHERE id = ?", (str(item_id),))
                conn.commit()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))


if __name__ == '__main__':
    init_db()
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"TravelGuide backend running on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
