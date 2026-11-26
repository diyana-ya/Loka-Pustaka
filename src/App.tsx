/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  BOOKS,
  INITIAL_BADGES,
  INITIAL_CLUBS,
  INITIAL_REVIEWS,
  type Book,
  type BadgeItem,
  type BookClub,
  type BookReview,
} from './data/libraryData';
import { Navbar, type ActiveTab } from './components/Navbar';
import { DiscoverView } from './components/DiscoverView';
import { MyShelfView } from './components/MyShelfView';
import { GamificationView } from './components/GamificationView';
import { CommunityView } from './components/CommunityView';
import { OnboardingModal } from './components/OnboardingModal';
import { BookDetailModal } from './components/BookDetailModal';
import { ReaderOverlay } from './components/ReaderOverlay';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDark, setIsDark] = useState(false);

  // User profile & onboarding state
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userCampus, setUserCampus] = useState('Universitas Indonesia');
  const [preferredGenres, setPreferredGenres] = useState<string[]>([
    'Fiksi & Sastra',
    'Psikologi',
  ]);
  const [dailyGoal, setDailyGoal] = useState(15);

  // Catalog, borrowing & reader state
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const [borrowedIds, setBorrowedIds] = useState<string[]>([
    'senja-di-ujung-sudirman',
    'ritme-pagi-kebiasaan',
  ]);
  const [waitlistIds, setWaitlistIds] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  // Gamification state
  const [streakDays, setStreakDays] = useState(6);
  const [todayLogged, setTodayLogged] = useState(false);
  const [minutesReadThisMonth, setMinutesReadThisMonth] = useState(345);
  const [booksCompletedThisMonth, setBooksCompletedThisMonth] = useState(3);
  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);

  // Community state
  const [clubs, setClubs] = useState<BookClub[]>(INITIAL_CLUBS);
  const [reviews, setReviews] = useState<BookReview[]>(INITIAL_REVIEWS);
  const [sharedQuote, setSharedQuote] = useState<{
    text: string;
    bookTitle: string;
    author: string;
  } | null>(null);

  // Subtle inline toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const handleToggleBorrow = (book: Book) => {
    const currentlyBorrowed = borrowedIds.includes(book.id);
    if (currentlyBorrowed) {
      setBorrowedIds((prev) => prev.filter((id) => id !== book.id));
      setBooks((prev) =>
        prev.map((b) =>
          b.id === book.id
            ? { ...b, copiesAvailable: Math.min(b.totalCopies, b.copiesAvailable + 1) }
            : b
        )
      );
      setSelectedBook((curr) =>
        curr && curr.id === book.id
          ? { ...curr, copiesAvailable: Math.min(curr.totalCopies, curr.copiesAvailable + 1) }
          : curr
      );
      showToast(`"${book.title}" dikembalikan ke rak digital.`);
    } else {
      if (book.copiesAvailable <= 0) return;
      setBorrowedIds((prev) => [...prev, book.id]);
      setBooks((prev) =>
        prev.map((b) =>
          b.id === book.id
            ? { ...b, copiesAvailable: Math.max(0, b.copiesAvailable - 1) }
            : b
        )
      );
      setSelectedBook((curr) =>
        curr && curr.id === book.id
          ? { ...curr, copiesAvailable: Math.max(0, curr.copiesAvailable - 1) }
          : curr
      );
      showToast(`Berhasil meminjam "${book.title}" untuk 14 hari.`);
    }
  };

  const handleToggleWaitlist = (book: Book) => {
    const exists = waitlistIds.includes(book.id);
    if (exists) {
      setWaitlistIds((prev) => prev.filter((id) => id !== book.id));
      showToast(`Keluar dari antrean "${book.title}".`);
    } else {
      setWaitlistIds((prev) => [...prev, book.id]);
      showToast(`Kamu masuk Antrean Pintar untuk "${book.title}".`);
    }
  };

  const handleLogReadingSession = (bookId?: string) => {
    if (!todayLogged) {
      setTodayLogged(true);
      setStreakDays((d) => d + 1);
      setBadges((prev) =>
        prev.map((badge) =>
          badge.id === 'streak-7'
            ? { ...badge, progress: badge.goal, unlocked: true }
            : badge
        )
      );
      showToast('Sesi baca tercatat! Streak harianmu naik menjadi 7 hari.');
    } else {
      showToast('Tambahan +15 menit membaca berhasil dicatat ke Tantangan Bulanan.');
    }

    setMinutesReadThisMonth((m) => m + 15);

    if (bookId) {
      setBooks((prev) =>
        prev.map((b) => {
          if (b.id !== bookId) return b;
          const nextPct = Math.min(100, (b.progressPercent ?? 10) + 18);
          if (nextPct === 100 && (b.progressPercent ?? 0) < 100) {
            setBooksCompletedThisMonth((c) => c + 1);
          }
          return { ...b, progressPercent: nextPct };
        })
      );
    }
  };

  const handleShareQuote = (text: string, bookTitle: string, author: string) => {
    setSelectedBook(null);
    setReadingBook(null);
    setSharedQuote({ text, bookTitle, author });
    setActiveTab('clubs');
  };

  const handleShareQuoteCount = () => {
    setBadges((prev) =>
      prev.map((badge) => {
        if (badge.id !== 'quote-curator') return badge;
        const nextProgress = Math.min(badge.goal, badge.progress + 1);
        return {
          ...badge,
          progress: nextProgress,
          unlocked: nextProgress >= badge.goal,
        };
      })
    );
    showToast('Kutipan disalin dan siap dibagikan.');
  };

  const handleToggleJoinClub = (clubId: string) => {
    setClubs((prev) =>
      prev.map((club) => {
        if (club.id !== clubId) return club;
        const joining = !club.joined;
        showToast(
          joining
            ? `Berhasil bergabung ke ${club.name}.`
            : `Kamu keluar dari ${club.name}.`
        );
        return {
          ...club,
          joined: joining,
          membersCount: joining ? club.membersCount + 1 : club.membersCount - 1,
        };
      })
    );
  };

  const handleAddClubPost = (clubId: string, content: string) => {
    const authorName = userName || 'Mahasiswa Tamu';
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId
          ? {
              ...club,
              posts: [
                ...club.posts,
                {
                  id: `post-${Date.now()}`,
                  author: authorName,
                  campus: userCampus,
                  timeAgo: 'Baru saja',
                  content,
                },
              ],
            }
          : club
      )
    );
  };

  const handleToggleReviewLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId
          ? {
              ...rev,
              likedByMe: !rev.likedByMe,
              likes: rev.likedByMe ? rev.likes - 1 : rev.likes + 1,
            }
          : rev
      )
    );
  };

  const handleAddReview = (
    bookId: string,
    vibeNote: string,
    comment: string,
    rating: number
  ) => {
    const targetBook = books.find((b) => b.id === bookId) || books[0];
    const newReview: BookReview = {
      id: `rev-${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      reviewer: userName || 'Mahasiswa Tamu',
      campus: userCampus,
      rating,
      vibeNote,
      comment,
      likes: 1,
      likedByMe: true,
      createdAt: 'Baru saja',
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Ulasanmu telah diterbitkan untuk pembaca lain.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] dark:bg-[#141716] text-[#22252A] dark:text-[#F2EFE8]">
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        userName={userName}
      />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 pt-6 sm:px-6 lg:px-8 sm:pt-8">
        {activeTab === 'home' && (
          <DiscoverView
            books={books}
            borrowedIds={borrowedIds}
            waitlistIds={waitlistIds}
            isDark={isDark}
            onToggleDark={() => setIsDark((d) => !d)}
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenReader={(book) => setReadingBook(book)}
            onOpenShelf={() => setActiveTab('shelf')}
            preferredGenres={preferredGenres}
            userName={userName}
          />
        )}

        {activeTab === 'shelf' && (
          <MyShelfView
            books={books}
            borrowedIds={borrowedIds}
            waitlistIds={waitlistIds}
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenReader={(book) => setReadingBook(book)}
            onToggleBorrow={handleToggleBorrow}
            onToggleWaitlist={handleToggleWaitlist}
            onGoHome={() => setActiveTab('home')}
            isDark={isDark}
            onToggleDark={() => setIsDark((d) => !d)}
            userName={userName}
            userCampus={userCampus}
            dailyGoal={dailyGoal}
          />
        )}

        {activeTab === 'challenges' && (
          <GamificationView
            streakDays={streakDays}
            minutesReadThisMonth={minutesReadThisMonth}
            booksCompletedThisMonth={booksCompletedThisMonth}
            monthlyBookGoal={5}
            todayLogged={todayLogged}
            onLogReadingSession={() => handleLogReadingSession()}
            badges={badges}
            userName={userName}
            userCampus={userCampus}
          />
        )}

        {activeTab === 'clubs' && (
          <CommunityView
            books={books}
            clubs={clubs}
            reviews={reviews}
            onToggleJoinClub={handleToggleJoinClub}
            onAddClubPost={handleAddClubPost}
            onToggleReviewLike={handleToggleReviewLike}
            onAddReview={handleAddReview}
            initialQuote={sharedQuote}
            onShareQuoteCount={handleShareQuoteCount}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E2DCCE] dark:border-[#272D2A] pb-20 md:pb-8 pt-6 mt-auto">
        <div className="mx-auto flex max-w-[1280px] flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs text-[#52565E] dark:text-[#A4ABA8]">
          <p>
            Loka Pustaka · Ruang Baca & Diskusi Mahasiswa
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('shelf')}
              className="hover:text-[#22252A] dark:hover:text-[#F2EFE8] transition-colors"
            >
              Rak Saya
            </button>
            <button
              type="button"
              onClick={() => setOnboardingOpen(true)}
              className="hover:text-[#22252A] dark:hover:text-[#F2EFE8] transition-colors"
            >
              Daftar Anggota
            </button>
            <button
              type="button"
              onClick={() => setIsDark((d) => !d)}
              className="hover:text-[#22252A] dark:hover:text-[#F2EFE8] transition-colors"
            >
              {isDark ? 'Tema Krem Hangat' : 'Tema Malam Teduh'}
            </button>
          </div>
        </div>
      </footer>

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 max-w-sm rounded-lg border border-[#1E3F32] bg-[#1E3F32] px-4 py-3 text-xs sm:text-sm font-medium text-[#F8F5EE] shadow-lg"
        >
          {toastMessage}
        </div>
      )}

      {/* Modals & Reader Overlay */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialName={userName || ''}
        initialCampus={userCampus}
        initialGenres={preferredGenres}
        initialDailyGoal={dailyGoal}
        onComplete={(data) => {
          setUserName(data.name);
          setUserCampus(data.campus);
          setPreferredGenres(data.genres);
          setDailyGoal(data.dailyGoal);
          setActiveTab('home');
          showToast(`Selamat datang, ${data.name}! Rak personalmu sudah aktif.`);
        }}
      />

      <BookDetailModal
        book={selectedBook}
        isBorrowed={selectedBook ? borrowedIds.includes(selectedBook.id) : false}
        isWaitlisted={selectedBook ? waitlistIds.includes(selectedBook.id) : false}
        onClose={() => setSelectedBook(null)}
        onToggleBorrow={handleToggleBorrow}
        onToggleWaitlist={handleToggleWaitlist}
        onOpenReader={(book) => {
          setSelectedBook(null);
          setReadingBook(book);
        }}
        onShareQuote={handleShareQuote}
      />

      <ReaderOverlay
        book={readingBook}
        onClose={() => setReadingBook(null)}
        onFinishChapter={(bookId) => handleLogReadingSession(bookId)}
        onShareQuote={handleShareQuote}
      />
    </div>
  );
}
