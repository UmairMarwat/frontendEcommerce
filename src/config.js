// config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "MyChatBot";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. How can I help you today?`)],
};

export default config;
