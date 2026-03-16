'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Moon,
  Pause,
  Play,
  Printer,
  Share2,
  Sparkles,
  Star,
  Sun,
  Volume2,
  VolumeX,
  Award,
  Save,
} from 'lucide-react';
import Link from 'next/link';
import type {
  GeneratedStory,
  StoryPage,
  StorybookData,
  BookRecommendation,
} from '@/lib/storybook-data';
import {
  COMMON_CONDITIONS,
  FAVORITE_THINGS,
  STORY_TONES,
} from '@/lib/storybook-data';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Step = 'form' | 'loading' | 'reader';

interface CompanionInfo {
  name: string;
  type: string;
}

/* ------------------------------------------------------------------ */
/*  Illustration Component (CSS/SVG art)                               */
/* ------------------------------------------------------------------ */

function StoryIllustration({ page, nightMode }: { page: StoryPage; nightMode: boolean }) {
  const colors = page.illustration.colors;
  const c1 = colors[0] || '#F5D98C';
  const c2 = colors[1] || '#A8D8EA';
  const c3 = colors[2] || '#B5D99C';

  // Generate deterministic positions from page number
  const seed = page.pageNumber;
  const shapes = Array.from({ length: 6 }, (_, i) => ({
    x: ((seed * 37 + i * 73) % 80) + 10,
    y: ((seed * 53 + i * 41) % 60) + 10,
    size: ((seed * 19 + i * 29) % 40) + 20,
    rotation: (seed * 13 + i * 67) % 360,
  }));

  return (
    <div
      className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${c1}40, ${c2}40, ${c3}40)`,
        filter: nightMode ? 'brightness(0.7) saturate(0.8)' : undefined,
      }}
    >
      {/* Sky / background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${c1}50 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${c2}40 0%, transparent 50%)`,
        }}
      />

      {/* Organic shapes — watercolor blobs */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, ${[c1, c2, c3][i % 3]} 0%, transparent 70%)`,
            transform: `rotate(${s.rotation}deg) scale(${1 + (i % 3) * 0.5})`,
          }}
        />
      ))}

      {/* Ground element */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4 rounded-t-[50%]"
        style={{ background: `linear-gradient(to top, ${c3}50, transparent)` }}
      />

      {/* Central character silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-24 md:w-20 md:h-28 rounded-full opacity-40"
          style={{
            background: `linear-gradient(to bottom, ${c1}, ${c2})`,
            borderRadius: '40% 40% 45% 45%',
          }}
        />
      </div>

      {/* Sparkle effects for magical moods */}
      {(page.illustration.mood.includes('magic') ||
        page.illustration.mood.includes('empowering') ||
        page.illustration.mood.includes('proud') ||
        page.illustration.mood.includes('triumph')) && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${15 + (i * 23) % 50}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </>
      )}

      {/* Moon for nighttime/peaceful pages */}
      {(page.illustration.mood.includes('peaceful') || page.illustration.mood.includes('night') || page.illustration.mood.includes('bed')) && (
        <div
          className="absolute top-6 right-8 w-12 h-12 rounded-full opacity-60"
          style={{ background: `radial-gradient(circle at 30% 30%, #FFF8E7, ${c1})`, boxShadow: `0 0 20px ${c1}60` }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cleo Mascot (reused from kids page)                                */
/* ------------------------------------------------------------------ */

function CleoMascot({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="flex-shrink-0 animate-float">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-2xl shadow-lg shadow-orange-200">
          🦉
        </div>
      </div>
      <div className="relative bg-white rounded-2xl rounded-tl-sm border-2 border-orange-200 px-4 py-3 shadow-sm max-w-md">
        <p className="text-sm text-slate-700 font-kids font-medium">{message}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading Messages for story generation                              */
/* ------------------------------------------------------------------ */

const LOADING_MESSAGES = [
  "Once upon a time...",
  "We're writing {name}'s adventure...",
  "Adding {name}'s favorite things...",
  "Illustrating the magical scenes...",
  "Making sure {name} saves the day...",
  "Your story is almost ready...",
];

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function StorybookPage() {
  // Form state
  const [step, setStep] = useState<Step>('form');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number | null>(null);
  const [condition, setCondition] = useState('');
  const [conditionSearch, setConditionSearch] = useState('');
  const [showConditions, setShowConditions] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [companion, setCompanion] = useState<CompanionInfo>({ name: '', type: '' });
  const [storyTone, setStoryTone] = useState('');
  const [dedication, setDedication] = useState('');

  // Story state
  const [storyData, setStoryData] = useState<StorybookData | null>(null);
  const [currentPage, setCurrentPage] = useState(-1); // -1 = dedication
  const [nightMode, setNightMode] = useState(false);
  const [error, setError] = useState('');
  const [loadingIdx, setLoadingIdx] = useState(0);

  // Audio state
  const [isReading, setIsReading] = useState(false);
  const [isReadingAll, setIsReadingAll] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Saved stories
  const [savedStories, setSavedStories] = useState<StorybookData[]>([]);

  useEffect(() => {
    document.title = 'CLARITY Kids — Create Your Story';
    try {
      const saved = localStorage.getItem('clarity-storybooks');
      if (saved) setSavedStories(JSON.parse(saved));
    } catch { /* no-op */ }
  }, []);

  // Loading message cycling
  useEffect(() => {
    if (step !== 'loading') return;
    const interval = setInterval(() => {
      setLoadingIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [step]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Form submission                                                  */
  /* ---------------------------------------------------------------- */

  const handleSubmit = useCallback(async () => {
    if (!childName.trim() || !condition.trim()) return;
    setStep('loading');
    setError('');
    setLoadingIdx(0);

    try {
      const res = await fetch('/api/storybook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: childName.trim(),
          childAge: childAge || 7,
          condition: condition.trim(),
          favorites: favorites.length ? favorites : undefined,
          companion: companion.name ? companion : undefined,
          storyTone: storyTone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Something went wrong.');

      const story = data.story as GeneratedStory;
      // If user wrote a custom dedication, override
      if (dedication.trim()) {
        story.dedication = dedication.trim();
      }

      const bookData: StorybookData = {
        story,
        childName: childName.trim(),
        childAge: childAge || 7,
        condition: condition.trim(),
        recommendations: data.recommendations || [],
        createdAt: new Date().toISOString(),
      };

      setStoryData(bookData);
      setCurrentPage(-1);
      setStep('reader');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStep('form');
    }
  }, [childName, childAge, condition, favorites, companion, storyTone, dedication]);

  /* ---------------------------------------------------------------- */
  /*  Audio                                                            */
  /* ---------------------------------------------------------------- */

  const speakText = useCallback((text: string, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = nightMode ? 0.85 : 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 1;
    utterance.onend = () => {
      setIsReading(false);
      onEnd?.();
    };
    synthRef.current = utterance;
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  }, [nightMode]);

  const stopReading = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsReadingAll(false);
  }, []);

  const readCurrentPage = useCallback(() => {
    if (!storyData) return;
    if (currentPage === -1) {
      speakText(storyData.story.dedication);
    } else if (currentPage < storyData.story.pages.length) {
      speakText(storyData.story.pages[currentPage].text);
    }
  }, [storyData, currentPage, speakText]);

  const readAllPages = useCallback(() => {
    if (!storyData) return;
    setIsReadingAll(true);
    setCurrentPage(-1);

    const allTexts = [
      storyData.story.dedication,
      ...storyData.story.pages.map((p) => p.text),
    ];
    let idx = 0;

    function readNext() {
      if (idx >= allTexts.length) {
        setIsReadingAll(false);
        return;
      }
      setCurrentPage(idx - 1); // -1 = dedication, 0 = page 1, etc.
      speakText(allTexts[idx], () => {
        idx++;
        setTimeout(readNext, 2000);
      });
    }

    readNext();
  }, [storyData, speakText]);

  /* ---------------------------------------------------------------- */
  /*  Navigation                                                       */
  /* ---------------------------------------------------------------- */

  const totalPages = storyData ? storyData.story.pages.length : 0;
  const canGoPrev = currentPage > -1;
  const canGoNext = storyData ? currentPage < totalPages - 1 : false;
  // Also allow navigating to "about" section (totalPages) and "recommendations" (totalPages + 1)
  const maxPage = totalPages + 1; // about + recommendations

  const goNext = () => { if (currentPage < maxPage) setCurrentPage((p) => p + 1); };
  const goPrev = () => { if (currentPage > -1) setCurrentPage((p) => p - 1); };

  /* ---------------------------------------------------------------- */
  /*  Save & Export                                                    */
  /* ---------------------------------------------------------------- */

  const saveStory = useCallback(() => {
    if (!storyData) return;
    const existing = [...savedStories];
    // Avoid duplicates by title+date
    const alreadySaved = existing.some((s) => s.story.title === storyData.story.title && s.createdAt === storyData.createdAt);
    if (!alreadySaved) {
      existing.push(storyData);
      setSavedStories(existing);
      try { localStorage.setItem('clarity-storybooks', JSON.stringify(existing)); } catch { /* full */ }
    }
  }, [storyData, savedStories]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleShare = useCallback(async () => {
    if (!storyData) return;
    const shareData = {
      title: storyData.story.title,
      text: `Read "${storyData.story.title}" — a personalized storybook created by CLARITY Kids for ${storyData.childName}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      try { await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`); alert('Link copied!'); } catch { /* fallback */ }
    }
  }, [storyData]);

  /* ---------------------------------------------------------------- */
  /*  Toggle a favorite                                                */
  /* ---------------------------------------------------------------- */

  const toggleFavorite = (item: string) => {
    setFavorites((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Filtered conditions                                              */
  /* ---------------------------------------------------------------- */

  const filteredConditions = conditionSearch
    ? COMMON_CONDITIONS.filter((c) => c.toLowerCase().includes(conditionSearch.toLowerCase()))
    : COMMON_CONDITIONS;

  /* ================================================================ */
  /*  RENDER: FORM                                                     */
  /* ================================================================ */

  function renderForm() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <div className="kids-gradient h-2 rounded-full mb-8 opacity-60" />
          <h1 className="font-kids text-4xl sm:text-5xl font-extrabold text-slate-800 mb-3">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">Story</span>
          </h1>
          <p className="text-lg font-kids text-slate-500 max-w-lg mx-auto">
            Every child is the hero of their own adventure.
          </p>
        </div>

        <CleoMascot message={`Let's make a book about YOUR hero! Tell me about the amazing kid this story is for.`} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-2xl bg-rose-50 border-2 border-rose-200 px-4 py-3 text-sm text-rose-700 font-kids"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Child's Name */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              What&apos;s your hero&apos;s name? ⭐
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Your hero's name"
              className="w-full rounded-2xl border-2 border-orange-200 bg-white px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-orange-200 focus:border-orange-400 transition-shadow font-kids"
            />
          </div>

          {/* Age Selection */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              How old is {childName || 'your hero'}? 🎂
            </label>
            <div className="flex flex-wrap gap-2">
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                <button
                  key={age}
                  onClick={() => setChildAge(age)}
                  className={`w-12 h-12 rounded-full text-lg font-kids font-bold transition-all ${
                    childAge === age
                      ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white scale-110 shadow-lg'
                      : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-orange-300 hover:scale-105'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="relative">
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              What&apos;s {childName || 'your hero'}&apos;s condition? 💪
            </label>
            <input
              type="text"
              value={conditionSearch || condition}
              onChange={(e) => {
                setConditionSearch(e.target.value);
                setCondition(e.target.value);
                setShowConditions(true);
              }}
              onFocus={() => setShowConditions(true)}
              onBlur={() => setTimeout(() => setShowConditions(false), 200)}
              placeholder="Type a condition or choose below..."
              className="w-full rounded-2xl border-2 border-pink-200 bg-white px-5 py-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-pink-200 focus:border-pink-400 transition-shadow font-kids"
            />
            {showConditions && filteredConditions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full bg-white rounded-2xl border-2 border-pink-200 shadow-xl max-h-48 overflow-y-auto">
                {filteredConditions.map((c) => (
                  <button
                    key={c}
                    className="w-full text-left px-4 py-2.5 text-sm font-kids text-slate-700 hover:bg-pink-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    onMouseDown={() => {
                      setCondition(c);
                      setConditionSearch(c);
                      setShowConditions(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Things */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              What does {childName || 'your hero'} love? 💖{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            {Object.entries(FAVORITE_THINGS).map(([category, items]) => (
              <div key={category} className="mb-3">
                <p className="text-xs font-kids font-bold text-slate-500 uppercase tracking-wide mb-1.5">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleFavorite(item)}
                      className={`rounded-full px-3 py-1.5 text-sm font-kids font-medium transition-all ${
                        favorites.includes(item)
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-purple-300'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Special Companion */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              A special friend? 🐾{' '}
              <span className="text-slate-400 font-normal">(pet, stuffed animal, sibling)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={companion.name}
                onChange={(e) => setCompanion((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Name"
                className="rounded-2xl border-2 border-green-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-400 font-kids"
              />
              <input
                type="text"
                value={companion.type}
                onChange={(e) => setCompanion((prev) => ({ ...prev, type: e.target.value }))}
                placeholder="Type (dog, teddy bear...)"
                className="rounded-2xl border-2 border-green-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-400 font-kids"
              />
            </div>
          </div>

          {/* Story Tone */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              Story style{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {STORY_TONES.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => setStoryTone(storyTone === tone.value ? '' : tone.value)}
                  className={`rounded-2xl border-2 p-4 text-center transition-all font-kids ${
                    storyTone === tone.value
                      ? 'border-purple-400 bg-purple-50 scale-105 shadow-md'
                      : 'border-slate-200 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{tone.emoji}</div>
                  <p className={`text-sm font-bold ${storyTone === tone.value ? 'text-purple-700' : 'text-slate-700'}`}>{tone.label}</p>
                  <p className="text-xs text-slate-400">{tone.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dedication */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              Custom dedication{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder={`For ${childName || 'our hero'}, from Mommy and Daddy...`}
              className="w-full rounded-2xl border-2 border-amber-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-amber-200 focus:border-amber-400 font-kids"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!childName.trim() || !condition.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:from-orange-500 hover:via-pink-600 hover:to-purple-600 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-kids font-bold text-lg px-6 py-5 transition-all shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-[1.02]"
          >
            <BookOpen className="h-5 w-5" />
            Create {childName ? `${childName}'s` : "Your"} Storybook
            <Sparkles className="h-5 w-5" />
          </button>

          {/* Saved stories */}
          {savedStories.length > 0 && (
            <div className="pt-4">
              <p className="text-sm font-kids font-bold text-slate-600 mb-3">📚 My Stories</p>
              <div className="space-y-2">
                {savedStories.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setStoryData(s);
                      setCurrentPage(-1);
                      setStep('reader');
                    }}
                    className="w-full text-left rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 hover:border-orange-300 hover:bg-orange-50 transition-all font-kids"
                  >
                    <p className="font-bold text-slate-800 text-sm">{s.story.title}</p>
                    <p className="text-xs text-slate-400">For {s.childName} · {new Date(s.createdAt).toLocaleDateString()}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Link href="/kids" className="block text-center text-sm font-kids text-slate-400 hover:text-slate-600 transition-colors">
            ← Back to CLARITY Kids
          </Link>
        </div>
      </motion.div>
    );
  }

  /* ================================================================ */
  /*  RENDER: LOADING                                                  */
  /* ================================================================ */

  function renderLoading() {
    const msg = LOADING_MESSAGES[loadingIdx].replace('{name}', childName || 'your hero');

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center py-24 px-4"
      >
        {/* Animated book */}
        <motion.div
          animate={{ rotateY: [0, 10, 0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-8"
        >
          📖
        </motion.div>

        {/* Sparkle particles */}
        <div className="relative w-64 h-8 mb-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                background: ['#FFB347', '#FFB5C2', '#DDA0DD', '#A8D8EA', '#B5D99C', '#F5D98C', '#FFB5C2', '#A8D8EA'][i],
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </div>

        {/* Cycling text */}
        <div className="h-8 relative flex items-center justify-center min-w-[320px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="absolute text-lg font-kids font-bold text-slate-700 text-center italic"
            >
              &ldquo;{msg}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-10 text-sm font-kids text-slate-400">This usually takes 15–30 seconds</p>
      </motion.div>
    );
  }

  /* ================================================================ */
  /*  RENDER: STORYBOOK READER                                         */
  /* ================================================================ */

  function renderReader() {
    if (!storyData) return null;
    const { story, recommendations } = storyData;

    const isOnDedication = currentPage === -1;
    const isOnStoryPage = currentPage >= 0 && currentPage < story.pages.length;
    const isOnAbout = currentPage === story.pages.length;
    const isOnRecs = currentPage === story.pages.length + 1;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full max-w-3xl mx-auto transition-all duration-700 ${nightMode ? 'brightness-90' : ''}`}
      >
        {/* Top toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => { stopReading(); setStep('form'); }}
            className="flex items-center gap-1.5 text-sm font-kids font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> New Story
          </button>

          <div className="flex items-center gap-2">
            {/* Night mode */}
            <button
              onClick={() => setNightMode(!nightMode)}
              className={`p-2 rounded-full transition-all ${nightMode ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              title={nightMode ? 'Day mode' : 'Bedtime mode'}
            >
              {nightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Audio */}
            {isReading ? (
              <button onClick={stopReading} className="p-2 rounded-full bg-rose-100 text-rose-600" title="Stop reading">
                <VolumeX className="h-4 w-4" />
              </button>
            ) : (
              <>
                <button onClick={readCurrentPage} className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200" title="Read this page">
                  <Volume2 className="h-4 w-4" />
                </button>
                <button onClick={readAllPages} className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200" title="Read whole story">
                  <Play className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Save */}
            <button onClick={saveStory} className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200" title="Save story">
              <Save className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Book container */}
        <div
          className={`rounded-3xl overflow-hidden transition-all duration-700 ${
            nightMode
              ? 'bg-[#1a1a2e] shadow-2xl shadow-indigo-900/30'
              : 'bg-[#FFF8E7] shadow-2xl shadow-amber-200/40'
          }`}
          style={{ boxShadow: nightMode ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(200,170,100,0.2)' }}
        >
          {/* Title bar */}
          <div className={`text-center px-6 py-4 border-b ${nightMode ? 'border-white/10' : 'border-amber-200/40'}`}>
            <h1 className={`font-kids text-2xl sm:text-3xl font-extrabold ${nightMode ? 'text-amber-200' : 'text-slate-800'}`}>
              {story.title}
            </h1>
          </div>

          {/* Page content */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* DEDICATION PAGE */}
              {isOnDedication && (
                <motion.div
                  key="dedication"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center min-h-[300px] text-center"
                >
                  <Heart className={`h-8 w-8 mb-6 ${nightMode ? 'text-pink-400' : 'text-pink-400'}`} />
                  <p className={`font-kids text-2xl sm:text-3xl italic leading-relaxed ${nightMode ? 'text-amber-100' : 'text-slate-700'}`}>
                    {story.dedication}
                  </p>
                  <Star className={`h-6 w-6 mt-8 ${nightMode ? 'text-amber-400' : 'text-amber-400'}`} />
                </motion.div>
              )}

              {/* STORY PAGES */}
              {isOnStoryPage && (
                <motion.div
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                >
                  <StoryIllustration page={story.pages[currentPage]} nightMode={nightMode} />
                  <p className={`mt-6 font-kids text-lg sm:text-xl leading-relaxed ${nightMode ? 'text-amber-100' : 'text-slate-700'}`}>
                    {story.pages[currentPage].text}
                  </p>
                </motion.div>
              )}

              {/* ABOUT THE CONDITION */}
              {isOnAbout && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className={`rounded-2xl p-6 ${nightMode ? 'bg-white/5' : 'bg-orange-50'}`}>
                    <h3 className={`font-kids text-lg font-bold mb-3 ${nightMode ? 'text-orange-300' : 'text-orange-700'}`}>
                      For {storyData.childName} 💛
                    </h3>
                    <p className={`font-kids leading-relaxed ${nightMode ? 'text-amber-100' : 'text-slate-700'}`}>
                      {story.aboutTheCondition.forKids}
                    </p>
                  </div>
                  <div className={`rounded-2xl p-6 ${nightMode ? 'bg-white/5' : 'bg-blue-50'}`}>
                    <h3 className={`font-kids text-lg font-bold mb-3 ${nightMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      For Mom & Dad 💙
                    </h3>
                    <p className={`font-kids leading-relaxed text-sm ${nightMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {story.aboutTheCondition.forParents}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* BOOK RECOMMENDATIONS */}
              {isOnRecs && (
                <motion.div
                  key="recs"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className={`font-kids text-xl font-bold mb-6 text-center ${nightMode ? 'text-amber-200' : 'text-slate-800'}`}>
                    📚 Recommended Reading
                  </h3>
                  <div className="space-y-4">
                    {recommendations.map((book: BookRecommendation, i: number) => (
                      <div key={i} className={`rounded-2xl p-5 ${nightMode ? 'bg-white/5' : 'bg-white border-2 border-slate-100'}`}>
                        <p className={`font-kids font-bold ${nightMode ? 'text-amber-200' : 'text-slate-800'}`}>{book.title}</p>
                        <p className={`font-kids text-sm ${nightMode ? 'text-slate-400' : 'text-slate-500'}`}>by {book.author}</p>
                        <p className={`font-kids text-sm mt-1 ${nightMode ? 'text-slate-300' : 'text-slate-600'}`}>{book.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation bar */}
          <div className={`flex items-center justify-between px-6 py-4 border-t ${nightMode ? 'border-white/10' : 'border-amber-200/40'}`}>
            <button
              onClick={goPrev}
              disabled={currentPage <= -1}
              className={`p-2 rounded-full transition-all ${
                currentPage <= -1
                  ? 'opacity-30 cursor-not-allowed'
                  : nightMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page indicator */}
            <div className="flex items-center gap-1.5">
              {[...Array(totalPages + 3)].map((_, i) => {
                const pageIdx = i - 1; // -1 = dedication, 0..n-1 = pages, n = about, n+1 = recs
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageIdx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentPage === pageIdx
                        ? nightMode ? 'bg-amber-400 w-4' : 'bg-amber-600 w-4'
                        : nightMode ? 'bg-white/20' : 'bg-amber-200'
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={goNext}
              disabled={currentPage >= maxPage}
              className={`p-2 rounded-full transition-all ${
                currentPage >= maxPage
                  ? 'opacity-30 cursor-not-allowed'
                  : nightMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Export & action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pb-8">
          <button onClick={handlePrint} className="flex items-center gap-2 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-kids font-bold px-5 py-3 text-sm transition-colors">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-kids font-bold px-5 py-3 text-sm transition-colors">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button onClick={saveStory} className="flex items-center gap-2 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-kids font-bold px-5 py-3 text-sm transition-colors">
            <Download className="h-4 w-4" /> Save
          </button>
          <Link
            href="/kids"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-kids font-bold px-5 py-3 text-sm shadow-sm hover:shadow-md transition-all"
          >
            <ArrowRight className="h-4 w-4" /> Explore CLARITY Kids
          </Link>
        </div>

        {/* Brave Badge */}
        <div className={`rounded-3xl p-8 text-center mb-8 ${nightMode ? 'bg-white/5' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'}`}>
          <Award className={`h-12 w-12 mx-auto mb-3 ${nightMode ? 'text-amber-400' : 'text-amber-500'}`} />
          <h3 className={`font-kids text-2xl font-extrabold mb-2 ${nightMode ? 'text-amber-200' : 'text-slate-800'}`}>
            Certificate of Bravery
          </h3>
          <p className={`font-kids text-lg ${nightMode ? 'text-amber-100' : 'text-slate-600'}`}>
            This certifies that <strong className={nightMode ? 'text-amber-300' : 'text-amber-700'}>{storyData.childName}</strong> is officially the bravest hero we know.
          </p>
          <p className={`font-kids text-sm mt-2 ${nightMode ? 'text-slate-400' : 'text-slate-400'}`}>
            Awarded by CLARITY Kids · {new Date().toLocaleDateString()}
          </p>
          <button onClick={handlePrint} className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 font-kids font-bold px-5 py-2 text-sm hover:bg-amber-200 transition-colors">
            <Printer className="h-4 w-4" /> Print Certificate
          </button>
        </div>
      </motion.div>
    );
  }

  /* ================================================================ */
  /*  MAIN RENDER                                                      */
  /* ================================================================ */

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
      `}</style>

      <div className={`min-h-screen px-4 py-10 sm:py-16 transition-all duration-700 ${
        nightMode
          ? 'bg-gradient-to-b from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23]'
          : 'bg-gradient-to-b from-[#FFF7ED] via-white to-[#FFF7ED]'
      }`}>
        <AnimatePresence mode="wait">
          {step === 'form' && <motion.div key="form">{renderForm()}</motion.div>}
          {step === 'loading' && <motion.div key="loading">{renderLoading()}</motion.div>}
          {step === 'reader' && <motion.div key="reader">{renderReader()}</motion.div>}
        </AnimatePresence>
      </div>
    </>
  );
}
