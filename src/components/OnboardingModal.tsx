import { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialCampus: string;
  initialGenres: string[];
  initialDailyGoal: number;
  onComplete: (data: {
    name: string;
    campus: string;
    genres: string[];
    dailyGoal: number;
  }) => void;
}

const GENRE_OPTIONS = [
  'Fiksi & Sastra',
  'Psikologi',
  'Riset & Skripsi',
  'Teknologi & Desain',
  'Sci-Fi',
  'Filosofi & Esai',
];

const DAILY_GOALS = [
  { minutes: 10, label: '10 menit / hari', note: 'Santai saat jeda antar kelas' },
  { minutes: 15, label: '15 menit / hari', note: 'Rekomendasi terbaik untuk menjaga streak' },
  { minutes: 25, label: '25 menit / hari', note: 'Fokus mendalam untuk riset & tugas akhir' },
];

export function OnboardingModal({
  isOpen,
  onClose,
  initialName,
  initialCampus,
  initialGenres,
  initialDailyGoal,
  onComplete,
}: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(initialName || 'Rani Kusuma');
  const [campus, setCampus] = useState(initialCampus || 'Ilmu Komunikasi · Semester 6');
  const [genres, setGenres] = useState<string[]>(
    initialGenres.length > 0 ? initialGenres : ['Fiksi & Sastra', 'Psikologi']
  );
  const [dailyGoal, setDailyGoal] = useState(initialDailyGoal || 15);

  if (!isOpen) return null;

  const toggleGenre = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleFinish = () => {
    onComplete({
      name: name.trim() || 'Anggota Loka Pustaka',
      campus: campus.trim() || 'Kampus Merdeka',
      genres: genres.length > 0 ? genres : ['Fiksi & Sastra'],
      dailyGoal,
    });
    setStep(1);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#22252A]/60 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-xl rounded-xl border border-[#E5DFD2] dark:border-[#272D2A] bg-[#F8F5EE] dark:bg-[#141716] p-6 sm:p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#E5DFD2] dark:border-[#272D2A] pb-4">
          <div>
            <p className="font-mono text-xs tabular-nums text-[#1E3F32] dark:text-[#68B894]">
              Pendaftaran Anggota · Langkah {step} dari 3
            </p>
            <h2
              id="onboarding-title"
              className="mt-1 font-display text-2xl font-bold text-[#22252A] dark:text-[#F2EFE8]"
            >
              {step === 1 && 'Kenalan singkat & verifikasi kampus'}
              {step === 2 && 'Pilih suasana & topik yang kamu suka'}
              {step === 3 && 'Tentukan target harian & kartu anggota'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pendaftaran anggota"
            className="rounded-lg p-2 text-[#52565E] dark:text-[#A4ABA8] hover:bg-[#EFEAE0] dark:hover:bg-[#1B201E] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Cukup isi nama panggilan dan jurusan agar kurasi awal langsung relevan dengan kebutuhan kuliah maupun bacaan santaimu.
              </p>
              <div className="space-y-1.5">
                <label htmlFor="ob-name" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                  Nama panggilan
                </label>
                <input
                  id="ob-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#EFEAE0] dark:bg-[#1B201E] px-3.5 py-2.5 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="ob-campus" className="block text-xs font-medium text-[#22252A] dark:text-[#F2EFE8]">
                  Jurusan / Kampus
                </label>
                <input
                  id="ob-campus"
                  type="text"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full rounded-lg border border-[#DCD4C4] dark:border-[#2C3330] bg-[#EFEAE0] dark:bg-[#1B201E] px-3.5 py-2.5 text-sm text-[#22252A] dark:text-[#F2EFE8] focus:border-[#1E3F32] dark:focus:border-[#68B894] focus:outline-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
                Pilih minimal dua topik favorit agar beranda langsung menampilkan rekomendasi yang sesuai dengan seleramu.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {GENRE_OPTIONS.map((genre) => {
                  const active = genres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        active
                          ? 'border-[#1E3F32] dark:border-[#68B894] bg-[#1E3F32]/10 dark:bg-[#68B894]/15 text-[#1E3F32] dark:text-[#68B894]'
                          : 'border-[#DCD4C4] dark:border-[#2C3330] bg-[#EFEAE0] dark:bg-[#1B201E] text-[#22252A] dark:text-[#F2EFE8]'
                      }`}
                    >
                      <span>{genre}</span>
                      {active && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                {DAILY_GOALS.map((g) => (
                  <button
                    key={g.minutes}
                    type="button"
                    onClick={() => setDailyGoal(g.minutes)}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                      dailyGoal === g.minutes
                        ? 'border-[#1E3F32] dark:border-[#68B894] bg-[#1E3F32]/10 dark:bg-[#68B894]/15'
                        : 'border-[#DCD4C4] dark:border-[#2C3330] bg-[#EFEAE0] dark:bg-[#1B201E]'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                        {g.label}
                      </p>
                      <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">{g.note}</p>
                    </div>
                    {dailyGoal === g.minutes && (
                      <Check className="h-4 w-4 text-[#1E3F32] dark:text-[#68B894]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Digital Library Card Preview in Deep Forest Green */}
              <div className="rounded-xl border border-[#1E3F32] bg-[#1E3F32] p-5 text-[#F8F5EE]">
                <div className="flex items-center justify-between text-xs opacity-80">
                  <span className="font-display font-semibold">Kartu Anggota Loka Pustaka</span>
                  <span className="font-mono tabular-nums">ID 2026-8841</span>
                </div>
                <p className="mt-4 font-display text-xl font-bold">{name || 'Mahasiswa'}</p>
                <p className="text-xs opacity-80">{campus || 'Kampus Merdeka'}</p>
                <p className="mt-4 border-t border-white/15 pt-3 text-xs opacity-90">
                  Minat: {genres.join(' · ')} · Target {dailyGoal} mnt/hari
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#E5DFD2] dark:border-[#272D2A] pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
              className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-[#22252A] dark:text-[#F2EFE8] hover:bg-[#EFEAE0] dark:hover:bg-[#1B201E] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali</span>
            </button>
          ) : (
            <span className="text-xs text-[#52565E] dark:text-[#A4ABA8]">
              Gratis untuk mahasiswa & umum
            </span>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-5 py-2.5 text-sm font-semibold text-[#1E2024] transition-colors"
            >
              <span>Lanjut</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C87D55] hover:bg-[#B86D45] px-5 py-2.5 text-sm font-semibold text-[#1E2024] transition-colors"
            >
              <span>Aktifkan Kartu Anggota</span>
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
