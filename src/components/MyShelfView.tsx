import { BookOpen, Clock, RotateCcw, Eye, ArrowRight } from 'lucide-react';
import type { Book } from '../data/libraryData';
import { BookCover } from './BookCover';

interface MyShelfViewProps {
  books: Book[];
  borrowedIds: string[];
  waitlistIds: string[];
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onToggleBorrow: (book: Book) => void;
  onToggleWaitlist: (book: Book) => void;
  onGoHome: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  userName: string | null;
  userCampus: string;
  dailyGoal: number;
}

export function MyShelfView({
  books,
  borrowedIds,
  waitlistIds,
  onSelectBook,
  onOpenReader,
  onToggleBorrow,
  onToggleWaitlist,
  onGoHome,
  isDark,
  onToggleDark,
  userName,
  userCampus,
  dailyGoal,
}: MyShelfViewProps) {
  const borrowedBooks = books.filter((b) => borrowedIds.includes(b.id));
  const waitlistedBooks = books.filter((b) => waitlistIds.includes(b.id));

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DCCE] dark:border-[#272D2A] pb-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#1E3F32] dark:text-[#68B894]">
            {userName ? `${userName} · ${userCampus}` : 'Rak Pribadi Anggota Loka Pustaka'}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#22252A] dark:text-[#F2EFE8]">
            Rak Saya & Daftar Pinjaman
          </h1>
          <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
            Kelola buku yang sedang dipinjam, pantau antrean otomatis, dan atur kenyamanan layar baca.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleDark}
            className="inline-flex items-center gap-2 rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#EFEAE0] dark:bg-[#1B201E] px-4 py-2 text-xs sm:text-sm font-medium text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#E5DFD2] dark:hover:bg-[#232927] transition-colors whitespace-nowrap"
          >
            <Eye className="h-4 w-4" />
            <span>{isDark ? 'Tampilan Krem Hangat' : 'Tampilan Malam Teduh'}</span>
          </button>
        </div>
      </section>

      {/* Active Summary Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-5">
          <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Sedang Dipinjam</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
            {borrowedBooks.length} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">/ 5 slot</span>
          </p>
          <p className="mt-1 text-xs text-[#52565E] dark:text-[#A4ABA8]">
            Pengembalian otomatis setelah 14 hari
          </p>
        </div>

        <div className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-5">
          <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Antrean Buku</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
            {waitlistedBooks.length} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">judul</span>
          </p>
          <p className="mt-1 text-xs text-[#52565E] dark:text-[#A4ABA8]">
            Notifikasi otomatis saat giliran tiba
          </p>
        </div>

        <div className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-5">
          <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Target Baca Harian</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
            {dailyGoal} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">menit/hari</span>
          </p>
          <p className="mt-1 text-xs text-[#52565E] dark:text-[#A4ABA8]">
            Mode layar bebas silau aktif
          </p>
        </div>
      </section>

      {/* Borrowed Books List */}
      <section aria-label="Buku sedang dipinjam" className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
          Sedang Kamu Baca ({borrowedBooks.length})
        </h2>

        {borrowedBooks.length === 0 ? (
          <div className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-8 text-center space-y-3">
            <p className="font-display text-lg font-semibold text-[#22252A] dark:text-[#F2EFE8]">
              Belum ada buku yang sedang dipinjam
            </p>
            <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
              Pilih bacaan dari beranda dan pinjam dengan satu ketukan tanpa biaya denda.
            </p>
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-4 py-2 text-sm font-semibold text-[#1E2024] transition-colors"
            >
              <span>Jelajahi Koleksi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {borrowedBooks.map((book) => {
              const progress = book.progressPercent ?? 15;
              return (
                <div
                  key={book.id}
                  className="flex gap-4 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-4"
                >
                  <button
                    type="button"
                    onClick={() => onOpenReader(book)}
                    className="w-24 shrink-0"
                  >
                    <BookCover book={book} className="aspect-[3/4] w-full" />
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">
                        {book.category} · Sisa masa pinjam 11 hari
                      </p>
                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="mt-1 block w-full text-left font-display text-lg font-semibold text-[#22252A] dark:text-[#F2EFE8] truncate hover:underline"
                      >
                        {book.title}
                      </button>
                      <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">
                        {book.author}
                      </p>
                    </div>

                    <div className="mt-3 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums text-[#52565E] dark:text-[#A4ABA8]">
                        <span>Progres {progress}%</span>
                        <span>{book.pages} hlm</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#DFD8C8] dark:bg-[#2A312E]">
                        <div
                          className="h-full rounded-full bg-[#1E3F32] dark:bg-[#68B894]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onOpenReader(book)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-3.5 py-1.5 text-xs font-semibold text-[#1E2024] transition-colors"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Lanjut Baca</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleBorrow(book)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] px-3 py-1.5 text-xs font-medium text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#E5DFD2] dark:hover:bg-[#232927] transition-colors"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Kembalikan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Waitlisted Books */}
      <section aria-label="Antrean buku" className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
          Daftar Antrean Pintar ({waitlistedBooks.length})
        </h2>

        {waitlistedBooks.length === 0 ? (
          <div className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-transparent p-6 text-sm text-[#52565E] dark:text-[#A4ABA8]">
            Tidak ada buku dalam antrean saat ini. Jika salinan digital buku favoritmu sedang penuh, kamu bisa masuk antrean dari halaman detail buku.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {waitlistedBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 shrink-0">
                    <BookCover book={book} className="aspect-[3/4] w-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#A85933] dark:text-[#E09B76] inline-flex items-center gap-1 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Estimasi tersedia ~2 hari</span>
                    </p>
                    <h3 className="font-display text-base font-semibold text-[#22252A] dark:text-[#F2EFE8] truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#52565E] dark:text-[#A4ABA8] truncate">
                      {book.author}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleWaitlist(book)}
                  className="rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] px-3 py-1.5 text-xs font-medium text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#E5DFD2] dark:hover:bg-[#232927] whitespace-nowrap shrink-0"
                >
                  Batalkan
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
