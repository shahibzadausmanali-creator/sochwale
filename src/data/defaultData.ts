import {
  Article,
  VideoItem,
  BookItem,
  Order,
  Customer,
  HeroSlide,
  SiteSettings,
  ThemeSettings,
  AuditLog
} from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'Soch Wale',
  tagline: 'Illuminating Minds Through Reason, Science & Critical Inquiry',
  logoUrl: '', // Uses brand SVG monogram when empty
  faviconUrl: '',
  contactEmail: 'contact@sochwale.com',
  whatsappNumber: '923032226181', // International format
  jazzCash: {
    accountNumber: '03032226181',
    accountHolder: 'Usman Ali',
    instructions: 'Send the exact amount via JazzCash App or Mobile Account to 03032226181 (Usman Ali). Keep the Transaction ID (TID) or screenshot for verification.'
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/sochwale.official/',
    facebook: 'https://www.facebook.com/profile.php?id=61594587364213',
    youtube: 'https://www.youtube.com/@SochWale',
    tiktok: 'https://www.tiktok.com/@sochwale'
  },
  currency: 'PKR',
  defaultSeoTitle: 'Soch Wale — Educational & Digital Publishing Platform',
  defaultSeoDescription: 'Official Soch Wale platform. Explore critical articles, video lectures, free & paid PDF books with manual JazzCash verification and full CMS.',
  articlesPerPage: 8,
  enableProofUpload: true
};

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  primaryColor: '#ffffff',
  secondaryColor: '#111111',
  headingFont: 'Newsreader',
  bodyFont: 'Plus Jakarta Sans',
  headerStyle: 'minimal',
  buttonStyle: 'sharp',
  homepageSections: {
    heroSlider: true,
    featuredArticles: true,
    latestArticles: true,
    featuredVideos: true,
    latestVideos: true,
    featuredBooks: true,
    latestBooks: true,
    quoteBanner: true,
    socialShowcase: true,
    newsletter: true
  }
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    heading: 'Fikr-e-Nau: Cultivating Rational Thought & Scientific Literacy',
    subtitle: 'Soch Wale is an intellectual sanctuary dedicated to critical analysis, philosophy, and progressive knowledge for the contemporary mind.',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1800&q=80',
    ctaText: 'Explore Articles',
    ctaUrl: '#articles',
    secondaryCtaText: 'Browse Books',
    secondaryCtaUrl: '#books',
    order: 1,
    isActive: true
  },
  {
    id: 'slide-2',
    heading: 'Discourse That Challenges Dogma & Inspires Clarity',
    subtitle: 'Engage with deep video lectures, scholarly essays, and foundational publications designed to empower free and independent thinkers.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1800&q=80',
    ctaText: 'Watch Video Lectures',
    ctaUrl: '#videos',
    secondaryCtaText: 'Download Resources',
    secondaryCtaUrl: '#books',
    order: 2,
    isActive: true
  },
  {
    id: 'slide-3',
    heading: 'Exclusive Digital Books & Philosophical Treatises',
    subtitle: 'Access curated digital books with verified access, study guides, and instant reading materials on modern philosophy and science.',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1800&q=80',
    ctaText: 'View Digital Bookstore',
    ctaUrl: '#books',
    secondaryCtaText: 'Join the Community',
    secondaryCtaUrl: '#community',
    order: 3,
    isActive: true
  }
];

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Architecture of Critical Thinking: Overcoming Modern Cognitive Dogma',
    slug: 'architecture-of-critical-thinking',
    excerpt: 'An investigative exploration into why human reasoning defaults to confirmation bias and how the Socratic method reconstructs intellectual freedom.',
    content: `<h2>The Crisis of Modern Consensus</h2>
<p>In contemporary discourse, information availability has outpaced cognitive discernment. We are saturated with assertions yet starving for coherent epistemological evaluation. Critical thinking is not merely an academic exercise; it is an existential defense against ideological conditioning.</p>

<h2>The Socratic Foundation</h2>
<p>Socrates posited that wisdom begins with the acknowledgment of our own ignorance. By methodically peeling away unwarranted assumptions, one unveils the structural fragility of popular dogma. When we examine our beliefs through rigorous dialectic, we move beyond mere reactionary sentiment toward reasoned clarity.</p>

<h2>Deconstructing Cognitive Fallacies</h2>
<p>Modern psychology corroborates ancient philosophical warnings: our minds gravitate toward confirmation bias, anchoring effects, and tribal consensus. To resist these systemic errors, thinkers must actively seek contrary evidence, formulate counter-arguments, and evaluate claims based on empirical validity rather than emotional comfort.</p>

<h2>Toward an Independent Intellect</h2>
<p>Cultivating authentic autonomy requires daily discipline. Read widely outside your comfort domain, analyze the premises of every headline, and maintain unwavering commitment to truth over social approval.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'
    ],
    imageAlt: 'Open philosophical volume with glasses symbolizing focused critical inquiry',
    category: 'Critical Thinking',
    tags: ['Philosophy', 'Cognition', 'Logic', 'Epistemology'],
    author: 'Usman Ali',
    publishedAt: '2026-03-12',
    status: 'published',
    readTimeMinutes: 7,
    featured: true,
    seo: {
      title: 'The Architecture of Critical Thinking | Soch Wale',
      description: 'Discover how to overcome cognitive bias and cultivate rational inquiry through Socratic dialectics and modern psychological principles.',
      focusKeyword: 'critical thinking'
    }
  },
  {
    id: 'art-2',
    title: 'Science and Reason: How Empirical Method Shapes Humane Society',
    slug: 'science-and-reason-empirical-method',
    excerpt: 'Tracing the journey from mystical fatalism to verifiable scientific methodology, and why empirical literacy is essential for modern civic progress.',
    content: `<h2>The Dawn of Empirical Skepticism</h2>
<p>The transition from medieval dogma to empirical science was not merely a technological advancement; it represented a radical moral and philosophical shift. By asserting that reality must be investigated through falsifiable hypothesis and observable evidence, humanity established a shared standard of truth.</p>

<h2>The Mechanism of Falsifiability</h2>
<p>As Karl Popper illuminated, scientific theories can never be permanently proven; they can only be continually tested and corroborated until refuted. This foundational humility distinguishes science from ideological certainty.</p>

<h2>Empirical Thinking in Everyday Life</h2>
<p>When citizens embrace scientific literacy, societal decision-making shifts from superstitious allegiance to demonstrable benefit. Healthcare, education, and governance achieve lasting vitality when informed by rigorous data and open experimentation.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laboratory glassware with illuminated reflection representing scientific discovery',
    category: 'Scientific Inquiry',
    tags: ['Science', 'Methodology', 'Reason', 'Progress'],
    author: 'Usman Ali',
    publishedAt: '2026-03-24',
    status: 'published',
    readTimeMinutes: 5,
    featured: true,
    seo: {
      title: 'Science and Reason: Empirical Foundations | Soch Wale',
      description: 'Explore why empirical literacy and Popperian falsifiability remain the primary engines for societal progress and human enlightenment.',
      focusKeyword: 'science and reason'
    }
  },
  {
    id: 'art-3',
    title: 'The Philosophy of Iqbal: Reconstructing Religious Thought in Modernity',
    slug: 'philosophy-of-iqbal-reconstructing-thought',
    excerpt: 'A deep textual evaluation of Allama Iqbal’s lectures on selfhood (Khudi), dynamic time, and the revitalization of eastern philosophical conscience.',
    content: `<h2>Khudi as Dynamic Will</h2>
<p>Dr. Muhammad Iqbal formulated 'Khudi' not as egotistical pride, but as conscious self-realization through creative struggle. In contrast to passive mysticism that advocated renunciation, Iqbal championed vigorous engagement with the physical and moral world.</p>

<h2>The Reconstruction of Thought</h2>
<p>His magnum opus, <em>The Reconstruction of Religious Thought in Islam</em>, tackled the profound synthesis between Bergsonian intuition, Einsteinian relativity, and Islamic metaphysics. He insisted that tradition must never stagnate into rigid fossilization.</p>

<h2>Iqbal’s Message to the Youth</h2>
<p>To the modern student, Iqbal offers a vision of intellectual independence: questioning blind imitation (Taqlid) and boldly pioneering new frontiers of thought.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Antique fountain pen resting on manuscript page depicting philosophical writing',
    category: 'Philosophy & Literature',
    tags: ['Iqbal', 'Khudi', 'Eastern Philosophy', 'Urdu Thought'],
    author: 'Usman Ali',
    publishedAt: '2026-04-02',
    status: 'published',
    readTimeMinutes: 8,
    featured: true,
    seo: {
      title: 'The Philosophy of Iqbal & Modern Selfhood | Soch Wale',
      description: 'An analysis of Dr. Allama Iqbal’s philosophical reconstruction, Khudi, and dynamic engagement with modern science and metaphysics.',
      focusKeyword: 'philosophy of iqbal'
    }
  },
  {
    id: 'art-4',
    title: 'Digital Minimalism: Protecting Concentration in an Economy of Distraction',
    slug: 'digital-minimalism-protecting-concentration',
    excerpt: 'Practical strategies for reclaiming deep work, contemplation, and sustained cognitive focus amidst algorithmic notifications and superficial feeds.',
    content: `<h2>The Scarcity of Deep Focus</h2>
<p>Human attention has become the most intensely monetized resource on Earth. Algorithmic platforms engineer variable reward loops that fragment our cognitive focus into micro-intervals, leaving little energy for serious reading or philosophical contemplation.</p>

<h2>The Principles of Digital Minimalism</h2>
<p>Digital minimalism is not anti-technology; it is pro-intentionality. It demands that you ruthlessly eliminate low-value tools and treat your time as an irreplaceable sacred asset.</p>

<h2>Actionable Steps for Intellectual Autonomy</h2>
<p>1. Designate strict device-free reading hours.<br>2. Replace endless video scrolling with long-form books and investigative essays.<br>3. Turn off non-essential notifications permanently.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Minimalist desk with single notebook and morning tea emphasizing deep focus',
    category: 'Digital Literacy',
    tags: ['Focus', 'Digital Minimalism', 'Productivity', 'Mindfulness'],
    author: 'Usman Ali',
    publishedAt: '2026-04-10',
    status: 'published',
    readTimeMinutes: 4,
    featured: false,
    seo: {
      title: 'Digital Minimalism: Protecting Focus | Soch Wale',
      description: 'Master digital minimalism to protect deep concentration, cultivate sustained intellectual habits, and overcome algorithmic distraction.',
      focusKeyword: 'digital minimalism'
    }
  }
];

export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Why Critical Thinking is the Most Urgent Skill of Our Century',
    slug: 'why-critical-thinking-urgent-skill',
    youtubeUrl: 'https://www.youtube.com/watch?v=dItUGF8GdTw',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description: 'In this comprehensive video lecture, Usman Ali deconstructs the mechanisms of logical fallacies, emotional manipulation, and how to verify information with rational rigor.',
    category: 'Philosophy & Logic',
    tags: ['Critical Thinking', 'Lectures', 'Rationality'],
    featured: true,
    ctaText: 'Watch Lecture',
    status: 'published',
    duration: '24:18',
    publishedAt: '2026-03-15'
  },
  {
    id: 'vid-2',
    title: 'The Great Scientific Revolution: From Galileo to Quantum Physics',
    slug: 'great-scientific-revolution-galileo-quantum',
    youtubeUrl: 'https://www.youtube.com/watch?v=7vhGZ_cWfX8',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description: 'A visual exploration of the thinkers who redefined human understanding of the cosmos, gravity, and the atomic fabric of our universe.',
    category: 'Scientific Inquiry',
    tags: ['Physics', 'Cosmology', 'Scientific Revolution'],
    featured: true,
    ctaText: 'Watch Documentary',
    status: 'published',
    duration: '32:45',
    publishedAt: '2026-03-29'
  },
  {
    id: 'vid-3',
    title: 'Understanding Eastern Philosophy: Rumi, Khayyam, and Iqbal',
    slug: 'understanding-eastern-philosophy-rumi-iqbal',
    youtubeUrl: 'https://www.youtube.com/watch?v=V1gA66Vn484',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    description: 'An illuminating discussion on the profound insights of classical poets and modern philosophers in shaping ethics, introspection, and civilizational identity.',
    category: 'Literature & Thought',
    tags: ['Eastern Philosophy', 'Literature', 'Sufism'],
    featured: true,
    ctaText: 'Watch Lecture',
    status: 'published',
    duration: '28:10',
    publishedAt: '2026-04-05'
  },
  {
    id: 'vid-4',
    title: 'The Psychology of Belief: Why We Cling to Ideas That Hurt Us',
    slug: 'psychology-of-belief-cognitive-biases',
    youtubeUrl: 'https://www.youtube.com/watch?v=wX78iKhInsc',
    thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    description: 'Investigating the cognitive roots of dogmatism, cognitive dissonance, and the biological impulse to defend obsolete convictions.',
    category: 'Psychology',
    tags: ['Cognitive Biases', 'Psychology', 'Behavior'],
    featured: false,
    ctaText: 'Watch Video',
    status: 'published',
    duration: '19:40',
    publishedAt: '2026-04-12'
  }
];

export const DEFAULT_BOOKS: BookItem[] = [
  {
    id: 'book-1',
    title: 'Fikr-e-Kamil: The Principles of Rational Discourse',
    slug: 'fikr-e-kamil-principles-rational-discourse',
    shortDescription: 'A comprehensive philosophical treatise detailing classical logical frameworks, cognitive fallacies, and modern rational epistemology.',
    fullDescription: 'Fikr-e-Kamil serves as the foundational text for anyone seeking to reconstruct their intellectual methodology. Written with crystalline clarity, it walks readers through formal logic, empirical validation, ethical reasoning, and the historical development of free thought. Includes extensive study chapters and analytical guides.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ],
    pdfFileUrl: '/sample-books/fikr-e-kamil.pdf',
    pdfFileName: 'fikr-e-kamil-soch-wale.pdf',
    fileSizeBytes: 4850000,
    isPaid: true,
    pricePkr: 1500,
    salePricePkr: 1200,
    category: 'Philosophy & Logic',
    tags: ['Logic', 'Critical Thinking', 'Epistemology', 'Hardcover Edition'],
    featured: true,
    status: 'published',
    downloadCount: 342,
    publishedAt: '2026-01-10',
    pagesCount: 280,
    author: 'Usman Ali'
  },
  {
    id: 'book-2',
    title: 'Introduction to Scientific Methodology (Free Edition)',
    slug: 'introduction-to-scientific-methodology',
    shortDescription: 'Essential guide for students and researchers exploring hypothesis testing, falsifiability, and peer review standards.',
    fullDescription: 'This open educational publication breaks down scientific inquiry into actionable concepts. Perfect for students, teachers, and inquisitive minds who wish to evaluate research papers, identify pseudo-scientific claims, and apply evidence-based reasoning in everyday decision making.',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80'
    ],
    pdfFileUrl: '/sample-books/scientific-methodology-free.pdf',
    pdfFileName: 'scientific-methodology-free-edition.pdf',
    fileSizeBytes: 2150000,
    isPaid: false,
    pricePkr: 0,
    category: 'Scientific Inquiry',
    tags: ['Science', 'Methodology', 'Education', 'Free Resource'],
    featured: true,
    status: 'published',
    downloadCount: 1845,
    publishedAt: '2026-02-14',
    pagesCount: 110,
    author: 'Soch Wale Editorial Board'
  },
  {
    id: 'book-3',
    title: 'Tazad-o-Tasalsul: Modern Dialectics & Social Evolution',
    slug: 'tazad-o-tasalsul-modern-dialectics',
    shortDescription: 'An analytical volume scrutinizing how historical dialectics and technological acceleration are redefining contemporary cultural identity.',
    fullDescription: 'Tazad-o-Tasalsul investigates the intellectual and social crosscurrents shaping South Asian consciousness in the 21st century. Drawing from both world philosophy and localized cultural history, this book offers a courageous assessment of progress, tradition, and the moral duty of modern intellectuals.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    pdfFileUrl: '/sample-books/tazad-o-tasalsul.pdf',
    pdfFileName: 'tazad-o-tasalsul-digital.pdf',
    fileSizeBytes: 5400000,
    isPaid: true,
    pricePkr: 1800,
    salePricePkr: 1500,
    category: 'Philosophy & Society',
    tags: ['Sociology', 'Modernity', 'Dialectics', 'Philosophy'],
    featured: true,
    status: 'published',
    downloadCount: 189,
    publishedAt: '2026-03-01',
    pagesCount: 320,
    author: 'Usman Ali'
  },
  {
    id: 'book-4',
    title: 'Critical Thinking Handbook for Students (Free Edition)',
    slug: 'critical-thinking-handbook-students',
    shortDescription: 'A practical 50-point checklist and toolkit to detect cognitive fallacies, biased arguments, and misinformation.',
    fullDescription: 'Designed as an accessible pocket manual for high school and university students, this handbook provides quick identification guides for strawman arguments, ad hominem attacks, false dichotomies, and slippery slope fallacies with everyday illustrative examples.',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=800&q=80'
    ],
    pdfFileUrl: '/sample-books/critical-thinking-handbook.pdf',
    pdfFileName: 'critical-thinking-handbook-sochwale.pdf',
    fileSizeBytes: 1800000,
    isPaid: false,
    pricePkr: 0,
    category: 'Education',
    tags: ['Checklist', 'Fallacies', 'Students', 'Free PDF'],
    featured: false,
    status: 'published',
    downloadCount: 3410,
    publishedAt: '2026-03-18',
    pagesCount: 64,
    author: 'Soch Wale Editorial Board'
  }
];

export const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'SW-2026-7841',
    customerName: 'Ahmad Raza',
    customerEmail: 'ahmad.raza@example.com',
    customerPhone: '0312-3456789',
    bookId: 'book-1',
    bookTitle: 'Fikr-e-Kamil: The Principles of Rational Discourse',
    bookCover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    amountPkr: 1200,
    createdAt: '2026-10-14T11:20:00Z',
    status: 'approved',
    paymentMethod: 'JazzCash',
    transactionReference: 'JC8941209341',
    adminNote: 'Payment verified on JazzCash portal. Entitlement granted.',
    approvedAt: '2026-10-14T12:05:00Z',
    approvedBy: 'Usman Ali (Admin)'
  },
  {
    id: 'ord-2',
    orderNumber: 'SW-2026-8924',
    customerName: 'Fatima Zahra',
    customerEmail: 'fatima.z@example.com',
    customerPhone: '0321-9876543',
    bookId: 'book-3',
    bookTitle: 'Tazad-o-Tasalsul: Modern Dialectics & Social Evolution',
    bookCover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    amountPkr: 1500,
    createdAt: '2026-10-15T08:14:00Z',
    status: 'under_review',
    paymentMethod: 'JazzCash',
    transactionReference: 'JC9018471203',
    paymentProofUrl: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ord-3',
    orderNumber: 'SW-2026-9041',
    customerName: 'Bilal Khan',
    customerEmail: 'bilal.khan@example.com',
    customerPhone: '0300-1122334',
    bookId: 'book-1',
    bookTitle: 'Fikr-e-Kamil: The Principles of Rational Discourse',
    bookCover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    amountPkr: 1200,
    createdAt: '2026-10-15T09:02:00Z',
    status: 'pending',
    paymentMethod: 'JazzCash'
  }
];

export const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ahmad Raza',
    email: 'ahmad.raza@example.com',
    phone: '0312-3456789',
    registeredAt: '2026-10-14',
    assignedBookIds: ['book-1'],
    notes: 'Verified reader. Purchased Fikr-e-Kamil.'
  },
  {
    id: 'cust-2',
    name: 'Fatima Zahra',
    email: 'fatima.z@example.com',
    phone: '0321-9876543',
    registeredAt: '2026-10-15',
    assignedBookIds: [],
    notes: 'Pending manual verification of JazzCash payment.'
  },
  {
    id: 'cust-3',
    name: 'Bilal Khan',
    email: 'bilal.khan@example.com',
    phone: '0300-1122334',
    registeredAt: '2026-10-15',
    assignedBookIds: [],
    notes: 'Awaiting payment confirmation.'
  }
];

export const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-14 12:05',
    action: 'Payment Approved',
    performedBy: 'Usman Ali (Admin)',
    details: 'Order SW-2026-7841 approved (1200 PKR). Granted access to book-1 for ahmad.raza@example.com.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-15 08:14',
    action: 'Payment Submitted',
    performedBy: 'Customer (Fatima Zahra)',
    details: 'Submitted TRX JC9018471203 for Order SW-2026-8924.'
  }
];
