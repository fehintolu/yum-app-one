#!/bin/bash

# Yum APK Generation Script
echo "🚀 Generating APK for Yum Food Delivery App"

# Set Java environment
export JAVA_HOME=/nix/store/2vwkssqpzykk37r996cafq7x63imf4sp-openjdk-21+35
echo "📍 Java version: $(java -version 2>&1 | head -n 1)"

# Step 1: Build web application
echo "📦 Building web application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Web build failed"
    exit 1
fi

# Step 2: Copy to Capacitor
echo "📱 Copying to Android platform..."
npx cap copy android
npx cap sync android

# Step 3: Generate APK
echo "🔨 Generating APK (this may take several minutes for first build)..."
cd android

# Create gradlew executable if needed
chmod +x gradlew

# Build debug APK with optimizations for Replit environment
./gradlew assembleDebug --no-daemon --parallel --stacktrace

if [ $? -eq 0 ]; then
    echo "✅ APK generated successfully!"
    echo "📍 Location: android/app/build/outputs/apk/debug/app-debug.apk"
    
    # Check if APK exists and show file info
    if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
        ls -lh app/build/outputs/apk/debug/app-debug.apk
        echo "🎉 APK ready for installation!"
    else
        echo "⚠️  APK file not found in expected location"
        find . -name "*.apk" -type f
    fi
else
    echo "❌ APK generation failed"
    echo "💡 Try running the command manually or check the logs above"
    exit 1
fi