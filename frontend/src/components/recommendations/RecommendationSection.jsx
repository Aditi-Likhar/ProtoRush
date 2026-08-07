import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import RecommendationCard from "./RecommendationCard";
import { recommendations, plannerOptions } from "../../data/recommendations";
import "./RecommendationSection.css";

const INITIAL_FILTERS = {
  type: "",
  budget: "",
  duration: "",
  style: "",
  season: "",
};

function RecommendationSection() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [visibleCount, setVisibleCount] = useState(6);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const results = useMemo(() => {
    const matches = recommendations.filter((rec) => {
      const matchesType =
        !appliedFilters.type || rec.type === appliedFilters.type;
      const matchesBudget =
        !appliedFilters.budget || rec.budget === appliedFilters.budget;
      const matchesDuration =
        !appliedFilters.duration || rec.duration === appliedFilters.duration;
      const matchesSeason =
        !appliedFilters.season || rec.season === appliedFilters.season;
      return matchesType && matchesBudget && matchesDuration && matchesSeason;
    });

    const ranked = [...matches].sort((a, b) => b.aiMatch - a.aiMatch);
    return ranked.length > 0 ? ranked : recommendations;
  }, [appliedFilters]);

  const handleGenerate = () => {
    setAppliedFilters(filters);
    setVisibleCount(6);
  };

  const visibleResults = results.slice(0, visibleCount);

  return (
    <section id="ai-planner" className="recommendation-section section">
      <div className="recommendation-section__bg" aria-hidden="true">
        <div className="rs-blob rs-blob--violet" />
        <div className="rs-blob rs-blob--gold" />
      </div>

      <div className="container">
        <motion.div
          className="recommendation-section__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow-badge glass-pill">
            <HiOutlineSparkles />
            AI Concierge
          </span>

          <h2 className="recommendation-section__title">
            Plan Your Perfect Journey
          </h2>

          <p className="recommendation-section__paragraph">
            Tell the concierge what you're after and it'll match you against
            real destinations — ranked by fit, not just popularity.
          </p>
        </motion.div>

        <motion.div
          className="planner-panel glass-strong"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="planner-field">
            <label htmlFor="destination-type">Destination Type</label>
            <select
              id="destination-type"
              value={filters.type}
              onChange={(event) => updateFilter("type", event.target.value)}
            >
              <option value="">Any type</option>
              {plannerOptions.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="planner-field">
            <span className="planner-field__label">Budget</span>
            <div className="segmented-selector">
              {plannerOptions.budgets.map((budget) => (
                <button
                  key={budget}
                  type="button"
                  className={filters.budget === budget ? "is-active" : ""}
                  onClick={() => updateFilter("budget", budget)}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          <div className="planner-field">
            <span className="planner-field__label">Trip Duration</span>
            <div className="chip-selector">
              {plannerOptions.durations.map((duration) => (
                <button
                  key={duration}
                  type="button"
                  className={filters.duration === duration ? "is-active" : ""}
                  onClick={() => updateFilter("duration", duration)}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <div className="planner-field">
            <span className="planner-field__label">Travel Style</span>
            <div className="chip-selector">
              {plannerOptions.styles.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={filters.style === style ? "is-active" : ""}
                  onClick={() => updateFilter("style", style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="planner-field">
            <span className="planner-field__label">Preferred Season</span>
            <div className="chip-selector">
              {plannerOptions.seasons.map((season) => (
                <button
                  key={season}
                  type="button"
                  className={filters.season === season ? "is-active" : ""}
                  onClick={() => updateFilter("season", season)}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg planner-generate"
            onClick={handleGenerate}
          >
            Generate My Trip
            <FiArrowRight className="planner-generate__arrow" />
          </button>
        </motion.div>

        <motion.div
          className="recommendation-section__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <AnimatePresence>
            {visibleResults.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < results.length && (
          <div className="recommendation-section__cta">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              View More AI Recommendations
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendationSection;
