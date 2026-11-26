import { useMemo, useState } from 'react';
import { Search, Sun, Moon, Headphones, BookOpen, ArrowRight, Bookmark } from 'lucide-react';
import { HERO_LIBRARY_IMAGE, type Book, type BookCategory } from '../data/libraryData';
import { BookCover } from './BookCover';

interface DiscoverViewProps {
  books: Book[];
  borrowedIds: string[];
  waitlistIds: string[];
  isDark: boolean;
  onToggleDark: () => void;
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onOpenShelf: () => void;
  preferredGenres: string[];
  userName: string | null;
}

const CATEGORIES: BookCategory[] = [
  'Semua',
  'Fiksi & Sastra',
  'Psikologi',
  'Riset & Skripsi',
  'Teknologi & Desain',
  'Sci-Fi',
];

export function DiscoverView({
  books,
  borrowedIds,
  waitlistIds,
  isDark,
  onToggleDark,
  onSelectBook,
  onOpenReader,
  onOpenShelf,
  preferredGenres,
  userName,
}: DiscoverViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('Semua');

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCat = selectedCategory === 'Semua' || book.category === selectedCategory;
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.vibe.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [books, searchQuery, selectedCategory]);

  const continueBooks = useMemo(
    () => books.filter((b) => borrowedIds.includes(b.id) || (b.progressPercent && b.progressPercent > 0)),
    [books, borrowedIds]
  );

  const thesisShelf = useMemo(
    () => books.filter((b) => b.shelfTags.includes('thesis')),
    [books]
  );

  const bedtimeShelf = useMemo(
    () => books.filter((b) => b.shelfTags.includes('bedtime')),
    [books]
  );

  const featuredBook = books[0];
  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== 'Semua';

  const catalogExemplars = useMemo(
    () => books.reduce((sum, b) => sum + b.totalCopies, 0),
    [books]
  );
  const catalogAvailable = useMemo(
    () => books.reduce((sum, b) => sum + b.copiesAvailable, 0),
    [books]
  );
  const catalogLoaned = catalogExemplars - catalogAvailable;

  // Skala koleksi konsorsium kampus + pembaruan langsung dari aksi pinjam/kembali
  const totalTitles = 1236 + books.length;
  const totalExemplars = 4780 + catalogExemplars;
  const totalLoaned = 1460 + catalogLoaned;
  const totalAvailable = totalExemplars - totalLoaned;

  const formatNum = (n: number) => n.toLocaleString('id-ID');

  return (
    <div className="space-y-10 pb-16">
      {/* Workspace Toolbar: Search, Category Filters, Eye-Care Theme Switch */}
      <section aria-label="Pencarian dan filter koleksi" className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52565E] dark:text-[#A4ABA8]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, penulis, atau suasana bacaan (misal: tenang, skripsi)..."
              aria-label="Cari buku"
              className="w-full rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] py-2.5 pl-10 pr-4 text-sm text-[#22252A] dark:text-[#F2EFE8] placeholder:text-[#52565E] dark:placeholder:text-[#A4ABA8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={onToggleDark}
            className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#E5DFD2] dark:hover:bg-[#232927] transition-colors whitespace-nowrap shrink-0"
          >
            {isDark ? <Sun className="h-4 w-4 text-[#C87D55]" /> : <Moon className="h-4 w-4 text-[#1E3F32]" />}
            <span>{isDark ? 'Mode Krem Hangat' : 'Mode Malam Teduh'}</span>
          </button>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716]'
                    : 'bg-[#EFEAE0] dark:bg-[#1B201E] text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Hero Spotlight + Live Catalog Summary Strip */}
      {!isFiltering && (
        <div className="space-y-4">
          <section
            aria-label="Sorotan utama"
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E]"
          >
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-wide text-[#1E3F32] dark:text-[#68B894]">
                  {userName
                    ? `Kurasi untuk ${userName} · ${preferredGenres.slice(0, 2).join(' / ')}`
                    : 'Pilihan Kampus Minggu Ini · Loka Pustaka'}
                </p>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.12] tracking-tight text-[#22252A] dark:text-[#F2EFE8]">
                  Temukan bacaan yang pas untuk setiap suasana harimu
                </h1>

                <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#52565E] dark:text-[#A4ABA8]">
                  Dari fiksi teman perjalanan pulang hingga referensi skripsi yang terstruktur. Pinjam langsung dalam satu ketukan dengan layar krem hangat yang nyaman bagi mata.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenReader(featuredBook)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-5 py-2.5 text-sm font-semibold text-[#1E2024] transition-colors whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Baca Sekarang</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenShelf}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#1E3F32]/30 dark:border-[#68B894]/35 px-4 py-2.5 text-sm font-medium text-[#1E3F32] dark:text-[#68B894] hover:bg-[#1E3F32]/10 dark:hover:bg-[#68B894]/10 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Buka Rak Saya</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[#DFD8C8] dark:border-[#272D2A] pt-4 text-xs text-[#52565E] dark:text-[#A4ABA8]">
                  <span>Pinjam instan 1-tap</span>
                  <span aria-hidden="true">·</span>
                  <span>Ringkasan audio 12 menit</span>
                  <span aria-hidden="true">·</span>
                  <span>Layar bebas silau</span>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-6 min-h-[260px] lg:min-h-[380px]">
              <img
                src={HERO_LIBRARY_IMAGE}
                alt="Mahasiswa membaca di ruang perpustakaan yang tenang dan bercahaya hangat"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover lg:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/45 lg:via-transparent lg:to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between gap-4 text-[#F8F5EE]">
                <div>
                  <p className="text-xs text-[#E5DFD2]">Sedang populer di ruang baca</p>
                  <p className="font-display text-lg font-semibold">{featuredBook.title}</p>
                  <p className="text-xs text-[#E5DFD2]/90">
                    {featuredBook.author} · {featuredBook.audioSummaryMinutes} mnt ringkasan audio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectBook(featuredBook)}
                  className="rounded-lg bg-[#F8F5EE] px-3.5 py-2 text-xs font-semibold text-[#22252A] hover:bg-white transition-colors whitespace-nowrap shrink-0"
                >
                  Detail Buku
                </button>
              </div>
            </div>
          </section>

          {/* Ringkasan Koleksi & Sirkulasi Loka Pustaka */}
          <section
            aria-label="Ringkasan koleksi perpustakaan"
            className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#DFD8C8] dark:divide-[#272D2A] rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E]"
          >
            <div className="p-4 sm:p-5">
              <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Total Judul Buku</p>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                {formatNum(totalTitles)} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">judul</span>
              </p>
              <p className="mt-1 text-xs text-[#52565E] dark:text-[#A4ABA8]">
                Lintas {CATEGORIES.length - 1} bidang & arsip kampus
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Eksemplar Terdata</p>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                {formatNum(totalExemplars)} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">salinan</span>
              </p>
              <p className="mt-1 text-xs text-[#52565E] dark:text-[#A4ABA8]">
                E-book, jurnal & audio ringkas
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenShelf}
              className="p-4 sm:p-5 text-left hover:bg-[#E5DFD2]/60 dark:hover:bg-[#232927]/60 transition-colors"
            >
              <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Sedang Dipinjam</p>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#A85933] dark:text-[#E09B76]">
                {formatNum(totalLoaned)} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">salinan</span>
              </p>
              <p className="mt-1 text-xs font-medium text-[#1E3F32] dark:text-[#68B894]">
                {borrowedIds.length} di rak pinjamanmu →
              </p>
            </button>

            <div className="p-4 sm:p-5">
              <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">Siap Dipinjam Sekarang</p>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#1E3F32] dark:text-[#68B894]">
                {formatNum(totalAvailable)} <span className="text-sm font-normal text-[#52565E] dark:text-[#A4ABA8]">salinan</span>
              </p>
              <p className="mt-1 text-xs text-[#52565E] dark:text-[#A4ABA8]">
                Pinjam instan 14 hari tanpa denda
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Search / Category Filtered Grid */}
      {isFiltering ? (
        <section aria-label="Hasil pencarian" className="space-y-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
              Hasil Kurasi ({filteredBooks.length})
            </h2>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="text-xs font-semibold text-[#1E3F32] dark:text-[#68B894] hover:underline whitespace-nowrap"
            >
              Atur ulang filter
            </button>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-10 text-center">
              <p className="font-display text-lg font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                Belum ada judul yang cocok dengan pencarianmu
              </p>
              <p className="mt-1 text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Coba kata kunci lain seperti fiksi, skripsi, fokus, atau pilih kategori Semua.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isBorrowed={borrowedIds.includes(book.id)}
                  isWaitlisted={waitlistIds.includes(book.id)}
                  onClick={() => onSelectBook(book)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Shelf 1: Lanjutkan Membaca */}
          <section aria-label="Lanjutkan membaca" className="space-y-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                Lanjutkan Membaca
              </h2>
              <p className="text-xs sm:text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Progres halaman dan catatanmu tersimpan otomatis di semua perangkat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {continueBooks.slice(0, 3).map((book) => {
                const progress = book.progressPercent ?? 12;
                return (
                  <div
                    key={book.id}
                    className="group flex gap-4 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-3.5 transition-colors hover:border-[#C87D55]/60"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenReader(book)}
                      className="w-20 shrink-0 text-left"
                    >
                      <BookCover book={book} className="aspect-[3/4] w-full" />
                    </button>

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div>
                        <p className="text-[11px] text-[#52565E] dark:text-[#A4ABA8] truncate">
                          {book.category} · {book.vibe}
                        </p>
                        <button
                          type="button"
                          onClick={() => onSelectBook(book)}
                          className="mt-1 block w-full text-left font-display text-base font-semibold text-[#22252A] dark:text-[#F2EFE8] truncate hover:underline"
                        >
                          {book.title}
                        </button>
                        <p className="text-xs text-[#52565E] dark:text-[#A4ABA8] truncate">
                          {book.author}
                        </p>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[#52565E] dark:text-[#A4ABA8] font-mono tabular-nums">
                          <span>{progress}% selesai</span>
                          <span>~{Math.max(8, Math.round(book.readingTimeMinutes * (1 - progress / 100)))} mnt lagi</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#DFD8C8] dark:bg-[#2A312E]">
                          <div
                            className="h-full rounded-full bg-[#1E3F32] dark:bg-[#68B894]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => onOpenReader(book)}
                            className="rounded-md bg-[#C87D55] hover:bg-[#B86D45] px-3 py-1.5 text-xs font-semibold text-[#1E2024] transition-colors whitespace-nowrap"
                          >
                            Lanjut Baca
                          </button>
                          <button
                            type="button"
                            onClick={() => onSelectBook(book)}
                            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8] whitespace-nowrap"
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Shelf 2: Rak Kurasi Kampus */}
          <section aria-label="Biar skripsi tidak buntu" className="space-y-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                Biar Skripsi & Riset Nggak Buntu
              </h2>
              <p className="text-xs sm:text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Referensi metodologi, fokus kognitif, dan ergonomi belajar untuk mahasiswa
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {thesisShelf.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isBorrowed={borrowedIds.includes(book.id)}
                  isWaitlisted={waitlistIds.includes(book.id)}
                  onClick={() => onSelectBook(book)}
                />
              ))}
            </div>
          </section>

          {/* Shelf 3: Bacaan Malam & Komuter */}
          <section aria-label="Bacaan sebelum tidur" className="space-y-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                Bacaan 15 Menit Sebelum Tidur
              </h2>
              <p className="text-xs sm:text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Fiksi hangat dan esai ringan yang dirancang bebas ketegangan mata
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {bedtimeShelf.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isBorrowed={borrowedIds.includes(book.id)}
                  isWaitlisted={waitlistIds.includes(book.id)}
                  onClick={() => onSelectBook(book)}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

interface BookCardProps {
  book: Book;
  isBorrowed: boolean;
  isWaitlisted: boolean;
  onClick: () => void;
}

function BookCard({ book, isBorrowed, isWaitlisted, onClick }: BookCardProps) {
  const availabilityLabel = isBorrowed
    ? 'Sedang dipinjam'
    : isWaitlisted
    ? 'Dalam antreanmu'
    : book.copiesAvailable > 0
    ? `Tersedia (${book.copiesAvailable})`
    : 'Antre otomatis';

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3F32]"
    >
      <BookCover book={book} className="aspect-[3/4] w-full" />

      <div className="mt-3 space-y-1">
        <p className="text-xs text-[#52565E] dark:text-[#A4ABA8] truncate">
          {book.category} · {book.vibe}
        </p>

        <h3 className="font-display text-base font-semibold leading-snug text-[#22252A] dark:text-[#F2EFE8] group-hover:text-[#1E3F32] dark:group-hover:text-[#68B894] transition-colors line-clamp-1">
          {book.title}
        </h3>

        <p className="text-xs text-[#52565E] dark:text-[#A4ABA8] truncate">
          {book.author}
        </p>

        <div className="flex items-center gap-2 pt-1 text-[11px] font-mono tabular-nums text-[#52565E] dark:text-[#A4ABA8]">
          <span className="inline-flex items-center gap-1">
            <Headphones className="h-3 w-3" />
            <span>{book.audioSummaryMinutes}m</span>
          </span>
          <span aria-hidden="true">·</span>
          <span
            className={`inline-flex items-center gap-1 ${
              isBorrowed
                ? 'text-[#1E3F32] dark:text-[#68B894] font-semibold'
                : book.copiesAvailable === 0 && !isWaitlisted
                ? 'text-[#A85933] dark:text-[#E09B76] font-medium'
                : ''
            }`}
          >
            {isBorrowed && <Bookmark className="h-3 w-3" />}
            <span>{availabilityLabel}</span>
          </span>
        </div>
      </div>
    </button>
  );
}
