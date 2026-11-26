export type BookCategory =
  | 'Semua'
  | 'Fiksi & Sastra'
  | 'Psikologi'
  | 'Riset & Skripsi'
  | 'Teknologi & Desain'
  | 'Sci-Fi';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: Exclude<BookCategory, 'Semua'>;
  vibe: string;
  readingTimeMinutes: number;
  audioSummaryMinutes: number;
  pages: number;
  rating: number;
  copiesAvailable: number;
  totalCopies: number;
  progressPercent?: number;
  coverImage?: string;
  coverPalette: {
    bg: string;
    accent: string;
    text: string;
  };
  synopsis: string;
  whyStudentsLoveIt: string;
  quotes: string[];
  sampleChapterTitle: string;
  sampleParagraphs: string[];
  shelfTags: ('continue' | 'thesis' | 'bedtime' | 'trending')[];
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  requirement: string;
  progress: number;
  goal: number;
  unlocked: boolean;
  tier: string;
}

export interface BookClub {
  id: string;
  name: string;
  currentBook: string;
  membersCount: number;
  schedule: string;
  topic: string;
  joined: boolean;
  posts: {
    id: string;
    author: string;
    campus: string;
    timeAgo: string;
    content: string;
  }[];
}

export interface BookReview {
  id: string;
  bookId: string;
  bookTitle: string;
  reviewer: string;
  campus: string;
  rating: number;
  vibeNote: string;
  comment: string;
  likes: number;
  likedByMe?: boolean;
  createdAt: string;
}

export interface JourneyStage {
  step: string;
  title: string;
  subtitle: string;
  spotifyNetflixInspiration: string;
  genZPainPoint: string;
  solutionMechanics: string[];
  targetScreen: 'onboarding' | 'discover' | 'book-detail' | 'reader' | 'gamification' | 'community';
  ctaLabel: string;
}

export const HERO_LIBRARY_IMAGE = '/src/assets/images/hero_campus_library_1795657294867.jpg';

export const BOOKS: Book[] = [
  {
    id: 'senja-di-ujung-sudirman',
    title: 'Senja di Ujung Sudirman',
    author: 'Nadia Pramesti',
    year: 2025,
    category: 'Fiksi & Sastra',
    vibe: 'Melankolis · Hangat',
    readingTimeMinutes: 195,
    audioSummaryMinutes: 14,
    pages: 268,
    rating: 4.8,
    copiesAvailable: 3,
    totalCopies: 5,
    progressPercent: 64,
    coverImage: '/src/assets/images/cover_senja_jakarta_1795657295833.jpg',
    coverPalette: {
      bg: '#2A2522',
      accent: '#D97706',
      text: '#FAF8F4',
    },
    synopsis:
      'Kisah dua mahasiswa tingkat akhir yang tidak sengaja bertukar buku catatan di KRL rute Sudirman–Depok, membuka percakapan rahasia tentang ambisi, quarter-life crisis, dan keberanian memilih jalan sendiri.',
    whyStudentsLoveIt:
      'Cocok dibaca di komuter atau sebelum tidur; bab-babnya pendek (8–12 menit) dengan dialog yang terasa dekat dengan keseharian anak kampus.',
    quotes: [
      'Kita tidak benar-benar tertinggal; kita hanya berjalan di jalur yang petanya baru digambar saat kaki melangkah.',
      'Di antara bunyi pengumuman stasiun dan gerimis sore, ada tenang yang tidak pernah diajarkan ruang kelas.',
    ],
    sampleChapterTitle: 'Bab 4: Peron Tiga dan Catatan Margin',
    sampleParagraphs: [
      'Hujan turun tanpa aba-aba tepat ketika kereta menuju Jakarta Kota berhenti di Stasiun Sudirman. Di pangkuanku, buku bersampul linen abu-abu itu terbuka di halaman tujuh puluh dua, lengkap dengan coretan pensil tipis di bagian pinggir yang bukan tulisanku.',
      'Kalimat yang digarisbawahi berbunyi sederhana: "Mengapa kita selalu mengukur nilai diri dengan kecepatan orang lain?" Di bawahnya, pemilik sebelumnya menuliskan catatan kecil dengan tanggal tiga minggu lalu, seolah sedang berbicara pada dirinya sendiri di tengah kepadatan tugas akhir.',
      'Aku menatap pantulan lampu kafe di seberang jalan dari balik jendela kereta yang berembun. Untuk pertama kalinya sepanjang semester ini, rasa cemas tentang tenggat revisi terasa sedikit melonggar—digantikan rasa ingin tahu tentang siapa yang meninggalkan jejak pikiran itu.',
      'Kita sering mengira perpustakaan adalah tempat paling sunyi di kampus. Padahal di setiap halaman yang pernah dipinjam, selalu ada gema percakapan dari pembaca sebelumnya yang diam-diam menemani malam-malam panjang kita.',
    ],
    shelfTags: ['continue', 'bedtime', 'trending'],
  },
  {
    id: 'ritme-pagi-kebiasaan',
    title: 'Ritme Kecil, Dampak Panjang',
    author: 'Dr. Bagus Wirawan',
    year: 2024,
    category: 'Psikologi',
    vibe: 'Reflektif · Praktis',
    readingTimeMinutes: 160,
    audioSummaryMinutes: 12,
    pages: 224,
    rating: 4.9,
    copiesAvailable: 2,
    totalCopies: 6,
    progressPercent: 32,
    coverImage: '/src/assets/images/cover_atomic_mindset_1795657295057.jpg',
    coverPalette: {
      bg: '#1E3A2F',
      accent: '#D4A373',
      text: '#FAF8F4',
    },
    synopsis:
      'Panduan berbasis psikologi kognitif untuk membangun konsistensi belajar dan membaca di tengah distraksi notifikasi tanpa mengorbankan kesehatan mental.',
    whyStudentsLoveIt:
      'Menjelaskan teknik "mikro-sesi 15 menit" yang langsung bisa dipraktikkan mahasiswa saat melawan prokrastinasi skripsi.',
    quotes: [
      'Konsistensi bukan soal seberapa kuat tekadmu di hari pertama, melainkan seberapa ramah sistemmu di hari terlelah.',
      'Sepuluh halaman setiap malam mengalahkan ambisi seratus halaman yang selalu ditunda hingga akhir pekan.',
    ],
    sampleChapterTitle: 'Bab 2: Mengapa Fokus Kita Terpecah Setiap 47 Detik',
    sampleParagraphs: [
      'Sebagian besar mahasiswa tidak kekurangan motivasi; mereka hanya kelelahan mengambil keputusan kecil setiap sepuluh menit. Ketika layar ponsel menyala di samping buku teks, otak kita otomatis membagi perhatian menjadi serpihan yang mahal ongkos pemulihannya.',
      'Eksperimen sederhana di laboratorium atensi menunjukkan bahwa mengganti target "harus selesai satu bab malam ini" menjadi "baca sepuluh menit dengan mode pesawat" menaikkan tingkat penyelesaian tugas hingga hampir dua kali lipat dalam empat minggu.',
      'Kuncinya ada pada friksi awal. Jika membuka bacaan terasa secepat memutar daftar putar musik favorit, otak tidak lagi menganggap aktivitas membaca sebagai beban akademis yang kaku.',
    ],
    shelfTags: ['continue', 'thesis', 'trending'],
  },
  {
    id: 'arsitektur-algoritma-hidup',
    title: 'Arsitektur Algoritma & Nalar',
    author: 'Raka Mahendra',
    year: 2026,
    category: 'Teknologi & Desain',
    vibe: 'Analitis · Tajam',
    readingTimeMinutes: 210,
    audioSummaryMinutes: 16,
    pages: 292,
    rating: 4.7,
    copiesAvailable: 0,
    totalCopies: 4,
    coverImage: '/src/assets/images/cover_algoritma_hidup_1795657296602.jpg',
    coverPalette: {
      bg: '#1F242B',
      accent: '#C9A227',
      text: '#F4F4F5',
    },
    synopsis:
      'Menjembatani logika desain produk digital, cara kerja sistem rekomendasi modern, dan etika perhatian manusia di era platform streaming.',
    whyStudentsLoveIt:
      'Wajib baca untuk mahasiswa desain produk, ilmu komputer, dan komunikasi digital yang mencari kerangka teori sekaligus studi kasus nyata.',
    quotes: [
      'Antarmuka terbaik tidak meminta pengguna berpikir keras; ia memberi ruang napas di antara setiap pilihan.',
      'Algoritma kurasi seharusnya memperluas cakrawala rasa ingin tahu, bukan mengurung kita di ruang gema yang sama.',
    ],
    sampleChapterTitle: 'Bab 1: Kurasi Manusia di Tengah Banjir Informasi',
    sampleParagraphs: [
      'Setiap sistem rekomendasi yang terasa "ajaib" sebenarnya dibangun dari dua hal: pemahaman konteks saat ini dan keberanian menyembunyikan sembilan puluh sembilan persen katalog yang belum relevan.',
      'Di perpustakaan tradisional, rak fisik memaksa kita menelusuri lorong demi lorong. Di ruang digital, tantangan desainer adalah mempertahankan sensasi serendipitas—menemukan buku tak terduga yang tepat saat kita membutuhkannya.',
    ],
    shelfTags: ['thesis', 'trending'],
  },
  {
    id: 'orbit-sunyi-kepler',
    title: 'Orbit Sunyi di Selatan Kepler',
    author: 'Sinta Ayuningtyas',
    year: 2025,
    category: 'Sci-Fi',
    vibe: 'Imajinatif · Tenang',
    readingTimeMinutes: 240,
    audioSummaryMinutes: 18,
    pages: 340,
    rating: 4.9,
    copiesAvailable: 4,
    totalCopies: 5,
    coverImage: '/src/assets/images/cover_galaksi_sunyi_1795657296382.jpg',
    coverPalette: {
      bg: '#1D243B',
      accent: '#E09F3E',
      text: '#FAF8F4',
    },
    synopsis:
      'Seorang arsiparis muda dikirim ke pos observasi gurun planet jauh untuk mendigitalkan naskah-naskah terakhir peradaban sebelum badai magnetik melanda.',
    whyStudentsLoveIt:
      'Fiksi ilmiah kontemplatif tanpa adegan bising—nuansanya mirip film Denis Villeneuve dengan fokus pada memori dan bahasa.',
    quotes: [
      'Merawat ingatan adalah cara paling sunyi untuk melawan waktu.',
      'Di bawah langit dua cincin planet, sebuah puisi dua baris terasa lebih berat daripada ribuan koordinat bintang.',
    ],
    sampleChapterTitle: 'Bab 3: Arsip Debu dan Cahaya Senja',
    sampleParagraphs: [
      'Setiap pukul lima sore waktu pos, cahaya jingga dari planet bercincin memantul di dinding kaca ruang arsip. Di meja kerjaku, pemindai optik mendengung pelan, mengubah lembaran kertas rapuh menjadi teks yang kelak bisa dibaca siapa saja di bumi.',
      'Aku selalu menyisakan lima belas menit terakhir sebelum tidur untuk membaca ulang satu esai acak dari kotak arsip. Bukan untuk laporan ke pusat, melainkan untuk memastikan diriku tidak lupa bagaimana rasanya terkejut oleh gagasan baru.',
    ],
    shelfTags: ['bedtime', 'trending'],
  },
  {
    id: 'metode-riset-tanpa-panik',
    title: 'Metode Riset Tanpa Panik',
    author: 'Prof. Hendra Kusuma',
    year: 2025,
    category: 'Riset & Skripsi',
    vibe: 'Terstruktur · Solutif',
    readingTimeMinutes: 145,
    audioSummaryMinutes: 11,
    pages: 196,
    rating: 4.8,
    copiesAvailable: 5,
    totalCopies: 8,
    progressPercent: 18,
    coverPalette: {
      bg: '#233D36',
      accent: '#E9C46A',
      text: '#FAF8F4',
    },
    synopsis:
      'Peta jalan praktis menyusun tinjauan pustaka, merumuskan pertanyaan riset yang tajam, dan mengelola sitasi agar proses skripsi terasa ringan dan terukur.',
    whyStudentsLoveIt:
      'Dilengkapi template matriks literatur dan panduan membaca jurnal dalam 20 menit tanpa tenggelam dalam jargon berat.',
    quotes: [
      'Skripsi yang baik bukan yang paling tebal halamannya, melainkan yang paling jernih pertanyaannya.',
      'Membaca literatur bukan lomba menghafal definisi, melainkan seni memetakan percakapan antarpeneliti.',
    ],
    sampleChapterTitle: 'Bab 1: Seni Membaca Tiga Lapis Jurnal Ilmiah',
    sampleParagraphs: [
      'Kesalahan paling umum mahasiswa tingkat akhir adalah membaca makalah ilmiah dari kata pertama hingga daftar pustaka dalam satu tarikan napas. Akibatnya, energi habis sebelum memahami kontribusi utama penelitian tersebut.',
      'Gunakan pendekatan tiga lapis: lima menit pertama untuk abstrak dan kesimpulan, sepuluh menit berikutnya untuk memetakan grafik dan metode, dan sisanya hanya jika makalah itu benar-benar menjadi fondasi argumenmu.',
    ],
    shelfTags: ['continue', 'thesis'],
  },
  {
    id: 'catatan-kaki-kota-hujan',
    title: 'Catatan Kaki Kota Hujan',
    author: 'Dimas Pratama',
    year: 2024,
    category: 'Fiksi & Sastra',
    vibe: 'Nostalgia · Ringan',
    readingTimeMinutes: 130,
    audioSummaryMinutes: 10,
    pages: 178,
    rating: 4.6,
    copiesAvailable: 3,
    totalCopies: 4,
    coverPalette: {
      bg: '#3B2F2F',
      accent: '#D4A373',
      text: '#FAF8F4',
    },
    synopsis:
      'Kumpulan cerita pendek tentang warung kopi 24 jam dekat kampus, persahabatan lintas jurusan, dan sore-sore menjelang wisuda.',
    whyStudentsLoveIt:
      'Tiap cerita berdiri sendiri dalam 12 menit baca—pas untuk jeda di antara dua kelas kuliah.',
    quotes: [
      'Beberapa tempat tidak hanya menyimpan kenangan, ia menyimpan versi diri kita yang paling berani bermimpi.',
    ],
    sampleChapterTitle: 'Cerita 1: Meja Pojok Dekat Colokan',
    sampleParagraphs: [
      'Ada hukum tak tertulis di kedai kopi belakang fakultas: siapa yang datang paling pagi berhak atas meja pojok dekat stopkontak, dan siapa yang datang paling malam wajib mendengar keluh kesah revisi bab empat.',
    ],
    shelfTags: ['bedtime'],
  },
  {
    id: 'ekonomi-atensi-gen-z',
    title: 'Ekonomi Atensi & Ruang Sunyi',
    author: 'Larasati Wijaya',
    year: 2026,
    category: 'Psikologi',
    vibe: 'Kritis · Eye-Opening',
    readingTimeMinutes: 175,
    audioSummaryMinutes: 13,
    pages: 238,
    rating: 4.8,
    copiesAvailable: 1,
    totalCopies: 3,
    coverPalette: {
      bg: '#263238',
      accent: '#80CBC4',
      text: '#FAF8F4',
    },
    synopsis:
      'Analisis tajam mengenai bagaimana generasi digital merebut kembali kendali atas waktu luang, kesehatan mata, dan kedalaman berpikir.',
    whyStudentsLoveIt:
      'Sering jadi bahan diskusi wajib di klub baca kampus karena menyinggung fenomena doomscrolling dan FOMO akademik.',
    quotes: [
      'Kemewahan terbesar generasi kita bukanlah kecepatan akses, melainkan kemampuan bertahan pada satu halaman tanpa berpindah tab.',
    ],
    sampleChapterTitle: 'Bab 2: Mengapa Mata Kita Lelah Sebelum Pikiran',
    sampleParagraphs: [
      'Layar dengan kontras ekstrem dan arus umpan tanpa ujung memaksa mata bekerja dalam mode siaga terus-menerus. Ketika kita beralih ke permukaan bacaan bernuansa kertas hangat dengan jeda ruang yang cukup, sistem saraf parasimpatis mulai menurunkan ketegangan.',
    ],
    shelfTags: ['thesis', 'bedtime'],
  },
  {
    id: 'desain-sistem-berkelanjutan',
    title: 'Tipografi & Ergonomi Layar',
    author: 'Kiran Setiawan',
    year: 2025,
    category: 'Teknologi & Desain',
    vibe: 'Visual · Mendalam',
    readingTimeMinutes: 150,
    audioSummaryMinutes: 12,
    pages: 204,
    rating: 4.7,
    copiesAvailable: 4,
    totalCopies: 5,
    coverPalette: {
      bg: '#2D2A32',
      accent: '#E07A5F',
      text: '#FAF8F4',
    },
    synopsis:
      'Referensi praktis merancang antarmuka digital yang nyaman dibaca berjam-jam, mulai dari panjang baris 65–75 karakter hingga pemilihan palet rendah silau.',
    whyStudentsLoveIt:
      'Menjelaskan prinsip kenyamanan layar di balik mode baca Kertas Hangat & Malam Teduh.',
    quotes: [
      'Tipografi yang baik terasa seperti udara segar: ia tidak memamerkan diri, tetapi membuat pembaca betah berlama-lama.',
    ],
    sampleChapterTitle: 'Bab 3: Aturan Emas 65 Karakter per Baris',
    sampleParagraphs: [
      'Ketika baris teks terlalu lebar, mata kehilangan jangkar saat berpindah ke baris berikutnya. Membatasi lebar kolom baca antara 65 hingga 75 karakter menciptakan ritme gerakan mata yang tenang dan stabil.',
    ],
    shelfTags: ['thesis'],
  },
  {
    id: 'sejarah-kopi-nusantara',
    title: 'Jejak Kopi & Ruang Ketiga',
    author: 'Bagas Prakoso',
    year: 2024,
    category: 'Fiksi & Sastra',
    vibe: 'Hangat · Kultural',
    readingTimeMinutes: 165,
    audioSummaryMinutes: 13,
    pages: 218,
    rating: 4.7,
    copiesAvailable: 6,
    totalCopies: 9,
    coverPalette: {
      bg: '#3A281E',
      accent: '#C87D55',
      text: '#F8F5EE',
    },
    synopsis:
      'Menelusuri bagaimana kedai kopi di kota-kota pelajar berkembang menjadi ruang ketiga tempat lahirnya ide komunitas, diskusi sastra, dan kolaborasi lintas kampus.',
    whyStudentsLoveIt:
      'Ringan, kaya cerita sejarah lokal, dan cocok menemani waktu istirahat sore.',
    quotes: [
      'Setiap kota membutuhkan ruang di antara rumah dan kampus, tempat gagasan boleh tumbuh tanpa takut dinilai.',
    ],
    sampleChapterTitle: 'Bab 1: Meja Panjang di Yogyakarta',
    sampleParagraphs: [
      'Di sebuah gang kecil dekat kawasan kampus, lampu kuning temaram menyoroti deretan buku pinjaman yang tersusun di atas rak kayu pinus. Mahasiswa dari berbagai fakultas duduk bersebelahan tanpa pernah saling bertanya indeks prestasi.',
    ],
    shelfTags: ['bedtime', 'trending'],
  },
  {
    id: 'statistika-manusiawi',
    title: 'Statistika yang Manusiawi',
    author: 'Dr. Ratna Sari',
    year: 2025,
    category: 'Riset & Skripsi',
    vibe: 'Jelas · Aplikatif',
    readingTimeMinutes: 185,
    audioSummaryMinutes: 15,
    pages: 256,
    rating: 4.9,
    copiesAvailable: 4,
    totalCopies: 10,
    coverPalette: {
      bg: '#1E3F32',
      accent: '#E9C46A',
      text: '#F8F5EE',
    },
    synopsis:
      'Mengurai konsep probabilitas, uji hipotesis, dan pembacaan data survei skripsi dengan bahasa visual yang mudah dicerna mahasiswa non-eksakta.',
    whyStudentsLoveIt:
      'Mengubah rumus yang menakutkan menjadi contoh kasus keseharian yang langsung bisa diterapkan di Bab 3 & 4.',
    quotes: [
      'Angka hanya bermakna ketika kita jujur mendengarkan konteks manusia di baliknya.',
    ],
    sampleChapterTitle: 'Bab 2: Memahami P-Value Tanpa Menghafal',
    sampleParagraphs: [
      'Sebelum membuka perangkat lunak pengolah data, tanyakan terlebih dahulu pada dirimu: perubahan apa yang benar-benar penting secara nyata, bukan sekadar signifikan di atas kertas.',
    ],
    shelfTags: ['thesis'],
  },
  {
    id: 'jurnal-ekosistem-kota',
    title: 'Ekologi Kota Masa Depan',
    author: 'Arif Budiman',
    year: 2026,
    category: 'Teknologi & Desain',
    vibe: 'Visioner · Tenang',
    readingTimeMinutes: 190,
    audioSummaryMinutes: 14,
    pages: 264,
    rating: 4.8,
    copiesAvailable: 5,
    totalCopies: 7,
    coverPalette: {
      bg: '#22332B',
      accent: '#8AB17D',
      text: '#F8F5EE',
    },
    synopsis:
      'Eksplorasi arsitektur hijau, taman resapan, dan transportasi publik ramah pejalan kaki di kota-kota besar Asia Tenggara.',
    whyStudentsLoveIt:
      'Referensi populer mahasiswa arsitektur, planologi, dan studi lingkungan.',
    quotes: [
      'Kota yang ramah adalah kota yang memberi ruang teduh bagi pejalan kaki untuk berhenti sejenak.',
    ],
    sampleChapterTitle: 'Bab 1: Pohon, Teduh, dan Kecepatan Jalan',
    sampleParagraphs: [
      'Ketika trotoar dinaungi kanopi pohon yang cukup, jarak satu kilometer berubah dari beban perjalanan menjadi ruang refleksi harian.',
    ],
    shelfTags: ['thesis'],
  },
  {
    id: 'stasiun-antara-bintang',
    title: 'Stasiun Antara Dua Musim',
    author: 'Kezia Maharani',
    year: 2025,
    category: 'Sci-Fi',
    vibe: 'Puitis · Misterius',
    readingTimeMinutes: 205,
    audioSummaryMinutes: 16,
    pages: 288,
    rating: 4.8,
    copiesAvailable: 3,
    totalCopies: 6,
    coverPalette: {
      bg: '#202634',
      accent: '#C87D55',
      text: '#F8F5EE',
    },
    synopsis:
      'Tentang seorang teknisi sinyal luar angkasa yang mendeteksi siaran radio klasik dari kota yang sudah lama ditinggalkan di orbit Bumi.',
    whyStudentsLoveIt:
      'Alur lambat yang menghanyutkan, cocok untuk melepas penat di akhir pekan.',
    quotes: [
      'Sinyal terlemah pun tetap menempuh jarak jutaan kilometer selama ada seseorang yang mau mendengarkan.',
    ],
    sampleChapterTitle: 'Bab 1: Frekuensi 104.2 di Sektor Empat',
    sampleParagraphs: [
      'Di antara bunyi statis ruang hampa, terdengar petikan gitar akustik yang direkam setengah abad lalu. Tidak ada koordinat darurat, hanya suara seseorang yang menyapa malam.',
    ],
    shelfTags: ['bedtime'],
  },
];

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'streak-7',
    title: 'Api Konsistensi 7 Hari',
    description: 'Membaca minimal 15 menit setiap hari selama sepekan penuh.',
    requirement: '7 hari beruntun',
    progress: 6,
    goal: 7,
    unlocked: false,
    tier: 'Perintis',
  },
  {
    id: 'skripsi-survivor',
    title: 'Pejuang Skripsi',
    description: 'Menyelesaikan 2 buku kategori Riset & Skripsi atau Teknologi.',
    requirement: '2 buku referensi',
    progress: 2,
    goal: 2,
    unlocked: true,
    tier: 'Akademik',
  },
  {
    id: 'quote-curator',
    title: 'Kolektor Kutipan',
    description: 'Membuat atau membagikan 3 kartu kutipan ke komunitas.',
    requirement: '3 kutipan dibagikan',
    progress: 2,
    goal: 3,
    unlocked: false,
    tier: 'Sosial',
  },
  {
    id: 'night-reader',
    title: 'Pembaca Malam Teduh',
    description: 'Menggunakan tema Kertas Hangat atau Malam Teduh untuk 5 sesi baca.',
    requirement: '5 sesi ramah mata',
    progress: 5,
    goal: 5,
    unlocked: true,
    tier: 'Ergonomi',
  },
  {
    id: 'club-voice',
    title: 'Suara Klub Baca',
    description: 'Bergabung dalam 1 klub baca virtual dan mengirim ulasan buku.',
    requirement: '1 klub & 1 ulasan',
    progress: 1,
    goal: 1,
    unlocked: true,
    tier: 'Komunitas',
  },
  {
    id: 'polymath',
    title: 'Penjelajah Lintas Jurusan',
    description: 'Membaca buku dari minimal 4 kategori berbeda dalam satu semester.',
    requirement: '4 kategori unik',
    progress: 3,
    goal: 4,
    unlocked: false,
    tier: 'Kurasi',
  },
];

export const INITIAL_CLUBS: BookClub[] = [
  {
    id: 'klub-fiksi-indie',
    name: 'Klub Baca Fiksi & Kopi Sore',
    currentBook: 'Senja di Ujung Sudirman',
    membersCount: 148,
    schedule: 'Setiap Kamis, 19:30 WIB (Audio Room 45 menit)',
    topic: 'Membahas Bab 4–6: Quarter-life crisis dan romansa komuter Jabodetabek.',
    joined: true,
    posts: [
      {
        id: 'p1',
        author: 'Nayla Azzahra',
        campus: 'FIB UI',
        timeAgo: '2 jam lalu',
        content: 'Bagian catatan pensil di margin buku itu relate banget sama kebiasaan pinjam buku di perpustakaan pusat!',
      },
      {
        id: 'p2',
        author: 'Fajar Nugroho',
        campus: 'FSRD ITB',
        timeAgo: '45 menit lalu',
        content: 'Setuju, tempo ceritanya tenang dan nggak terburu-buru. Pas buat jeda habis studio.',
      },
    ],
  },
  {
    id: 'klub-skripsi-riset',
    name: 'Lingkar Skripsi & Produktivitas Tenang',
    currentBook: 'Metode Riset Tanpa Panik',
    membersCount: 234,
    schedule: 'Setiap Minggu, 16:00 WIB (Sesi Silent Reading + Diskusi)',
    topic: 'Praktik teknik membaca jurnal 3 lapis dan berbagi matriks tinjauan pustaka.',
    joined: false,
    posts: [
      {
        id: 'p3',
        author: 'Kevin Santoso',
        campus: 'FEB UGM',
        timeAgo: '5 jam lalu',
        content: 'Setelah coba aturan 20 menit per jurnal di Bab 1, daftar pustakaku akhirnya rapi juga minggu ini.',
      },
    ],
  },
  {
    id: 'klub-psikologi-populer',
    name: 'Bedah Psikologi & Atensi Digital',
    currentBook: 'Ritme Kecil, Dampak Panjang',
    membersCount: 189,
    schedule: 'Setiap Selasa, 20:00 WIB (Bedah Kasus Mahasiswa)',
    topic: 'Bagaimana mengganti kebiasaan doomscrolling sebelum tidur dengan mikro-sesi 15 menit.',
    joined: false,
    posts: [
      {
        id: 'p4',
        author: 'Tania Putri',
        campus: 'Psikologi Unpad',
        timeAgo: '1 hari lalu',
        content: 'Mode Kertas Hangat di aplikasi ini beneran ngebantu ngurangin silau pas baca jam 10 malam.',
      },
    ],
  },
];

export const INITIAL_REVIEWS: BookReview[] = [
  {
    id: 'r1',
    bookId: 'senja-di-ujung-sudirman',
    bookTitle: 'Senja di Ujung Sudirman',
    reviewer: 'Aulia Rahma',
    campus: 'Ilmu Komunikasi Unpad',
    rating: 5,
    vibeNote: 'Hangat & Relatable',
    comment: 'Salah satu fiksi kampus paling jujur tahun ini. Gaya bahasanya ringan tapi menohok pas masuk fase semester akhir.',
    likes: 24,
    createdAt: '2 hari lalu',
  },
  {
    id: 'r2',
    bookId: 'ritme-pagi-kebiasaan',
    bookTitle: 'Ritme Kecil, Dampak Panjang',
    reviewer: 'Reza Alamsyah',
    campus: 'Teknik Informatika ITS',
    rating: 5,
    vibeNote: 'Solutif Tanpa Menggurui',
    comment: 'Ringkasan audionya sangat membantu waktu lagi jalan kaki ke gedung kuliah. Langsung kepakai buat atur jadwal TA.',
    likes: 19,
    createdAt: '4 hari lalu',
  },
  {
    id: 'r3',
    bookId: 'orbit-sunyi-kepler',
    bookTitle: 'Orbit Sunyi di Selatan Kepler',
    reviewer: 'Maya Kartika',
    campus: 'Sastra Inggris UGM',
    rating: 5,
    vibeNote: 'Atmosferik & Tenang',
    comment: 'Sci-fi yang puitis! Baca pakai mode Malam Teduh bikin suasananya makin masuk.',
    likes: 15,
    createdAt: '1 minggu lalu',
  },
];

export const LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Nayla Azzahra', campus: 'Universitas Indonesia', streak: 28, minutes: 840, books: 6 },
  { rank: 2, name: 'Reza Alamsyah', campus: 'ITS Surabaya', streak: 21, minutes: 710, books: 5 },
  { rank: 3, name: 'Maya Kartika', campus: 'Universitas Gadjah Mada', streak: 19, minutes: 655, books: 5 },
  { rank: 4, name: 'Fajar Nugroho', campus: 'ITB Bandung', streak: 14, minutes: 520, books: 4 },
];
