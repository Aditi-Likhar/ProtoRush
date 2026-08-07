import { motion } from "framer-motion";
import { FiPaperclip, FiMic, FiSend, FiCpu } from "react-icons/fi";
import ChatMessage from "./ChatMessage";
import {
  CHAT_SUGGESTIONS,
  FLOATING_CARDS,
  SAMPLE_CONVERSATION,
  AI_FEATURES,
} from "../../data/chatSuggestions";
import "./ChatbotSection.css";

const ChatbotSection = () => {
  return (
    <section className="chatbot-section">
      <div className="container">
        {/* Section header */}
        <div className="chatbot-section__header fade-in-up">
          <span className="glass-pill chatbot-section__badge">
            🤖 AI Travel Assistant
          </span>
          <h2 className="chatbot-section__heading">
            Ask Anything About Your Journey
          </h2>
          <p className="chatbot-section__desc">
            Your personal AI concierge — plan trips, discover nearby places,
            check safety tips, and get real travel answers in seconds.
          </p>
        </div>

        {/* Split layout */}
        <div className="chatbot-layout">
          {/* Left side */}
          <div className="chatbot-visual fade-in-up">
            <motion.div
              className="chatbot-visual__orb glass-strong"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiCpu className="chatbot-visual__orb-icon" />
            </motion.div>

            {FLOATING_CARDS.map((card, index) => (
              <motion.div
                key={card.label}
                className={`chatbot-visual__float glass chatbot-visual__float--${index + 1}`}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
              >
                <span className="chatbot-visual__float-icon">{card.icon}</span>
                <span className="chatbot-visual__float-label">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right side — chat window */}
          <motion.div
            className="chat-window glass-strong fade-in-up"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Chat header */}
            <div className="chat-window__header">
              <div className="chat-window__header-left">
                <div className="chat-window__avatar">🤖</div>
                <div>
                  <h3 className="chat-window__title">
                    TravelMate AI Assistant
                  </h3>
                  <span className="chat-window__status">
                    <span className="chat-window__status-dot" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-window__messages">
              {SAMPLE_CONVERSATION.map((msg) => (
                <ChatMessage key={msg.id} {...msg} />
              ))}

              {/* Typing indicator */}
              <div className="chat-message chat-message--ai">
                <div className="chat-message__avatar">🤖</div>
                <div className="chat-window__typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            {/* Quick suggestions */}
            <div className="chat-window__suggestions">
              {CHAT_SUGGESTIONS.map((s) => (
                <button className="chat-chip" key={s}>
                  {s}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="chat-window__input">
              <button className="chat-window__icon-btn">
                <FiPaperclip />
              </button>
              <input
                type="text"
                className="chat-window__input-field"
                placeholder="Ask your travel question..."
                readOnly
              />
              <button className="chat-window__icon-btn">
                <FiMic />
              </button>
              <button className="chat-window__send-btn">
                <FiSend />
              </button>
            </div>
          </motion.div>
        </div>

        {/* AI Features panel */}
        <div className="ai-features">
          {AI_FEATURES.map((feature, index) => (
            <motion.div
              className="ai-feature-card glass lift-hover"
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span className="ai-feature-card__icon">{feature.icon}</span>
              <h4 className="ai-feature-card__title">{feature.title}</h4>
              <p className="ai-feature-card__desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="chatbot-cta fade-in-up">
          <button className="chatbot-cta__btn">
            Start Chatting with TravelMate AI
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
