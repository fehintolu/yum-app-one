import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { App as CapacitorApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

// Initialize Capacitor plugins for mobile
const initCapacitor = async () => {
  try {
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#E53E3E' });
    
    // Hide splash screen after app loads
    await SplashScreen.hide();
  } catch (error) {
    // Silently fail if not running on mobile
    console.log('Capacitor plugins not available (running in browser)');
  }
};

// Initialize Capacitor when app starts
initCapacitor();

createRoot(document.getElementById("root")!).render(<App />);
