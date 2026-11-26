import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { Book } from '../data/libraryData';

interface BookCoverProps {
  book: Book;
  className?: string;
}

export function BookCover({ book, className = '' }: BookCoverProps) {
  const [imgError, setImgError] = useState(false);

  if (book.coverImage && !imgError) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border border-stone-200/80 dark:border-zinc-800 bg-stone-200 dark:bg-zinc-800 ${className}`}
      >
        <img
          src={book.coverImage}
          alt={`Sampul buku ${book.title}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg border border-black/10 dark:border-white/10 p-4 select-none ${className}`}
      style={{
        backgroundColor: book.coverPalette.bg,
        color: book.coverPalette.text,
      }}
    >
      <div className="flex items-center justify-between text-[11px] tracking-wide opacity-75">
        <span className="truncate">{book.category}</span>
        <span className="font-mono tabular-nums">{book.year}</span>
      </div>

      <div className="my-auto py-3">
        <div
          className="mb-3 h-0.5 w-8"
          style={{ backgroundColor: book.coverPalette.accent }}
        />
        <p className="font-display text-base font-semibold leading-snug tracking-tight">
          {book.title}
        </p>
        <p className="mt-1.5 text-xs opacity-75">{book.author}</p>
      </div>

      <div className="flex items-center justify-between border-t border-white/15 pt-2.5 text-[11px] opacity-70">
        <span className="inline-flex items-center gap-1">
          <BookOpen className="h-3 w-3" />
          <span>{book.pages} hlm</span>
        </span>
        <span className="font-mono tabular-nums">{book.readingTimeMinutes} mnt</span>
      </div>
    </div>
  );
}
