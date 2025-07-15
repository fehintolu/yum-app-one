# Quick APK Generation Guide for Yum App

## Current Status
Your Yum app is ready for APK generation. The initial build may take 5-15 minutes as Gradle downloads Android build tools and dependencies.

## Option 1: Use the automated script
```bash
./generate-apk.sh
```

## Option 2: Manual step-by-step
```bash
# 1. Set Java environment
export JAVA_HOME=/nix/store/2vwkssqpzykk37r996cafq7x63imf4sp-openjdk-21+35

# 2. Build web app
npm run build

# 3. Copy to Android
npx cap copy android
npx cap sync android

# 4. Generate APK
cd android
./gradlew assembleDebug
```

## Expected APK Location
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## What happens during APK generation:
1. **Web Build** (30 seconds): Compiles React app to production files
2. **Capacitor Copy** (10 seconds): Moves web files to Android project
3. **Gradle Build** (5-15 minutes): Downloads dependencies and builds APK
4. **APK Output**: Creates installable `.apk` file

## Installation on Android Device
Once you have the APK:
1. Enable "Unknown Sources" in Android Settings > Security
2. Transfer APK to your device
3. Open the APK file to install
4. Grant necessary permissions

## File Size
Expected APK size: ~15-25 MB (includes your app + Android runtime)

## Troubleshooting
- **"JAVA_HOME not set"**: Java is installed, just run the export command
- **Build timeout**: Normal for first build, let it complete
- **Permission denied**: Run `chmod +x android/gradlew`
- **Out of space**: Free up at least 2GB for build cache

The APK generation process is currently running in the background and may take several minutes to complete.