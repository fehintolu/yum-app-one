#!/bin/bash

# Yum Mobile App Build Script
# This script builds the web app and copies it to Capacitor for mobile deployment

echo "🏗️  Building Yum for mobile deployment..."

# Build the web application
echo "📦 Building web application..."
npm run build

# Copy web assets to Capacitor
echo "📱 Copying to mobile platforms..."
npx cap copy

# Sync Capacitor plugins and configuration
echo "🔄 Syncing Capacitor..."
npx cap sync

echo "✅ Mobile build complete!"
echo ""
echo "Next steps:"
echo "  - For Android: npx cap open android"
echo "  - For iOS: npx cap open ios"
echo "  - To run on device: npx cap run android or npx cap run ios"