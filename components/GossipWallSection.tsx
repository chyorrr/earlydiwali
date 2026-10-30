'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Sparkles, Heart, Pin, Send, X } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface Note {
  id: string;
  author: string;
  message: string;
  tag: string;
  bgColor: string;
  rotation: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    author: 'Riya K.',
    message: 'Who is hiding the Kaju Katli box? I saw someone put a full 500g tin in their handbag 👀',
    tag: 'Mithai Alert',
    bgColor: 'bg-[#FFFBEB] text-neutral-900 border-amber-300',
    rotation: '-rotate-2',
  },
  {
    id: '2',
    author: 'Kabir & Friends',
    message: 'Official Party Rule: Nobody is allowed to ask about corporate jobs or marriage rishtas tonight.',
    tag: 'Strict Advisory',
    bgColor: 'bg-[#FFF1F2] text-neutral-900 border-rose-300',
    rotation: 'rotate-1',
  },
  {
    id: '3',
    author: 'Aanya S.',
    message: 'If the DJ plays Bole Chudiyan or Nagada Sang Dhol, clear the dance floor. I have practiced the steps.',
    tag: 'Dance Threat',
    bgColor: 'bg-[#F0FDF4] text-neutral-900 border-emerald-300',
    rotation: 'rotate-3',
  },
  {
    id: '4',
    author: 'Dev M.',
    message: 'Manifesting 3 aces on the first Teen Patti hand. Bringing 100% confidence and zero poker face.',
    tag: 'Teen Patti Mafia',
    bgColor: 'bg-[#EFF6FF] text-neutral-900 border-blue-300',
    rotation: '-rotate-3',
  },
  {
    id: '5',
    author: 'Simran & Rohan',
    message: 'The fit check photos taken on Aarya’s terrace are about to redefine Indian festive Pinterest.',
    tag: 'Fit Check',
    bgColor: 'bg-[#FAF5FF] text-neutral-900 border-purple-300',
    rotation: 'rotate-2',
  },
  {
    id: '6',
    author: 'Anonymous Dost',
    message: 'Here exclusively for the hot gulab jamun and the rooftop fireworks. 10/10 hostess points to Aarya!',
    tag: 'Pure Vibes',
    bgColor: 'bg-[#FEFCE8] text-neutral-900 border-yellow-300',
    rotation: '-rotate-1',
  },
];

export default function GossipWallSection() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorInput, setAuthorInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [tagInput, setTagInput] = useState('Festive Wish');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sounds.playClick();
    const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];
    const colors = [
      'bg-[#FFFBEB] text-neutral-900 border-amber-300',
      'bg-[#FFF1F2] text-neutral-900 border-rose-300',
      'bg-[#F0FDF4] text-neutral-900 border-emerald-300',
      'bg-[#EFF6FF] text-neutral-900 border-blue-300',
    ];

    const newNote: Note = {
      id: Date.now().toString(),
      author: authorInput.trim() || 'Desi Guest',
      message: messageInput.trim(),
      tag: tagInput,
      bgColor: colors[Math.floor(Math.random() * colors.length)],
      rotation: rotations[Math.floor(Math.random() * rotations.length)],
    };

    setNotes([newNote, ...notes]);
    setMessageInput('');
    setAuthorInput('');
    setIsModalOpen(false);
  };

  return (
    <section id="gossip-wall" className="relative py-24 px-4 sm:px-6 bg-[#090204] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 05 &bull; The Gossip & Wishes Wall</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider leading-none mb-3">
            SPICY NOTES & <span className="text-gold-gradient">WISHES BOARD</span>
          </h2>
          <p className="text-neutral-400 text-sm font-sans-clean">
            Leave a festive wish, an anonymous confession, or a lighthearted warning for the party crew.
          </p>

          <button
            onClick={() => {
              sounds.playClick();
              setIsModalOpen(true);
            }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-950 font-bebas text-base tracking-widest font-bold shadow-[0_0_20px_rgba(255,180,0,0.3)] hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            PIN YOUR NOTE TO THE WALL
          </button>
        </motion.div>

        {/* Notes Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className={`p-6 rounded-2xl border shadow-xl relative transition-all ${note.bgColor} ${note.rotation}`}
            >
              {/* Decorative Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-700 border-2 border-white/60 shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
              </div>

              {/* Tag */}
              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-black/10 text-neutral-800">
                  #{note.tag}
                </span>
                <Heart className="w-3.5 h-3.5 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer" />
              </div>

              {/* Message */}
              <p className="font-playfair text-neutral-800 text-base leading-relaxed mb-4">
                &ldquo;{note.message}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                <span className="font-bebas text-sm tracking-wider text-neutral-600">
                  — {note.author}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600/60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Composer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-gold rounded-3xl p-6 sm:p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-bebas text-2xl text-white tracking-wider mb-1">
                PIN A SPICY NOTE
              </h3>
              <p className="text-xs text-neutral-400 mb-5">
                Drop your wishes, food cravings, or jokes on the community wall.
              </p>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1">
                    YOUR NAME OR ALIAS
                  </label>
                  <input
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    placeholder="e.g. Samosa Lover / Anonymous"
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-amber-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1">
                    TOPIC TAG
                  </label>
                  <select
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-amber-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Festive Wish">Festive Wish</option>
                    <option value="Mithai Gossip">Mithai Gossip</option>
                    <option value="Fit Check">Fit Check</option>
                    <option value="Teen Patti">Teen Patti</option>
                    <option value="Party Rule">Party Rule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Write something memorable..."
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-amber-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-950 font-bebas text-lg tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  PIN TO BOARD
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
