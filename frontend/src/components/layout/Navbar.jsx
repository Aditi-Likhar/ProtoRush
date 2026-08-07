import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Nearby", href: "#nearby" },
  { label: "Transport", href: "#transport" },
  { label: "Safety", href: "#safety" },
  { label: "AI Planner", href: "#ai-planner" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (label) => {
    setActiveItem(label);
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`navbar-wrap fade-in ${isScrolled ? "is-scrolled" : ""}`}
    >
      <div className="navbar">
        <a
          href="#home"
          className="navbar-logo"
          onClick={() => handleNavClick("Home")}
          aria-label="TravelMate AI — Home"
        >
          <span className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M15.5 8.5L13 13l-4.5 2.5L11 11l4.5-2.5z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="logo-text">
            <span className="logo-title">
              TravelMate <span className="text-gradient-gold">AI</span>
            </span>
            <span className="logo-tagline">Explore Smarter</span>
          </span>
        </a>

        <nav className="navbar-menu" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeItem === item.label ? "is-active" : ""}
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <button type="button" className="btn btn-ghost btn-sm navbar-signin">
            Sign In
          </button>
          <button type="button" className="btn btn-primary btn-sm navbar-cta">
            Start Exploring
          </button>

          <button
            type="button"
            className={`navbar-burger ${isMobileOpen ? "is-open" : ""}`}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            aria-controls="navbar-mobile-panel"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="navbar-mobile-panel"
        className={`navbar-mobile-panel glass-strong ${isMobileOpen ? "is-open" : ""}`}
      >
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeItem === item.label ? "is-active" : ""}
                onClick={() => handleNavClick(item.label)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-mobile-actions">
          <button type="button" className="btn btn-secondary">
            Sign In
          </button>
          <button type="button" className="btn btn-primary">
            Start Exploring
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
