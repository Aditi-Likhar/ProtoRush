# VoyageAI — Project Plan

## Design Language (derived from your references)
- **Headings:** elegant serif (e.g. Playfair Display / Cormorant) for hero/section titles — matches "Where Will You Go Next?" and "JAPAN"
- **Body/UI:** clean sans-serif (Inter / Manrope)
- **Palette:** cream/beige base → warm sunset gradient (coral #FF7A55, gold #E8B563) for CTAs → deep charcoal/navy (#0E1116) for dark sections (timeline, footer)
- **Navbar/search:** frosted glass (`backdrop-filter: blur()`), translucent dark bar over hero image, pill-shaped inputs
- **Buttons:** pill radius, coral gradient primary, white/glass secondary
- **Cards:** rounded-xl (16–20px), soft shadow, image + gradient overlay + heart/save icon top-right
- **Itinerary/timeline pattern (from Img 2):** vertical line with dot markers per day-range, photo clusters beside each stage
- **Detail dashboards:** click-to-expand panels (accordion/modal), not all-on-one-page — matches your "avoid clutter" requirement

---

## 1. Full Folder Structure

```
voyageai/
├── frontend/                          # React + Vite
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── styles/
│   │   │   ├── theme.css
│   │   │   ├── variables.css
│   │   │   ├── animations.css
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Hero/
│   │   │   ├── AIPlanner/
│   │   │   ├── DestinationGrid/
│   │   │   ├── Features/
│   │   │   ├── Stats/
│   │   │   ├── WeatherWidget/
│   │   │   ├── TravelLingo/
│   │   │   ├── SafeTrip/
│   │   │   ├── ChatAssistant/
│   │   │   ├── ItineraryTimeline/
│   │   │   ├── TravelAnalytics/
│   │   │   ├── Footer/
│   │   │   └── common/             # Button, Modal, Loader, Tabs, Card, Badge
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Navbar+Hero+Planner+Grid+Features+Stats+Footer
│   │   │   ├── PlannerResults.jsx   # AI-generated trip result page
│   │   │   ├── DestinationDetail.jsx# Img2-style single destination page
│   │   │   ├── Explore.jsx          # filterable destination catalogue
│   │   │   ├── Dashboard.jsx        # user's saved trips / overview
│   │   │   ├── SafetyCenter.jsx
│   │   │   ├── LanguageAssistant.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── TripContext.jsx
│   │   │   └── UIContext.jsx        # active dashboard panel state
│   │   ├── hooks/
│   │   │   ├── useTripPlanner.js
│   │   │   ├── useWeather.js
│   │   │   └── useChat.js
│   │   ├── services/                # API client layer
│   │   │   ├── api.js               # axios instance + interceptors
│   │   │   ├── tripService.js
│   │   │   ├── weatherService.js
│   │   │   ├── placesService.js
│   │   │   ├── translateService.js
│   │   │   ├── safetyService.js
│   │   │   └── chatService.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Node + Express
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB connection
│   │   │   └── env.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Trip.js
│   │   │   ├── Itinerary.js
│   │   │   ├── SavedDestination.js
│   │   │   └── EmergencyContact.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── trip.controller.js
│   │   │   ├── destination.controller.js
│   │   │   ├── weather.controller.js
│   │   │   ├── safety.controller.js
│   │   │   ├── translate.controller.js
│   │   │   └── chat.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── trip.routes.js
│   │   │   ├── destination.routes.js
│   │   │   ├── weather.routes.js
│   │   │   ├── safety.routes.js
│   │   │   ├── translate.routes.js
│   │   │   └── chat.routes.js
│   │   ├── services/                 # external API integrations
│   │   │   ├── aiService.js          # Claude/OpenAI itinerary generation
│   │   │   ├── weatherApi.js         # OpenWeather
│   │   │   ├── placesApi.js          # Google Places / Foursquare
│   │   │   └── translateApi.js       # Google Translate
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── database/
│   ├── mongodb/
│   │   └── schema-notes.md           # collection shapes (see below)
│   └── seeds/
│       ├── destinations.seed.js
│       └── phrases.seed.js           # TravelLingo common-phrase bank
│
├── docs/
│   ├── task-breakdown.md             # this file
│   └── api-reference.md
│
└── README.md
```

### Core Database Collections (MongoDB — fastest for a hackathon)
- `users` — profile, auth, preferences, achievements
- `trips` — destination, budget, days, travelers, interests, generated itinerary (embedded), status
- `destinations` — name, country, images, rating, weather snapshot, tags, popular attractions
- `savedDestinations` — wishlist join table (userId, destinationId)
- `emergencyContacts` / `safetyProfiles` — SOS numbers, medical info, shared location logs
- `phrases` — TravelLingo common/offline phrase bank by language

> If your team prefers SQL, the same shapes map cleanly to Postgres tables with a `trips.itinerary` JSONB column.

---

## 2. Person 2 — Detailed Task List (Prompts 9–16)

Each task below assumes the design tokens from `theme.css` (Person 1, Prompt 1) are already available, and follows your rule: **clicking a feature opens its own focused panel/modal/page — nothing lives permanently cluttering the main dashboard.**

### Prompt 9 — WeatherWidget
**Folder:** `components/WeatherWidget/{WeatherWidget.jsx, WeatherWidget.css}`
- Opens as a card on `DestinationDetail.jsx` and as an expandable panel from the Dashboard
- Shows: current temp, condition icon, humidity, wind, sunrise/sunset, 5-day forecast strip
- "AI travel tip" line (e.g. "Heavy rain tomorrow — carry an umbrella") generated from condition + threshold rules
- States: loading skeleton, error/fallback, compact card vs. expanded panel
- Data: `services/weatherService.js` → `GET /api/weather?lat&lng`

### Prompt 10 — TravelLingo
**Folder:** `components/TravelLingo/{TravelLingo.jsx, TravelLingo.css}`
- Opens as a full slide-in panel (not inline on landing) triggered from Navbar icon or Dashboard tile
- Sub-views (tabbed inside the panel): **Translate** (text input → AI translation), **Voice** (mic button, UI only if no live STT), **Camera** (UI mock — "point camera at sign"), **Common Phrases** (categorized list: greetings, food, emergency), **Favorites**, **Offline Emergency Phrases** (cached, works without network), **Recent History**
- Data: `services/translateService.js` → `POST /api/translate`

### Prompt 11 — SafeTrip
**Folder:** `components/SafeTrip/{SafeTrip.jsx, SafeTrip.css}`
- Dedicated `pages/SafetyCenter.jsx`, reached via Navbar shield icon — dark, high-contrast theme (safety = distinct from the warm travel palette, e.g. deep red/charcoal accents) so it reads as "serious" at a glance
- Sections: **Emergency SOS** (big pulsing button), **Nearby Hospital/Police** (mini map + list), **Emergency Numbers** (per-country, auto-detected), **Share Live Location** (toggle + share link), **Travel Alerts** (banner list), **Safety Score** (ring/gauge for current destination), **Emergency Checklist** (checkbox list), **Medical Information** (user's own stored info, editable)
- Data: `services/safetyService.js` → `GET /api/safety/:destinationId`, `POST /api/safety/share-location`

### Prompt 12 — AI Chat Assistant
**Folder:** `components/ChatAssistant/{ChatAssistant.jsx, ChatAssistant.css}`
- Floating action button (bottom-right, all pages) → expands into a chat drawer, glass style matching Img 1 navbar
- Suggested-prompt chips: "Best places in Goa", "Cheap hotels", "What should I pack?", "Translate Hello", "Nearest hospital"
- Typing/thinking animation (three-dot pulse), message bubbles (user right, AI left), markdown-lite rendering for AI replies
- Routes intents to the right backend service (chat / translate / safety) rather than one giant prompt
- Data: `services/chatService.js` → `POST /api/chat`

### Prompt 13 — Itinerary Timeline
**Folder:** `components/ItineraryTimeline/{ItineraryTimeline.jsx, ItineraryTimeline.css}`
- This is your **results page** (the Pinterest reference) — after AI Planner generates a trip, land here
- Two view toggles: **Timeline view** (vertical line + day dots, photo clusters — same visual pattern as Img 2's "About the Tour") and **Calendar view** (grid by date)
- Each day expands to show: hotel check-in, meals, activities, sunset/evening slot — click a day to expand only that day's card (accordion, not all open)
- Sticky summary bar: total est. cost, best time to visit, days count
- "Download PDF" button (client-side generation, e.g. via `jspdf` or a backend endpoint)
- Data: `services/tripService.js` → `GET /api/trips/:id`

### Prompt 14 — Travel Analytics
**Folder:** `components/TravelAnalytics/{TravelAnalytics.jsx, TravelAnalytics.css}`
- Lives on `Dashboard.jsx` / `Profile.jsx`, not the landing page
- Animated counters: Countries Visited, Total Trips, Money Saved, Distance Traveled, Carbon Footprint, Favorite Destination
- One chart component (e.g. bar or radial "Travel Score") using a lightweight chart lib
- All numbers count up on mount/scroll-into-view (matches Stats section animation style from Prompt 7)
- Data: `services/tripService.js` → `GET /api/users/:id/analytics`

### Prompt 15 — Footer
**Folder:** `components/Footer/{Footer.jsx, Footer.css}`
- Dark section matching Img 2's dark "About the Tour" background
- Columns: Brand + tagline, Product links (Explore/Planner/Safety/Lingo), Company, Social icons, Newsletter input (pill style, coral button)
- Bottom bar: © + legal links

### Prompt 16 — Update App.jsx
- Wire in: routing (`react-router-dom`) for `Landing / PlannerResults / DestinationDetail / Explore / Dashboard / SafetyCenter / Profile`
- Mount `ChatAssistant` globally (outside route switch, always floating)
- Wrap app in `AuthContext` + `TripContext` + `UIContext` providers
- Add global loading/error boundary

---

## 3. Suggested Build Order for Person 2
1. Prompt 9 (Weather) — smallest, validates the panel-not-clutter pattern
2. Prompt 13 (Itinerary Timeline) — this is your core "wow" results page, do it early
3. Prompt 11 (SafeTrip) — second problem-statement requirement
4. Prompt 10 (TravelLingo) — third problem-statement requirement
5. Prompt 12 (Chat Assistant) — ties everything together, do after other panels exist to route into
6. Prompt 14 (Analytics)
7. Prompt 15 (Footer)
8. Prompt 16 (App.jsx wiring) — last, once all components exist
