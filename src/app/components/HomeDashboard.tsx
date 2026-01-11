import { Plus, Sparkles } from 'lucide-react';
import { JournalEntry } from '../App';

interface HomeDashboardProps {
  entries: JournalEntry[];
  onNewEntry: () => void;
  onViewSummary: () => void;
}

export function HomeDashboard({ entries, onNewEntry, onViewSummary }: HomeDashboardProps) {
  return (
    <div className="min-h-screen bg-[#FFF0F6] px-6 py-8 font-['Inter',sans-serif]">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#F15BB5] rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-[#9B5DE5] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#FEE440] rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold text-[#2F2F2F]">Journal</h1>
            <Sparkles className="w-6 h-6 text-[#F15BB5]" />
          </div>
          <button
            onClick={onViewSummary}
            className="text-sm font-medium text-[#9B5DE5] hover:text-[#7d3cc7] transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
          >
            Weekly Summary
          </button>
        </div>

        {/* Prompt Box */}
        <div className="bg-gradient-to-br from-white to-[#fef5fb] rounded-3xl p-6 mb-6 shadow-lg border border-[#F15BB5]/10">
          <input
            type="text"
            placeholder="Write about something that inspired you today"
            className="w-full bg-transparent text-[#2F2F2F] placeholder:text-[#6B6B6B] placeholder:italic outline-none"
            readOnly
          />
        </div>

        {/* New Entry Button */}
        <button
          onClick={onNewEntry}
          className="w-full bg-gradient-to-r from-[#9B5DE5] to-[#7d3cc7] hover:from-[#8a4dd4] hover:to-[#6c2fb6] text-white font-medium py-5 rounded-3xl mb-10 flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <Plus className="w-6 h-6" />
          New Entry
        </button>

        {/* Past Entries Section */}
        <div>
          <h2 className="text-2xl font-semibold text-[#2F2F2F] mb-6">Past Entries</h2>
          <div className="space-y-5">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all transform hover:scale-[1.01] border border-purple-100/50"
              >
                <p className="text-sm font-medium text-[#6B6B6B] mb-3">{entry.date}</p>
                <p className="text-[#2F2F2F] leading-relaxed mb-4 line-clamp-3">{entry.text}</p>
                
                {/* Themes */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.themes.map((theme, index) => (
                    <span
                      key={theme}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: entry.themeColors[index],
                        color: 'white'
                      }}
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                {/* Sentiment Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#6B6B6B]">Sentiment</p>
                    <p className="text-xs font-medium text-[#2F2F2F]">
                      {Math.round(entry.sentiment * 100)}%
                    </p>
                  </div>
                  <div className="w-full h-2 bg-gradient-to-r from-[#FFF0F6] to-[#fef5fb] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${entry.sentiment * 100}%`,
                        background: `linear-gradient(to right, ${entry.sentimentColor}, ${entry.sentimentColor}dd)`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}