import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'account-circle',
      onPress: () => navigation.navigate('PersonalInformation'),
    },
    {
      title: 'Diet Preferences',
      icon: 'food-apple',
      onPress: () => navigation.navigate('DietPreferences'),
    },
    {
      title: 'Health Goals',
      icon: 'target',
      onPress: () => {},
    },
    {
      title: 'Notifications',
      icon: 'bell',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.gradient.start }]}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.card }]}>
              <Icon name="account" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
            <Text style={[styles.email, { color: colors.text }]}>john.doe@example.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.themeToggle, { backgroundColor: colors.card }]}>
            <View style={styles.themeToggleLeft}>
              <Icon 
                name={theme === 'dark' ? 'moon-waning-crescent' : 'white-balance-sunny'} 
                size={24} 
                color={colors.text} 
              />
              <Text style={[styles.themeToggleText, { color: colors.text }]}>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={theme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.card }]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.text} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.primary }]}
            onPress={() => {}}
          >
            <Icon name="logout" size={24} color="#FFFFFF" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
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
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
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
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  themeToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 16,
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen; 