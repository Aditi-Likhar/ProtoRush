import { motion } from "framer-motion";
import {
  FaSubway,
  FaBus,
  FaTaxi,
  FaShuttleVan,
  FaBicycle,
  FaWalking,
  FaRobot,
  FaCoins,
  FaLeaf,
  FaStar,
  FaFire,
} from "react-icons/fa";
import "./TransportCard.css";

const ICON_MAP = {
  metro: FaSubway,
  bus: FaBus,
  taxi: FaTaxi,
  auto: FaShuttleVan,
  bike: FaBicycle,
  walk: FaWalking,
};

const BADGE_CONFIG = {
  "Fastest Route": { icon: <FaRobot />, className: "t-badge--ai" },
  Cheapest: { icon: <FaCoins />, className: "t-badge--cheap" },
  "Eco Friendly": { icon: <FaLeaf />, className: "t-badge--eco" },
  "Most Comfortable": { icon: <FaStar />, className: "t-badge--comfort" },
  Recommended: { icon: <FaFire />, className: "t-badge--recommended" },
};

function MiniBar({ label, value, tone }) {
  return (
    <div className="mini-bar">
      <div className="mini-bar__head">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mini-bar__track">
        <motion.div
          className={`mini-bar__fill mini-bar__fill--${tone}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function TransportCard({ mode, isActive = false, index = 0 }) {
  const Icon = ICON_MAP[mode.icon] ?? FaTaxi;
  const badgeConfig = mode.badge ? BADGE_CONFIG[mode.badge] : null;
  const comfortPercent = (mode.comfort / 5) * 100;

  return (
    <motion.article
      className={`transport-card glass ${isActive ? "is-active" : ""}`}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -6 }}
    >
      {badgeConfig && (
        <span className={`t-badge ${badgeConfig.className}`}>
          {badgeConfig.icon}
          {mode.badge}
        </span>
      )}

      <div className="transport-card__head">
        <span className="transport-card__icon float-slow">
          <Icon />
        </span>
        <div>
          <h3 className="transport-card__name">{mode.name}</h3>
          <span className="transport-card__distance">{mode.distance}</span>
        </div>
      </div>

      <div className="transport-card__key-stats">
        <div>
          <span className="transport-card__stat-value">{mode.time}</span>
          <span className="transport-card__stat-label">Time</span>
        </div>
        <div>
          <span className="transport-card__stat-value">{mode.cost}</span>
          <span className="transport-card__stat-label">Cost</span>
        </div>
      </div>

      <div className="transport-card__bars">
        <MiniBar label="Comfort" value={comfortPercent} tone="gold" />
        <MiniBar label="Availability" value={mode.availability} tone="teal" />
        <MiniBar label="Eco Score" value={mode.ecoScore} tone="success" />
      </div>
    </motion.article>
  );
}

export default TransportCard;
