import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [healthSync, setHealthSync] = React.useState(true);

  const settings = [
    {
      title: 'Notifications',
      icon: 'bell-outline',
      type: 'switch',
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      title: 'Health Data Sync',
      icon: 'sync',
      type: 'switch',
      value: healthSync,
      onValueChange: setHealthSync,
    },
    {
      title: 'Wellness Goals',
      icon: 'target',
      type: 'link',
    },
    {
      title: 'Dietary Preferences',
      icon: 'food-apple-outline',
      type: 'link',
    },
    {
      title: 'Privacy Settings',
      icon: 'shield-account',
      type: 'link',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.gradient.start }]}>
          <View style={[styles.profileImage, { backgroundColor: colors.card }]}>
            <Icon name="account" size={40} color={colors.text} />
          </View>
          <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
          <Text style={[styles.email, { color: colors.text }]}>john.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          {settings.map((setting, index) => (
            <TouchableOpacity key={index} style={[styles.settingCard, { backgroundColor: colors.card }]}>
              <View style={styles.settingInfo}>
                <Icon name={setting.icon} size={24} color={colors.primary} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>{setting.title}</Text>
              </View>
              {setting.type === 'switch' ? (
                <Switch
                  value={setting.value}
                  onValueChange={setting.onValueChange}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={setting.value ? colors.text : colors.background}
                />
              ) : (
                <Icon name="chevron-right" size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingInfo}>
              <Icon name="information-outline" size={24} color={colors.primary} />
              <Text style={[styles.settingTitle, { color: colors.text }]}>App Version</Text>
            </View>
            <Text style={[styles.version, { color: colors.text }]}>1.0.0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingInfo}>
              <Icon name="file-document-outline" size={24} color={colors.primary} />
              <Text style={[styles.settingTitle, { color: colors.text }]}>Terms of Service</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingInfo}>
              <Icon name="shield-check-outline" size={24} color={colors.primary} />
              <Text style={[styles.settingTitle, { color: colors.text }]}>Privacy Policy</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.card }]}>
          <Icon name="logout" size={24} color={colors.primary} />
          <Text style={[styles.logoutText, { color: colors.primary }]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 15,
  },
  version: {
    fontSize: 14,
    opacity: 0.8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen; 