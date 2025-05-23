import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type ResearchDetailRouteProp = RouteProp<RootStackParamList, 'ResearchDetail'>;

const ResearchDetail = () => {
  const { colors } = useTheme();
  const route = useRoute<ResearchDetailRouteProp>();
  const { paper } = route.params;

  const handleReadFullPaper = () => {
    Linking.openURL(paper.url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: paper.thumbnailUrl }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{paper.title}</Text>
        
        <Text style={[styles.meta, { color: colors.text, opacity: 0.7 }]}>
          {paper.authors}
        </Text>
        <Text style={[styles.meta, { color: colors.text, opacity: 0.7 }]}>
          {paper.journal}
        </Text>

        <View style={styles.tagsContainer}>
          {paper.moodTags.map((tag, index) => (
            <View 
              key={index} 
              style={[styles.tag, { backgroundColor: colors.border }]}
            >
              <Text style={[styles.tagText, { color: colors.text }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.summary, { color: colors.text }]}>
          {paper.summary}
        </Text>

        <TouchableOpacity 
          style={[styles.readButton, { backgroundColor: colors.primary }]}
          onPress={handleReadFullPaper}
        >
          <Text style={styles.readButtonText}>Read full paper</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  meta: {
    fontSize: 16,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 16,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  readButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  readButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResearchDetail; 