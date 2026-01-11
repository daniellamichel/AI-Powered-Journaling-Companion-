import { ArrowLeft, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklySummaryScreenProps {
  onBack: () => void;
}

export function WeeklySummaryScreen({ onBack }: WeeklySummaryScreenProps) {
  const topThemes = [
    { name: 'nature', count: 5, color: '#9B5DE5' },
    { name: 'productivity', count: 4, color: '#FF6F59' },
    { name: 'family', count: 3, color: '#F15BB5' },
    { name: 'mindfulness', count: 3, color: '#FEE440' },
    { name: 'gratitude', count: 2, color: '#9B5DE5' }
  ];

  const sentimentData = [
    { day: 'Mon', sentiment: 7 },
    { day: 'Tue', sentiment: 8 },
    { day: 'Wed', sentiment: 6 },
    { day: 'Thu', sentiment: 9 },
    { day: 'Fri', sentiment: 8 },
    { day: 'Sat', sentiment: 9 },
    { day: 'Sun', sentiment: 7 }
  ];

  return (
    <div className="min-h-screen bg-[#FFF0F6] px-6 py-8 font-['Inter',sans-serif]">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-[#F15BB5] rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-[#9B5DE5] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-28 h-28 bg-[#FF6F59] rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center mb-2">
          <button
            onClick={onBack}
            className="text-[#9B5DE5] hover:text-[#7d3cc7] transition-colors mr-4 bg-white p-2 rounded-full shadow-md"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-semibold text-[#2F2F2F]">Weekly Summary</h1>
          </div>
        </div>
        <p className="text-[#6B6B6B] ml-14 mb-8 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#F15BB5]" />
          Week of April 14, 2024
        </p>

        {/* Summary Text */}
        <div className="bg-gradient-to-br from-white to-[#fef5fb] rounded-3xl p-6 mb-6 shadow-lg border border-[#9B5DE5]/10">
          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-[#9B5DE5] to-[#F15BB5] rounded-full"></span>
            This Week's Reflection
          </h2>
          <p className="text-[#2F2F2F] leading-relaxed">
            This week you explored themes of nature and mindfulness, taking time to appreciate
            the world around you. Your focus on productivity and personal achievements shows
            growth, while maintaining strong connections with family. Overall, it was a balanced
            week with consistent positive sentiment.
          </p>
        </div>

        {/* Top Themes */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-purple-100/50">
          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-[#F15BB5] to-[#FF6F59] rounded-full"></span>
            Top Themes
          </h2>
          <div className="flex flex-wrap gap-3">
            {topThemes.map((theme) => (
              <div
                key={theme.name}
                className="px-5 py-3 rounded-full shadow-md transform hover:scale-105 transition-all"
                style={{ backgroundColor: theme.color }}
              >
                <span className="text-white font-medium capitalize text-sm">
                  {theme.name}
                </span>
                <span className="ml-2 bg-white/30 px-2 py-0.5 rounded-full text-white text-xs">
                  {theme.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Trend */}
        <div className="bg-gradient-to-br from-white to-[#fef5fb] rounded-3xl p-6 shadow-lg border border-[#F15BB5]/10">
          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-[#FF6F59] to-[#FEE440] rounded-full"></span>
            Sentiment Trend
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={sentimentData}>
              <defs>
                <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F15BB5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F15BB5" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#fce4f0" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#6B6B6B', fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: '#fce4f0' }}
                tickLine={{ stroke: '#fce4f0' }}
              />
              <YAxis 
                tick={{ fill: '#6B6B6B', fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: '#fce4f0' }}
                tickLine={{ stroke: '#fce4f0' }}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 8px 16px rgba(241, 91, 181, 0.15)',
                  padding: '12px 16px'
                }}
                cursor={{ stroke: '#F15BB5', strokeWidth: 2 }}
                labelStyle={{ color: '#2F2F2F', fontWeight: 600 }}
              />
              <Area 
                type="monotone"
                dataKey="sentiment" 
                stroke="#F15BB5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSentiment)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#6B6B6B] text-center mt-3 font-medium">
            Daily sentiment score (0-10)
          </p>
        </div>
      </div>
    </div>
  );
}
