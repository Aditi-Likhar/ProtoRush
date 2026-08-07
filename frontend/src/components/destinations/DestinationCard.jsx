import { motion } from "framer-motion";
import {
  FaStar,
  FaRegClock,
  FaMapMarkerAlt,
  FaWallet,
  FaSun,
  FaRobot,
  FaFire,
  FaMagic,
  FaHeart,
} from "react-icons/fa";
import "./DestinationCard.css";

const BADGE_CONFIG = {
  "Editor's Choice": { icon: <FaMagic />, className: "badge--editors" },
  Trending: { icon: <FaFire />, className: "badge--trending" },
  "AI Recommended": { icon: <FaRobot />, className: "badge--ai" },
  "Most Loved": { icon: <FaHeart />, className: "badge--loved" },
};

function DestinationCard({ destination, size = "medium", index = 0 }) {
  const {
    name,
    country,
    image,
    rating,
    aiMatch,
    budget,
    season,
    duration,
    category,
    description,
    badge,
  } = destination;

  const badgeConfig = badge ? BADGE_CONFIG[badge] : null;
  const isCompact = size === "compact";

  return (
    <motion.article
      className={`destination-card destination-card--${size}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
    >
      <div className="destination-card__image-wrap">
        <img
          className="destination-card__image"
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
        />
        <div className="destination-card__overlay" aria-hidden="true" />

        {badgeConfig && (
          <span className={`destination-card__badge ${badgeConfig.className}`}>
            {badgeConfig.icon}
            {badge}
          </span>
        )}

        <span className="destination-card__ai-match">
          <FaRobot />
          {aiMatch}% Match
        </span>
      </div>

      <div className="destination-card__panel glass">
        <div className="destination-card__top">
          <h3 className="destination-card__name">{name}</h3>
          <span className="destination-card__country">
            <FaMapMarkerAlt />
            {country}
          </span>
        </div>

        <div className="destination-card__stats">
          <span>
            <FaStar />
            {rating}
          </span>
          <span>
            <FaRegClock />
            {duration}
          </span>
          <span>
            <FaSun />
            {season}
          </span>
        </div>

        {!isCompact && <p className="destination-card__desc">{description}</p>}

        {!isCompact && (
          <div className="destination-card__footer">
            <span className="destination-card__budget">
              <FaWallet />
              {budget}
            </span>
            <div className="destination-card__tags">
              {category.slice(0, size === "large" ? 4 : 2).map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default DestinationCard;
