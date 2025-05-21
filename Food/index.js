// must be first for gesture-handler
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';
import App from './src/App';

// Enable screens for better performance
enableScreens();

// Register the app
registerRootComponent(App); 