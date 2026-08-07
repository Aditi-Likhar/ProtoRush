import { motion } from "framer-motion";
import { FiPhoneCall, FiNavigation } from "react-icons/fi";
import "./EmergencyCard.css";

const EmergencyCard = ({ icon, title, number, availability, responseTime }) => {
  return (
    <motion.div
      className="emergency-card glass lift-hover"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Icon */}
      <div className="emergency-card__icon">{icon}</div>

      {/* Title + number */}
      <h3 className="emergency-card__title">{title}</h3>
      <p className="emergency-card__number">{number}</p>

      {/* Meta info */}
      <div className="emergency-card__meta">
        <span className="emergency-card__meta-item">
          <span className="emergency-card__dot" />
          {availability}
        </span>
        <span className="emergency-card__meta-item">
          {responseTime} response
        </span>
      </div>

      {/* Actions */}
      <div className="emergency-card__actions">
        <button className="emergency-card__btn emergency-card__btn--primary">
          <FiPhoneCall />
          Quick Call
        </button>
        <button className="emergency-card__btn emergency-card__btn--ghost">
          <FiNavigation />
          Directions
        </button>
      </div>
    </motion.div>
  );
};

export default EmergencyCard;
