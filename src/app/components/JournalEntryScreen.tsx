import { ArrowLeft, Smile, Meh, Frown, Heart, Star, Flame, Cloud } from 'lucide-react';
import { useState } from 'react';

interface JournalEntryScreenProps {
  onBack: () => void;
  onSave: (entryText: string, selectedEmoji: string | null) => void;
}

export function JournalEntryScreen({ onBack, onSave }: JournalEntryScreenProps) {
  const [entryText, setEntryText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const emojis = [
    { id: 'happy', icon: Smile, label: 'Happy', color: '#FEE440' },
    { id: 'peaceful', icon: Cloud, label: 'Peaceful', color: '#9B5DE5' },
    { id: 'sad', icon: Frown, label: 'Sad', color: '#6B6B6B' },
    { id: 'grateful', icon: Heart, label: 'Grateful', color: '#F15BB5' },
    { id: 'inspired', icon: Star, label: 'Inspired', color: '#FF6F59' },
    { id: 'passionate', icon: Flame, label: 'Passionate', color: '#FF6F59' }
  ];

  const handleSave = () => {
    if (entryText.trim()) {
      onSave(entryText, selectedEmoji);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F6] px-6 py-8 font-['Inter',sans-serif]">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-32 left-10 w-28 h-28 bg-[#FF6F59] rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-36 h-36 bg-[#F15BB5] rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#FEE440] rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="text-[#9B5DE5] hover:text-[#7d3cc7] transition-colors mr-4 bg-white p-2 rounded-full shadow-md"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-semibold text-[#2F2F2F]">New Entry</h1>
        </div>

        {/* Text Area */}
        <div className="bg-gradient-to-br from-white to-[#fef5fb] rounded-3xl p-6 mb-6 shadow-lg border border-[#F15BB5]/10">
          <textarea
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full h-96 bg-transparent text-[#2F2F2F] placeholder:text-[#6B6B6B] placeholder:italic outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Sentiment Emojis */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-purple-100/50">
          <p className="text-sm font-medium text-[#6B6B6B] mb-5 text-center">How are you feeling?</p>
          <div className="grid grid-cols-3 gap-3">
            {emojis.map((emoji) => {
              const Icon = emoji.icon;
              const isSelected = selectedEmoji === emoji.id;
              return (
                <button
                  key={emoji.id}
                  onClick={() => setSelectedEmoji(emoji.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all transform ${
                    isSelected
                      ? 'scale-105 shadow-lg'
                      : 'hover:scale-105 shadow-md'
                  }`}
                  style={{
                    backgroundColor: isSelected ? emoji.color : '#FFF0F6',
                    color: isSelected ? 'white' : '#6B6B6B'
                  }}
                  title={emoji.label}
                >
                  <Icon className="w-7 h-7" />
                  <span className="text-xs font-medium">{emoji.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#F15BB5] to-[#FF6F59] hover:from-[#e04aa4] hover:to-[#ee5e48] text-white font-medium px-10 py-5 rounded-3xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}