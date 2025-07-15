import { 
  users, 
  menuItems, 
  categories, 
  cartItems, 
  orders, 
  orderItems, 
  savedItems,
  type User, 
  type InsertUser,
  type MenuItem,
  type InsertMenuItem,
  type Category,
  type InsertCategory,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type SavedItem,
  type InsertSavedItem,
  type MenuItemWithCategory,
  type CartItemWithDetails,
  type OrderWithItems
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Menu operations
  getMenuItems(): Promise<MenuItemWithCategory[]>;
  getMenuItem(id: number): Promise<MenuItemWithCategory | undefined>;
  getFeaturedItems(): Promise<MenuItemWithCategory[]>;
  getPopularItems(): Promise<MenuItemWithCategory[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItemWithCategory[]>;
  searchMenuItems(query: string): Promise<MenuItemWithCategory[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, updates: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Cart operations
  getCartItems(userId: number): Promise<CartItemWithDetails[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;

  // Order operations
  getOrders(userId: number): Promise<OrderWithItems[]>;
  getOrder(id: number): Promise<OrderWithItems | undefined>;
  createOrder(order: InsertOrder, items: { menuItemId: number; quantity: number; price: string }[]): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Saved items operations
  getSavedItems(userId: number): Promise<MenuItemWithCategory[]>;
  addToSaved(item: InsertSavedItem): Promise<SavedItem>;
  removeFromSaved(userId: number, menuItemId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private menuItems: Map<number, MenuItem>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private savedItems: Map<number, SavedItem>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.savedItems = new Map();
    this.currentId = {
      users: 1,
      menuItems: 1,
      categories: 1,
      cartItems: 1,
      orders: 1,
      orderItems: 1,
      savedItems: 1,
    };

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample categories
    const sampleCategories = [
      { name: "All", slug: "all", icon: "grid" },
      { name: "Rice", slug: "rice", icon: "rice" },
      { name: "Snacks", slug: "snacks", icon: "snack" },
      { name: "Drinks", slug: "drinks", icon: "drink" },
      { name: "Burgers", slug: "burgers", icon: "burger" },
      { name: "Pasta", slug: "pasta", icon: "pasta" },
    ];

    sampleCategories.forEach(cat => {
      const category: Category = { ...cat, id: this.currentId.categories++ };
      this.categories.set(category.id, category);
    });

    // Sample menu items
    const sampleMenuItems = [
      {
        name: "Yam fries",
        description: "Crispy golden yam fries served hot",
        price: "30.00",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        rating: "4.5",
        preparationTime: 15,
        calories: 200,
        restaurant: "Iya Oyo",
        categoryId: 3,
        isAvailable: true,
        isFeatured: true,
        isPopular: false,
      },
      {
        name: "Fried rice and turkey",
        description: "Colorful fried rice with seasoned turkey pieces",
        price: "30.00",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
        rating: "4.5",
        preparationTime: 15,
        calories: 500,
        restaurant: "Iya Oyo",
        categoryId: 2,
        isAvailable: true,
        isFeatured: true,
        isPopular: true,
      },
    ];

    sampleMenuItems.forEach(item => {
      const menuItem: MenuItem = { ...item, id: this.currentId.menuItems++ };
      this.menuItems.set(menuItem.id, menuItem);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Menu operations
  async getMenuItems(): Promise<MenuItemWithCategory[]> {
    return Array.from(this.menuItems.values()).map(item => ({
      ...item,
      category: item.categoryId ? this.categories.get(item.categoryId) : undefined,
    }));
  }

  async getMenuItem(id: number): Promise<MenuItemWithCategory | undefined> {
    const item = this.menuItems.get(id);
    if (!item) return undefined;

    return {
      ...item,
      category: item.categoryId ? this.categories.get(item.categoryId) : undefined,
    };
  }

  async getFeaturedItems(): Promise<MenuItemWithCategory[]> {
    return Array.from(this.menuItems.values())
      .filter(item => item.isFeatured)
      .map(item => ({
        ...item,
        category: item.categoryId ? this.categories.get(item.categoryId) : undefined,
      }));
  }

  async getPopularItems(): Promise<MenuItemWithCategory[]> {
    return Array.from(this.menuItems.values())
      .filter(item => item.isPopular)
      .map(item => ({
        ...item,
        category: item.categoryId ? this.categories.get(item.categoryId) : undefined,
      }));
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItemWithCategory[]> {
    return Array.from(this.menuItems.values())
      .filter(item => item.categoryId === categoryId)
      .map(item => ({
        ...item,
        category: this.categories.get(categoryId),
      }));
  }

  async searchMenuItems(query: string): Promise<MenuItemWithCategory[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.menuItems.values())
      .filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.restaurant.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery)
      )
      .map(item => ({
        ...item,
        category: item.categoryId ? this.categories.get(item.categoryId) : undefined,
      }));
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentId.menuItems++;
    const item: MenuItem = { ...insertItem, id };
    this.menuItems.set(id, item);
    return item;
  }

  async updateMenuItem(id: number, updates: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const item = this.menuItems.get(id);
    if (!item) return undefined;

    const updatedItem = { ...item, ...updates };
    this.menuItems.set(id, updatedItem);
    return updatedItem;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId.categories++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Cart operations
  async getCartItems(userId: number): Promise<CartItemWithDetails[]> {
    return Array.from(this.cartItems.values())
      .filter(item => item.userId === userId)
      .map(item => ({
        ...item,
        menuItem: this.menuItems.get(item.menuItemId!)!,
      }))
      .filter(item => item.menuItem); // Filter out items with missing menu items
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentId.cartItems++;
    const item: CartItem = { ...insertItem, id, createdAt: new Date() };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }

    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userItems = Array.from(this.cartItems.entries())
      .filter(([, item]) => item.userId === userId);

    userItems.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }

  // Order operations
  async getOrders(userId: number): Promise<OrderWithItems[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .map(order => ({
        ...order,
        items: Array.from(this.orderItems.values())
          .filter(item => item.orderId === order.id)
          .map(item => ({
            ...item,
            menuItem: this.menuItems.get(item.menuItemId!)!,
          }))
          .filter(item => item.menuItem),
      }));
  }

  async getOrder(id: number): Promise<OrderWithItems | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    return {
      ...order,
      items: Array.from(this.orderItems.values())
        .filter(item => item.orderId === id)
        .map(item => ({
          ...item,
          menuItem: this.menuItems.get(item.menuItemId!)!,
        }))
        .filter(item => item.menuItem),
    };
  }

  async createOrder(
    insertOrder: InsertOrder, 
    items: { menuItemId: number; quantity: number; price: string }[]
  ): Promise<Order> {
    const orderId = this.currentId.orders++;
    const order: Order = { ...insertOrder, id: orderId, createdAt: new Date() };
    this.orders.set(orderId, order);

    // Create order items
    items.forEach(item => {
      const orderItemId = this.currentId.orderItems++;
      const orderItem: OrderItem = {
        id: orderItemId,
        orderId,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
      };
      this.orderItems.set(orderItemId, orderItem);
    });

    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Saved items operations
  async getSavedItems(userId: number): Promise<MenuItemWithCategory[]> {
    return Array.from(this.savedItems.values())
      .filter(item => item.userId === userId)
      .map(item => this.menuItems.get(item.menuItemId!))
      .filter(Boolean)
      .map(item => ({
        ...item!,
        category: item!.categoryId ? this.categories.get(item!.categoryId) : undefined,
      }));
  }

  async addToSaved(insertItem: InsertSavedItem): Promise<SavedItem> {
    const id = this.currentId.savedItems++;
    const item: SavedItem = { ...insertItem, id, createdAt: new Date() };
    this.savedItems.set(id, item);
    return item;
  }

  async removeFromSaved(userId: number, menuItemId: number): Promise<boolean> {
    const item = Array.from(this.savedItems.entries())
      .find(([, item]) => item.userId === userId && item.menuItemId === menuItemId);

    if (item) {
      this.savedItems.delete(item[0]);
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();
