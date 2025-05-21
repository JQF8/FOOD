import { useMemo } from 'react';
import { Platform, NativeModules } from 'react-native';

export function useLocalization() {
  const isMetric = useMemo(() => {
    try {
      // For iOS, we can use the native module
      if (Platform.OS === 'ios') {
        return NativeModules.SettingsManager.settings.AppleLocale === 'en_US' ? false : true;
      }
      // For Android, we can use the native module
      if (Platform.OS === 'android') {
        return NativeModules.I18nManager.isRTL ? false : true;
      }
      // Default to metric
      return true;
    } catch (_e) {
      return true; // default to metric if unknown
    }
  }, []);

  return {
    isMetric,
  };
} 