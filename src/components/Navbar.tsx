import { Home, Bookmark, Flame, Users } from 'lucide-react';

export type ActiveTab = 'home' | 'shelf' | 'challenges' | 'clubs';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenOnboarding: () => void;
  userName: string | null;
}

const NAV_ITEMS: { id: ActiveTab; label: string; shortLabel: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Beranda', shortLabel: 'Beranda', icon: Home },
  { id: 'shelf', label: 'Rak Saya', shortLabel: 'Rak', icon: Bookmark },
  { id: 'challenges', label: 'Tantangan', shortLabel: 'Streak', icon: Flame },
  { id: 'clubs', label: 'Klub Baca', shortLabel: 'Klub', icon: Users },
];

export function Navbar({
  activeTab,
  onSelectTab,
  onOpenOnboarding,
  userName,
}: NavbarProps) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#E5DFD2] dark:border-[#272D2A] bg-[#F8F5EE]/95 dark:bg-[#141716]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className="font-display text-xl font-bold tracking-tight text-[#1E3F32] dark:text-[#68B894] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3F32]"
          >
            Loka Pustaka
          </button>

          {/* Zone 2: 4 concise single-line text links */}
          <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3F32] ${
                    isActive
                      ? 'text-[#1E3F32] dark:text-[#68B894] font-semibold'
                      : 'text-[#52565E] dark:text-[#A4ABA8] hover:text-[#22252A] dark:hover:text-[#F2EFE8]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-[#1E3F32] dark:bg-[#68B894]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="rounded-lg bg-[#1E3F32] dark:bg-[#68B894] px-4 py-2 text-xs sm:text-sm font-semibold text-[#F8F5EE] dark:text-[#141716] hover:bg-[#163026] dark:hover:bg-[#7CC7A5] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F32]"
            >
              {userName ? `Kartu: ${userName.split(' ')[0]}` : 'Daftar Anggota'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock */}
      <nav
        aria-label="Navigasi seluler"
        className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t border-[#E5DFD2] dark:border-[#272D2A] bg-[#F8F5EE]/95 dark:bg-[#141716]/95 backdrop-blur-sm md:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`flex min-h-[44px] min-w-[64px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
                isActive
                  ? 'text-[#1E3F32] dark:text-[#68B894]'
                  : 'text-[#52565E] dark:text-[#A4ABA8]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
