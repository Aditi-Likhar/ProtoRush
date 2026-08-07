import { motion } from "framer-motion";
import {
  FiShield,
  FiCloud,
  FiAlertCircle,
  FiActivity,
  FiCheckCircle,
  FiMapPin,
  FiPhoneCall,
  FiDownload,
  FiUsers,
  FiCpu,
} from "react-icons/fi";
import EmergencyCard from "./EmergencyCard";
import {
  SAFETY_STATUS,
  EMERGENCY_CONTACTS,
  SAFETY_GUIDELINES,
  AI_SAFETY_INSIGHT,
  QUICK_ACTIONS,
} from "../../data/emergency";
import "./SafetySection.css";

const QUICK_ACTION_ICONS = {
  "share-location": <FiMapPin />,
  "nearest-hospital": <FiActivity />,
  "emergency-contacts": <FiPhoneCall />,
  "offline-guide": <FiDownload />,
};

const SafetySection = () => {
  return (
    <section className="safety-section">
      <div className="container">
        {/* Section header */}
        <div className="safety-section__header fade-in-up">
          <span className="glass-pill safety-section__badge">
            🛡 Travel Safely
          </span>
          <h2 className="safety-section__heading">
            Emergency &amp; Safety Hub
          </h2>
          <p className="safety-section__desc">
            Real-time safety intelligence, verified local contacts, and
            AI-backed guidance so every trip stays worry-free — wherever you
            land.
          </p>
        </div>

        {/* Top status card */}
        <motion.div
          className="safety-status glass-strong fade-in-up"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="safety-status__main">
            <span className="safety-status__label">
              Destination Safety Status
            </span>
            <h3 className="safety-status__destination">
              {SAFETY_STATUS.destination}
            </h3>
            <span className="safety-status__pill">
              <FiShield />
              {SAFETY_STATUS.safetyLabel}
            </span>
          </div>

          <div className="safety-status__grid">
            <div className="safety-status__item">
              <FiShield className="safety-status__icon" />
              <span className="safety-status__item-label">Safety Score</span>
              <span className="safety-status__item-value">
                {SAFETY_STATUS.safetyScore}/10
              </span>
            </div>
            <div className="safety-status__item">
              <FiCloud className="safety-status__icon" />
              <span className="safety-status__item-label">Weather</span>
              <span className="safety-status__item-value">
                {SAFETY_STATUS.weather}
              </span>
            </div>
            <div className="safety-status__item">
              <FiAlertCircle className="safety-status__icon" />
              <span className="safety-status__item-label">
                Tourist Advisory
              </span>
              <span className="safety-status__item-value">
                {SAFETY_STATUS.advisory}
              </span>
            </div>
            <div className="safety-status__item">
              <FiActivity className="safety-status__icon" />
              <span className="safety-status__item-label">
                Emergency Availability
              </span>
              <span className="safety-status__item-value">
                {SAFETY_STATUS.emergencyAvailability}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Emergency grid */}
        <div className="safety-section__subheading fade-in-up">
          <h3>Emergency Contacts</h3>
          <p>Verified local numbers, ready when you need them.</p>
        </div>

        <div className="emergency-grid">
          {EMERGENCY_CONTACTS.map((contact) => (
            <EmergencyCard key={contact.id} {...contact} />
          ))}
        </div>

        {/* Guidelines + AI insight */}
        <div className="safety-lower-grid">
          {/* Guidelines */}
          <motion.div
            className="safety-guidelines glass fade-in-up"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="safety-guidelines__title">Safety Guidelines</h3>
            <ul className="safety-guidelines__list">
              {SAFETY_GUIDELINES.map((item, index) => (
                <motion.li
                  key={item}
                  className="safety-guidelines__item"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <FiCheckCircle className="safety-guidelines__check" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* AI Safety Insight */}
          <motion.div
            className="ai-insight glass-strong fade-in-up"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="ai-insight__header">
              <span className="ai-insight__icon">
                <FiCpu />
              </span>
              <span className="ai-insight__label">🤖 AI Safety Tip</span>
            </div>

            <p className="ai-insight__recommendation">
              {AI_SAFETY_INSIGHT.recommendation}
            </p>

            <div className="ai-insight__footer">
              <div className="ai-insight__stat">
                <span className="ai-insight__stat-label">Confidence</span>
                <span className="ai-insight__stat-value">
                  {AI_SAFETY_INSIGHT.confidenceScore}%
                </span>
              </div>
              <div className="ai-insight__stat">
                <span className="ai-insight__stat-label">Safety Level</span>
                <span className="ai-insight__stat-value ai-insight__stat-value--good">
                  {AI_SAFETY_INSIGHT.safetyLevel}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick actions */}
        <div className="quick-actions fade-in-up">
          {QUICK_ACTIONS.map((action) => (
            <button
              className="quick-actions__btn glass lift-hover"
              key={action.id}
            >
              <span className="quick-actions__icon">
                {QUICK_ACTION_ICONS[action.id]}
              </span>
              {action.label}
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="safety-cta fade-in-up">
          <button className="safety-cta__btn">
            <FiUsers />
            View Complete Safety Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
