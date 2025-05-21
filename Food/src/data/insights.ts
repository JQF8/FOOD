export interface Insight {
  id: string;
  title: string;
  thumbUrl: string;
  paperUrl: string;
  moodTags: string[];
  summary: string;
}

export const insights: Insight[] = [
  {
    id: 'omega3_mood',
    title: 'Omega-3s are linked to lower depression scores',
    thumbUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60',
    paperUrl: 'https://pubmed.ncbi.nlm.nih.gov/31269543/',
    moodTags: ['stressed', 'tired'],
    summary: 'EPA-rich fish oil was associated with 20% lower PHQ-9 in a 12-wk RCT.',
  },
  {
    id: 'probiotics_anxiety',
    title: 'Gut-brain axis: Probiotics may reduce anxiety',
    thumbUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60',
    paperUrl: 'https://pubmed.ncbi.nlm.nih.gov/29920041/',
    moodTags: ['stressed'],
    summary: 'Meta-analysis shows probiotics significantly reduce anxiety symptoms.',
  },
  {
    id: 'vitamin_d_mood',
    title: 'Vitamin D supplementation improves mood',
    thumbUrl: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=500&auto=format&fit=crop&q=60',
    paperUrl: 'https://pubmed.ncbi.nlm.nih.gov/30246883/',
    moodTags: ['tired', 'soso'],
    summary: 'Vitamin D3 supplementation linked to improved mood in deficient individuals.',
  },
  {
    id: 'mediterranean_diet',
    title: 'Mediterranean diet reduces depression risk',
    thumbUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    paperUrl: 'https://pubmed.ncbi.nlm.nih.gov/29997636/',
    moodTags: ['happy', 'soso'],
    summary: 'Adherence to Mediterranean diet associated with 33% lower depression risk.',
  },
  {
    id: 'magnesium_stress',
    title: 'Magnesium reduces stress and anxiety',
    thumbUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&auto=format&fit=crop&q=60',
    paperUrl: 'https://pubmed.ncbi.nlm.nih.gov/27910808/',
    moodTags: ['stressed'],
    summary: 'Magnesium supplementation shows promise in reducing stress and anxiety.',
  },
  {
    id: 'protein_mood',
    title: 'High-protein breakfast improves mood',
    thumbUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=500&auto=format&fit=crop&q=60',
    paperUrl: 'https://pubmed.ncbi.nlm.nih.gov/29510383/',
    moodTags: ['tired', 'soso'],
    summary: 'Protein-rich breakfast associated with better mood and cognitive function.',
  }
]; 