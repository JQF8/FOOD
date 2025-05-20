import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './context/ThemeContext';
import { MoodProvider } from './context/MoodContext';
import Navigation from './navigation';

const App = () => {
  return (
    <MoodProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </MoodProvider>
  );
};

export default App; 