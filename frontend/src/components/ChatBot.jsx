import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    zIndex: 1000,
  },
  toggleButton: {
    backgroundColor: '#2c7a4b',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  chatBox: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    width: '320px',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatHeader: {
    backgroundColor: '#2c7a4b',
    color: 'white',
    padding: '1rem',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  messages: {
    padding: '1rem',
    height: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  message: (isUser) => ({
    backgroundColor: isUser ? '#2c7a4b' : '#f0f0f0',
    color: isUser ? 'white' : '#333',
    padding: '0.6rem 1rem',
    borderRadius: '12px',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    maxWidth: '85%',
    fontSize: '0.9rem',
  }),
  inputRow: {
    display: 'flex',
    borderTop: '1px solid #eee',
  },
  input: {
    flex: 1,
    padding: '0.8rem',
    border: 'none',
    outline: 'none',
    fontSize: '0.95rem',
  },
  sendButton: {
    backgroundColor: '#2c7a4b',
    color: 'white',
    border: 'none',
    padding: '0 1rem',
    fontSize: '1.2rem',
  },
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm here to help you find food, healthcare, and housing resources. What do you need help with?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/chat', {
        message: userMessage
      });
      setMessages(prev => [...prev, { text: res.data.reply, isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble right now. Please call 211 for immediate help.",
        isUser: false
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatBox}>
          <div style={styles.chatHeader}>💬 Ask for Help</div>
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={styles.message(msg.isUser)}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={styles.message(false)}>Typing...</div>
            )}
          </div>
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your question..."
            />
            <button style={styles.sendButton} onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
      <button style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕ Close' : '💬 Get Help'}
      </button>
    </div>
  );
}

export default ChatBot;