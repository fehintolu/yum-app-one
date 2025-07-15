import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertMenuItemSchema, 
  insertCategorySchema,
  insertCartItemSchema,
  insertOrderSchema,
  insertSavedItemSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Menu routes
  app.get("/api/menu", async (req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/featured", async (req, res) => {
    try {
      const items = await storage.getFeaturedItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured items" });
    }
  });

  app.get("/api/menu/popular", async (req, res) => {
    try {
      const items = await storage.getPopularItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular items" });
    }
  });

  app.get("/api/menu/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      const items = await storage.searchMenuItems(q);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to search menu items" });
    }
  });

  app.get("/api/menu/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const items = await storage.getMenuItemsByCategory(categoryId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items by category" });
    }
  });

  app.get("/api/menu/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid menu item ID" });
      }
      const item = await storage.getMenuItem(id);
      if (!item) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  // Category routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Cart routes (require user authentication in real app)
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const items = await storage.getCartItems(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validation = insertCartItemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid cart item data", errors: validation.error.errors });
      }
      const item = await storage.addToCart(validation.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (isNaN(id) || typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Invalid cart item ID or quantity" });
      }
      
      const item = await storage.updateCartItem(id, quantity);
      if (!item && quantity > 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      const success = await storage.removeFromCart(id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      await storage.clearCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Order routes
  app.get("/api/orders/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { order, items } = req.body;
      
      const orderValidation = insertOrderSchema.safeParse(order);
      if (!orderValidation.success) {
        return res.status(400).json({ message: "Invalid order data", errors: orderValidation.error.errors });
      }
      
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item" });
      }
      
      const newOrder = await storage.createOrder(orderValidation.data, items);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Saved items routes
  app.get("/api/saved/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const items = await storage.getSavedItems(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved items" });
    }
  });

  app.post("/api/saved", async (req, res) => {
    try {
      const validation = insertSavedItemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid saved item data", errors: validation.error.errors });
      }
      const item = await storage.addToSaved(validation.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to save item" });
    }
  });

  app.delete("/api/saved/:userId/:menuItemId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const menuItemId = parseInt(req.params.menuItemId);
      
      if (isNaN(userId) || isNaN(menuItemId)) {
        return res.status(400).json({ message: "Invalid user ID or menu item ID" });
      }
      
      const success = await storage.removeFromSaved(userId, menuItemId);
      if (!success) {
        return res.status(404).json({ message: "Saved item not found" });
      }
      
      res.json({ message: "Item removed from saved" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove saved item" });
    }
  });

  // User routes (basic implementation)
  app.post("/api/users", async (req, res) => {
    try {
      const validation = insertUserSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid user data", errors: validation.error.errors });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validation.data.email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }
      
      const user = await storage.createUser(validation.data);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
