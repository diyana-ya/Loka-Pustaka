import { useState, useEffect } from 'react';
import {
  X,
  Headphones,
  Play,
  Pause,
  Quote,
  CheckCircle2,
  Type,
} from 'lucide-react';
import type { Book } from '../data/libraryData';

interface ReaderOverlayProps {
  book: Book | null;
  onClose: () => void;
  onFinishChapter: (bookId: string) => void;
  onShareQuote: (text: string, bookTitle: string, author: string) => void;
}

type ReaderTheme = 'sepia' | 'night' | 'day';
type FontScale = 'sm' | 'md' | 'lg';

export function ReaderOverlay({
  book,
  onClose,
  onFinishChapter,
  onShareQuote,
}: ReaderOverlayProps) {
  const [theme, setTheme] = useState<ReaderTheme>('sepia');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [chapterCompleted, setChapterCompleted] = useState(false);

  useEffect(() => {
    setChapterCompleted(false);
    setAudioPlaying(false);
    setAudioSeconds(0);
  }, [book?.id]);

  useEffect(() => {
    if (!audioPlaying) return;
    const timer = setInterval(() => {
      setAudioSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [audioPlaying]);

  if (!book) return null;

  const totalAudioSeconds = book.audioSummaryMinutes * 60;
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const themeClasses: Record<ReaderTheme, string> = {
    sepia: 'bg-[#F8F5EE] text-[#22252A]',
    night: 'bg-[#141716] text-[#F2EFE8]',
    day: 'bg-[#FCFCFA] text-[#22252A]',
  };

  const borderClasses: Record<ReaderTheme, string> = {
    sepia: 'border-[#E2DCCE]',
    night: 'border-[#272D2A]',
    day: 'border-stone-200',
  };

  const surfaceClasses: Record<ReaderTheme, string> = {
    sepia: 'bg-[#EFEAE0]',
    night: 'bg-[#1B201E]',
    day: 'bg-stone-100',
  };

  const fontSizeClasses: Record<FontScale, string> = {
    sm: 'text-[15px] leading-[1.75]',
    md: 'text-[17px] leading-[1.82]',
    lg: 'text-[19px] leading-[1.85]',
  };

  const handleComplete = () => {
    if (!chapterCompleted) {
      setChapterCompleted(true);
      onFinishChapter(book.id);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Mode baca ${book.title}`}
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto transition-colors duration-200 ${themeClasses[theme]}`}
    >
      {/* Top Distraction-Free Reader Toolbar */}
      <header
        className={`sticky top-0 z-10 border-b backdrop-blur-sm ${borderClasses[theme]} ${
          theme === 'night' ? 'bg-[#141716]/95' : theme === 'sepia' ? 'bg-[#F8F5EE]/95' : 'bg-[#FCFCFA]/95'
        }`}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs opacity-65 truncate">{book.author}</p>
            <h2 className="font-display text-sm sm:text-base font-semibold truncate">
              {book.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Eye-Care Surface Selector */}
            <div className={`inline-flex rounded-lg border p-0.5 ${borderClasses[theme]} ${surfaceClasses[theme]}`}>
              {(
                [
                  { id: 'sepia', label: 'Krem Hangat' },
                  { id: 'night', label: 'Malam Teduh' },
                  { id: 'day', label: 'Siang' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                    theme === t.id
                      ? theme === 'night'
                        ? 'bg-[#68B894] text-[#141716]'
                        : 'bg-[#1E3F32] text-[#F8F5EE]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Font Size Control */}
            <div className={`inline-flex items-center rounded-lg border p-0.5 ${borderClasses[theme]} ${surfaceClasses[theme]}`}>
              <Type className="mx-1.5 h-3.5 w-3.5 opacity-60" />
              {(['sm', 'md', 'lg'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFontScale(sz)}
                  className={`rounded-md px-2 py-1 text-xs font-mono uppercase transition-colors ${
                    fontScale === sz
                      ? theme === 'night'
                        ? 'bg-[#68B894] text-[#141716]'
                        : 'bg-[#1E3F32] text-[#F8F5EE]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : 'A+'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Keluar dari mode baca"
              className="inline-flex items-center gap-1 rounded-lg border border-current/20 px-3 py-1.5 text-xs font-medium hover:bg-current/10 transition-colors whitespace-nowrap"
            >
              <X className="h-4 w-4" />
              <span>Tutup</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Optimal 65-75ch Reading Column */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-6 sm:py-14 space-y-8">
        {/* Audio Summary Mini Bar */}
        <div
          className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${borderClasses[theme]} ${surfaceClasses[theme]}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setAudioPlaying((p) => !p)}
              aria-label={audioPlaying ? 'Jeda ringkasan audio' : 'Putar ringkasan audio'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E3F32] text-[#F8F5EE] hover:bg-[#163026] transition-colors"
            >
              {audioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold">
                <Headphones className="h-3.5 w-3.5" />
                <span>Mode Audio Komuter (Ringkasan Bab)</span>
              </p>
              <p className="text-xs opacity-70 truncate">
                {audioPlaying ? 'Sedang memutar narasi tenang...' : 'Cocok didengar saat naik KRL atau bus kampus'}
              </p>
            </div>
          </div>

          <span className="font-mono text-xs tabular-nums opacity-75 shrink-0">
            {formatTime(audioSeconds)} / {formatTime(totalAudioSeconds)}
          </span>
        </div>

        {/* Chapter Header */}
        <div className={`border-b pb-6 ${borderClasses[theme]}`}>
          <p className="text-xs font-mono uppercase tracking-wider opacity-65">
            Pratinjau Bacaan · {book.category}
          </p>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-snug">
            {book.sampleChapterTitle}
          </h1>
        </div>

        {/* Reading Prose with Direct Quote-to-Card Action */}
        <div className="space-y-6">
          {book.sampleParagraphs.map((paragraph, idx) => (
            <div key={idx} className="group space-y-2">
              <p
                className={`font-serif ${fontSizeClasses[fontScale]} ${
                  idx === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-none'
                    : ''
                }`}
              >
                {paragraph}
              </p>
              <button
                type="button"
                onClick={() => onShareQuote(paragraph, book.title, book.author)}
                className="inline-flex items-center gap-1.5 text-xs font-medium opacity-65 hover:opacity-100 transition-opacity"
              >
                <Quote className="h-3.5 w-3.5" />
                <span>Bagikan paragraf ini sebagai Kartu Kutipan</span>
              </button>
            </div>
          ))}
        </div>

        {/* End of Chapter Streak Trigger */}
        <div
          className={`mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-6 ${borderClasses[theme]} ${surfaceClasses[theme]}`}
        >
          <div>
            <h3 className="font-display text-lg font-semibold">
              {chapterCompleted ? 'Sesi baca tercatat ke Streak!' : 'Selesai membaca pratinjau bab ini?'}
            </h3>
            <p className="mt-1 text-xs opacity-75">
              Catat sesi ini untuk menambah +15 menit baca dan menjaga konsistensi streak harianmu.
            </p>
          </div>
          <button
            type="button"
            onClick={handleComplete}
            disabled={chapterCompleted}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              chapterCompleted
                ? 'bg-[#1E3F32]/15 text-[#1E3F32] dark:text-[#68B894] cursor-default'
                : 'bg-[#C87D55] hover:bg-[#B86D45] text-[#1E2024]'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{chapterCompleted ? 'Tercatat (+15 Menit)' : 'Tandai Selesai (+15 Menit)'}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
