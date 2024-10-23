class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // Method for adding messages to the chatbot state
  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };

  // Friendly greeting message
  Greeting = () => {
    const message = this.createChatBotMessage(`Hey there! 😊 Welcome to our gaming store! How can I help you today?`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  };

  // Overview of products offered
  ProductsOverview = () => {
    const message = this.createChatBotMessage(
      `We’ve got an awesome collection for you! 🎮 Here’s what we offer:\n- Gaming Headphones\n- Latest Gaming Consoles\n- High-Performance Gaming PCs\n- Keyboards for Gamers\n- Ergonomic Mice\nFeel free to ask about any product!`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Product recommendations
  ProductRecommendations = () => {
    const message = this.createChatBotMessage(
      `Looking for something popular? Here are some of our best sellers right now:\n1. Pro Gaming Headphones 🎧\n2. Latest Gaming Console 🎮\n3. High-Performance Gaming PC 🖥️\n4. Mechanical Keyboards ⌨️\n5. Ergonomic Gaming Mice 🖱️\nWant details on any of these? Let me know!`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Price inquiry response
  PriceInquiry = () => {
    const message = this.createChatBotMessage(
      `I can help with that! Just let me know which product you’re interested in, and I'll get the pricing for you.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Cart management
  CartManagement = () => {
    const message = this.createChatBotMessage(
      `Need to manage your cart? You can add or remove items anytime. What would you like to do?`,
      { withAvatar: true, widget: "CartManagement" }
    );
    this.addMessageToBotState(message);
  };

  // Order tracking
  OrderTracking = () => {
    const message = this.createChatBotMessage(
      `Got your order number ready? Just share it with me, and I’ll check the status of your order!`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // General help and support
  CustomerSupport = () => {
    const message = this.createChatBotMessage(
      `If you need more help, our support team is here for you. Would you like to talk to a representative? 😊`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // FAQ: Return policy
  ReturnPolicy = () => {
    const message = this.createChatBotMessage(
      `Our return policy is simple! You can return products within 30 days, as long as they’re in their original condition and packaging. Need more details? Just ask!`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // FAQ: Shipping info
  ShippingInfo = () => {
    const message = this.createChatBotMessage(
      `We offer both standard and express shipping. Standard takes 3-5 business days, while express will have it delivered in 1-2 days! 🚚💨`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // FAQ: Warranty info
  WarrantyInfo = () => {
    const message = this.createChatBotMessage(
      `No worries! All our products come with a one-year warranty, and you can extend it if you'd like by purchasing our extended plan.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Account management
  AccountManagement = () => {
    const message = this.createChatBotMessage(
      `Need to update your account info? You can do that from your profile page. Want me to guide you there?`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Discounts and promotions
  DiscountInfo = () => {
    const message = this.createChatBotMessage(
      `Good news! Right now, you can enjoy a 10% discount on all gaming accessories! Just use the code GAMER10 at checkout! 🤑`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Technical support
  TechnicalSupport = () => {
    const message = this.createChatBotMessage(
      `Oh no! Having technical issues? 😟 Please describe what’s happening, and I’ll do my best to help!`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Store locations
  StoreLocations = () => {
    const message = this.createChatBotMessage(
      `We have stores in major cities! 📍 Let me know your location, and I’ll find the nearest store for you.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Product search
  ProductSearch = (query) => {
    const message = this.createChatBotMessage(
      `You’re looking for "${query}"? I’ll help you find it in no time! 🕵️‍♂️`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Subscription management
  SubscriptionManagement = () => {
    const message = this.createChatBotMessage(
      `Want to stay updated on our latest deals and products? You can subscribe to our newsletter! Or, if you'd like to unsubscribe, I can help with that too.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Order cancellations
  OrderCancellation = () => {
    const message = this.createChatBotMessage(
      `Need to cancel an order? 🛑 No problem! Just give me the order number, and I’ll check if it’s eligible for cancellation.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Feedback and reviews
  Feedback = () => {
    const message = this.createChatBotMessage(
      `We’d love to hear your thoughts! You can leave a review on the product page or share your feedback here. 😊`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };

  // Console info
  ConsoleInfo = () => {
    const message = this.createChatBotMessage(
      `Looking for the latest gaming consoles? We offer the newest models, including PlayStation, Xbox, and Nintendo Switch. 🎮 These come with exclusive bundles and accessories for an unbeatable experience.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };
  
  YesNoResponse = () => {
    const message = this.createChatBotMessage(
      `Yes, you can! Let me know if you need more details.`,
      { withAvatar: true }
    );
    this.addMessageToBotState(message);
  };
  

  // Default handler if no matches are found
  handleDefault = () => {
    const message = this.createChatBotMessage(`Not sure how I can help? Just let me know what you're looking for, and I’ll do my best to assist you! 😃`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  };
}

export default ActionProvider;
