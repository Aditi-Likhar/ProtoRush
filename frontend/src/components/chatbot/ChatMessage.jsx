import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import "./ChatMessage.css";

const ChatMessage = ({ role, text, list, footer }) => {
  const isAI = role === "ai";

  return (
    <motion.div
      className={`chat-message ${isAI ? "chat-message--ai" : "chat-message--user"}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Avatar */}
      <div className="chat-message__avatar">{isAI ? "🤖" : <FiUser />}</div>

      {/* Bubble */}
      <div className="chat-message__bubble">
        <p className="chat-message__text">{text}</p>

        {list && (
          <ul className="chat-message__list">
            {list.map((item) => (
              <li key={item} className="chat-message__list-item">
                {item}
              </li>
            ))}
          </ul>
        )}

        {footer && (
          <div className="chat-message__footer">
            {footer.map((item) => (
              <div className="chat-message__footer-item" key={item.label}>
                <span className="chat-message__footer-label">{item.label}</span>
                <span className="chat-message__footer-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
