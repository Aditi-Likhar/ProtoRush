import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWallet,
  FaRegClock,
  FaRegHeart,
  FaHeart,
  FaRobot,
  FaFire,
  FaGem,
  FaLeaf,
} from "react-icons/fa";
import { HiOutlineSun } from "react-icons/hi2";
import { GiMountainClimbing } from "react-icons/gi";
import "./RecommendationCard.css";

const BADGE_CONFIG = {
  "Best AI Match": { icon: <FaRobot />, className: "r-badge--ai" },
  "Most Popular": { icon: <FaStar />, className: "r-badge--popular" },
  Trending: { icon: <FaFire />, className: "r-badge--trending" },
  "Eco Tourism": { icon: <FaLeaf />, className: "r-badge--eco" },
  "Luxury Pick": { icon: <FaGem />, className: "r-badge--luxury" },
};

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function MatchRing({ value }) {
  const offset = RING_CIRCUMFERENCE - (value / 100) * RING_CIRCUMFERENCE;

  return (
    <div className="match-ring" role="img" aria-label={`${value}% AI match`}>
      <svg viewBox="0 0 60 60">
        <circle
          className="match-ring__track"
          cx="30"
          cy="30"
          r={RING_RADIUS}
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          className="match-ring__value"
          cx="30"
          cy="30"
          r={RING_RADIUS}
          strokeWidth="4"
          fill="none"
          strokeDasharray={RING_CIRCUMFERENCE}
          initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <span className="match-ring__label">{value}%</span>
    </div>
  );
}

function RecommendationCard({ recommendation, index = 0 }) {
  const [isSaved, setIsSaved] = useState(false);
  const {
    name,
    country,
    image,
    budget,
    duration,
    season,
    weather,
    difficulty,
    rating,
    aiMatch,
    description,
    badge,
  } = recommendation;

  const badgeConfig = badge ? BADGE_CONFIG[badge] : null;

  return (
    <motion.article
      className="recommendation-card"
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -8 }}
    >
      <div className="recommendation-card__image-wrap">
        <img
          className="recommendation-card__image"
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
        />
        <div className="recommendation-card__overlay" aria-hidden="true" />

        {badgeConfig && (
          <span className={`r-badge ${badgeConfig.className}`}>
            {badgeConfig.icon}
            {badge}
          </span>
        )}

        <button
          type="button"
          className={`recommendation-card__fav ${isSaved ? "is-saved" : ""}`}
          onClick={() => setIsSaved((prev) => !prev)}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from favorites" : "Save to favorites"}
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div className="recommendation-card__identity">
          <h3 className="recommendation-card__name">{name}</h3>
          <span className="recommendation-card__country">
            <FaMapMarkerAlt />
            {country}
          </span>
        </div>
      </div>

      <div className="recommendation-card__panel glass">
        <div className="recommendation-card__top">
          <MatchRing value={aiMatch} />
          <p className="recommendation-card__desc">{description}</p>
        </div>

        <div className="recommendation-card__stats">
          <span>
            <FaWallet />
            {budget}
          </span>
          <span>
            <FaRegClock />
            {duration}
          </span>
          <span>
            <HiOutlineSun />
            {season}
          </span>
          <span>
            <GiMountainClimbing />
            {difficulty}
          </span>
        </div>

        <div className="recommendation-card__footer">
          <span className="recommendation-card__weather">{weather}</span>
          <span className="recommendation-card__rating">
            <FaStar />
            {rating}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default RecommendationCard;
