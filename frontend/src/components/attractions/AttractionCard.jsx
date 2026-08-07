import { motion } from "framer-motion";
import {
  FaStar,
  FaRegClock,
  FaMapMarkerAlt,
  FaDirections,
  FaRegBookmark,
  FaShareAlt,
  FaInfoCircle,
  FaFire,
  FaRobot,
  FaLeaf,
  FaLandmark,
} from "react-icons/fa";
import { HiOutlineSun, HiOutlineCloud } from "react-icons/hi2";
import "./AttractionCard.css";

const BADGE_CONFIG = {
  Trending: { icon: <FaFire />, className: "a-badge--trending" },
  "Top Rated": { icon: <FaStar />, className: "a-badge--rated" },
  "AI Pick": { icon: <FaRobot />, className: "a-badge--ai" },
  "Eco Friendly": { icon: <FaLeaf />, className: "a-badge--eco" },
  Heritage: { icon: <FaLandmark />, className: "a-badge--heritage" },
};

const CROWD_CONFIG = {
  low: { label: "Less Crowded", dot: "🟢" },
  moderate: { label: "Moderate", dot: "🟡" },
  high: { label: "Busy", dot: "🔴" },
};

function AttractionCard({ attraction, index = 0 }) {
  const {
    name,
    image,
    distance,
    travelTime,
    rating,
    weather,
    crowd,
    category,
    openingHours,
    description,
    aiScore,
    badge,
    size,
  } = attraction;

  const badgeConfig = badge ? BADGE_CONFIG[badge] : null;
  const crowdConfig = CROWD_CONFIG[crowd];
  const isSunny =
    weather.condition.toLowerCase().includes("sun") ||
    weather.condition.toLowerCase().includes("clear");

  return (
    <motion.article
      className={`attraction-card attraction-card--${size}`}
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -6 }}
    >
      <div className="attraction-card__image-wrap">
        <img
          className="attraction-card__image"
          src={image}
          alt={name}
          loading="lazy"
        />
        <div className="attraction-card__overlay" aria-hidden="true" />

        {badgeConfig && (
          <span className={`a-badge ${badgeConfig.className}`}>
            {badgeConfig.icon}
            {badge}
          </span>
        )}

        <span className="attraction-card__weather">
          {isSunny ? <HiOutlineSun /> : <HiOutlineCloud />}
          {weather.temp}
        </span>

        <span className="attraction-card__ai-score">
          <FaRobot />
          {aiScore}%
        </span>
      </div>

      <div className="attraction-card__panel glass">
        <div className="attraction-card__top">
          <h3 className="attraction-card__name">{name}</h3>
          <span className="attraction-card__rating">
            <FaStar />
            {rating}
          </span>
        </div>

        <div className="attraction-card__meta">
          <span>
            <FaMapMarkerAlt />
            {distance}
          </span>
          <span>
            <FaRegClock />
            {travelTime}
          </span>
          <span className="attraction-card__crowd">
            {crowdConfig.dot} {crowdConfig.label}
          </span>
        </div>

        <p className="attraction-card__desc">{description}</p>

        <div className="attraction-card__footer">
          <span className="tag-chip">{category}</span>
          <span className="attraction-card__hours">{openingHours}</span>
        </div>

        <div className="attraction-card__actions">
          <button
            type="button"
            className="a-action-btn"
            aria-label="Get directions"
          >
            <FaDirections />
            <span>Directions</span>
          </button>
          <button
            type="button"
            className="a-action-btn"
            aria-label="Save attraction"
          >
            <FaRegBookmark />
            <span>Save</span>
          </button>
          <button
            type="button"
            className="a-action-btn"
            aria-label="Share attraction"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
          <button
            type="button"
            className="a-action-btn"
            aria-label="More information"
          >
            <FaInfoCircle />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default AttractionCard;
