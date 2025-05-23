import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ResearchPaper } from '../types/research';

type ResearchListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ResearchList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<ResearchListNavigationProp>();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);

  useEffect(() => {
    fetchAllPapers();
  }, []);

  const fetchAllPapers = async () => {
    // TODO: Replace with actual API call
    // For now, using mock data
    setPapers([
      {
        id: '1',
        title: 'The Impact of Mediterranean Diet on Mental Health: A Systematic Review',
        authors: 'Smith, J., Johnson, A.',
        journal: 'Journal of Nutritional Psychology',
        summary: 'This study examines the correlation between Mediterranean diet adherence and reduced symptoms of depression and anxiety.',
        url: 'https://example.com/paper1',
        thumbnailUrl: 'https://example.com/thumb1.jpg',
        moodTags: ['stressed', 'anxiety'],
      },
      {
        id: '2',
        title: 'Gut Microbiome and Mood Regulation: New Insights from Longitudinal Studies',
        authors: 'Brown, M., Davis, R.',
        journal: 'Nature Neuroscience',
        summary: 'Recent findings suggest a strong connection between gut microbiota diversity and emotional well-being.',
        url: 'https://example.com/paper2',
        thumbnailUrl: 'https://example.com/thumb2.jpg',
        moodTags: ['tired', 'depression'],
      },
      {
        id: '3',
        title: 'Omega-3 Fatty Acids and Cognitive Function in Young Adults',
        authors: 'Wilson, P., Taylor, S.',
        journal: 'Brain Research',
        summary: 'Investigating the effects of omega-3 supplementation on cognitive performance and mood stability.',
        url: 'https://example.com/paper3',
        thumbnailUrl: 'https://example.com/thumb3.jpg',
        moodTags: ['focus', 'energy'],
      },
    ]);
  };

  const renderPaper = ({ item: paper }: { item: ResearchPaper }) => (
    <TouchableOpacity
      style={[styles.paperCard, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('ResearchDetail', { paper })}
    >
      <Image
        source={{ uri: paper.thumbnailUrl }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text 
          style={[styles.title, { color: colors.text }]} 
          numberOfLines={2}
        >
          {paper.title}
        </Text>
        <Text style={[styles.meta, { color: colors.text, opacity: 0.7 }]}>
          {paper.authors} • {paper.journal}
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
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={papers}
        renderItem={renderPaper}
        keyExtractor={(paper) => paper.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  paperCard: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
  },
});

export default ResearchList; 