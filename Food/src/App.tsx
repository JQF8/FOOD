import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { MoodProvider } from './context/MoodContext';
import Navigation from './navigation';
import { ProfileProvider } from './context/ProfileContext';
import { AppRegistry } from 'react-native';
import { UIKittenProvider } from './providers/UIKittenProvider';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <MoodProvider>
            <ProfileProvider>
              <UIKittenProvider>
                <Navigation />
              </UIKittenProvider>
            </ProfileProvider>
          </MoodProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App; 