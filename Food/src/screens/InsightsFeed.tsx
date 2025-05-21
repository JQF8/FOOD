import React from 'react';
import { FlatList, Image, Text, Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { insights } from '../data/insights';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsFeed() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Food & Mood Insights</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={insights}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('InsightDetail', { id: item.id })}
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <Image 
              source={{ uri: item.thumbUrl }} 
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text 
                numberOfLines={2} 
                style={[styles.title, { color: colors.text }]}
              >
                {item.title}
              </Text>
              <Text 
                numberOfLines={2} 
                style={[styles.summary, { color: colors.text + '80' }]}
              >
                {item.summary}
              </Text>
              <View style={styles.tags}>
                {item.moodTags.map(tag => (
                  <View 
                    key={tag} 
                    style={[styles.tag, { backgroundColor: colors.primary + '20' }]}
                  >
                    <Text style={[styles.tagText, { color: colors.primary }]}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  list: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 