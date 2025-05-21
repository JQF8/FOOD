import React from 'react';
import { FlatList, Image, Text, Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { insights } from '../data/insights';

export default function InsightsCarousel() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <FlatList
      data={insights.slice(0, 5)}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      style={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  separator: {
    width: 12,
  },
  card: {
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 