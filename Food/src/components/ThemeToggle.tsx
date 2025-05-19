import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [rotation] = React.useState(new Animated.Value(0));

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      toggleTheme();
      rotation.setValue(0);
    });
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Icon
          name={theme === 'light' ? 'moon-waning-crescent' : 'white-balance-sunny'}
          size={24}
          color={colors.text}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
  },
}); 