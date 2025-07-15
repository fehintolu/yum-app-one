# Generating APK for Yum Food Delivery App

## Quick APK Generation

### Method 1: Using Gradle (Recommended)
```bash
# Set Java environment
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))

# Build debug APK
cd android
./gradlew assembleDebug

# The APK will be generated at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Method 2: Using Capacitor CLI
```bash
# Build and copy to Android
npm run build
npx cap copy android
npx cap sync android

# Open in Android Studio to build APK
npx cap open android
```

## APK Generation Steps

1. **Prepare the build**:
   ```bash
   # Build web assets
   npm run build
   
   # Copy to Capacitor
   npx cap copy
   npx cap sync
   ```

2. **Generate debug APK**:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

3. **Generate release APK** (for production):
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## APK Output Locations

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## APK Signing (for Release)

For a production APK, you'll need to sign it:

1. **Generate a keystore**:
   ```bash
   keytool -genkey -v -keystore yum-release-key.keystore -alias yum-key -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in `android/app/build.gradle`**:
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('../../yum-release-key.keystore')
               storePassword 'your-store-password'
               keyAlias 'yum-key'
               keyPassword 'your-key-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

3. **Build signed release APK**:
   ```bash
   ./gradlew assembleRelease
   ```

## Troubleshooting

### Common Issues:
- **Java not found**: Install JDK and set JAVA_HOME
- **Gradle download slow**: First build downloads dependencies (normal)
- **Build failures**: Check Android SDK requirements

### Requirements:
- Java JDK 8 or higher
- Android SDK (if using Android Studio)
- At least 2GB free space for build

## Alternative: Android App Bundle (AAB)

For Google Play Store, generate an AAB instead:
```bash
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`