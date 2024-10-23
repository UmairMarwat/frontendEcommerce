class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message) => {
    // Convert message to lowercase
    const lowerCase = message.toLowerCase();

    // Handle greetings
    if (
      lowerCase.includes("hi") ||
      lowerCase.includes("hello") ||
      lowerCase.includes("hey")
    ) {
      return this.actionProvider.Greeting();
    }

    // Overview of products
    if (
      lowerCase.includes("products") ||
      lowerCase.includes("what do you offer") ||
      lowerCase.includes("product list") ||
      lowerCase.includes("what can i buy")
    ) {
      return this.actionProvider.ProductsOverview();
    }

    // Product recommendations
    if (
      lowerCase.includes("recommend") ||
      lowerCase.includes("best sellers") ||
      lowerCase.includes("suggestions") ||
      lowerCase.includes("popular products")
    ) {
      return this.actionProvider.ProductRecommendations();
    }

    // Price inquiry
    if (
      lowerCase.includes("price") ||
      lowerCase.includes("cost") ||
      lowerCase.includes("how much")
    ) {
      return this.actionProvider.PriceInquiry();
    }

    // Call the ConsoleInfo method when the user mentions consoles
    if (
      lowerCase.includes("console") ||
      lowerCase.includes("playstation") ||
      lowerCase.includes("xbox") ||
      lowerCase.includes("nintendo")
    ) {
      return this.actionProvider.ConsoleInfo();
    }

    // Cart management
    if (
      lowerCase.includes("cart") ||
      lowerCase.includes("add to cart") ||
      lowerCase.includes("remove from cart") ||
      lowerCase.includes("shopping cart")
    ) {
      return this.actionProvider.CartManagement();
    }

    // Order tracking
    if (
      lowerCase.includes("track my order") ||
      lowerCase.includes("order number") ||
      lowerCase.includes("check order status")
    ) {
      return this.actionProvider.OrderTracking();
    }

    // Customer support
    if (
      lowerCase.includes("support") ||
      lowerCase.includes("help") ||
      lowerCase.includes("contact support") ||
      lowerCase.includes("need help")
    ) {
      return this.actionProvider.CustomerSupport();
    }

    // FAQ about returns
    if (
      lowerCase.includes("return policy") ||
      lowerCase.includes("can i return") ||
      lowerCase.includes("how to return")
    ) {
      return this.actionProvider.ReturnPolicy();
    }

    // FAQ about shipping
    if (
      lowerCase.includes("shipping") ||
      lowerCase.includes("delivery time") ||
      lowerCase.includes("how long does shipping take")
    ) {
      return this.actionProvider.ShippingInfo();
    }

    // FAQ about warranty
    if (
      lowerCase.includes("warranty") ||
      lowerCase.includes("product warranty") ||
      lowerCase.includes("guarantee")
    ) {
      return this.actionProvider.WarrantyInfo();
    }

    // Account management
    if (
      lowerCase.includes("account") ||
      lowerCase.includes("my profile") ||
      lowerCase.includes("update account")
    ) {
      return this.actionProvider.AccountManagement();
    }

    // Discounts and promotions
    if (
      lowerCase.includes("discount") ||
      lowerCase.includes("promo code") ||
      lowerCase.includes("sale")
    ) {
      return this.actionProvider.DiscountInfo();
    }

    // Technical support
    if (
      lowerCase.includes("technical issue") ||
      lowerCase.includes("error") ||
      lowerCase.includes("website not working")
    ) {
      return this.actionProvider.TechnicalSupport();
    }

    // Store locations
    if (
      lowerCase.includes("store") ||
      lowerCase.includes("location") ||
      lowerCase.includes("where can i visit")
    ) {
      return this.actionProvider.StoreLocations();
    }

    // Product search
    if (
      lowerCase.includes("find") ||
      lowerCase.includes("search for") ||
      lowerCase.includes("look for")
    ) {
      return this.actionProvider.ProductSearch(lowerCase);
    }

    // Subscription management
    if (
      lowerCase.includes("subscribe") ||
      lowerCase.includes("newsletter") ||
      lowerCase.includes("unsubscribe")
    ) {
      return this.actionProvider.SubscriptionManagement();
    }

    // Order cancellations
    if (
      lowerCase.includes("cancel order") ||
      lowerCase.includes("order cancellation")
    ) {
      return this.actionProvider.OrderCancellation();
    }
    
    if (
      lowerCase.includes("is this in stock") ||
      lowerCase.includes("can i buy this") ||
      lowerCase.includes("is this item available") ||
      lowerCase.includes("is there a discount") ||
      lowerCase.includes("do you offer free shipping") ||
      lowerCase.includes("is this wireless") ||
      lowerCase.includes("can i cancel my order") ||
      lowerCase.includes("can i track my order") ||
      lowerCase.includes("is this waterproof") ||
      lowerCase.includes("can i pay in installments")
    ) {
      return this.actionProvider.YesNoResponse();
    }
    

    // Feedback and reviews
    if (
      lowerCase.includes("feedback") ||
      lowerCase.includes("review") ||
      lowerCase.includes("rate product")
    ) {
      return this.actionProvider.Feedback();
    }

    // Default handler if no matches are found
    return this.actionProvider.handleDefault();
  };
}

export default MessageParser;
