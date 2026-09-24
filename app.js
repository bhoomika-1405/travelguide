/**
 * TravelGuide - Cute Scrapbook Travel Planner
 * Functional Vanilla JavaScript
 */

// ==========================================
// 1. DATA STORES (Mock Realistic Data)
// ==========================================

let activeCurrency = "$";

let currentTrip = {
  id: "trip-kyoto",
  destination: "Kyoto & Osaka, Japan",
  title: "5-Day Blossoms & Temples Voyage",
  dates: "Oct 12 - Oct 17, 2026",
  duration: 5,
  travellerType: "Couple / Pair",
  travellerCount: 2,
  travelStyle: "Cultural & Historic",
  accommodation: "Traditional Ryokan / Boutique Hotel",
  pace: "Relaxed & Slow",
  budget: 2200,
  days: [
    {
      dayNumber: 1,
      city: "Kyoto (Gion & Higashiyama)",
      hotel: "Ryokan Gion Yuraku 🍵 (Includes tatami & garden)",
      photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
      photoCaption: "First Matcha in Gion 🌸",
      morning: {
        time: "09:00 AM",
        tag: "Sightseeing",
        title: "Kiyomizu-dera Wooden Stage",
        notes: "Stroll up through Ninenzaka slope before the crowds arrive. Sample hot yatsuhashi cinnamon treats along the stone path."
      },
      afternoon: {
        time: "02:00 PM",
        tag: "Café & Craft",
        title: "Traditional Green Tea Ceremony & Tatami Rest",
        notes: "Hidden teahouse overlooking a koi pond. Learn whisking techniques and relax sore feet."
      },
      evening: {
        time: "06:30 PM",
        tag: "Food & Stroll",
        title: "Lantern-lit Gion Evening & Kaiseki Dinner",
        notes: "Wander along Shirakawa canal. Keep eyes open for apprentice geiko hurrying to evening appointments."
      },
      tips: [
        "Wear comfortable slip-on shoes for temple visits.",
        "Pickup an ICOCA transit card at Kyoto station.",
        "Cash is preferred at small street confectionery stalls."
      ]
    },
    {
      dayNumber: 2,
      city: "Kyoto (Arashiyama Bamboo Grove)",
      hotel: "Ryokan Gion Yuraku 🍵",
      photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
      photoCaption: "Whispering Bamboos 🎋",
      morning: {
        time: "08:00 AM",
        tag: "Nature & Zen",
        title: "Sagano Bamboo Forest & Tenryu-ji Garden",
        notes: "Catch the early morning golden light filtering through giant bamboo culms."
      },
      afternoon: {
        time: "01:30 PM",
        tag: "Wildlife & Views",
        title: "Iwatayama Monkey Park & Togetsukyo Bridge",
        notes: "Cross the historic wooden moon-crossing bridge, take a scenic gentle hike up to feed wild macaques."
      },
      evening: {
        time: "07:00 PM",
        tag: "Dinner",
        title: "Warm Yudofu (Tofu Hot Pot) Dinner",
        notes: "Dine riverside on fresh seasonal tofu and local plum wine."
      },
      tips: [
        "Rent bicycles near Saga-Arashiyama station for easy exploring.",
        "Check out % Arabica café right on the riverbank."
      ]
    },
    {
      dayNumber: 3,
      city: "Kyoto (Fushimi Inari) to Nara",
      hotel: "Ryokan Gion Yuraku 🍵",
      photo: "https://images.unsplash.com/photo-1478436127897-769e00d0c715?w=600&auto=format&fit=crop&q=80",
      photoCaption: "Endless Torii Gates ⛩️",
      morning: {
        time: "07:30 AM",
        tag: "Spiritual Path",
        title: "1,000 Vermilion Torii Gates of Inari",
        notes: "Hike up the sacred mountain trails bordered by thousands of orange torii gates and mossy fox shrines."
      },
      afternoon: {
        time: "01:00 PM",
        tag: "Day Excursion",
        title: "JR Train to Nara Deer Park & Todai-ji",
        notes: "Bow politely to gentle roaming sika deer and feed them shika senbei crackers. Marvel at the giant bronze Buddha."
      },
      evening: {
        time: "06:30 PM",
        tag: "Snacks",
        title: "Naramachi Old Merchant Quarter Walk",
        notes: "Shop for handmade washi paper, incense, and freshly pounded sweet mochi."
      },
      tips: [
        "Hold onto paper maps around the deer; they like eating them!",
        "Sunset over Sarusawa Pond is breathtaking."
      ]
    },
    {
      dayNumber: 4,
      city: "Osaka (Dotonbori & Shinsekai)",
      hotel: "Cross Hotel Osaka 🏮 (Steps from canal neon)",
      photo: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&auto=format&fit=crop&q=80",
      photoCaption: "Neon Dotonbori Nights 🐙",
      morning: {
        time: "10:00 AM",
        tag: "Castle History",
        title: "Osaka Castle Park & Stone Moats",
        notes: "Climb up the castle museum for panoramic views of Osaka skyline. Stroll the surrounding plum orchards."
      },
      afternoon: {
        time: "02:30 PM",
        tag: "Vintage Vibes",
        title: "Retro Shinsekai & Tsutenkaku Tower",
        notes: "Old-school Showa era arcade games, retro neon signs, and piping hot kushikatsu skewers."
      },
      evening: {
        time: "07:00 PM",
        tag: "Street Feast",
        title: "Dotonbori Street Food Marathon",
        notes: "Glico Running Man photo, steaming takoyaki balls with dancing bonito flakes, and fluffy okonomiyaki."
      },
      tips: [
        "Don't double dip the kushikatsu sauce!",
        "Take a quick 20-minute river cruise along the canal."
      ]
    },
    {
      dayNumber: 5,
      city: "Osaka (Umeda & Souvenirs)",
      hotel: "Cross Hotel Osaka 🏮",
      photo: "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop&q=80",
      photoCaption: "Farewell Keepsakes 💌",
      morning: {
        time: "09:30 AM",
        tag: "Skyline",
        title: "Umeda Sky Building Floating Observatory",
        notes: "Take the futuristic glass escalator suspended high in mid-air with 360-degree city panorama."
      },
      afternoon: {
        time: "01:00 PM",
        tag: "Shopping",
        title: "Grand Front & Hankyu Stationery Haul",
        notes: "Hunt for cute washi tape rolls, pastel fountain pens, and matcha kit-kats to take home."
      },
      evening: {
        time: "05:00 PM",
        tag: "Departure",
        title: "Haruka Express to Kansai Airport (KIX)",
        notes: "Savor bento box on the train and write final journal entries on the flight back home."
      },
      tips: [
        "Keep coin purses ready for station gachapon toy capsules.",
        "Tax-free shopping applies with your passport at department stores."
      ]
    }
  ]
};

// Packing List Data
let packingItems = [
  { id: 1, trip_id: "trip-kyoto", text: "Passport & flight e-tickets", category: "essentials", checked: true },
  { id: 2, trip_id: "trip-kyoto", text: "Travel insurance card", category: "essentials", checked: true },
  { id: 3, trip_id: "trip-kyoto", text: "Wallet, cash & foreign cards", category: "essentials", checked: true },
  { id: 4, trip_id: "trip-kyoto", text: "Comfortable walking sneakers", category: "clothing", checked: true },
  { id: 5, trip_id: "trip-kyoto", text: "Light pastel cardigan / jacket", category: "clothing", checked: true },
  { id: 6, trip_id: "trip-kyoto", text: "Slip-on socks for temple floors", category: "clothing", checked: false },
  { id: 7, trip_id: "trip-kyoto", text: "Cute day dresses / comfy linen shirts", category: "clothing", checked: false },
  { id: 8, trip_id: "trip-kyoto", text: "Travel sunscreen & lip balm", category: "toiletries", checked: true },
  { id: 9, trip_id: "trip-kyoto", text: "Pocket wet wipes & sanitizer", category: "toiletries", checked: false },
  { id: 10, trip_id: "trip-kyoto", text: "Mini first-aid & headache meds", category: "toiletries", checked: true },
  { id: 11, trip_id: "trip-kyoto", text: "Camera & extra memory card", category: "electronics", checked: false },
  { id: 12, trip_id: "trip-kyoto", text: "Pocket Wi-Fi / eSIM QR code", category: "electronics", checked: true },
  { id: 13, trip_id: "trip-kyoto", text: "Universal power plug adapter", category: "electronics", checked: true },
  { id: 14, trip_id: "trip-kyoto", text: "Portable power bank 10,000mAh", category: "electronics", checked: false },
  { id: 15, trip_id: "trip-kyoto", text: "Travel scrapbook notebook & glue pen", category: "scrapbook", checked: true },
  { id: 16, trip_id: "trip-kyoto", text: "Cute washi tapes & colored pens", category: "scrapbook", checked: false },
  { id: 17, trip_id: "trip-kyoto", text: "Foldable tote bag for souvenirs", category: "scrapbook", checked: false }
];

// Budget Items Data
let budgetExpenses = [
  { id: 1, trip_id: "trip-kyoto", name: "Kyoto Ryokan 3 Nights (Boutique)", amount: 720, category: "Accommodation" },
  { id: 2, trip_id: "trip-kyoto", name: "Osaka Hotel 2 Nights", amount: 340, category: "Accommodation" },
  { id: 3, trip_id: "trip-kyoto", name: "JR Shinkansen & Transit Cards", amount: 210, category: "Transport" },
  { id: 4, trip_id: "trip-kyoto", name: "Matcha Tea & Kaiseki Dinner Experience", amount: 160, category: "Food & Drinks" },
  { id: 5, trip_id: "trip-kyoto", name: "Street Food & Dotonbori Treats", amount: 95, category: "Food & Drinks" },
  { id: 6, trip_id: "trip-kyoto", name: "Temple Tickets & Castle Entry Passes", amount: 45, category: "Activities" },
  { id: 7, trip_id: "trip-kyoto", name: "Ceramics & Scrapbook Stationery", amount: 70, category: "Shopping & Souvenirs" }
];

// My Saved Trips Data
let mySavedTrips = [
  {
    id: "trip-kyoto",
    title: "Blossoms & Temples Voyage",
    destination: "Kyoto & Osaka, Japan",
    dates: "Oct 12 - Oct 17, 2026",
    duration: "5 Days",
    travellers: "2 Travellers",
    style: "Cultural & Historic",
    status: "Upcoming",
    coverImg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "trip-amalfi",
    title: "Sunny Lemon Groves & Cliffside Strolls",
    destination: "Amalfi Coast, Italy",
    dates: "Jun 20 - Jun 27, 2026",
    duration: "7 Days",
    travellers: "Couple",
    style: "Romantic Getaway",
    status: "Upcoming",
    coverImg: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "trip-swiss",
    title: "Alpine Meadow Train Adventure",
    destination: "Interlaken & Zermatt, Switzerland",
    dates: "Aug 10 - Aug 16, 2025",
    duration: "6 Days",
    travellers: "Friends (3)",
    style: "Adventure & Nature",
    status: "Past",
    coverImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80"
  }
];

// Destinations Inspiration
const destinationsData = [
  {
    id: "dest-kyoto",
    name: "Kyoto, Japan",
    category: "cultural",
    vibe: "⛩️ Cultural & Historic",
    quote: "Bamboo forests, quiet moss gardens, and morning matcha.",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80",
    suggestedBudget: 2200,
    hotel: "Traditional Ryokan / Boutique Hotel"
  },
  {
    id: "dest-santorini",
    name: "Santorini, Greece",
    category: "romantic",
    vibe: "🥂 Romantic & Views",
    quote: "Whitewashed cubist houses, pink bougainvillea, and caldera sunsets.",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&auto=format&fit=crop&q=80",
    suggestedBudget: 2600,
    hotel: "Cliffside Cave Villa / Boutique B&B"
  },
  {
    id: "dest-bali",
    name: "Ubud & Canggu, Bali",
    category: "beach",
    vibe: "🏖️ Beach & Relaxation",
    quote: "Emerald rice terraces, coconut smoothies, and sunset surf waves.",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=80",
    suggestedBudget: 1500,
    hotel: "Bamboo Eco-Villa with Jungle Pool"
  },
  {
    id: "dest-paris",
    name: "Paris, France",
    category: "romantic",
    vibe: "🥐 Romantic & Foodie",
    quote: "Warm pain au chocolat, Seine bookstores, and pastel boutique strolls.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80",
    suggestedBudget: 2800,
    hotel: "Montmartre Artist Studio / Hotel"
  },
  {
    id: "dest-banff",
    name: "Banff, Canada",
    category: "adventure",
    vibe: "🏔️ Nature & Adventure",
    quote: "Turquoise glacial lakes, cozy timber cabins, and pine forest trails.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
    suggestedBudget: 2400,
    hotel: "Mountain Log Cabin Lodge"
  },
  {
    id: "dest-amalfi",
    name: "Positano & Amalfi, Italy",
    category: "beach",
    vibe: "🏖️ Beach & Coastal",
    quote: "Pastel cliffside houses, lemon sorbet, and turquoise waters.",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80",
    suggestedBudget: 2900,
    hotel: "Lemon Orchard Sea-view B&B"
  }
];

const API_BASE = (window.location.origin && window.location.origin.includes(':5000'))
  ? '/api'
  : 'http://localhost:5000/api';

async function initDatabase() {
  try {
    // 1. Fetch from Backend SQLite API
    const tripsRes = await fetch(`${API_BASE}/trips`);
    if (tripsRes.ok) {
      const backendTrips = await tripsRes.json();
      if (backendTrips && backendTrips.length > 0) {
        mySavedTrips = backendTrips.map(t => ({
          id: t.id,
          title: t.title || `${t.duration}-Day ${t.destination.split(',')[0]} Getaway`,
          destination: t.destination,
          dates: `${t.start_date} - ${t.end_date}`,
          duration: `${t.duration} Days`,
          travellers: `${t.travellers_count} (${t.travellers_type})`,
          style: t.travel_style,
          status: t.status || 'Upcoming',
          coverImg: t.cover_img || getDestinationImage(t.destination),
          budget: t.budget,
          currency: t.currency || '$',
          accommodation: t.accommodation,
          pace: t.pace
        }));

        const activeId = mySavedTrips[0].id;
        const detailRes = await fetch(`${API_BASE}/trips/${activeId}`);
        if (detailRes.ok) {
          const detail = await detailRes.json();
          const t = detail.trip;
          currentTrip.id = t.id;
          currentTrip.destination = t.destination;
          currentTrip.title = t.title;
          currentTrip.dates = `${t.start_date} - ${t.end_date}`;
          currentTrip.duration = t.duration;
          currentTrip.budget = t.budget;
          activeCurrency = t.currency || '$';
          currentTrip.travellerCount = t.travellers_count;
          currentTrip.travellerType = t.travellers_type;
          currentTrip.travelStyle = t.travel_style;
          currentTrip.accommodation = t.accommodation;
          currentTrip.pace = t.pace;

          if (detail.itinerary && detail.itinerary.length > 0) {
            currentTrip.days = detail.itinerary;
          }
          if (detail.packing && detail.packing.length > 0) {
            packingItems = detail.packing;
          }
          if (detail.budget && detail.budget.length > 0) {
            budgetExpenses = detail.budget;
          }
          return;
        }
      }
    }
  } catch (backendErr) {
    console.warn("Backend not yet connected or offline, fallback to IndexedDB:", backendErr);
  }

  // Fallback to IndexedDB
  try {
    await openDatabase();
    const savedTripsFromDb = await dbGetAll('trips');
    if (!savedTripsFromDb || savedTripsFromDb.length === 0) {
      for (const trip of mySavedTrips) await dbPut('trips', trip);
      for (const day of currentTrip.days) {
        await dbPut('itinerary', {
          id: `itin-trip-kyoto-${day.dayNumber}`,
          trip_id: 'trip-kyoto',
          dayNumber: day.dayNumber,
          city: day.city,
          hotel: day.hotel,
          photo: day.photo,
          photoCaption: day.photoCaption,
          morning: day.morning,
          afternoon: day.afternoon,
          evening: day.evening,
          tips: day.tips
        });
      }
      for (const item of packingItems) await dbPut('packing', item);
      for (const exp of budgetExpenses) await dbPut('budget', exp);
    } else {
      mySavedTrips = savedTripsFromDb;
      const storedItinerary = await dbGetByTripId('itinerary', currentTrip.id);
      if (storedItinerary && storedItinerary.length > 0) {
        currentTrip.days = storedItinerary.sort((a, b) => a.dayNumber - b.dayNumber);
      }
      const storedPacking = await dbGetByTripId('packing', currentTrip.id);
      if (storedPacking && storedPacking.length > 0) packingItems = storedPacking;
      const storedBudget = await dbGetByTripId('budget', currentTrip.id);
      if (storedBudget && storedBudget.length > 0) budgetExpenses = storedBudget;
    }
  } catch (err) {
    console.warn("Local database fallback:", err);
  }
}

// ==========================================
// 2. ROUTING & NAVIGATION
// ==========================================

function navigateTo(sectionId) {
  // Update nav link classes
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === sectionId);
  });

  // Update page sections
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.toggle('active', section.id === sectionId);
  });

  // Close mobile nav menu if open
  const navLinks = document.getElementById('navLinks');
  if (navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
  }

  // Scroll smoothly to top of main
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav link click listeners
document.addEventListener('DOMContentLoaded', () => {
  // Navigation links
  document.querySelectorAll('.nav-btn').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // Mobile hamburger toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Setup Date Defaults
  setupInitialDates();

  // Setup Travel Style Pill Click handlers
  setupStylePills();

  // Initialize Database
  initDatabase().then(() => {
    // Render initial components from persistent database
    renderItinerary();
    renderPackingList();
    renderBudget();
    renderMyTrips('all');
    renderDestinations('all');
  });

  // Trip planner form submission
  document.getElementById('tripPlannerForm').addEventListener('submit', handleTripPlannerSubmit);
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================
// 3. PLAN TRIP FORM LOGIC
// ==========================================

function setupInitialDates() {
  const departureInput = document.getElementById('departureDate');
  const returnInput = document.getElementById('returnDate');
  const durationDisplay = document.getElementById('tripDurationDisplay');

  // Realistic defaults: 2 weeks from now
  const today = new Date();
  const depart = new Date();
  depart.setDate(today.getDate() + 14);

  const ret = new Date();
  ret.setDate(depart.getDate() + 5);

  departureInput.value = depart.toISOString().split('T')[0];
  returnInput.value = ret.toISOString().split('T')[0];

  function updateDuration() {
    const d1 = new Date(departureInput.value);
    const d2 = new Date(returnInput.value);
    if (d2 >= d1) {
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      durationDisplay.innerHTML = `Estimated Duration: <strong>${diffDays} Days / ${diffDays - 1} Nights</strong>`;
    } else {
      durationDisplay.innerHTML = `<span style="color:#d9534f">Return date must be on or after departure date!</span>`;
    }
  }

  departureInput.addEventListener('change', updateDuration);
  returnInput.addEventListener('change', updateDuration);
  updateDuration();
}

function setDestination(name) {
  document.getElementById('destinationInput').value = name;
  showToast(`Selected destination: ${name} 🌸`);
}

function stepCount(delta) {
  const input = document.getElementById('travellerCount');
  let current = parseInt(input.value) || 1;
  current = Math.max(1, Math.min(20, current + delta));
  input.value = current;
}

function setupStylePills() {
  const pills = document.querySelectorAll('.pill-option');
  const hiddenInput = document.getElementById('selectedTravelStyle');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      hiddenInput.value = pill.dataset.val;
    });
  });
}

function handleTripPlannerSubmit(e) {
  e.preventDefault();

  const destination = document.getElementById('destinationInput').value.trim();
  const departDateVal = document.getElementById('departureDate').value;
  const returnDateVal = document.getElementById('returnDate').value;
  const currency = document.getElementById('budgetCurrency').value;
  const budget = parseFloat(document.getElementById('budgetAmount').value) || 2000;
  const travellerType = document.querySelector('input[name="travellerType"]:checked').value;
  const travellerCount = document.getElementById('travellerCount').value;
  const travelStyle = document.getElementById('selectedTravelStyle').value;
  const accommodation = document.getElementById('accommodationType').value;
  const pace = document.querySelector('input[name="tripPace"]:checked').value;

  // Calculate days
  const d1 = new Date(departDateVal);
  const d2 = new Date(returnDateVal);
  let daysCount = 5;
  if (d2 >= d1) {
    daysCount = Math.max(1, Math.min(14, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1));
  }

  activeCurrency = currency;

  // Generate dynamic days itinerary
  const generatedDays = generateDaysForTrip(destination, daysCount, accommodation, travelStyle);

  const newTripId = 'trip-' + Date.now();

  // Update currentTrip state
  currentTrip = {
    id: newTripId,
    destination: destination,
    title: `${daysCount}-Day ${destination.split(',')[0]} Getaway`,
    dates: `${formatDateDisplay(departDateVal)} - ${formatDateDisplay(returnDateVal)}`,
    duration: daysCount,
    travellerType: travellerType,
    travellerCount: travellerCount,
    travelStyle: travelStyle,
    accommodation: accommodation,
    pace: pace,
    budget: budget,
    days: generatedDays
  };

  // Update Budget Section
  document.getElementById('metricTotalBudget').textContent = `${currency}${budget.toLocaleString()}`;
  recalculateBudget(budget);

  // Re-render Itinerary
  renderItinerary();

  // Save to My Trips
  const newTripRecord = {
    id: newTripId,
    title: currentTrip.title,
    destination: destination,
    dates: currentTrip.dates,
    duration: `${daysCount} Days`,
    travellers: `${travellerCount} (${travellerType})`,
    style: travelStyle,
    status: "Upcoming",
    coverImg: getDestinationImage(destination),
    budget: budget,
    accommodation: accommodation,
    pace: pace
  };
  mySavedTrips.unshift(newTripRecord);
  renderMyTrips('all');

  // Persist to Backend API & Database
  fetch(`${API_BASE}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: newTripId,
      title: currentTrip.title,
      destination: destination,
      start_date: formatDateDisplay(departDateVal),
      end_date: formatDateDisplay(returnDateVal),
      duration: daysCount,
      budget: budget,
      currency: currency,
      travellers_type: travellerType,
      travellers_count: travellerCount,
      travel_style: travelStyle,
      accommodation: accommodation,
      pace: pace,
      cover_img: getDestinationImage(destination),
      status: "Upcoming",
      itinerary: generatedDays
    })
  }).catch(err => console.warn("Backend save notice:", err));

  dbPut('trips', newTripRecord);
  for (const day of generatedDays) {
    dbPut('itinerary', {
      id: `itin-${newTripId}-${day.dayNumber}`,
      trip_id: newTripId,
      dayNumber: day.dayNumber,
      city: day.city,
      hotel: day.hotel,
      photo: day.photo,
      photoCaption: day.photoCaption,
      morning: day.morning,
      afternoon: day.afternoon,
      evening: day.evening,
      tips: day.tips
    });
  }

  showToast(`✨ Generated ${daysCount}-day itinerary for ${destination}!`);
  navigateTo('itinerary');
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDestinationImage(dest) {
  const lower = dest.toLowerCase();
  if (lower.includes('santorini') || lower.includes('greece')) {
    return 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop&q=80';
  } else if (lower.includes('bali')) {
    return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80';
  } else if (lower.includes('paris')) {
    return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80';
  } else if (lower.includes('amalfi') || lower.includes('italy')) {
    return 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80';
  }
  return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80';
}

function generateDaysForTrip(destination, numDays, hotelType, style) {
  const days = [];
  const city = destination.split(',')[0].trim();

  const activityTemplates = [
    {
      m: { title: "Historic Old Town & Morning Bakery", tag: "Culture & Stroll", notes: "Pick up fresh pastries and explore pedestrian alleys while the city awakens." },
      a: { title: "Scenic Viewpoint & Artisan Workshop", tag: "Sightseeing", notes: "Visit landmark terrace for panoramic skyline photos and support local handicraft stalls." },
      e: { title: "Sunset Dining & River Walk", tag: "Food & Wine", notes: "Enjoy regional specialties with a golden hour view as lanterns turn on." }
    },
    {
      m: { title: "Botanical Gardens & Quiet Café", tag: "Nature & Coffee", notes: "Peaceful morning coffee in a garden greenhouse setting away from tourist bustle." },
      a: { title: "Heritage Museum & Vintage Market", tag: "Exploration", notes: "Discover local architecture, classic artworks, and unique vintage postcards." },
      e: { title: "Atmospheric Square & Street Music", tag: "Evening Vibe", notes: "Listen to street acoustic performers while tasting local desserts and drinks." }
    },
    {
      m: { title: "Boutique Strolls & Flower Markets", tag: "Shopping", notes: "Charming neighborhood shops, local perfumeries, and colorful flower stands." },
      a: { title: "Iconic Monument & Photo Walk", tag: "Must-See", notes: "Capture dreamy polaroid memories at the most famous architectural gem." },
      e: { title: "Rooftop Lounge & Night Panorama", tag: "Chill Night", notes: "Relax with sparkling drinks while taking in glittering midnight city lights." }
    }
  ];

  for (let i = 1; i <= numDays; i++) {
    const tmpl = activityTemplates[(i - 1) % activityTemplates.length];
    days.push({
      dayNumber: i,
      city: `${city} (Zone ${i})`,
      hotel: `${hotelType} in ${city}`,
      photo: getDestinationImage(destination),
      photoCaption: `Day ${i} Memories in ${city} ✨`,
      morning: { time: "09:00 AM", tag: tmpl.m.tag, title: tmpl.m.title, notes: tmpl.m.notes },
      afternoon: { time: "02:00 PM", tag: tmpl.a.tag, title: tmpl.a.title, notes: tmpl.a.notes },
      evening: { time: "07:00 PM", tag: tmpl.e.tag, title: tmpl.e.title, notes: tmpl.e.notes },
      tips: [
        `Bring a reusable water bottle and pastel umbrella for day ${i}.`,
        `Ask the hotel concierge for neighborhood dining hidden gems.`
      ]
    });
  }
  return days;
}

// ==========================================
// 4. ITINERARY RENDERER & DAY TABS
// ==========================================

let activeDayIndex = 0;

function renderItinerary() {
  document.getElementById('itineraryLocation').textContent = `📍 ${currentTrip.destination}`;
  document.getElementById('itineraryTitle').textContent = currentTrip.title;
  document.getElementById('itinerarySubtitle').textContent = 
    `${currentTrip.travellerCount} Travellers (${currentTrip.travellerType}) · ${currentTrip.travelStyle} · ${currentTrip.pace} Pace`;

  const tabsContainer = document.getElementById('dayTabsList');
  tabsContainer.innerHTML = '';

  currentTrip.days.forEach((day, index) => {
    const btn = document.createElement('button');
    btn.className = `day-tab-btn ${index === activeDayIndex ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="day-tab-title">Day ${day.dayNumber}</span>
      <span class="day-tab-sub">Part ${index + 1}</span>
    `;
    btn.addEventListener('click', () => {
      activeDayIndex = index;
      renderItinerary();
    });
    tabsContainer.appendChild(btn);
  });

  // Render active day content
  const activeDay = currentTrip.days[activeDayIndex] || currentTrip.days[0];
  const contentCard = document.getElementById('dayContentCard');

  contentCard.innerHTML = `
    <div class="day-header-meta">
      <div>
        <span class="city-tag">🌸 ${activeDay.city}</span>
        <h3>Day ${activeDay.dayNumber} Schedule</h3>
      </div>
      <div class="hotel-card">
        <span>🏨</span>
        <div>
          <small style="color:var(--ink-medium); display:block;">Lodging for the night:</small>
          <strong>${activeDay.hotel}</strong>
        </div>
      </div>
    </div>

    <div class="day-body-layout">
      <!-- Schedule column -->
      <div class="timeblock-shelf">
        <!-- Morning -->
        <div class="schedule-block block-morning">
          <div class="block-header">
            <span class="time-label">☀️ Morning · ${activeDay.morning.time}</span>
            <span class="activity-badge">${activeDay.morning.tag}</span>
          </div>
          <h4 class="activity-title">${activeDay.morning.title}</h4>
          <p class="activity-notes">${activeDay.morning.notes}</p>
        </div>

        <!-- Afternoon -->
        <div class="schedule-block block-afternoon">
          <div class="block-header">
            <span class="time-label">🌤️ Afternoon · ${activeDay.afternoon.time}</span>
            <span class="activity-badge">${activeDay.afternoon.tag}</span>
          </div>
          <h4 class="activity-title">${activeDay.afternoon.title}</h4>
          <p class="activity-notes">${activeDay.afternoon.notes}</p>
        </div>

        <!-- Evening -->
        <div class="schedule-block block-evening">
          <div class="block-header">
            <span class="time-label">🌙 Evening · ${activeDay.evening.time}</span>
            <span class="activity-badge">${activeDay.evening.tag}</span>
          </div>
          <h4 class="activity-title">${activeDay.evening.title}</h4>
          <p class="activity-notes">${activeDay.evening.notes}</p>
        </div>
      </div>

      <!-- Polaroid & Tips Column -->
      <div class="day-side-column">
        <div class="day-polaroid-card">
          <img src="${activeDay.photo}" alt="${activeDay.photoCaption}" loading="lazy">
          <p>${activeDay.photoCaption}</p>
        </div>

        <div class="quick-notes-memo">
          <h4>Handy Traveler Tips ✍️</h4>
          <ul>
            ${activeDay.tips.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

function saveCurrentTripToJournal() {
  showToast(`📔 Saved "${currentTrip.title}" to My Trips!`);
}

// ==========================================
// 5. PACKING LIST LOGIC
// ==========================================

function renderPackingList() {
  const grid = document.getElementById('packingCategoriesGrid');
  grid.innerHTML = '';

  const categories = [
    { key: "essentials", name: "Essentials & Documents", icon: "🛂", colorClass: "card-pink" },
    { key: "clothing", name: "Cute Fits & Wearables", icon: "👗", colorClass: "card-yellow" },
    { key: "toiletries", name: "Toiletries & Self-Care", icon: "🧴", colorClass: "card-mint" },
    { key: "electronics", name: "Gadgets & Chargers", icon: "🔌", colorClass: "card-teal" },
    { key: "scrapbook", name: "Snacks & Scrapbooking", icon: "🍬", colorClass: "card-pink" }
  ];

  let totalItems = packingItems.length;
  let packedItems = packingItems.filter(i => i.checked).length;

  // Update progress bar
  const progressPercent = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);
  document.getElementById('packingProgressBar').style.width = `${progressPercent}%`;
  document.getElementById('packingProgressText').textContent = `${packedItems} of ${totalItems} items packed (${progressPercent}%)`;

  categories.forEach(cat => {
    const box = document.createElement('div');
    box.className = `packing-category-box ${cat.colorClass}`;

    const itemsInCat = packingItems.filter(i => i.category === cat.key);

    let itemsHtml = itemsInCat.map(item => `
      <div class="packing-item-row" data-id="${item.id}">
        <label class="checkbox-label ${item.checked ? 'done' : ''}">
          <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="togglePackingItem(${item.id})">
          <span>${item.text}</span>
        </label>
        <button class="delete-item-btn" onclick="deletePackingItem(${item.id})" title="Remove item">✕</button>
      </div>
    `).join('');

    if (itemsInCat.length === 0) {
      itemsHtml = `<p style="font-size:0.85rem; color:var(--ink-light); padding:10px;">No items yet! Add one below.</p>`;
    }

    box.innerHTML = `
      <div class="category-header">
        <h3>${cat.icon} ${cat.name}</h3>
        <span class="badge-tag">${itemsInCat.filter(i => i.checked).length}/${itemsInCat.length}</span>
      </div>
      <div class="items-list">
        ${itemsHtml}
      </div>
    `;

    grid.appendChild(box);
  });
}

function togglePackingItem(id) {
  const item = packingItems.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    fetch(`${API_BASE}/trips/${currentTrip.id || 'trip-kyoto'}/packing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }).catch(e => console.warn(e));
    dbPut('packing', item);
    renderPackingList();
  }
}

function deletePackingItem(id) {
  packingItems = packingItems.filter(i => i.id !== id);
  fetch(`${API_BASE}/packing/${id}`, { method: 'DELETE' }).catch(e => console.warn(e));
  dbDelete('packing', id);
  renderPackingList();
  showToast("Item removed from suitcase! 🧳");
}

function addNewPackingItem() {
  const input = document.getElementById('newPackingItemInput');
  const catSelect = document.getElementById('newPackingCategory');
  const text = input.value.trim();

  if (!text) {
    showToast("Please enter an item name ✨");
    return;
  }

  const newItem = {
    id: 'pack-' + Date.now(),
    trip_id: currentTrip.id || 'trip-kyoto',
    text: text,
    category: catSelect.value,
    checked: false
  };

  packingItems.push(newItem);
  fetch(`${API_BASE}/trips/${newItem.trip_id}/packing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  }).catch(e => console.warn(e));
  dbPut('packing', newItem);

  input.value = '';
  renderPackingList();
  showToast(`Added "${text}" to checklist! 🎀`);
}

// ==========================================
// 6. BUDGET TRACKER LOGIC
// ==========================================

function recalculateBudget(customBudget) {
  const totalBudget = customBudget || currentTrip.budget;
  const totalSpent = budgetExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalBudget - totalSpent;

  document.getElementById('metricTotalBudget').textContent = `${activeCurrency}${totalBudget.toLocaleString()}`;
  document.getElementById('metricTotalSpent').textContent = `${activeCurrency}${totalSpent.toLocaleString()}`;
  document.getElementById('metricTotalRemaining').textContent = `${activeCurrency}${remaining.toLocaleString()}`;

  document.getElementById('spentCountLabel').textContent = `across ${budgetExpenses.length} expense items`;

  // Render items
  const listEl = document.getElementById('expenseItemsList');
  listEl.innerHTML = '';

  budgetExpenses.forEach(exp => {
    const row = document.createElement('div');
    row.className = 'expense-row';
    row.innerHTML = `
      <div class="expense-info">
        <span class="expense-title">${exp.name}</span>
        <span class="expense-category-tag">${exp.category}</span>
      </div>
      <div style="display:flex; align-items:center;">
        <span class="expense-amount">${activeCurrency}${exp.amount.toLocaleString()}</span>
        <button class="expense-delete" onclick="deleteExpense(${exp.id})" title="Delete">✕</button>
      </div>
    `;
    listEl.appendChild(row);
  });

  // Calculate by category
  const categories = ["Accommodation", "Transport", "Food & Drinks", "Activities", "Shopping & Souvenirs"];
  const catColors = {
    "Accommodation": "var(--pastel-pink-deep)",
    "Transport": "var(--pastel-teal-deep)",
    "Food & Drinks": "#F59E0B",
    "Activities": "#8B5CF6",
    "Shopping & Souvenirs": "#EC4899"
  };

  const catBarsEl = document.getElementById('budgetCategoryBars');
  catBarsEl.innerHTML = '';

  categories.forEach(cat => {
    const catTotal = budgetExpenses.filter(e => e.category === cat).reduce((a, c) => a + c.amount, 0);
    const catPercent = totalSpent > 0 ? Math.round((catTotal / totalSpent) * 100) : 0;

    const barItem = document.createElement('div');
    barItem.className = 'cat-bar-item';
    barItem.innerHTML = `
      <div class="cat-bar-labels">
        <span>${cat}</span>
        <span>${activeCurrency}${catTotal.toLocaleString()} (${catPercent}%)</span>
      </div>
      <div class="cat-progress-bg">
        <div class="cat-progress-fill" style="width: ${catPercent}%; background-color: ${catColors[cat] || 'var(--pastel-teal)'};"></div>
      </div>
    `;
    catBarsEl.appendChild(barItem);
  });
}

function renderBudget() {
  recalculateBudget();
}

function addCustomExpense() {
  const nameInput = document.getElementById('expenseNameInput');
  const amountInput = document.getElementById('expenseAmountInput');
  const catInput = document.getElementById('expenseCategoryInput');

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount <= 0) {
    showToast("Please enter a valid expense description and amount! 🪙");
    return;
  }

  const newExp = {
    id: 'budget-' + Date.now(),
    trip_id: currentTrip.id || 'trip-kyoto',
    name: name,
    amount: amount,
    category: catInput.value
  };

  budgetExpenses.unshift(newExp);
  fetch(`${API_BASE}/trips/${newExp.trip_id}/budget`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newExp)
  }).catch(e => console.warn(e));
  dbPut('budget', newExp);

  nameInput.value = '';
  amountInput.value = '';

  recalculateBudget();
  showToast(`Added ${activeCurrency}${amount} for "${name}" ✨`);
}

function deleteExpense(id) {
  budgetExpenses = budgetExpenses.filter(e => e.id !== id);
  fetch(`${API_BASE}/budget/${id}`, { method: 'DELETE' }).catch(e => console.warn(e));
  dbDelete('budget', id);
  recalculateBudget();
  showToast("Expense removed 🪙");
}

// ==========================================
// 7. MY TRIPS LOGIC
// ==========================================

function filterTrips(filter) {
  document.querySelectorAll('.trips-filter-tabs .filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.textContent.toLowerCase().includes(filter));
  });
  renderMyTrips(filter);
}

function renderMyTrips(filter) {
  const grid = document.getElementById('savedTripsGrid');
  grid.innerHTML = '';

  let list = mySavedTrips;
  if (filter === 'upcoming') {
    list = mySavedTrips.filter(t => t.status.toLowerCase() === 'upcoming');
  } else if (filter === 'past') {
    list = mySavedTrips.filter(t => t.status.toLowerCase() === 'past');
  }

  list.forEach(trip => {
    const card = document.createElement('div');
    card.className = 'trip-notebook-card';
    card.innerHTML = `
      <div class="trip-card-image-wrap">
        <img src="${trip.coverImg}" alt="${trip.destination}" loading="lazy">
        <span class="trip-status-tag">${trip.status === 'Upcoming' ? '✨ Upcoming' : '📷 Memories'}</span>
        <span class="trip-style-tag">${trip.style}</span>
      </div>
      <div class="trip-card-body">
        <h3 class="trip-destination-title">${trip.destination}</h3>
        <p class="trip-dates-row">🗓️ ${trip.dates}</p>
        <div class="trip-quick-stats">
          <span>⏱️ ${trip.duration}</span>
          <span>👥 ${trip.travellers}</span>
        </div>
        <div class="trip-card-footer">
          <button class="btn btn-secondary btn-sm" onclick="loadSavedTrip('${trip.id}')">View 📖</button>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm" style="background:var(--pastel-yellow); padding:6px 10px;" onclick="editTripPrompt('${trip.id}')" title="Edit Trip">✏️</button>
            <button class="btn btn-sm" style="background:var(--pastel-pink); padding:6px 10px;" onclick="deleteTrip('${trip.id}')" title="Delete Trip">🗑️</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

async function loadSavedTrip(tripId) {
  try {
    const res = await fetch(`${API_BASE}/trips/${tripId}`);
    if (res.ok) {
      const data = await res.json();
      const t = data.trip;
      currentTrip.id = t.id;
      currentTrip.destination = t.destination;
      currentTrip.title = t.title;
      currentTrip.dates = `${t.start_date} - ${t.end_date}`;
      currentTrip.duration = t.duration;
      currentTrip.budget = t.budget;
      activeCurrency = t.currency || '$';
      currentTrip.travellerCount = t.travellers_count;
      currentTrip.travellerType = t.travellers_type;
      currentTrip.travelStyle = t.travel_style;
      currentTrip.accommodation = t.accommodation;
      currentTrip.pace = t.pace;

      if (data.itinerary && data.itinerary.length > 0) {
        currentTrip.days = data.itinerary;
      }
      if (data.packing && data.packing.length > 0) {
        packingItems = data.packing;
        renderPackingList();
      }
      if (data.budget && data.budget.length > 0) {
        budgetExpenses = data.budget;
        recalculateBudget();
      }

      renderItinerary();
      navigateTo('itinerary');
      showToast(`Loaded journal for ${t.destination}! 🌸`);
      return;
    }
  } catch (e) {
    console.warn("Backend fetch failed, using local trip:", e);
  }

  const trip = mySavedTrips.find(t => t.id === tripId);
  if (trip) {
    currentTrip.id = trip.id;
    currentTrip.destination = trip.destination;
    currentTrip.title = trip.title;
    currentTrip.dates = trip.dates;
    currentTrip.travelStyle = trip.style;
    currentTrip.duration = parseInt(trip.duration) || 5;

    try {
      const storedItin = await dbGetByTripId('itinerary', tripId);
      if (storedItin && storedItin.length > 0) {
        currentTrip.days = storedItin.sort((a, b) => a.dayNumber - b.dayNumber);
      }
    } catch (e) {}

    renderItinerary();
    navigateTo('itinerary');
    showToast(`Loaded journal for ${trip.destination}! 🌸`);
  }
}

async function editTripPrompt(tripId) {
  const trip = mySavedTrips.find(t => t.id === tripId) || currentTrip;
  const newTitle = prompt("✏️ Edit trip title:", trip.title);
  if (!newTitle) return;
  const newBudget = prompt("🪙 Edit trip budget:", trip.budget || 2000);
  const updatedData = { title: newTitle, budget: parseFloat(newBudget) || trip.budget };

  try {
    await fetch(`${API_BASE}/trips/${tripId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
  } catch (e) {}

  trip.title = newTitle;
  if (trip.budget) trip.budget = updatedData.budget;
  if (currentTrip.id === tripId) {
    currentTrip.title = newTitle;
    currentTrip.budget = updatedData.budget;
    document.getElementById('itineraryTitle').textContent = newTitle;
    document.getElementById('metricTotalBudget').textContent = `${activeCurrency}${updatedData.budget.toLocaleString()}`;
    recalculateBudget();
  }
  renderMyTrips('all');
  showToast("✨ Trip details updated!");
}

async function deleteTrip(tripId) {
  if (!confirm("Are you sure you want to delete this trip journal? 🌸")) return;
  try {
    await fetch(`${API_BASE}/trips/${tripId}`, { method: 'DELETE' });
  } catch (e) {}
  dbDelete('trips', tripId);
  mySavedTrips = mySavedTrips.filter(t => t.id !== tripId);
  if (currentTrip.id === tripId && mySavedTrips.length > 0) {
    loadSavedTrip(mySavedTrips[0].id);
  }
  renderMyTrips('all');
  showToast("Trip removed from your scrapbook 🗑️");
}

// ==========================================
// 8. DESTINATIONS INSPIRATION
// ==========================================

function filterDestinations(category) {
  document.querySelectorAll('.dest-filter-tabs .filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.textContent.toLowerCase().includes(category));
  });
  renderDestinations(category);
}

function renderDestinations(category) {
  const grid = document.getElementById('destinationsGrid');
  grid.innerHTML = '';

  let list = destinationsData;
  if (category !== 'all') {
    list = destinationsData.filter(d => d.category === category);
  }

  list.forEach(dest => {
    const polaroid = document.createElement('div');
    polaroid.className = 'dest-polaroid';
    polaroid.onclick = () => selectDestinationFromCard(dest);

    polaroid.innerHTML = `
      <div class="dest-img-wrap">
        <img src="${dest.img}" alt="${dest.name}" loading="lazy">
        <span class="dest-badge">${dest.vibe.split(' ')[0]}</span>
      </div>
      <div class="dest-caption-area">
        <h3 class="dest-city-title">${dest.name}</h3>
        <p class="dest-highlight-text">"${dest.quote}"</p>
        <div class="dest-cta-row">
          <span class="dest-vibe-pill">${dest.vibe}</span>
          <span class="dest-plan-btn">Plan This Trip ✏️</span>
        </div>
      </div>
    `;
    grid.appendChild(polaroid);
  });
}

function selectDestinationFromCard(dest) {
  document.getElementById('destinationInput').value = dest.name;
  document.getElementById('budgetAmount').value = dest.suggestedBudget;
  showToast(`Ready to plan ${dest.name}! 🌸`);
  navigateTo('plan');
}

// ==========================================
// 9. NEWSLETTER
// ==========================================

function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`💌 Subscribed! Cute postcards coming to ${input.value}`);
  input.value = '';
}
