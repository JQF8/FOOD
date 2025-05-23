import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  summary: string;
  url: string;
  thumbnailUrl: string;
  moodTags: string[];
}

type ResearchInsightsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ResearchInsights: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<ResearchInsightsNavigationProp>();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);

  useEffect(() => {
    fetchLatestPapers();
    // Set up daily refresh at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const refreshTimer = setTimeout(() => {
      fetchLatestPapers();
    }, timeUntilMidnight);

    return () => clearTimeout(refreshTimer);
  }, []);

  const fetchLatestPapers = async () => {
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

  const handlePaperPress = (paper: ResearchPaper) => {
    navigation.navigate('ResearchDetail', { paper });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Food & Mood Insights</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ResearchList')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>See all ›</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {papers.map((paper) => (
          <TouchableOpacity
            key={paper.id}
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => handlePaperPress(paper)}
          >
            <Image
              source={{ uri: paper.thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text 
                style={[styles.paperTitle, { color: colors.text }]} 
                numberOfLines={2}
              >
                {paper.title}
              </Text>
              <View style={styles.tagsContainer}>
                {paper.moodTags.slice(0, 2).map((tag, index) => (
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
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
  },
  carousel: {
    paddingHorizontal: 16,
  },
  card: {
    width: 160,
    height: 180,
    marginRight: 12,
    borderRadius: 8,
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
    width: 160,
    height: 100,
  },
  cardContent: {
    padding: 8,
  },
  paperTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
  },
}); 