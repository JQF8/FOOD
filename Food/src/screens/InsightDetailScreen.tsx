import React from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { insights } from '../data/insights';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../navigation/types';

export default function InsightDetailScreen({ route }: RootStackScreenProps<'InsightDetail'>) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  const insight = insights.find(i => i.id === route.params.id);

  if (!insight) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Insight not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Food & Mood</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Image 
          source={{ uri: insight.thumbUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={[styles.articleTitle, { color: colors.text }]}>
            {insight.title}
          </Text>

          <View style={styles.tags}>
            {insight.moodTags.map(tag => (
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

          <Text style={[styles.summary, { color: colors.text }]}>
            {insight.summary}
          </Text>

          <Pressable
            style={[styles.paperLink, { backgroundColor: colors.primary }]}
            onPress={() => Linking.openURL(insight.paperUrl)}
          >
            <Text style={styles.paperLinkText}>Read Research Paper</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 20,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    lineHeight: 32,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  paperLink: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  paperLinkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
}); 