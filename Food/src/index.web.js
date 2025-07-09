import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import App from './App';

// Register the app
registerRootComponent(App);

// Add web-specific styles
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    #root {
      display: flex;
      flex: 1;
      height: 100vh;
    }
  `;
  document.head.appendChild(style);
} 