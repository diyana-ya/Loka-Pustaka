import { X, BookOpen, BookmarkCheck, Clock, Headphones, Quote } from 'lucide-react';
import type { Book } from '../data/libraryData';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  isBorrowed: boolean;
  isWaitlisted: boolean;
  onClose: () => void;
  onToggleBorrow: (book: Book) => void;
  onToggleWaitlist: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onShareQuote: (text: string, bookTitle: string, author: string) => void;
}

export function BookDetailModal({
  book,
  isBorrowed,
  isWaitlisted,
  onClose,
  onToggleBorrow,
  onToggleWaitlist,
  onOpenReader,
  onShareQuote,
}: BookDetailModalProps) {
  if (!book) return null;

  const canBorrow = book.copiesAvailable > 0 || isBorrowed;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#22252A]/60 p-4 backdrop-blur-xs"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#F8F5EE] dark:bg-[#141716] p-6 sm:p-8 shadow-xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail buku"
            className="rounded-lg p-2 text-[#52565E] dark:text-[#A4ABA8] hover:bg-[#EFEAE0] dark:hover:bg-[#1B201E] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
          <div className="sm:col-span-4">
            <BookCover book={book} className="aspect-[3/4] w-full max-w-[220px] mx-auto sm:max-w-none" />
          </div>

          <div className="sm:col-span-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#1E3F32] dark:text-[#68B894]">
                {book.category} · {book.vibe}
              </p>
              <h2
                id="book-detail-title"
                className="font-display text-2xl sm:text-3xl font-bold leading-tight text-[#22252A] dark:text-[#F2EFE8]"
              >
                {book.title}
              </h2>
              <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Oleh <strong className="font-semibold text-[#22252A] dark:text-[#F2EFE8]">{book.author}</strong> · Terbit {book.year}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-[#E2DCCE] dark:border-[#272D2A] py-3 text-xs font-mono tabular-nums text-[#52565E] dark:text-[#A4ABA8]">
                <span>★ {book.rating}</span>
                <span aria-hidden="true">·</span>
                <span>{book.pages} halaman</span>
                <span aria-hidden="true">·</span>
                <span>~{book.readingTimeMinutes} mnt baca</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Headphones className="h-3.5 w-3.5" />
                  <span>Audio {book.audioSummaryMinutes} mnt</span>
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[#22252A]/90 dark:text-[#F2EFE8]/90">
                {book.synopsis}
              </p>

              <div className="rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-3.5">
                <p className="text-xs font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                  Kenapa cocok untuk mahasiswa
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#52565E] dark:text-[#A4ABA8]">
                  {book.whyStudentsLoveIt}
                </p>
              </div>
            </div>

            {/* Action Buttons: Baca Sekarang & Pinjam 1-Tap */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenReader(book)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-5 py-2.5 text-sm font-semibold text-[#1E2024] transition-colors whitespace-nowrap"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{isBorrowed ? 'Baca Sekarang' : 'Baca Pratinjau & Audio'}</span>
                </button>

                {canBorrow ? (
                  <button
                    type="button"
                    onClick={() => onToggleBorrow(book)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                      isBorrowed
                        ? 'border-[#1E3F32]/40 dark:border-[#68B894]/40 bg-[#1E3F32]/10 dark:bg-[#68B894]/15 text-[#1E3F32] dark:text-[#68B894]'
                        : 'border-[#1E3F32] dark:border-[#68B894] bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716] hover:bg-[#163026] dark:hover:bg-[#7CC7A5]'
                    }`}
                  >
                    <BookmarkCheck className="h-4 w-4" />
                    <span>
                      {isBorrowed
                        ? 'Kembalikan Lebih Awal'
                        : `Pinjam (${book.copiesAvailable}/${book.totalCopies} tersedia)`}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onToggleWaitlist(book)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                      isWaitlisted
                        ? 'border-[#C87D55]/50 bg-[#C87D55]/15 text-[#A85933] dark:text-[#E09B76]'
                        : 'border-[#DCD4C4] dark:border-[#2C3330] text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#EFEAE0] dark:hover:bg-[#1B201E]'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    <span>
                      {isWaitlisted
                        ? 'Terdaftar di Antrean Pintar'
                        : 'Salinan Penuh · Masuk Antrean (~2 hari)'}
                    </span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-[#52565E] dark:text-[#A4ABA8]">
                Peminjaman digital berlaku 14 hari dengan pengembalian otomatis—bebas denda keterlambatan.
              </p>
            </div>
          </div>
        </div>

        {/* Highlighted Quotes from this Book */}
        {book.quotes.length > 0 && (
          <div className="mt-8 border-t border-[#E2DCCE] dark:border-[#272D2A] pt-6 space-y-3">
            <h3 className="font-display text-base font-semibold text-[#22252A] dark:text-[#F2EFE8]">
              Kutipan Favorit Pembaca
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {book.quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-4"
                >
                  <p className="font-serif italic text-sm leading-relaxed text-[#22252A] dark:text-[#F2EFE8]">
                    “{q}”
                  </p>
                  <button
                    type="button"
                    onClick={() => onShareQuote(q, book.title, book.author)}
                    className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#1E3F32] dark:text-[#68B894] hover:underline"
                  >
                    <Quote className="h-3.5 w-3.5" />
                    <span>Jadikan Kartu Kutipan</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
