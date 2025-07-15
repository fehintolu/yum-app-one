import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yum.delivery',
  appName: 'Yum',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#E53E3E',
      showSpinner: false
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#E53E3E'
    }
  }
};

export default config;
