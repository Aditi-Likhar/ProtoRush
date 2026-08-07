import { motion } from "framer-motion";
import {
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiSend,
  FiCompass,
} from "react-icons/fi";
import "./Footer.css";

const QUICK_LINKS = [
  "Home",
  "Destinations",
  "Nearby Attractions",
  "AI Planner",
  "Transport",
  "Safety",
  "AI Assistant",
];

const RESOURCE_LINKS = [
  "Travel Guides",
  "Emergency Contacts",
  "Safety Tips",
  "Travel Blog",
  "FAQs",
  "Support",
];

const SOCIAL_LINKS = [
  { icon: <FiInstagram />, label: "Instagram" },
  { icon: <FiLinkedin />, label: "LinkedIn" },
  { icon: <FiGithub />, label: "GitHub" },
  { icon: <FiTwitter />, label: "Twitter / X" },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms", "Contact"];

const Footer = () => {
  return (
    <footer className="footer">
      {/* Background glow */}
      <div className="footer__glow footer__glow--1" />
      <div className="footer__glow footer__glow--2" />

      <div className="container">
        <div className="footer__top">
          {/* Column 1 — Brand */}
          <motion.div
            className="footer__col footer__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="footer__logo">
              <span className="footer__logo-icon">
                <FiCompass />
              </span>
              <span className="footer__logo-text">
                TravelMate <span className="footer__logo-accent">AI</span>
              </span>
            </div>

            <p className="footer__desc">
              Your intelligent travel companion for discovering destinations,
              planning trips, navigating cities, and traveling safely.
            </p>

            <div className="footer__socials">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  href="#"
                  className="footer__social-btn glass"
                  key={social.label}
                  aria-label={social.label}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            className="footer__col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__link-list">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Resources */}
          <motion.div
            className="footer__col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <h4 className="footer__col-title">Resources</h4>
            <ul className="footer__link-list">
              {RESOURCE_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Newsletter */}
          <motion.div
            className="footer__col footer__newsletter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <h4 className="footer__col-title">Stay Updated</h4>
            <p className="footer__newsletter-text">
              Get travel inspiration, AI recommendations, and safety alerts.
            </p>

            <form
              className="footer__newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Enter your email"
              />
              <motion.button
                type="submit"
                className="footer__newsletter-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiSend />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 TravelMate AI. Made with ❤️ for smarter travel.
          </p>

          <div className="footer__legal">
            {LEGAL_LINKS.map((link) => (
              <a href="#" className="footer__legal-link" key={link}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
