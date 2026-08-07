import "./App.css";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import FeaturedDestinations from "./components/destinations/FeaturedDestinations";
import NearbyAttractions from "./components/attractions/NearbyAttractions";
import RecommendationSection from "./components/recommendations/RecommendationSection";
import TransportSection from "./components/transport/TransportSection";
import SafetySection from "./components/safety/SafetySection";
import ChatbotSection from "./components/chatbot/ChatbotSection";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="app-main">
        <Hero />
        <FeaturedDestinations />
        <NearbyAttractions />
        <RecommendationSection />
        <TransportSection />
        <SafetySection />
        <ChatbotSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
