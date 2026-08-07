import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import AttractionCard from "./AttractionCard";
import { attractions, attractionCategories } from "../../data/attractions";
import "./NearbyAttractions.css";

const RADIUS_OPTIONS = ["2 km", "5 km", "10 km", "20 km", "50 km"];

function NearbyAttractions() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [radius, setRadius] = useState(RADIUS_OPTIONS[2]);

  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
      const matchesCategory =
        activeCategory === "All" || attraction.category === activeCategory;
      const matchesQuery = attraction.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <section id="nearby" className="nearby-attractions section">
      <div className="nearby-attractions__bg" aria-hidden="true">
        <div className="na-blob na-blob--teal" />
        <div className="na-blob na-blob--violet" />
      </div>

      <div className="container">
        <motion.div
          className="nearby-attractions__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow-badge glass-pill">
            <HiOutlineLocationMarker />
            Nearby Places
          </span>

          <h2 className="nearby-attractions__title">
            Discover Attractions Around You
          </h2>

          <p className="nearby-attractions__paragraph">
            Real-time distance, crowd levels, and weather for the places worth
            the detour — filtered to what's actually close to you right now.
          </p>
        </motion.div>

        <motion.div
          className="nearby-toolbar glass-strong"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="nearby-toolbar__row">
            <div className="nearby-toolbar__search">
              <FiSearch />
              <input
                type="text"
                placeholder="Search attractions..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search attractions"
              />
            </div>

            <button type="button" className="nearby-toolbar__location">
              <HiOutlineLocationMarker />
              Current Location
            </button>

            <label className="nearby-toolbar__radius">
              <span>Radius</span>
              <select
                value={radius}
                onChange={(event) => setRadius(event.target.value)}
                aria-label="Search radius"
              >
                {RADIUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="nearby-toolbar__chips">
            {attractionCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-chip ${
                  activeCategory === category ? "is-active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="nearby-attractions__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {filteredAttractions.map((attraction, index) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              index={index}
            />
          ))}
        </motion.div>

        {filteredAttractions.length === 0 && (
          <p className="nearby-attractions__empty">
            No attractions match that search — try a different name or category.
          </p>
        )}

        <motion.div
          className="nearby-attractions__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="btn btn-primary btn-lg">
            Explore Nearby Attractions
            <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default NearbyAttractions;
