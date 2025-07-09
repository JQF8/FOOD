# Food & Wellness App

## Project Overview
This React Native application helps users track their food intake, monitor their wellness metrics, and receive personalized recommendations for improving their health and nutrition. The app features a modern, intuitive interface with dark/light theme support and comprehensive tracking capabilities.

## Primary Persona
The app is designed for health-conscious individuals who want to maintain a balanced lifestyle while managing their nutrition and wellness. The primary persona is:

- **Age Range**: 25-45 years old
- **Goals**: 
  - Maintain a healthy weight
  - Improve overall wellness
  - Track nutrition and exercise
  - Get personalized food recommendations
- **Context**:
  - Busy professionals with limited time for meal planning
  - Health-conscious individuals seeking data-driven insights
  - People looking to make informed decisions about their diet
  - Users who want to track their progress over time

## Features 

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

This will start the Expo development server using a tunnel connection, which helps avoid network connectivity issues.

### Troubleshooting Connection Issues

If you encounter connection issues:

1. **iOS Devices:**
   - Ensure you've granted Local Network permissions when prompted
   - If not prompted, go to Settings > Privacy > Local Network and enable it for the Expo Go app

2. **Android Devices:**
   - Make sure your device is on the same network as your development machine
   - Try using the tunnel connection by running: `expo start --tunnel`

3. **General Issues:**
   - If the app fails to connect, try these steps:
     1. Close the Expo Go app
     2. Stop the development server (Ctrl+C)
     3. Clear the Metro bundler cache: `npm start -- --reset-cache`
     4. Restart the development server: `npm start`

### Development Notes

- The app uses tunnel connection by default to avoid network issues
- iOS users will be prompted for Local Network permissions
- For the best development experience, ensure your device and development machine are on the same network 