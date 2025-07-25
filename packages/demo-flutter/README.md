# Flutter Demo

This is a Flutter demo app showcasing the Bitcoin UI Kit components. It replicates the functionality of the React and Svelte demos with a native Flutter implementation.

## Prerequisites

Before running this demo, you need to install Flutter on your macOS system:

### 1. Install Flutter

```bash
# Install Flutter using Homebrew
brew install --cask flutter

# Verify installation
flutter doctor
```

### 2. Install Xcode (for iOS development)

If you want to run on iOS simulator:
```bash
# Install Xcode from the App Store or download from Apple Developer
xcode-select --install
```

### 3. Install Android Studio (for Android development)

If you want to run on Android emulator:
1. Download and install Android Studio from https://developer.android.com/studio
2. Install Android SDK and create an emulator

## Running the Demo

### 1. Get Flutter dependencies

```bash
cd packages/demo-flutter
flutter pub get
```

### 2. Run the app

**For iOS Simulator:**
```bash
flutter run -d ios
```

**For Android Emulator:**
```bash
flutter run -d android
```

**For Chrome (Web):**
```bash
flutter run -d chrome
```

**For macOS Desktop:**
```bash
flutter run -d macos
```

### 3. Available devices

To see all available devices:
```bash
flutter devices
```

## Features

- **Theme Toggle**: Tap the sun/moon icon in the top-right corner to switch between light and dark themes
- **Custom Buttons**: Demonstrates filled and outline button styles
- **Responsive Design**: Adapts to different screen sizes
- **Material Design**: Uses Flutter's Material Design components with custom styling

## Project Structure

```
lib/
├── main.dart          # App entry point
├── app.dart           # Main Bitcoin Wallet page
└── widgets/
    └── bui_button.dart # Custom button component
```

## Development

To make changes to the demo:

1. Edit the files in the `lib/` directory
2. Save the files
3. The app will hot-reload automatically (if running with `flutter run`)

## Troubleshooting

If you encounter issues:

1. **Flutter not found**: Make sure Flutter is installed and in your PATH
2. **No devices available**: Run `flutter doctor` to check your setup
3. **Dependencies issues**: Run `flutter clean` then `flutter pub get`

For more help, visit the [Flutter documentation](https://flutter.dev/docs). 