import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineSparkles,
  HiOutlineFlag,
} from "react-icons/hi";
import { FiArrowRight, FiNavigation } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import TransportCard from "./TransportCard";
import { transportModes, travelModeChips } from "../../data/transport";
import "./TransportSection.css";

function TransportSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("Santorini, Greece");
  const [activeMode, setActiveMode] = useState("metro");
  const [routeKey, setRouteKey] = useState(0);

  const handleSearchRoute = (event) => {
    event.preventDefault();
    setRouteKey((prev) => prev + 1);
  };

  const recommended = transportModes.find((mode) => mode.id === "metro");

  return (
    <section id="transport" className="transport-section section">
      <div className="transport-section__bg" aria-hidden="true">
        <div className="ts-blob ts-blob--teal" />
        <div className="ts-blob ts-blob--gold" />
      </div>

      <div className="container">
        <motion.div
          className="transport-section__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow-badge glass-pill">
            <FiNavigation />
            Smart Navigation
          </span>

          <h2 className="transport-section__title">
            Choose the Best Way to Travel
          </h2>

          <p className="transport-section__paragraph">
            AI compares time, cost, comfort, and eco-impact across every
            transport option, so the best route is obvious before you book
            anything.
          </p>
        </motion.div>

        <motion.form
          className="route-panel glass-strong"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSearchRoute}
        >
          <div className="route-panel__inputs">
            <label className="route-input">
              <HiOutlineLocationMarker />
              <input
                type="text"
                placeholder="From location..."
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                aria-label="From location"
              />
            </label>

            <span className="route-input__divider" aria-hidden="true" />

            <label className="route-input">
              <HiOutlineFlag />
              <input
                type="text"
                placeholder="To destination..."
                value={to}
                onChange={(event) => setTo(event.target.value)}
                aria-label="To destination"
              />
            </label>
          </div>

          <div className="route-panel__modes">
            {travelModeChips.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`mode-chip ${activeMode === mode.id ? "is-active" : ""}`}
                onClick={() => setActiveMode(mode.id)}
              >
                <span aria-hidden="true">{mode.emoji}</span>
                {mode.label}
              </button>
            ))}
          </div>

          <div className="route-panel__actions">
            <button type="button" className="btn btn-secondary">
              <HiOutlineLocationMarker />
              Current Location
            </button>
            <button type="submit" className="btn btn-primary">
              Search Route
              <FiArrowRight />
            </button>
          </div>
        </motion.form>

        {/* ---- Map preview ------------------------------------------------ */}
        <motion.div
          className="map-preview glass"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="map-preview__grid" aria-hidden="true" />

          <svg
            className="map-preview__svg"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              key={routeKey}
              d="M 90 220 C 220 60, 420 260, 560 100 S 700 60, 720 80"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-accent-teal)" />
                <stop offset="100%" stopColor="var(--color-accent-gold)" />
              </linearGradient>
            </defs>
          </svg>

          <span className="map-pin map-pin--start">
            <span className="map-pin__pulse" />
          </span>
          <span className="map-pin map-pin--end">
            <HiOutlineFlag />
          </span>

          <div className="map-preview__label map-preview__label--distance">
            {recommended.distance}
          </div>
          <div className="map-preview__label map-preview__label--eta">
            ETA {recommended.time}
          </div>
        </motion.div>

        {/* ---- Comparison grid --------------------------------------------- */}
        <motion.div
          className="transport-section__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {transportModes.map((mode, index) => (
            <TransportCard
              key={mode.id}
              mode={mode}
              isActive={activeMode === mode.id}
              index={index}
            />
          ))}
        </motion.div>

        {/* ---- AI insight ------------------------------------------------- */}
        <motion.div
          className="ai-insight-card glass-strong"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ai-insight-card__icon">
            <FaRobot />
          </div>

          <div className="ai-insight-card__body">
            <span className="eyebrow">
              <HiOutlineSparkles />
              AI Route Suggestion
            </span>
            <p>
              Based on traffic, weather, and travel time, Metro is the fastest
              and most economical option for this route.
            </p>
            <div className="ai-insight-card__meta">
              <span className="ai-insight-card__confidence">
                Confidence: 94%
              </span>
              <span className="ai-insight-card__tip">
                Tip: Board before 6 PM to avoid peak crowding.
              </span>
            </div>
          </div>
        </motion.div>

        <div className="transport-section__cta">
          <button type="button" className="btn btn-primary btn-lg">
            Explore More Routes
          </button>
        </div>
      </div>
    </section>
  );
}

export default TransportSection;
