import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  VideoItem,
  BookItem,
  Order,
  Customer,
  HeroSlide,
  SiteSettings,
  ThemeSettings,
  AuditLog,
  SEOAnalysis
} from '../types';
import {
  DEFAULT_ARTICLES,
  DEFAULT_VIDEOS,
  DEFAULT_BOOKS,
  DEFAULT_ORDERS,
  DEFAULT_CUSTOMERS,
  DEFAULT_HERO_SLIDES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_THEME_SETTINGS,
  DEFAULT_AUDIT_LOGS
} from '../data/defaultData';
import { analyzeArticleSEO } from '../utils/seoAnalyzer';
import { generateAndDownloadPdf } from '../utils/pdfGenerator';

interface CMSContextType {
  // Navigation & Role
  currentView: string;
  currentSlug?: string;
  setCurrentView: (view: string, slug?: string) => void;
  userRole: 'admin' | 'customer' | 'visitor';
  setUserRole: (role: 'admin' | 'customer' | 'visitor') => void;
  activeCustomerEmail: string | null;
  setActiveCustomerEmail: (email: string | null) => void;

  // Data Collections
  articles: Article[];
  videos: VideoItem[];
  books: BookItem[];
  orders: Order[];
  customers: Customer[];
  slides: HeroSlide[];
  siteSettings: SiteSettings;
  themeSettings: ThemeSettings;
  auditLogs: AuditLog[];

  // Article Actions
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  getArticleBySlug: (slug: string) => Article | undefined;

  // Video Actions
  saveVideo: (video: VideoItem) => void;
  deleteVideo: (id: string) => void;
  getVideoBySlug: (slug: string) => VideoItem | undefined;

  // Book Actions
  saveBook: (book: BookItem) => void;
  deleteBook: (id: string) => void;
  getBookBySlug: (slug: string) => BookItem | undefined;
  getBookById: (id: string) => BookItem | undefined;

  // Order & Payment Workflow
  createOrder: (data: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    book: BookItem;
  }) => Order;
  submitPaymentReference: (orderId: string, reference: string, proofUrl?: string) => void;
  approveOrderPayment: (orderId: string, adminName?: string) => void;
  rejectOrderPayment: (orderId: string, reason: string) => void;
  updateOrderNote: (orderId: string, note: string) => void;

  // Customer & PDF Entitlements
  assignBookAccess: (customerEmail: string, bookId: string) => void;
  revokeBookAccess: (customerEmail: string, bookId: string) => void;
  checkBookAccess: (customerEmail: string | null, bookId: string) => boolean;
  downloadBook: (bookId: string, customerEmail?: string) => { success: boolean; message: string };

  // Slider Actions
  saveSlide: (slide: HeroSlide) => void;
  deleteSlide: (id: string) => void;
  reorderSlides: (reordered: HeroSlide[]) => void;

  // Settings Actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  resetAllToDefault: () => void;

  // SEO Helper
  evaluateArticleSEO: (article: Partial<Article>) => SEOAnalysis;

  // Modals / Overlays
  checkoutBook: BookItem | null;
  setCheckoutBook: (book: BookItem | null) => void;
  activeVideoEmbed: VideoItem | null;
  setActiveVideoEmbed: (video: VideoItem | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ARTICLES: 'sochwale_articles_v1',
  VIDEOS: 'sochwale_videos_v1',
  BOOKS: 'sochwale_books_v1',
  ORDERS: 'sochwale_orders_v1',
  CUSTOMERS: 'sochwale_customers_v1',
  SLIDES: 'sochwale_slides_v1',
  SETTINGS: 'sochwale_settings_v1',
  THEME: 'sochwale_theme_v1',
  AUDIT: 'sochwale_audit_v1',
  ROLE: 'sochwale_role_v1',
  ACTIVE_CUSTOMER: 'sochwale_active_customer_v1'
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentViewInternal] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  // Role & Session
  const [userRole, setUserRoleState] = useState<'admin' | 'customer' | 'visitor'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as any) || 'visitor';
  });

  const [activeCustomerEmail, setActiveCustomerEmailState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CUSTOMER) || 'ahmad.raza@example.com';
  });

  const setUserRole = (role: 'admin' | 'customer' | 'visitor') => {
    setUserRoleState(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  };

  const setActiveCustomerEmail = (email: string | null) => {
    setActiveCustomerEmailState(email);
    if (email) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CUSTOMER, email);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_CUSTOMER);
    }
  };

  // UI Modals
  const [checkoutBook, setCheckoutBook] = useState<BookItem | null>(null);
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<VideoItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Load persistent state with fallback to defaults
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
    } catch {
      return DEFAULT_ARTICLES;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
    } catch {
      return DEFAULT_VIDEOS;
    }
  });

  const [books, setBooks] = useState<BookItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : DEFAULT_BOOKS;
    } catch {
      return DEFAULT_BOOKS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOMERS;
    } catch {
      return DEFAULT_CUSTOMERS;
    }
  });

  const [slides, setSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SLIDES);
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved ? JSON.parse(saved) : DEFAULT_THEME_SETTINGS;
    } catch {
      return DEFAULT_THEME_SETTINGS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
      return saved ? JSON.parse(saved) : DEFAULT_AUDIT_LOGS;
    } catch {
      return DEFAULT_AUDIT_LOGS;
    }
  });

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(themeSettings));
  }, [themeSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Log an audit entry
  const addAuditLog = (action: string, performedBy: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      action,
      performedBy,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const setCurrentView = (view: string, slug?: string) => {
    setCurrentViewInternal(view);
    setCurrentSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Article helpers
  const saveArticle = (article: Article) => {
    setArticles(prev => {
      const idx = prev.findIndex(a => a.id === article.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = article;
        addAuditLog('Article Updated', 'Admin', `Updated article: "${article.title}"`);
        return copy;
      } else {
        addAuditLog('Article Created', 'Admin', `Created new article: "${article.title}"`);
        return [article, ...prev];
      }
    });
  };

  const deleteArticle = (id: string) => {
    const art = articles.find(a => a.id === id);
    setArticles(prev => prev.filter(a => a.id !== id));
    addAuditLog('Article Deleted', 'Admin', `Deleted article "${art?.title || id}"`);
  };

  const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);

  // Video helpers
  const saveVideo = (video: VideoItem) => {
    setVideos(prev => {
      const idx = prev.findIndex(v => v.id === video.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = video;
        addAuditLog('Video Updated', 'Admin', `Updated video: "${video.title}"`);
        return copy;
      } else {
        addAuditLog('Video Added', 'Admin', `Added new video: "${video.title}"`);
        return [video, ...prev];
      }
    });
  };

  const deleteVideo = (id: string) => {
    const vid = videos.find(v => v.id === id);
    setVideos(prev => prev.filter(v => v.id !== id));
    addAuditLog('Video Deleted', 'Admin', `Deleted video "${vid?.title || id}"`);
  };

  const getVideoBySlug = (slug: string) => videos.find(v => v.slug === slug);

  // Book helpers
  const saveBook = (book: BookItem) => {
    setBooks(prev => {
      const idx = prev.findIndex(b => b.id === book.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = book;
        addAuditLog('Book Updated', 'Admin', `Updated book: "${book.title}"`);
        return copy;
      } else {
        addAuditLog('Book Added', 'Admin', `Added new book: "${book.title}"`);
        return [book, ...prev];
      }
    });
  };

  const deleteBook = (id: string) => {
    const bk = books.find(b => b.id === id);
    setBooks(prev => prev.filter(b => b.id !== id));
    addAuditLog('Book Deleted', 'Admin', `Deleted book "${bk?.title || id}"`);
  };

  const getBookBySlug = (slug: string) => books.find(b => b.slug === slug);
  const getBookById = (id: string) => books.find(b => b.id === id);

  // Order & Payment Workflow
  const createOrder = (data: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    book: BookItem;
  }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SW-${new Date().getFullYear()}-${randomSuffix}`;
    const amount = data.book.salePricePkr && data.book.salePricePkr > 0
      ? data.book.salePricePkr
      : data.book.pricePkr;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim().toLowerCase(),
      customerPhone: data.customerPhone?.trim(),
      bookId: data.book.id,
      bookTitle: data.book.title,
      bookCover: data.book.coverImage,
      amountPkr: amount,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentMethod: 'JazzCash'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Ensure customer account exists
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === newOrder.customerEmail);
      if (!existing) {
        return [
          ...prev,
          {
            id: `cust-${Date.now()}`,
            name: newOrder.customerName,
            email: newOrder.customerEmail,
            phone: newOrder.customerPhone,
            registeredAt: new Date().toISOString().split('T')[0],
            assignedBookIds: []
          }
        ];
      }
      return prev;
    });

    addAuditLog('Order Created', 'System', `New order ${orderNumber} created by ${newOrder.customerName} for ${data.book.title} (PKR ${amount})`);
    return newOrder;
  };

  const submitPaymentReference = (orderId: string, reference: string, proofUrl?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          addAuditLog(
            'Payment Submitted',
            ord.customerName,
            `Submitted TRX Ref: "${reference}" for Order ${ord.orderNumber}. Marked Under Review.`
          );
          return {
            ...ord,
            status: 'under_review',
            transactionReference: reference.trim(),
            paymentProofUrl: proofUrl || ord.paymentProofUrl
          };
        }
        return ord;
      })
    );
  };

  const approveOrderPayment = (orderId: string, adminName = 'Usman Ali (Admin)') => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'approved',
            approvedAt: new Date().toISOString(),
            approvedBy: adminName,
            adminNote: ord.adminNote || 'Payment verified via JazzCash. Entitlement unlocked.'
          };
        }
        return ord;
      })
    );

    // Grant customer entitlement to download this paid book
    assignBookAccess(order.customerEmail, order.bookId);

    addAuditLog(
      'Payment Approved',
      adminName,
      `Approved Order ${order.orderNumber} (PKR ${order.amountPkr}). Access granted to ${order.customerEmail}.`
    );
  };

  const rejectOrderPayment = (orderId: string, reason: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'rejected',
            adminNote: `Rejected: ${reason}`
          };
        }
        return ord;
      })
    );

    addAuditLog(
      'Payment Rejected',
      'Admin',
      `Rejected Order ${order.orderNumber}. Reason: ${reason}`
    );
  };

  const updateOrderNote = (orderId: string, note: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return { ...ord, adminNote: note };
        }
        return ord;
      })
    );
    addAuditLog('Order Note Updated', 'Admin', `Updated note on Order ID ${orderId}`);
  };

  // Customer Entitlements
  const assignBookAccess = (customerEmail: string, bookId: string) => {
    const normalized = customerEmail.trim().toLowerCase();
    setCustomers(prev => {
      const idx = prev.findIndex(c => c.email.toLowerCase() === normalized);
      if (idx >= 0) {
        const copy = [...prev];
        const currentIds = copy[idx].assignedBookIds || [];
        if (!currentIds.includes(bookId)) {
          copy[idx] = {
            ...copy[idx],
            assignedBookIds: [...currentIds, bookId]
          };
        }
        return copy;
      } else {
        // Create customer record with entitlement
        return [
          ...prev,
          {
            id: `cust-${Date.now()}`,
            name: normalized.split('@')[0],
            email: normalized,
            registeredAt: new Date().toISOString().split('T')[0],
            assignedBookIds: [bookId]
          }
        ];
      }
    });

    addAuditLog('Access Assigned', 'Admin', `Assigned book (${bookId}) access to ${normalized}`);
  };

  const revokeBookAccess = (customerEmail: string, bookId: string) => {
    const normalized = customerEmail.trim().toLowerCase();
    setCustomers(prev =>
      prev.map(c => {
        if (c.email.toLowerCase() === normalized) {
          return {
            ...c,
            assignedBookIds: (c.assignedBookIds || []).filter(id => id !== bookId)
          };
        }
        return c;
      })
    );
    addAuditLog('Access Revoked', 'Admin', `Revoked book (${bookId}) access from ${normalized}`);
  };

  const checkBookAccess = (customerEmail: string | null, bookId: string): boolean => {
    const book = books.find(b => b.id === bookId);
    if (!book) return false;
    // Free books are accessible to everyone
    if (!book.isPaid) return true;

    // Paid books require authorized access
    if (!customerEmail) return false;
    const normalized = customerEmail.trim().toLowerCase();
    const customer = customers.find(c => c.email.toLowerCase() === normalized);
    return Boolean(customer?.assignedBookIds?.includes(bookId));
  };

  const downloadBook = (bookId: string, customerEmail?: string): { success: boolean; message: string } => {
    const book = books.find(b => b.id === bookId);
    if (!book) {
      return { success: false, message: 'Book resource not found.' };
    }

    const emailToVerify = customerEmail || activeCustomerEmail;

    // Check permissions
    if (book.isPaid) {
      const hasAccess = checkBookAccess(emailToVerify, bookId);
      if (!hasAccess) {
        return {
          success: false,
          message: 'Access restricted: Payment verification required. Please complete purchase or sign in.'
        };
      }
    }

    // Increment download counter
    setBooks(prev =>
      prev.map(b => (b.id === bookId ? { ...b, downloadCount: b.downloadCount + 1 } : b))
    );

    // Fetch customer details if licensed
    const customer = customers.find(c => c.email.toLowerCase() === emailToVerify?.toLowerCase());
    const matchedOrder = orders.find(
      o => o.bookId === bookId && o.customerEmail.toLowerCase() === emailToVerify?.toLowerCase() && o.status === 'approved'
    );

    // Trigger authentic PDF generator
    generateAndDownloadPdf({
      title: book.title,
      author: book.author || 'Usman Ali',
      category: book.category,
      pagesCount: book.pagesCount || 120,
      customerName: customer?.name || 'Verified Reader',
      customerEmail: emailToVerify || undefined,
      orderNumber: matchedOrder?.orderNumber,
      isPaid: book.isPaid
    });

    addAuditLog(
      'Book Downloaded',
      emailToVerify || 'Anonymous Reader',
      `Downloaded "${book.title}" (${book.isPaid ? 'Licensed Paid' : 'Free Resource'})`
    );

    return {
      success: true,
      message: `Download started for "${book.title}".`
    };
  };

  // Slider actions
  const saveSlide = (slide: HeroSlide) => {
    setSlides(prev => {
      const idx = prev.findIndex(s => s.id === slide.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = slide;
        return copy;
      } else {
        return [...prev, slide];
      }
    });
    addAuditLog('Slider Updated', 'Admin', `Saved slide "${slide.heading}"`);
  };

  const deleteSlide = (id: string) => {
    setSlides(prev => prev.filter(s => s.id !== id));
    addAuditLog('Slider Deleted', 'Admin', `Deleted slide ID: ${id}`);
  };

  const reorderSlides = (reordered: HeroSlide[]) => {
    setSlides(reordered);
    addAuditLog('Slider Reordered', 'Admin', 'Reordered homepage hero slides');
  };

  // Settings
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
    addAuditLog('Site Settings Updated', 'Admin', 'Updated general site settings');
  };

  const updateThemeSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings(prev => ({ ...prev, ...settings }));
    addAuditLog('Theme Settings Updated', 'Admin', 'Updated theme & layout settings');
  };

  const resetAllToDefault = () => {
    setArticles(DEFAULT_ARTICLES);
    setVideos(DEFAULT_VIDEOS);
    setBooks(DEFAULT_BOOKS);
    setOrders(DEFAULT_ORDERS);
    setCustomers(DEFAULT_CUSTOMERS);
    setSlides(DEFAULT_HERO_SLIDES);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setThemeSettings(DEFAULT_THEME_SETTINGS);
    setAuditLogs(DEFAULT_AUDIT_LOGS);
    localStorage.clear();
    addAuditLog('System Reset', 'Admin', 'Restored default factory CMS content');
  };

  const evaluateArticleSEO = (article: Partial<Article>) => {
    return analyzeArticleSEO(article);
  };

  return (
    <CMSContext.Provider
      value={{
        currentView,
        currentSlug,
        setCurrentView,
        userRole,
        setUserRole,
        activeCustomerEmail,
        setActiveCustomerEmail,
        articles,
        videos,
        books,
        orders,
        customers,
        slides,
        siteSettings,
        themeSettings,
        auditLogs,
        saveArticle,
        deleteArticle,
        getArticleBySlug,
        saveVideo,
        deleteVideo,
        getVideoBySlug,
        saveBook,
        deleteBook,
        getBookBySlug,
        getBookById,
        createOrder,
        submitPaymentReference,
        approveOrderPayment,
        rejectOrderPayment,
        updateOrderNote,
        assignBookAccess,
        revokeBookAccess,
        checkBookAccess,
        downloadBook,
        saveSlide,
        deleteSlide,
        reorderSlides,
        updateSiteSettings,
        updateThemeSettings,
        resetAllToDefault,
        evaluateArticleSEO,
        checkoutBook,
        setCheckoutBook,
        activeVideoEmbed,
        setActiveVideoEmbed,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
