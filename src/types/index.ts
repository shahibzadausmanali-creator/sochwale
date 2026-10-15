export type ContentStatus = 'published' | 'draft' | 'scheduled';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  additionalImages?: string[];
  imageAlt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  status: ContentStatus;
  readTimeMinutes: number;
  featured: boolean;
  seo: {
    title: string;
    description: string;
    focusKeyword: string;
    canonicalUrl?: string;
  };
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  thumbnail: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  ctaText?: string;
  status: ContentStatus;
  duration?: string;
  publishedAt: string;
}

export interface BookItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  previewImages: string[];
  pdfFileUrl: string;
  pdfFileName: string;
  fileSizeBytes: number;
  isPaid: boolean;
  pricePkr: number;
  salePricePkr?: number;
  category: string;
  tags: string[];
  featured: boolean;
  status: ContentStatus;
  downloadCount: number;
  publishedAt: string;
  pagesCount: number;
  author: string;
}

export type OrderStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string; // e.g., SW-2026-8492
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  amountPkr: number;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: 'JazzCash';
  transactionReference?: string;
  paymentProofUrl?: string;
  adminNote?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  registeredAt: string;
  assignedBookIds: string[]; // Books customer is entitled to download
  notes?: string;
}

export interface HeroSlide {
  id: string;
  heading: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  order: number;
  isActive: boolean;
}

export interface SocialMediaSettings {
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
}

export interface JazzCashSettings {
  accountNumber: string;
  accountHolder: string;
  instructions: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  whatsappNumber: string; // International format e.g. 923032226181
  jazzCash: JazzCashSettings;
  socialMedia: SocialMediaSettings;
  currency: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  articlesPerPage: number;
  enableProofUpload: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  headingFont: 'Newsreader' | 'Playfair' | 'Sans';
  bodyFont: 'Plus Jakarta Sans' | 'System';
  headerStyle: 'minimal' | 'bordered';
  buttonStyle: 'sharp' | 'subtle-radius';
  homepageSections: {
    heroSlider: boolean;
    featuredArticles: boolean;
    latestArticles: boolean;
    featuredVideos: boolean;
    latestVideos: boolean;
    featuredBooks: boolean;
    latestBooks: boolean;
    quoteBanner: boolean;
    socialShowcase: boolean;
    newsletter: boolean;
  };
}

export interface SEOCheckResult {
  id: string;
  title: string;
  passed: boolean;
  score: number;
  message: string;
  type: 'success' | 'warning' | 'error';
}

export interface SEOAnalysis {
  overallScore: number;
  checks: SEOCheckResult[];
  passedCount: number;
  warningCount: number;
  errorCount: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details: string;
}
