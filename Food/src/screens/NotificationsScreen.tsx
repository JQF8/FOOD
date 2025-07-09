import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../components/Icon';
import { useProfile } from '../hooks/useProfile';

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Notifications: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NotificationsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { profile, updateProfile } = useProfile();

  const notificationSettings = [
    {
      id: 'darkMode',
      label: 'Dark Mode Reminders',
      description: 'Notify me when Dark Mode is available',
    },
    {
      id: 'energyMode',
      label: 'Energy Mode Alerts',
      description: 'Alert me when Energy Mode is suggested',
    },
    {
      id: 'dailySummary',
      label: 'Daily Summary',
      description: 'Get a daily summary of your activities',
    },
    {
      id: 'mealTracking',
      label: 'Meal Tracking',
      description: 'Reminders to track your meals',
    },
  ];

  const handleToggle = async (id: string, value: boolean) => {
    try {
      await updateProfile({
        notifications: {
          darkMode: profile.notifications?.darkMode ?? false,
          energyMode: profile.notifications?.energyMode ?? false,
          dailySummary: profile.notifications?.dailySummary ?? false,
          mealTracking: profile.notifications?.mealTracking ?? false,
          [id]: value,
        },
      });
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        {notificationSettings.map((setting) => (
          <View 
            key={setting.id}
            style={[styles.settingCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.settingContent}>
              <View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {setting.label}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.text }]}>
                  {setting.description}
                </Text>
              </View>
              <Switch
                value={profile.notifications?.[setting.id as keyof typeof profile.notifications] ?? false}
                onValueChange={(value) => handleToggle(setting.id, value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export default NotificationsScreen; 