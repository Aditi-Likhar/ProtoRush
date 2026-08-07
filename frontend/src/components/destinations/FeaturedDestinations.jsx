import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import DestinationCard from "./DestinationCard";
import { destinations } from "../../data/destinations";
import "./FeaturedDestinations.css";

// Editorial layout only surfaces the first 6 — 1 large, 2 medium, 3 compact.
// The remaining entries in destinations.js are reserved for a future
// "Explore All Destinations" view.
const large = destinations[0];
const mediums = destinations.slice(1, 3);
const compacts = destinations.slice(3, 6);

function FeaturedDestinations() {
  return (
    <section id="destinations" className="featured-destinations section">
      <div className="featured-destinations__bg" aria-hidden="true">
        <div className="fd-blob fd-blob--gold" />
        <div className="fd-blob fd-blob--teal" />
      </div>

      <div className="container">
        <motion.div
          className="featured-destinations__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow-badge glass-pill">
            <HiSparkles />
            AI Curated Destinations
          </span>

          <h2 className="featured-destinations__title">
            Featured Destinations
          </h2>

          <p className="featured-destinations__paragraph">
            A short list of places our AI keeps recommending — matched against
            real traveler ratings, budgets, and the season you'd actually enjoy
            them in.
          </p>
        </motion.div>

        <div className="featured-destinations__grid">
          <DestinationCard destination={large} size="large" index={0} />
          {mediums.map((destination, i) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              size="medium"
              index={i + 1}
            />
          ))}
          {compacts.map((destination, i) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              size="compact"
              index={i + 3}
            />
          ))}
        </div>

        <motion.div
          className="featured-destinations__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="btn btn-primary btn-lg">
            Explore All Destinations
            <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
