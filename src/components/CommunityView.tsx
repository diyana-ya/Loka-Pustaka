import { useState, useEffect } from 'react';
import { Users, Quote, Star, ThumbsUp, Send, Copy, Check, Calendar } from 'lucide-react';
import type { Book, BookClub, BookReview } from '../data/libraryData';

interface CommunityViewProps {
  books: Book[];
  clubs: BookClub[];
  reviews: BookReview[];
  onToggleJoinClub: (clubId: string) => void;
  onAddClubPost: (clubId: string, content: string) => void;
  onToggleReviewLike: (reviewId: string) => void;
  onAddReview: (bookId: string, vibeNote: string, comment: string, rating: number) => void;
  initialQuote?: { text: string; bookTitle: string; author: string } | null;
  onShareQuoteCount: () => void;
}

type CommunitySection = 'clubs' | 'quotes' | 'reviews';

export function CommunityView({
  books,
  clubs,
  reviews,
  onToggleJoinClub,
  onAddClubPost,
  onToggleReviewLike,
  onAddReview,
  initialQuote,
  onShareQuoteCount,
}: CommunityViewProps) {
  const [section, setSection] = useState<CommunitySection>(initialQuote ? 'quotes' : 'clubs');
  const [activeClubId, setActiveClubId] = useState<string>(clubs[0]?.id || '');
  const [newPostText, setNewPostText] = useState('');

  // Quote Studio state
  const [selectedQuoteText, setSelectedQuoteText] = useState(
    initialQuote?.text || books[0].quotes[0]
  );
  const [selectedQuoteBook, setSelectedQuoteBook] = useState(
    initialQuote?.bookTitle || books[0].title
  );
  const [selectedQuoteAuthor, setSelectedQuoteAuthor] = useState(
    initialQuote?.author || books[0].author
  );
  const [quoteTheme, setQuoteTheme] = useState<'paper' | 'forest' | 'terracotta'>('paper');
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Review form state
  const [reviewBookId, setReviewBookId] = useState(books[0].id);
  const [reviewVibe, setReviewVibe] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    if (initialQuote) {
      setSection('quotes');
      setSelectedQuoteText(initialQuote.text);
      setSelectedQuoteBook(initialQuote.bookTitle);
      setSelectedQuoteAuthor(initialQuote.author);
    }
  }, [initialQuote]);

  const activeClub = clubs.find((c) => c.id === activeClubId) || clubs[0];

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() || !activeClub) return;
    onAddClubPost(activeClub.id, newPostText.trim());
    setNewPostText('');
  };

  const handleCopyQuote = async () => {
    const formatted = `"${selectedQuoteText}" — ${selectedQuoteAuthor} (${selectedQuoteBook}) via Loka Pustaka`;
    try {
      await navigator.clipboard.writeText(formatted);
    } catch {
      // Clipboard may be restricted in sandboxed iframes; still confirm share action
    }
    setCopiedQuote(true);
    onShareQuoteCount();
    setTimeout(() => setCopiedQuote(false), 2200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    onAddReview(
      reviewBookId,
      reviewVibe.trim() || 'Reflektif & Berkesan',
      reviewComment.trim(),
      reviewRating
    );
    setReviewVibe('');
    setReviewComment('');
    setReviewRating(5);
  };

  const presetQuotes = books.flatMap((b) =>
    b.quotes.map((q) => ({ text: q, bookTitle: b.title, author: b.author }))
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Header + Segmented View Switch */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2DCCE] dark:border-[#272D2A] pb-6">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-wide text-[#1E3F32] dark:text-[#68B894]">
            Ruang Interaksi Pembaca
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#22252A] dark:text-[#F2EFE8]">
            Klub baca virtual, ulasan buku, dan kartu kutipan
          </h1>
          <p className="text-sm sm:text-base text-[#52565E] dark:text-[#A4ABA8]">
            Diskusikan bab favorit bersama mahasiswa lintas kampus, bagikan ulasan jujur, dan simpan kutipan berkesan dalam format visual.
          </p>
        </div>

        <div className="inline-flex self-start rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-1">
          <button
            type="button"
            onClick={() => setSection('clubs')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              section === 'clubs'
                ? 'bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716]'
                : 'text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8]'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Klub Baca</span>
          </button>
          <button
            type="button"
            onClick={() => setSection('quotes')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              section === 'quotes'
                ? 'bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716]'
                : 'text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8]'
            }`}
          >
            <Quote className="h-4 w-4" />
            <span>Kartu Kutipan</span>
          </button>
          <button
            type="button"
            onClick={() => setSection('reviews')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              section === 'reviews'
                ? 'bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716]'
                : 'text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8]'
            }`}
          >
            <Star className="h-4 w-4" />
            <span>Ulasan Buku</span>
          </button>
        </div>
      </section>

      {/* Section 1: Virtual Book Clubs */}
      {section === 'clubs' && (
        <section aria-label="Klub baca virtual" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            {clubs.map((club) => {
              const isSelected = club.id === activeClub?.id;
              return (
                <div
                  key={club.id}
                  onClick={() => setActiveClubId(club.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveClubId(club.id);
                  }}
                  className={`cursor-pointer rounded-xl border p-5 transition-colors ${
                    isSelected
                      ? 'border-[#1E3F32] dark:border-[#68B894] bg-[#EFEAE0] dark:bg-[#1B201E]'
                      : 'border-[#E2DCCE] dark:border-[#272D2A] bg-transparent hover:bg-[#EFEAE0]/60 dark:hover:bg-[#1B201E]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#52565E] dark:text-[#A4ABA8] font-mono tabular-nums">
                        {club.membersCount} anggota · {club.joined ? 'Sudah bergabung' : 'Terbuka'}
                      </p>
                      <h2 className="mt-1 font-display text-lg font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                        {club.name}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[#52565E] dark:text-[#A4ABA8]">
                    Bacaan aktif: <span className="font-medium text-[#22252A] dark:text-[#F2EFE8]">{club.currentBook}</span>
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#52565E] dark:text-[#A4ABA8]">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{club.schedule}</span>
                  </p>
                </div>
              );
            })}
          </div>

          {activeClub && (
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#DFD8C8] dark:border-[#272D2A] pb-4">
                  <div>
                    <p className="text-xs font-semibold text-[#1E3F32] dark:text-[#68B894]">
                      Ruang Diskusi Klub
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-[#22252A] dark:text-[#F2EFE8]">
                      {activeClub.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#52565E] dark:text-[#A4ABA8]">
                      {activeClub.topic}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleJoinClub(activeClub.id)}
                    className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      activeClub.joined
                        ? 'border border-[#DCD4C4] dark:border-[#2C3330] text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#E5DFD2] dark:hover:bg-[#232927]'
                        : 'bg-[#C87D55] hover:bg-[#B86D45] text-[#1E2024]'
                    }`}
                  >
                    {activeClub.joined ? 'Keluar dari Klub' : 'Gabung Klub'}
                  </button>
                </div>

                <div className="space-y-3">
                  {activeClub.posts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#F8F5EE] dark:bg-[#141716] p-4"
                    >
                      <div className="flex items-center justify-between text-xs text-[#52565E] dark:text-[#A4ABA8]">
                        <span className="font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                          {post.author} · <span className="font-normal text-[#52565E] dark:text-[#A4ABA8]">{post.campus}</span>
                        </span>
                        <span>{post.timeAgo}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#22252A]/90 dark:text-[#F2EFE8]/90">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleClubSubmit} className="flex gap-2 border-t border-[#DFD8C8] dark:border-[#272D2A] pt-4">
                <input
                  type="text"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Tulis tanggapan atau catatan bab untuk diskusi klub..."
                  aria-label="Tulis pesan diskusi klub"
                  className="flex-1 rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#F8F5EE] dark:bg-[#141716] px-3.5 py-2.5 text-sm text-[#22252A] dark:text-[#F2EFE8] placeholder:text-[#52565E] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E3F32] dark:bg-[#68B894] px-4 py-2.5 text-sm font-semibold text-[#F8F5EE] dark:text-[#141716] hover:bg-[#163026] dark:hover:bg-[#7CC7A5] transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="h-4 w-4" />
                  <span>Kirim</span>
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {/* Section 2: Quote Card Studio */}
      {section === 'quotes' && (
        <section aria-label="Studio kartu kutipan" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                Studio Kartu Kutipan
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Pilih kutipan favorit dari koleksi atau sunting teksnya, lalu bagikan ke Instagram Story maupun grup kuliah.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                Pilih kutipan dari buku
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {presetQuotes.map((item, index) => {
                  const selected = selectedQuoteText === item.text;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedQuoteText(item.text);
                        setSelectedQuoteBook(item.bookTitle);
                        setSelectedQuoteAuthor(item.author);
                      }}
                      className={`w-full rounded-lg border p-3 text-left text-xs transition-colors ${
                        selected
                          ? 'border-[#1E3F32] dark:border-[#68B894] bg-[#F8F5EE] dark:bg-[#141716]'
                          : 'border-[#E2DCCE] dark:border-[#272D2A] hover:bg-[#F8F5EE]/70 dark:hover:bg-[#141716]/70'
                      }`}
                    >
                      <p className="font-serif italic text-[#22252A] dark:text-[#F2EFE8] line-clamp-2">
                        "{item.text}"
                      </p>
                      <p className="mt-1 text-[11px] text-[#52565E] dark:text-[#A4ABA8]">
                        {item.bookTitle} · {item.author}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="custom-quote-input" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                Atau sunting kutipan pilihanmu
              </label>
              <textarea
                id="custom-quote-input"
                rows={3}
                value={selectedQuoteText}
                onChange={(e) => setSelectedQuoteText(e.target.value)}
                className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#F8F5EE] dark:bg-[#141716] p-3 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                Pilih gaya visual kartu
              </span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'paper', label: 'Krem Hangat' },
                    { id: 'forest', label: 'Hutan Loka' },
                    { id: 'terracotta', label: 'Terakota Senja' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setQuoteTheme(t.id)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                      quoteTheme === t.id
                        ? 'bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716]'
                        : 'border border-[#DCD4C4] dark:border-[#2C3330] text-[#22252A] dark:text-[#F2EFE8]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className={`flex min-h-[340px] flex-col justify-between rounded-xl border p-8 sm:p-10 transition-colors ${
                quoteTheme === 'paper'
                  ? 'border-[#DFD6C3] bg-[#F8F5EE] text-[#22252A]'
                  : quoteTheme === 'forest'
                  ? 'border-[#1E3F32] bg-[#1E3F32] text-[#F8F5EE]'
                  : 'border-[#B86D45] bg-[#C87D55] text-[#1E2024]'
              }`}
            >
              <div className="flex items-center justify-between text-xs opacity-75">
                <span className="font-display font-semibold tracking-tight">Loka Pustaka</span>
                <span>Kutipan Pilihan</span>
              </div>

              <blockquote className="my-8 font-serif text-xl sm:text-2xl italic leading-relaxed">
                “{selectedQuoteText}”
              </blockquote>

              <div className="border-t border-current/20 pt-4">
                <p className="font-display text-sm font-semibold">{selectedQuoteBook}</p>
                <p className="text-xs opacity-80">{selectedQuoteAuthor}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">
                Membagikan kutipan otomatis menambah progres lencana Kolektor Kutipan.
              </p>
              <button
                type="button"
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-2 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-5 py-2.5 text-sm font-semibold text-[#1E2024] transition-colors whitespace-nowrap shrink-0"
              >
                {copiedQuote ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedQuote ? 'Kutipan Tersalin!' : 'Salin & Bagikan Kutipan'}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Book Reviews */}
      {section === 'reviews' && (
        <section aria-label="Ulasan pembaca" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
              <article
                key={rev.id}
                className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-5 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-[#1E3F32] dark:text-[#68B894] font-semibold">
                      {rev.bookTitle} · {rev.vibeNote}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                      {rev.reviewer}{' '}
                      <span className="font-normal text-[#52565E] dark:text-[#A4ABA8]">
                        · {rev.campus}
                      </span>
                    </p>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-[#52565E] dark:text-[#A4ABA8]">
                    ★ {rev.rating}.0 · {rev.createdAt}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#22252A]/90 dark:text-[#F2EFE8]/90">
                  {rev.comment}
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onToggleReviewLike(rev.id)}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      rev.likedByMe
                        ? 'border-[#1E3F32] dark:border-[#68B894] bg-[#1E3F32]/10 dark:bg-[#68B894]/15 text-[#1E3F32] dark:text-[#68B894]'
                        : 'border-[#DCD4C4] dark:border-[#2C3330] text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8]'
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="tabular-nums">Membantu ({rev.likes})</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="lg:col-span-5 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-6 space-y-4"
          >
            <h2 className="font-display text-xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
              Tulis Ulasan Singkat
            </h2>

            <div className="space-y-1.5">
              <label htmlFor="rev-book" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                Buku yang diulas
              </label>
              <select
                id="rev-book"
                value={reviewBookId}
                onChange={(e) => setReviewBookId(e.target.value)}
                className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#F8F5EE] dark:bg-[#141716] px-3 py-2.5 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="rev-vibe" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                  Suasana (1–2 kata)
                </label>
                <input
                  id="rev-vibe"
                  type="text"
                  value={reviewVibe}
                  onChange={(e) => setReviewVibe(e.target.value)}
                  placeholder="Misal: Bikin Tenang"
                  className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#F8F5EE] dark:bg-[#141716] px-3 py-2 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="rev-rating" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                  Penilaian
                </label>
                <select
                  id="rev-rating"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#F8F5EE] dark:bg-[#141716] px-3 py-2 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
                >
                  <option value={5}>5 — Sangat Direkomendasikan</option>
                  <option value={4}>4 — Layak Dibaca</option>
                  <option value={3}>3 — Cukup Menarik</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="rev-comment" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                Ulasan jujurmu
              </label>
              <textarea
                id="rev-comment"
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Ceritakan kenapa buku ini cocok (atau kurang cocok) untuk teman kampusmu..."
                className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#F8F5EE] dark:bg-[#141716] p-3 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-4 py-2.5 text-sm font-semibold text-[#1E2024] transition-colors"
            >
              Terbitkan Ulasan
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
