'use client';
import { motion } from 'framer-motion';
import { Clock, Flame, Utensils, Music2, Sparkles, MessageCircle, Heart } from 'lucide-react';

interface ScheduleItem {
  time: string;
  title: string;
  hindiTitle: string;
  description: string;
  icon: typeof Clock;
  highlight: string;
}

const SCHEDULE: ScheduleItem[] = [
  {
    time: '06:30 PM',
    title: 'Shubh Aagman & Warm Chai',
    hindiTitle: 'शुभ आगमन और स्वागत',
    description: 'Arrivals, festive greetings, steaming cardamom chai, and complimentary warm sweet boxes.',
    icon: Sparkles,
    highlight: 'Welcome Drinks & Sweets',
  },
  {
    time: '08:00 PM',
    title: 'Rooftop Skyshots & Diya Lighting',
    hindiTitle: 'दीप प्रज्वलन और आतिशबाज़ी',
    description: 'Terrace Diya lighting ritual followed by a synchronized skyshot fireworks show against the night sky.',
    icon: Flame,
    highlight: 'Terrace Fireworks Show',
  },
  {
    time: '09:00 PM',
    title: 'The Grand Daawat Feast',
    hindiTitle: 'शाही महाभोज',
    description: 'A feast fit for royalty: live chaat counter, rich festive mains, biryani, and unlimited dessert bar.',
    icon: Utensils,
    highlight: 'Full Festive Dinner',
  },
  {
    time: '10:30 PM',
    title: 'Teen Patti & Bollywood Anthems',
    hindiTitle: 'तीन पत्ती और संगीत',
    description: 'High-stakes (fake chips!) card games, festive dhol playlist, and questionable Bollywood choreography.',
    icon: Music2,
    highlight: 'Cards Table & Dance Floor',
  },
  {
    time: '12:00 AM',
    title: 'Midnight Chai & Core Memories',
    hindiTitle: 'आधी रात की चाय और गपशप',
    description: 'Winding down under the stars, sharing stories, unfiltered laughter, and midnight snack raids.',
    icon: MessageCircle,
    highlight: 'Late Night Gossip',
  },
];

export default function ItinerarySection() {
  return (
    <section id="itinerary" className="relative py-24 px-4 sm:px-6 bg-[#0E0306] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 04 &bull; Night Itinerary</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider leading-none mb-3">
            THE EVENING <span className="text-gold-gradient">TIMELINE</span>
          </h2>
          <p className="text-neutral-400 text-sm font-sans-clean">
            Every hour planned for maximum celebration, great conversations, and unforgettable memories.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-amber-500/20 ml-4 sm:ml-32 space-y-10">
          {SCHEDULE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-7 sm:pl-10 group"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#1A060B] border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(255,180,0,0.4)] group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Left Timestamp for desktop */}
                <div className="hidden sm:block absolute -left-36 top-2 w-28 text-right font-mono text-xs font-bold text-amber-400 tracking-wider">
                  {item.time}
                </div>

                {/* Card Container */}
                <div className="glass-gold rounded-2xl p-5 sm:p-6 transition-all hover:border-amber-400/50 hover:shadow-[0_15px_30px_rgba(255,160,0,0.12)]">
                  {/* Mobile Timestamp */}
                  <div className="sm:hidden font-mono text-xs font-bold text-amber-400 mb-1">
                    {item.time}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                        {item.title}
                      </h3>
                      <div className="text-xs text-amber-300/70 font-devanagari">
                        {item.hindiTitle}
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-[10px] font-sans-clean font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {item.highlight}
                    </span>
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm font-sans-clean leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
