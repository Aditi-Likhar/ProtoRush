import { useState } from "react";
import "./Hero.css";

const STATS = [
  { icon: "🌍", value: "120+", label: "Destinations" },
  { icon: "⭐", value: "500+", label: "Tourist Attractions" },
  { icon: "🤖", value: "24/7", label: "AI Assistant" },
];

const FLOAT_CARDS = [
  {
    id: "paris",
    className: "hero-float-card--paris",
    content: (
      <>
        <span className="hero-float-card__title">📍 Paris</span>
        <span className="hero-float-card__meta">
          <span className="hero-float-card__rating">⭐ 4.9</span>
          <span className="hero-float-card__tag">AI Recommended</span>
        </span>
      </>
    ),
  },
  {
    id: "weather",
    className: "hero-float-card--weather",
    content: (
      <>
        <span className="hero-float-card__icon">☀️</span>
        <span className="hero-float-card__body">
          <span className="hero-float-card__title">24°C</span>
          <span className="hero-float-card__sub">Perfect for Sightseeing</span>
        </span>
      </>
    ),
  },
  {
    id: "trip",
    className: "hero-float-card--trip",
    content: (
      <>
        <span className="hero-float-card__icon">🧳</span>
        <span className="hero-float-card__sub">3-Day Trip Ready</span>
      </>
    ),
  },
  {
    id: "safe",
    className: "hero-float-card--safe",
    content: (
      <>
        <span className="hero-float-card__icon">🛡</span>
        <span className="hero-float-card__sub">Safe Destination</span>
      </>
    ),
  },
];

function Hero() {
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Search wiring lands with the backend integration; UI-only for now.
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-blob hero-blob--gold" />
        <div className="hero-blob hero-blob--teal" />
        <div className="hero-blob hero-blob--violet" />
      </div>

      <div className="container hero-inner">
        {/* ---------------------------------------------------------- */}
        {/* Left column                                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="hero-content">
          <span className="hero-badge glass-pill fade-in-up hero-anim-1">
            <span className="hero-badge__sparkle">✨</span>
            AI Powered Travel Assistant
          </span>

          <h1 className="hero-title fade-in-up hero-anim-2">
            <span className="hero-title__line">Explore the World</span>
            <span className="hero-title__line">
              Smarter with{" "}
              <span className="hero-title__ai text-gradient-gold">AI</span>
            </span>
          </h1>

          <p className="hero-paragraph fade-in-up hero-anim-3">
            TravelMate AI brings nearby attractions, transport, emergency
            services, safety guidance, and personalized recommendations into one
            intelligent companion — so every trip feels planned by someone who
            knows the destination as well as you know home.
          </p>

          <div className="hero-actions fade-in-up hero-anim-4">
            <button
              type="button"
              className="btn btn-primary btn-lg hero-btn-primary"
            >
              Start Exploring
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg hero-btn-secondary"
            >
              Plan My Trip
              <svg
                className="hero-btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8h9M8.5 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <form
            className="hero-search glass-strong fade-in-up hero-anim-5"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search destinations"
          >
            <svg
              className="hero-search__icon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M15 15l-3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="text"
              className="hero-search__input"
              placeholder="Search destinations..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search destinations"
            />

            <button type="button" className="hero-search__location">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7.5 1.5c-2.5 0-4.5 2-4.5 4.5 0 3.4 4.5 7.5 4.5 7.5s4.5-4.1 4.5-7.5c0-2.5-2-4.5-4.5-4.5z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <circle
                  cx="7.5"
                  cy="6"
                  r="1.6"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
              <span>Current Location</span>
            </button>

            <button
              type="submit"
              className="hero-search__filter"
              aria-label="Filter search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 4h12M4.5 8h7M7 12h2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>

          <div className="hero-stats fade-in-up hero-anim-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero-stat-card glass lift-hover">
                <span className="hero-stat-card__icon">{stat.icon}</span>
                <span className="hero-stat-card__value">{stat.value}</span>
                <span className="hero-stat-card__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Right column                                                */}
        {/* ---------------------------------------------------------- */}
        <div className="hero-visual fade-in hero-anim-3">
          <div className="hero-image-frame">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1200&auto=format&fit=crop"
              alt="Whitewashed clifftop village overlooking the sea in Santorini, Greece"
              loading="eager"
            />
            <div className="hero-image-glow" aria-hidden="true" />
          </div>

          {FLOAT_CARDS.map((card) => (
            <div
              key={card.id}
              className={`hero-float-card glass-strong ${card.className}`}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
