import { Flame, Award, Target, CheckCircle2, Plus } from 'lucide-react';
import { LEADERBOARD_STUDENTS, type BadgeItem } from '../data/libraryData';

interface GamificationViewProps {
  streakDays: number;
  minutesReadThisMonth: number;
  booksCompletedThisMonth: number;
  monthlyBookGoal: number;
  todayLogged: boolean;
  onLogReadingSession: () => void;
  badges: BadgeItem[];
  userName: string | null;
  userCampus: string;
}

const WEEK_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export function GamificationView({
  streakDays,
  minutesReadThisMonth,
  booksCompletedThisMonth,
  monthlyBookGoal,
  todayLogged,
  onLogReadingSession,
  badges,
  userName,
  userCampus,
}: GamificationViewProps) {
  const challengePercent = Math.min(
    100,
    Math.round((booksCompletedThisMonth / monthlyBookGoal) * 100)
  );
  const minutesGoal = 600;
  const minutesPercent = Math.min(100, Math.round((minutesReadThisMonth / minutesGoal) * 100));

  const displayName = userName || 'Kamu (Mahasiswa)';

  return (
    <div className="space-y-12 pb-16">
      {/* Header & Primary Interactive Action */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2DCCE] dark:border-[#272D2A] pb-6">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-wide text-[#1E3F32] dark:text-[#68B894]">
            Jejak Kebiasaan Membaca
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#22252A] dark:text-[#F2EFE8]">
            Streak harian, tantangan bulanan, dan lencana
          </h1>
          <p className="text-sm sm:text-base text-[#52565E] dark:text-[#A4ABA8]">
            Bangun ritme membaca 15 menit setiap hari bersama teman-teman kampus, kumpulkan lencana pencapaian, dan buka bonus kuota pinjam.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogReadingSession}
          className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
            todayLogged
              ? 'border border-[#1E3F32]/35 dark:border-[#68B894]/35 bg-[#1E3F32]/10 dark:bg-[#68B894]/15 text-[#1E3F32] dark:text-[#68B894] hover:bg-[#1E3F32]/15'
              : 'bg-[#C87D55] hover:bg-[#B86D45] text-[#1E2024]'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>{todayLogged ? 'Tambah Sesi +15 Menit Lagi' : 'Catat Sesi Baca Hari Ini (+15 mnt)'}</span>
        </button>
      </section>

      {/* Top Metrics: Streak & Monthly Challenge */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reading Streak Card */}
        <div className="lg:col-span-5 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-[#52565E] dark:text-[#A4ABA8]">
                Reading Streak Aktif
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                  {streakDays}
                </span>
                <span className="text-sm font-medium text-[#52565E] dark:text-[#A4ABA8]">
                  hari beruntun
                </span>
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#C87D55]/20 text-[#A85933] dark:text-[#E09B76]">
              <Flame className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-[#52565E] dark:text-[#A4ABA8]">
              <span>Aktivitas pekan ini (target 15 mnt/hari)</span>
              <span className="font-mono tabular-nums">
                {todayLogged ? '7/7 hari' : '6/7 hari'}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {WEEK_DAYS.map((day, idx) => {
                const completed = idx < 6 || todayLogged;
                return (
                  <div
                    key={day}
                    className={`flex flex-col items-center justify-center rounded-lg border py-2.5 text-xs transition-colors ${
                      completed
                        ? 'border-[#1E3F32]/35 dark:border-[#68B894]/35 bg-[#1E3F32]/10 dark:bg-[#68B894]/15 text-[#1E3F32] dark:text-[#68B894]'
                        : 'border-[#DCD4C4] dark:border-[#2C3330] bg-transparent text-[#52565E] dark:text-[#A4ABA8]'
                    }`}
                  >
                    <span className="font-medium">{day}</span>
                    <CheckCircle2
                      className={`mt-1 h-4 w-4 ${completed ? 'opacity-100' : 'opacity-25'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <p className="border-t border-[#DFD8C8] dark:border-[#272D2A] pt-4 text-xs leading-relaxed text-[#52565E] dark:text-[#A4ABA8]">
            Tersedia 1x <strong className="font-semibold text-[#22252A] dark:text-[#F2EFE8]">Streak Freeze</strong> otomatis saat minggu UTS/UAS agar mahasiswa tidak kehilangan progres karena jadwal ujian.
          </p>
        </div>

        {/* Monthly Challenge Card */}
        <div className="lg:col-span-7 rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E] p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#52565E] dark:text-[#A4ABA8]">
                Tantangan Baca Bulanan · November
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-[#22252A] dark:text-[#F2EFE8]">
                Misi 5 Buku & 600 Menit Tenang
              </h2>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1E3F32]/15 dark:bg-[#68B894]/15 text-[#1E3F32] dark:text-[#68B894]">
              <Target className="h-6 w-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2 rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#F8F5EE] dark:bg-[#141716] p-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-[#52565E] dark:text-[#A4ABA8]">Buku diselesaikan</span>
                <span className="font-mono font-semibold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                  {booksCompletedThisMonth} / {monthlyBookGoal} buku
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#DFD8C8] dark:bg-[#2A312E]">
                <div
                  className="h-full rounded-full bg-[#1E3F32] dark:bg-[#68B894] transition-all duration-300"
                  style={{ width: `${challengePercent}%` }}
                />
              </div>
              <p className="text-[11px] text-[#52565E] dark:text-[#A4ABA8]">
                Selesaikan {Math.max(0, monthlyBookGoal - booksCompletedThisMonth)} buku lagi untuk membuka kuota pinjam ekstra (+2 slot).
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-[#E2DCCE] dark:border-[#272D2A] bg-[#F8F5EE] dark:bg-[#141716] p-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-[#52565E] dark:text-[#A4ABA8]">Total menit membaca</span>
                <span className="font-mono font-semibold tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                  {minutesReadThisMonth} / {minutesGoal} mnt
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#DFD8C8] dark:bg-[#2A312E]">
                <div
                  className="h-full rounded-full bg-[#C87D55] transition-all duration-300"
                  style={{ width: `${minutesPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-[#52565E] dark:text-[#A4ABA8]">
                Setiap sesi baca 15 menit atau ringkasan audio terhitung ke total bulanan.
              </p>
            </div>
          </div>

          <div className="border-t border-[#DFD8C8] dark:border-[#272D2A] pt-4 text-xs text-[#52565E] dark:text-[#A4ABA8]">
            Hadiah tantangan bulan ini: Akses prioritas antrean buku baru selama 30 hari & bingkai kartu kutipan edisi khusus.
          </div>
        </div>
      </section>

      {/* Badges Grid */}
      <section aria-label="Lencana pencapaian" className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
            Koleksi Lencana (Badges)
          </h2>
          <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
            Lencana terhubung ke kebiasaan nyata—mulai dari konsistensi, riset skripsi, hingga berbagi kutipan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const pct = Math.min(100, Math.round((badge.progress / badge.goal) * 100));
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-5 transition-colors ${
                  badge.unlocked
                    ? 'border-[#1E3F32]/35 dark:border-[#68B894]/35 bg-[#EFEAE0] dark:bg-[#1B201E]'
                    : 'border-[#E2DCCE] dark:border-[#272D2A] bg-transparent opacity-85'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#52565E] dark:text-[#A4ABA8]">
                      {badge.tier} · {badge.unlocked ? 'Terbuka' : 'Dalam proses'}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold text-[#22252A] dark:text-[#F2EFE8]">
                      {badge.title}
                    </h3>
                  </div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      badge.unlocked
                        ? 'bg-[#1E3F32] dark:bg-[#68B894] text-[#F8F5EE] dark:text-[#141716]'
                        : 'bg-[#E5DFD2] dark:bg-[#272D2A] text-[#52565E] dark:text-[#A4ABA8]'
                    }`}
                  >
                    <Award className="h-4 w-4" />
                  </div>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#52565E] dark:text-[#A4ABA8]">
                  {badge.description}
                </p>

                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#52565E] dark:text-[#A4ABA8]">
                    <span>{badge.requirement}</span>
                    <span>
                      {badge.progress}/{badge.goal}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#DFD8C8] dark:bg-[#2A312E]">
                    <div
                      className={`h-full rounded-full ${
                        badge.unlocked
                          ? 'bg-[#1E3F32] dark:bg-[#68B894]'
                          : 'bg-[#8C877C] dark:bg-[#636B67]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Friendly Leaderboard */}
      <section aria-label="Papan peringkat ramah antar kampus" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[#22252A] dark:text-[#F2EFE8]">
            Lingkar Pembaca Kampus Pekan Ini
          </h2>
          <p className="text-sm text-[#52565E] dark:text-[#A4ABA8]">
            Peringkat berbasis konsistensi menit membaca, bukan kecepatan membalik halaman
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E2DCCE] dark:border-[#272D2A] bg-[#EFEAE0] dark:bg-[#1B201E]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#DFD8C8] dark:border-[#272D2A] text-xs text-[#52565E] dark:text-[#A4ABA8]">
                <th className="px-5 py-3.5 font-medium">Peringkat</th>
                <th className="px-5 py-3.5 font-medium">Pembaca</th>
                <th className="px-5 py-3.5 font-medium">Kampus</th>
                <th className="px-5 py-3.5 font-medium text-right">Streak</th>
                <th className="px-5 py-3.5 font-medium text-right">Menit Bulan Ini</th>
                <th className="px-5 py-3.5 font-medium text-right">Buku Selesai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DCCE] dark:divide-[#272D2A]">
              {LEADERBOARD_STUDENTS.map((student) => (
                <tr key={student.name} className="hover:bg-[#E5DFD2]/60 dark:hover:bg-[#232927]/60">
                  <td className="px-5 py-3.5 font-mono tabular-nums text-[#52565E] dark:text-[#A4ABA8]">
                    0{student.rank}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-[#22252A] dark:text-[#F2EFE8]">
                    {student.name}
                  </td>
                  <td className="px-5 py-3.5 text-[#52565E] dark:text-[#A4ABA8]">
                    {student.campus}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                    {student.streak} hr
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                    {student.minutes} mnt
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#22252A] dark:text-[#F2EFE8]">
                    {student.books}
                  </td>
                </tr>
              ))}
              {/* Current User Row */}
              <tr className="bg-[#1E3F32]/10 dark:bg-[#68B894]/15 font-medium">
                <td className="px-5 py-3.5 font-mono tabular-nums text-[#1E3F32] dark:text-[#68B894]">
                  05
                </td>
                <td className="px-5 py-3.5 text-[#1E3F32] dark:text-[#68B894]">
                  {displayName}
                </td>
                <td className="px-5 py-3.5 text-[#1E3F32]/85 dark:text-[#68B894]/85">
                  {userCampus}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#1E3F32] dark:text-[#68B894]">
                  {streakDays} hr
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#1E3F32] dark:text-[#68B894]">
                  {minutesReadThisMonth} mnt
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#1E3F32] dark:text-[#68B894]">
                  {booksCompletedThisMonth}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
