import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './chabot.css'; // Import the CSS file

import config from '../config';
import MessageParser from '../MessageParser';
import ActionProvider from '../ActionProvider';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleChatbot = () => {
    setIsOpen(!isOpen); // Toggle the chatbot state
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button with Font Awesome Icon */}
      <button className="chatbot-button" onClick={toggleChatbot}>
        {isOpen ? <i className="fas fa-times"></i> : <i class="fa-solid fa-message"></i>}
        {/* Font Awesome 'times' icon for close, 'comments' icon for open */}
      </button>

     
      {isOpen && (
        <div className="chatbot-wrapper">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
