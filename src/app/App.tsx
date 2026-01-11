import { useState } from 'react';
import { HomeDashboard } from './components/HomeDashboard';
import { JournalEntryScreen } from './components/JournalEntryScreen';
import { WeeklySummaryScreen } from './components/WeeklySummaryScreen';

type Screen = 'home' | 'newEntry' | 'weeklySummary';

export interface JournalEntry {
  id: number;
  date: string;
  text: string;
  themes: string[];
  sentiment: number;
  sentimentColor: string;
  themeColors: string[];
  emoji?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: 'April 20, 2024',
      text: 'Today I went on a morning walk through the park and noticed how the cherry blossoms were in full bloom. It reminded me to slow down and appreciate the simple beauty around us. These small moments of mindfulness help me stay grounded.',
      themes: ['nature', 'mindfulness'],
      sentiment: 0.9,
      sentimentColor: '#F15BB5',
      themeColors: ['#F15BB5', '#FF6F59'],
      emoji: 'grateful'
    },
    {
      id: 2,
      date: 'April 18, 2024',
      text: 'Had a wonderful conversation with my sister about our childhood memories. It made me realize how important family connections are, especially as we get older. We laughed about the silly things we used to do together.',
      themes: ['family', 'gratitude'],
      sentiment: 0.95,
      sentimentColor: '#FEE440',
      themeColors: ['#FEE440', '#FF6F59'],
      emoji: 'happy'
    },
    {
      id: 3,
      date: 'April 15, 2024',
      text: 'Finally finished that project I\'ve been working on for weeks. The sense of accomplishment is incredible. It\'s a good reminder that consistent effort pays off, even when progress feels slow.',
      themes: ['productivity', 'achievement'],
      sentiment: 0.85,
      sentimentColor: '#FF6F59',
      themeColors: ['#FF6F59', '#F15BB5'],
      emoji: 'inspired'
    }
  ]);

  const handleNewEntry = () => {
    setCurrentScreen('newEntry');
  };

  const handleViewSummary = () => {
    setCurrentScreen('weeklySummary');
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const handleSaveEntry = (entryText: string, selectedEmoji: string | null) => {
    // Generate themes based on keywords (simple implementation)
    const themeKeywords: Record<string, string[]> = {
      nature: ['park', 'garden', 'flowers', 'trees', 'outside', 'walk', 'nature'],
      productivity: ['finished', 'completed', 'work', 'project', 'achievement', 'done'],
      family: ['family', 'sister', 'brother', 'mother', 'father', 'parents'],
      mindfulness: ['mindful', 'calm', 'peace', 'present', 'meditation', 'slow down'],
      gratitude: ['grateful', 'thankful', 'appreciate', 'blessed', 'grateful'],
      creativity: ['creative', 'art', 'design', 'made', 'created'],
    };

    const detectedThemes: string[] = [];
    const lowerText = entryText.toLowerCase();
    
    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        detectedThemes.push(theme);
      }
    });

    // Default theme if none detected
    if (detectedThemes.length === 0) {
      detectedThemes.push('reflection');
    }

    // Assign sentiment and colors based on emoji
    const emojiConfig: Record<string, { sentiment: number; color: string }> = {
      happy: { sentiment: 0.95, color: '#FEE440' },
      peaceful: { sentiment: 0.85, color: '#9B5DE5' },
      sad: { sentiment: 0.4, color: '#6B6B6B' },
      grateful: { sentiment: 0.9, color: '#F15BB5' },
      inspired: { sentiment: 0.88, color: '#FF6F59' },
      passionate: { sentiment: 0.92, color: '#FF6F59' }
    };

    const config = selectedEmoji ? emojiConfig[selectedEmoji] : { sentiment: 0.75, color: '#9B5DE5' };
    
    // Assign warm colors to themes
    const warmColors = ['#F15BB5', '#FF6F59', '#FEE440'];
    const themeColors = detectedThemes.map((_, idx) => warmColors[idx % warmColors.length]);

    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: entryText,
      themes: detectedThemes.slice(0, 3), // Max 3 themes
      sentiment: config.sentiment,
      sentimentColor: config.color,
      themeColors: themeColors.slice(0, detectedThemes.length),
      emoji: selectedEmoji || undefined
    };

    setEntries([newEntry, ...entries]);
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomeDashboard
          entries={entries}
          onNewEntry={handleNewEntry}
          onViewSummary={handleViewSummary}
        />
      )}
      {currentScreen === 'newEntry' && (
        <JournalEntryScreen
          onBack={handleBack}
          onSave={handleSaveEntry}
        />
      )}
      {currentScreen === 'weeklySummary' && (
        <WeeklySummaryScreen onBack={handleBack} />
      )}
    </>
  );
}