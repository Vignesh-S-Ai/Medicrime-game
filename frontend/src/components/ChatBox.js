import React, { useState } from 'react';
import { sendMessage } from '../services/api';
import './ChatBox.css';

const mockResponses = [
  "Based on the symptoms you've described, this could be related to a metabolic disorder. Have you noticed any changes in your appetite?",
  "I recommend reviewing the patient's complete medical history for any previous thyroid issues.",
  "The combination of fatigue and weight gain is often associated with hormonal imbalances. Consider checking TSH levels.",
  "Thank you for that information. The cold intolerance and low heart rate are significant findings that could indicate an endocrine disorder.",
];

function ChatBox({ caseId }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Chat with the AI assistant to gather more information about this case.' },
    { id: 2, sender: 'ai', text: 'Hello! I\'m here to help you analyze this case. Feel free to ask me questions about the patient\'s symptoms or conditions.' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendMessage(caseId, inputValue);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.message || mockResponses[Math.floor(Math.random() * mockResponses.length)],
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbox card">
      <div className="card-header">
        <h2>AI Assistant</h2>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai typing">
            <div className="message-content">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask about symptoms, conditions, or treatments..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="primary send-btn"
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
