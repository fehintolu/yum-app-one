import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItemWithDetails, MenuItem, User } from '@shared/schema';

interface CartItem {
  id: number;
  menuItem: MenuItem;
  quantity: number;
  price: string;
}

interface AppState {
  user: User | null;
  cartItems: CartItem[];
  savedItems: MenuItem[];
  searchQuery: string;
  activeCategory: string;
  location: string;
  isCartOpen: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: MenuItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_SAVED_ITEM'; payload: MenuItem }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_ACTIVE_CATEGORY'; payload: string }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'TOGGLE_CART'; payload?: boolean };

const initialState: AppState = {
  user: null,
  cartItems: [],
  savedItems: [],
  searchQuery: '',
  activeCategory: 'all',
  location: '15 Water Street Fremont',
  isCartOpen: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'ADD_TO_CART': {
      const existingItem = state.cartItems.find(
        item => item.menuItem.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.menuItem.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      const newItem: CartItem = {
        id: Date.now(), // Simple ID generation for demo
        menuItem: action.payload,
        quantity: 1,
        price: action.payload.price,
      };

      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return { ...state, cartItems: [] };

    case 'TOGGLE_SAVED_ITEM': {
      const isAlreadySaved = state.savedItems.some(
        item => item.id === action.payload.id
      );

      return {
        ...state,
        savedItems: isAlreadySaved
          ? state.savedItems.filter(item => item.id !== action.payload.id)
          : [...state.savedItems, action.payload],
      };
    }

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_ACTIVE_CATEGORY':
      return { ...state, activeCategory: action.payload };

    case 'SET_LOCATION':
      return { ...state, location: action.payload };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: action.payload ?? !state.isCartOpen,
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Convenience hooks
export function useCart() {
  const { state, dispatch } = useAppContext();
  
  const addToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = (open?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', payload: open });
  };

  const cartTotal = state.cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const cartItemCount = state.cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return {
    cartItems: state.cartItems,
    cartTotal,
    cartItemCount,
    isCartOpen: state.isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
  };
}
