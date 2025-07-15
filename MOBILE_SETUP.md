# Yum Mobile App - Capacitor Setup

## Overview
The Yum food delivery app is now configured for mobile deployment using Capacitor.js. This allows the React web app to be packaged as a native mobile app for iOS and Android.

## Prerequisites
- Node.js installed
- For Android: Android Studio with SDK
- For iOS: Xcode (macOS only)

## Quick Start

### 1. Build for Mobile
```bash
# Run the mobile build script
./build-mobile.sh

# Or manually:
npm run build
npx cap copy
npx cap sync
```

### 2. Open in IDE
```bash
# For Android development
npx cap open android

# For iOS development  
npx cap open ios
```

### 3. Run on Device
```bash
# Run on Android device/emulator
npx cap run android

# Run on iOS device/simulator
npx cap run ios
```

## Configuration

### App Details
- **App ID**: com.yum.delivery
- **App Name**: Yum
- **Bundle**: Located in `dist/public` after build

### Plugins Configured
- **Splash Screen**: 2-second duration with Yum red branding
- **Status Bar**: Light content with red background
- **App**: Basic app lifecycle management
- **Haptics**: Touch feedback support
- **Keyboard**: Keyboard behavior management

### Mobile Optimizations
- Viewport meta tags configured for mobile
- Theme color set to Yum red (#E53E3E)
- Touch-friendly UI with proper scaling
- Status bar styled to match app branding

## Development Workflow

1. **Make Changes**: Edit React components as usual
2. **Test in Browser**: Use `npm run dev` for quick iteration
3. **Build for Mobile**: Run `./build-mobile.sh` when ready to test on device
4. **Test on Device**: Use `npx cap run android/ios` to test on actual devices

## File Structure
```
/
├── android/           # Android native project
├── ios/              # iOS native project  
├── capacitor.config.ts # Capacitor configuration
├── build-mobile.sh   # Mobile build script
└── dist/public/      # Built web assets (after npm run build)
```

## Troubleshooting

### Common Issues
- **Missing dist/public**: Run `npm run build` first
- **Plugins not syncing**: Run `npx cap sync` after changes
- **Android build errors**: Ensure Android SDK is properly configured
- **iOS build errors**: Ensure Xcode command line tools are installed

### Useful Commands
```bash
# Check Capacitor status
npx cap doctor

# Clean and rebuild
npx cap sync --deployment

# View device logs
npx cap run android --list  # List devices
npx cap run ios --list      # List simulators
```