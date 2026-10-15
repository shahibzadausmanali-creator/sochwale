import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Video,
  BookOpen,
  ShoppingBag,
  Users,
  KeyRound,
  Sliders,
  Palette,
  Settings,
  Share2,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import {
  Article,
  VideoItem,
  BookItem,
  HeroSlide,
  Order,
  OrderStatus
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    articles,
    saveArticle,
    deleteArticle,
    videos,
    saveVideo,
    deleteVideo,
    books,
    saveBook,
    deleteBook,
    orders,
    approveOrderPayment,
    rejectOrderPayment,
    updateOrderNote,
    customers,
    assignBookAccess,
    revokeBookAccess,
    slides,
    saveSlide,
    deleteSlide,
    reorderSlides,
    siteSettings,
    updateSiteSettings,
    themeSettings,
    updateThemeSettings,
    auditLogs,
    resetAllToDefault,
    evaluateArticleSEO,
    setCurrentView
  } = useCMS();

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'articles'
    | 'videos'
    | 'books'
    | 'orders'
    | 'customers'
    | 'slider'
    | 'theme'
    | 'settings'
    | 'audit'
  >('dashboard');

  // Search & Filters in Admin
  const [articleFilter, setArticleFilter] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Modals for Create/Edit
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
  const [editingBook, setEditingBook] = useState<Partial<BookItem> | null>(null);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [adminNoteText, setAdminNoteText] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Metrics for Dashboard Overview
  const totalArticles = articles.length;
  const publishedArticles = articles.filter(a => a.status === 'published').length;
  const draftArticles = articles.filter(a => a.status === 'draft').length;
  const totalVideos = videos.length;
  const freeBooks = books.filter(b => !b.isPaid).length;
  const paidBooks = books.filter(b => b.isPaid).length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const underReviewOrders = orders.filter(o => o.status === 'under_review').length;
  const approvedOrders = orders.filter(o => o.status === 'approved').length;
  const totalRevenue = orders
    .filter(o => o.status === 'approved')
    .reduce((sum, o) => sum + o.amountPkr, 0);

  // ARTICLE FORM HANDLERS
  const handleOpenNewArticle = () => {
    setEditingArticle({
      id: `art-${Date.now()}`,
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      imageAlt: '',
      category: 'Critical Thinking',
      tags: ['Philosophy'],
      author: 'Usman Ali',
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'published',
      readTimeMinutes: 5,
      featured: false,
      seo: {
        title: '',
        description: '',
        focusKeyword: ''
      }
    });
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    const slug = editingArticle.slug?.trim() || editingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalArticle: Article = {
      id: editingArticle.id || `art-${Date.now()}`,
      title: editingArticle.title,
      slug,
      content: editingArticle.content || '',
      excerpt: editingArticle.excerpt || '',
      featuredImage: editingArticle.featuredImage || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      additionalImages: editingArticle.additionalImages || [],
      imageAlt: editingArticle.imageAlt || '',
      category: editingArticle.category || 'Critical Thinking',
      tags: editingArticle.tags || ['General'],
      author: editingArticle.author || 'Usman Ali',
      publishedAt: editingArticle.publishedAt || new Date().toISOString().split('T')[0],
      status: editingArticle.status || 'published',
      readTimeMinutes: editingArticle.readTimeMinutes || 5,
      featured: Boolean(editingArticle.featured),
      seo: {
        title: editingArticle.seo?.title || editingArticle.title,
        description: editingArticle.seo?.description || editingArticle.excerpt || '',
        focusKeyword: editingArticle.seo?.focusKeyword || ''
      }
    };

    saveArticle(finalArticle);
    setEditingArticle(null);
    triggerToast('Article successfully published and saved.');
  };

  // VIDEO FORM HANDLERS
  const handleOpenNewVideo = () => {
    setEditingVideo({
      id: `vid-${Date.now()}`,
      title: '',
      slug: '',
      youtubeUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      description: '',
      category: 'Philosophy & Logic',
      tags: ['Lecture'],
      featured: false,
      status: 'published',
      duration: '20:00',
      publishedAt: new Date().toISOString().split('T')[0]
    });
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.youtubeUrl) return;

    const slug = editingVideo.slug?.trim() || editingVideo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalVideo: VideoItem = {
      id: editingVideo.id || `vid-${Date.now()}`,
      title: editingVideo.title,
      slug,
      youtubeUrl: editingVideo.youtubeUrl,
      thumbnail: editingVideo.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      description: editingVideo.description || '',
      category: editingVideo.category || 'Philosophy & Logic',
      tags: editingVideo.tags || ['Lecture'],
      featured: Boolean(editingVideo.featured),
      status: editingVideo.status || 'published',
      duration: editingVideo.duration || '20:00',
      publishedAt: editingVideo.publishedAt || new Date().toISOString().split('T')[0]
    };

    saveVideo(finalVideo);
    setEditingVideo(null);
    triggerToast('Video successfully added to library.');
  };

  // BOOK FORM HANDLERS
  const handleOpenNewBook = () => {
    setEditingBook({
      id: `book-${Date.now()}`,
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      previewImages: [],
      pdfFileUrl: '',
      pdfFileName: 'soch-wale-book.pdf',
      fileSizeBytes: 3000000,
      isPaid: true,
      pricePkr: 1500,
      salePricePkr: 1200,
      category: 'Philosophy & Logic',
      tags: ['Book'],
      featured: false,
      status: 'published',
      downloadCount: 0,
      publishedAt: new Date().toISOString().split('T')[0],
      pagesCount: 200,
      author: 'Usman Ali'
    });
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook || !editingBook.title) return;

    const slug = editingBook.slug?.trim() || editingBook.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalBook: BookItem = {
      id: editingBook.id || `book-${Date.now()}`,
      title: editingBook.title,
      slug,
      shortDescription: editingBook.shortDescription || '',
      fullDescription: editingBook.fullDescription || '',
      coverImage: editingBook.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      previewImages: editingBook.previewImages || [],
      pdfFileUrl: editingBook.pdfFileUrl || '',
      pdfFileName: editingBook.pdfFileName || `${slug}.pdf`,
      fileSizeBytes: editingBook.fileSizeBytes || 3000000,
      isPaid: Boolean(editingBook.isPaid),
      pricePkr: Number(editingBook.pricePkr) || 0,
      salePricePkr: editingBook.salePricePkr ? Number(editingBook.salePricePkr) : undefined,
      category: editingBook.category || 'Philosophy & Logic',
      tags: editingBook.tags || ['Book'],
      featured: Boolean(editingBook.featured),
      status: editingBook.status || 'published',
      downloadCount: editingBook.downloadCount || 0,
      publishedAt: editingBook.publishedAt || new Date().toISOString().split('T')[0],
      pagesCount: Number(editingBook.pagesCount) || 150,
      author: editingBook.author || 'Usman Ali'
    };

    saveBook(finalBook);
    setEditingBook(null);
    triggerToast('Book & PDF successfully saved.');
  };

  // SLIDE FORM HANDLERS
  const handleOpenNewSlide = () => {
    setEditingSlide({
      id: `slide-${Date.now()}`,
      heading: '',
      subtitle: '',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1800&q=80',
      ctaText: 'Explore',
      ctaUrl: '#articles',
      order: slides.length + 1,
      isActive: true
    });
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide || !editingSlide.heading) return;

    const finalSlide: HeroSlide = {
      id: editingSlide.id || `slide-${Date.now()}`,
      heading: editingSlide.heading,
      subtitle: editingSlide.subtitle || '',
      imageUrl: editingSlide.imageUrl || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1800&q=80',
      ctaText: editingSlide.ctaText || 'Learn More',
      ctaUrl: editingSlide.ctaUrl || '#articles',
      secondaryCtaText: editingSlide.secondaryCtaText,
      secondaryCtaUrl: editingSlide.secondaryCtaUrl,
      order: Number(editingSlide.order) || 1,
      isActive: Boolean(editingSlide.isActive)
    };

    saveSlide(finalSlide);
    setEditingSlide(null);
    triggerToast('Hero slide saved.');
  };

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderFilterStatus === 'all' || o.status === orderFilterStatus;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (o.transactionReference && o.transactionReference.toLowerCase().includes(orderSearch.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row text-neutral-900 font-sans">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs px-4 py-2.5 rounded shadow-2xl flex items-center gap-2 border border-neutral-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* WordPress Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#111111] text-neutral-300 flex-shrink-0 flex flex-col justify-between border-r border-neutral-800">
        <div>
          {/* Admin Header */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                SW
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">Soch Wale CMS</div>
                <div className="text-[10px] text-neutral-500 font-mono">WordPress Core 6.7</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('home')}
              title="View Public Site"
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-0.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
                activeTab === 'articles'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Articles & SEO</span>
              </div>
              <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-300">
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
                activeTab === 'videos'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4" />
                <span>YouTube Videos</span>
              </div>
              <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-300">
                {videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('books')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
                activeTab === 'books'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Books & PDFs</span>
              </div>
              <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-300">
                {books.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
                activeTab === 'orders'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & JazzCash</span>
              </div>
              {underReviewOrders > 0 ? (
                <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.2 rounded font-mono font-bold">
                  {underReviewOrders} new
                </span>
              ) : (
                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-300">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
                activeTab === 'customers'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Customers & Access</span>
              </div>
              <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-300">
                {customers.length}
              </span>
            </button>

            <div className="pt-3 pb-1 px-3 text-[10px] uppercase font-mono tracking-wider text-neutral-500">
              Appearance & Settings
            </div>

            <button
              onClick={() => setActiveTab('slider')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                activeTab === 'slider'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Hero Slider Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                activeTab === 'theme'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Theme & Layout Customizer</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                activeTab === 'settings'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>General Site Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                activeTab === 'audit'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security & Audit Log</span>
            </button>
          </nav>
        </div>

        {/* Footer in Sidebar */}
        <div className="p-3 border-t border-neutral-800 text-[11px] text-neutral-400">
          <div className="flex items-center justify-between mb-2">
            <span>Admin: Usman Ali</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <button
            onClick={() => {
              if (confirm('Restore factory demo content? This will reset all local changes.')) {
                resetAllToDefault();
                triggerToast('Factory demo content restored.');
              }
            }}
            className="w-full py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded text-center transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 max-h-screen">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  Dashboard Overview
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Real-time statistics, publishing status, and JazzCash payment verification queues.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenNewArticle}
                  className="px-3 py-2 bg-neutral-950 text-white text-xs font-semibold rounded hover:bg-black transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Article</span>
                </button>
                <button
                  onClick={handleOpenNewBook}
                  className="px-3 py-2 bg-white border border-neutral-300 text-neutral-900 text-xs font-semibold rounded hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Book PDF</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-neutral-200 rounded-sm shadow-xs">
                <div className="text-xs font-mono uppercase text-neutral-500">Total Articles</div>
                <div className="text-3xl font-serif font-bold text-neutral-950 mt-2">
                  {totalArticles}
                </div>
                <div className="text-xs text-neutral-500 mt-2 flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">{publishedArticles} Published</span>
                  <span>·</span>
                  <span className="text-neutral-400">{draftArticles} Drafts</span>
                </div>
              </div>

              <div className="p-5 bg-white border border-neutral-200 rounded-sm shadow-xs">
                <div className="text-xs font-mono uppercase text-neutral-500">Video Lectures</div>
                <div className="text-3xl font-serif font-bold text-neutral-950 mt-2">
                  {totalVideos}
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  Linked YouTube Videos
                </div>
              </div>

              <div className="p-5 bg-white border border-neutral-200 rounded-sm shadow-xs">
                <div className="text-xs font-mono uppercase text-neutral-500">Books & PDFs</div>
                <div className="text-3xl font-serif font-bold text-neutral-950 mt-2">
                  {books.length}
                </div>
                <div className="text-xs text-neutral-500 mt-2 flex items-center gap-2">
                  <span className="text-neutral-900 font-semibold">{freeBooks} Free</span>
                  <span>·</span>
                  <span className="text-neutral-900 font-semibold">{paidBooks} Paid Editions</span>
                </div>
              </div>

              <div className="p-5 bg-white border border-neutral-200 rounded-sm shadow-xs">
                <div className="text-xs font-mono uppercase text-neutral-500">Verified Revenue</div>
                <div className="text-3xl font-mono font-bold text-neutral-950 mt-2">
                  PKR {totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{approvedOrders} Approved Orders</span>
                </div>
              </div>
            </div>

            {/* Payment Verification Attention Alert */}
            {underReviewOrders > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <div>
                    <div className="text-sm font-bold text-amber-950">
                      {underReviewOrders} JazzCash Payment{underReviewOrders > 1 ? 's' : ''} Awaiting Review
                    </div>
                    <div className="text-xs text-amber-800">
                      Customers have submitted transaction IDs. Verify received funds and grant PDF access.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setOrderFilterStatus('under_review');
                  }}
                  className="px-3.5 py-1.5 bg-amber-800 text-white text-xs font-semibold rounded hover:bg-amber-900 transition-colors"
                >
                  Review Orders
                </button>
              </div>
            )}

            {/* Two Column Layout: Recent Orders & Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders Card */}
              <div className="p-6 bg-white border border-neutral-200 rounded-sm shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-serif font-bold text-neutral-950">
                    Recent Orders & Payments
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-neutral-900 hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {orders.slice(0, 4).map(ord => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-mono font-bold text-neutral-900">
                          {ord.orderNumber} · {ord.customerName}
                        </div>
                        <div className="text-neutral-500 text-[11px] mt-0.5">
                          {ord.bookTitle} · PKR {ord.amountPkr}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded font-semibold text-[10px] capitalize ${
                            ord.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-700'
                              : ord.status === 'under_review'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {ord.status.replace('_', ' ')}
                        </span>
                        {ord.status === 'under_review' && (
                          <button
                            onClick={() => {
                              approveOrderPayment(ord.id);
                              triggerToast(`Payment approved for order ${ord.orderNumber}. PDF access granted.`);
                            }}
                            className="px-2 py-1 bg-neutral-900 text-white rounded text-[10px] hover:bg-black"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Audit */}
              <div className="p-6 bg-white border border-neutral-200 rounded-sm shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-serif font-bold text-neutral-950">
                    Audit Log & Admin Actions
                  </h3>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="text-xs font-semibold text-neutral-900 hover:underline"
                  >
                    View Full Log →
                  </button>
                </div>

                <div className="space-y-3">
                  {auditLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="text-xs p-2.5 bg-neutral-50 rounded border border-neutral-100">
                      <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono mb-1">
                        <span className="font-bold text-neutral-800">{log.action}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p className="text-neutral-700 leading-tight">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTICLES CMS */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  Articles & Live SEO Management
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Publish scholarly articles, format content, upload images, and analyze real-time on-page SEO scores.
                </p>
              </div>

              <button
                onClick={handleOpenNewArticle}
                className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold rounded hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Article
              </button>
            </div>

            {/* Articles Table */}
            <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-600 uppercase font-mono tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3.5">Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Author</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">SEO Score</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {articles.map(art => {
                    const seo = evaluateArticleSEO(art);
                    return (
                      <tr key={art.id} className="hover:bg-neutral-50">
                        <td className="p-3.5 font-medium text-neutral-950 max-w-sm">
                          <div className="font-semibold text-sm line-clamp-1">{art.title}</div>
                          <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                            /{art.slug}
                          </div>
                        </td>
                        <td className="p-3.5 text-neutral-600">{art.category}</td>
                        <td className="p-3.5 text-neutral-600">{art.author}</td>
                        <td className="p-3.5 text-neutral-500 font-mono">{art.publishedAt}</td>
                        <td className="p-3.5">
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                              seo.overallScore >= 80
                                ? 'bg-emerald-50 text-emerald-700'
                                : seo.overallScore >= 60
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {seo.overallScore}/100
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              art.status === 'published'
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setCurrentView('article-detail', art.slug)}
                            title="Preview on Public Site"
                            className="p-1 text-neutral-500 hover:text-black"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingArticle(art)}
                            title="Edit Article & SEO"
                            className="p-1 text-neutral-700 hover:text-black"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete article "${art.title}"?`)) {
                                deleteArticle(art.id);
                                triggerToast('Article removed.');
                              }
                            }}
                            title="Delete Article"
                            className="p-1 text-neutral-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: VIDEOS CMS */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  YouTube Video Library
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage YouTube video lectures, custom thumbnails, unlisted video links, and categories.
                </p>
              </div>

              <button
                onClick={handleOpenNewVideo}
                className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold rounded hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Video
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(vid => (
                <div
                  key={vid.id}
                  className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-neutral-900">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      {vid.duration || 'Lecture'}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-500 font-semibold mb-1">
                        {vid.category}
                      </div>
                      <h3 className="text-sm font-serif font-bold text-neutral-950 line-clamp-2">
                        {vid.title}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                        {vid.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between">
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-neutral-500 hover:text-black flex items-center gap-1 font-mono"
                      >
                        <ExternalLink className="w-3 h-3" /> YouTube Link
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingVideo(vid)}
                          className="p-1 text-neutral-700 hover:text-black"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete video "${vid.title}"?`)) {
                              deleteVideo(vid.id);
                              triggerToast('Video removed.');
                            }
                          }}
                          className="p-1 text-neutral-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BOOKS & PDFS CMS */}
        {activeTab === 'books' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  Books & PDF Publishing
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Classify books as Free or Paid (JazzCash), manage prices in PKR, upload PDF assets, and track downloads.
                </p>
              </div>

              <button
                onClick={handleOpenNewBook}
                className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold rounded hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Book / PDF
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map(bk => (
                <div
                  key={bk.id}
                  className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] bg-neutral-100 p-4 relative">
                    <img
                      src={bk.coverImage}
                      alt={bk.title}
                      className="w-full h-full object-cover shadow"
                    />
                    <div className="absolute top-2 right-2">
                      {bk.isPaid ? (
                        <span className="bg-neutral-900 text-white font-mono text-[10px] font-bold px-2 py-0.5">
                          PKR {bk.salePricePkr || bk.pricePkr}
                        </span>
                      ) : (
                        <span className="bg-neutral-950 text-white font-mono text-[10px] px-2 py-0.5">
                          Free PDF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-500 font-semibold mb-1">
                        {bk.category} · {bk.pagesCount} Pages
                      </div>
                      <h3 className="text-sm font-serif font-bold text-neutral-950 line-clamp-2">
                        {bk.title}
                      </h3>
                      <div className="text-xs text-neutral-500 mt-1">
                        {bk.downloadCount} verified downloads
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentView('book-detail', bk.slug)}
                        className="text-[11px] font-semibold text-neutral-700 hover:text-black"
                      >
                        Preview Page
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingBook(bk)}
                          className="p-1 text-neutral-700 hover:text-black"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete book "${bk.title}"?`)) {
                              deleteBook(bk.id);
                              triggerToast('Book removed.');
                            }
                          }}
                          className="p-1 text-neutral-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS & JAZZCASH VERIFICATION */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  Orders & JazzCash Payment Verification
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Review customer transaction references, verify payment proofs, approve or reject orders, and unlock PDF access.
                </p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-3 border border-neutral-200 rounded text-xs">
              <div className="flex items-center gap-1">
                <span className="text-neutral-500">Filter Status:</span>
                {(['all', 'under_review', 'pending', 'approved', 'rejected'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderFilterStatus(st)}
                    className={`px-3 py-1 rounded capitalize font-medium ${
                      orderFilterStatus === st
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="ml-auto w-full sm:w-64">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Search order #, customer, TRX ID..."
                  className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-600 uppercase font-mono tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3.5">Order #</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Book Title</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">JazzCash TRX ID</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-400">
                        No orders match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-neutral-50">
                        <td className="p-3.5 font-mono font-bold text-neutral-950">
                          {ord.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-neutral-900">{ord.customerName}</div>
                          <div className="text-[11px] text-neutral-400">{ord.customerEmail}</div>
                          {ord.customerPhone && (
                            <div className="text-[11px] text-neutral-400">{ord.customerPhone}</div>
                          )}
                        </td>
                        <td className="p-3.5 text-neutral-900 font-medium max-w-xs truncate">
                          {ord.bookTitle}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-neutral-950">
                          PKR {ord.amountPkr}
                        </td>
                        <td className="p-3.5 font-mono">
                          {ord.transactionReference ? (
                            <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                              {ord.transactionReference}
                            </span>
                          ) : (
                            <span className="text-neutral-400 italic">Not submitted</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              ord.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'under_review'
                                ? 'bg-amber-100 text-amber-800'
                                : ord.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {ord.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setAdminNoteText(ord.adminNote || '');
                            }}
                            className="px-2.5 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 rounded text-neutral-800 font-medium"
                          >
                            Details
                          </button>

                          {ord.status !== 'approved' && (
                            <button
                              onClick={() => {
                                approveOrderPayment(ord.id);
                                triggerToast(`Order ${ord.orderNumber} approved. PDF access granted to ${ord.customerEmail}.`);
                              }}
                              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMERS & PDF ACCESS */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  Customers & PDF Access Control
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Search registered readers, view entitlements, manually assign or revoke access to paid PDF books.
                </p>
              </div>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  placeholder="Search customer email or name..."
                  className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs"
                />
              </div>
            </div>

            <div className="space-y-4">
              {customers
                .filter(
                  c =>
                    c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    c.name.toLowerCase().includes(customerSearch.toLowerCase())
                )
                .map(cust => (
                  <div
                    key={cust.id}
                    className="p-5 bg-white border border-neutral-200 rounded-sm shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-950">
                        {cust.name} ({cust.email})
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        Registered: {cust.registeredAt} · Phone: {cust.phone || 'N/A'}
                      </div>
                      <div className="text-xs text-neutral-700 mt-2 flex items-center gap-2">
                        <span className="font-semibold">Assigned Books ({cust.assignedBookIds?.length || 0}):</span>
                        {cust.assignedBookIds?.length > 0 ? (
                          cust.assignedBookIds.map(bId => {
                            const b = books.find(x => x.id === bId);
                            return (
                              <span
                                key={bId}
                                className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1"
                              >
                                {b?.title || bId}
                                <button
                                  onClick={() => {
                                    revokeBookAccess(cust.email, bId);
                                    triggerToast(`Revoked access for ${b?.title || bId}`);
                                  }}
                                  className="text-red-600 hover:text-red-900 ml-1 font-bold"
                                  title="Revoke access"
                                >
                                  ×
                                </button>
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-neutral-400 italic">No paid books assigned</span>
                        )}
                      </div>
                    </div>

                    {/* Quick Access Assignment Dropdown */}
                    <div className="flex items-center gap-2">
                      <select
                        onChange={e => {
                          if (e.target.value) {
                            assignBookAccess(cust.email, e.target.value);
                            triggerToast(`Access assigned to ${cust.email}`);
                            e.target.value = '';
                          }
                        }}
                        defaultValue=""
                        className="px-2.5 py-1.5 border border-neutral-300 rounded text-xs bg-white"
                      >
                        <option value="" disabled>+ Assign Paid Book...</option>
                        {books
                          .filter(b => b.isPaid && !cust.assignedBookIds?.includes(b.id))
                          .map(b => (
                            <option key={b.id} value={b.id}>
                              {b.title} (PKR {b.pricePkr})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 7: HERO SLIDER EDITOR */}
        {activeTab === 'slider' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h1 className="text-2xl font-serif font-bold text-neutral-900">
                  Homepage Hero Slider Editor
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Configure slider images, headlines, description copy, CTA destinations, and display order.
                </p>
              </div>

              <button
                onClick={handleOpenNewSlide}
                className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold rounded hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Slide
              </button>
            </div>

            <div className="space-y-4">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className="p-5 bg-white border border-neutral-200 rounded-sm shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={s.imageUrl}
                      alt={s.heading}
                      className="w-24 h-16 object-cover rounded border border-neutral-200 flex-shrink-0"
                    />
                    <div>
                      <div className="text-xs font-mono text-neutral-400">
                        Slide 0{idx + 1} · Order: {s.order} · {s.isActive ? 'Active' : 'Disabled'}
                      </div>
                      <h3 className="text-sm font-serif font-bold text-neutral-950 mt-0.5">
                        {s.heading}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                        {s.subtitle}
                      </p>
                      <div className="text-[11px] text-neutral-500 font-mono mt-1">
                        CTA: &quot;{s.ctaText}&quot; → {s.ctaUrl}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingSlide(s)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded text-xs font-medium"
                    >
                      Edit Slide
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this slide?')) {
                          deleteSlide(s.id);
                          triggerToast('Slide deleted.');
                        }
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: THEME & LAYOUT CUSTOMIZER */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-200">
              <h1 className="text-2xl font-serif font-bold text-neutral-900">
                Theme & Layout Customizer
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Maintain strict white-and-black minimalist aesthetic, typography pairings, and homepage section visibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Typography & Brand Palette */}
              <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Typography & Visual Identity
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Primary Brand Color (Background)
                  </label>
                  <input
                    type="text"
                    disabled
                    value="#FFFFFF (White)"
                    className="w-full px-3 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded text-neutral-600 font-mono"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Fixed white per official brand guidelines.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Secondary Brand Color (Typography & Accents)
                  </label>
                  <input
                    type="text"
                    disabled
                    value="#111111 (Deep Black)"
                    className="w-full px-3 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded text-neutral-600 font-mono"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Dominant typography & UI element color.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Heading Font Style
                  </label>
                  <select
                    value={themeSettings.headingFont}
                    onChange={e =>
                      updateThemeSettings({ headingFont: e.target.value as any })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white"
                  >
                    <option value="Newsreader">Newsreader (Editorial Classic Serif)</option>
                    <option value="Playfair">Playfair Display (High Contrast Serif)</option>
                    <option value="Sans">Plus Jakarta Sans (Modern Editorial)</option>
                  </select>
                </div>
              </div>

              {/* Homepage Section Visibility */}
              <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Homepage Section Visibility
                </h3>

                <div className="space-y-3 text-xs">
                  {Object.entries(themeSettings.homepageSections).map(([secKey, isVisible]) => (
                    <label key={secKey} className="flex items-center justify-between cursor-pointer">
                      <span className="capitalize font-medium text-neutral-800">
                        {secKey.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={e =>
                          updateThemeSettings({
                            homepageSections: {
                              ...themeSettings.homepageSections,
                              [secKey]: e.target.checked
                            }
                          })
                        }
                        className="w-4 h-4 accent-neutral-900 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: GENERAL SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-200">
              <h1 className="text-2xl font-serif font-bold text-neutral-900">
                General Website & JazzCash Settings
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Manage official brand parameters, JazzCash mobile account details, and social media URLs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* JazzCash Configuration */}
              <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> JazzCash Payment Gateway
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    JazzCash Account / Mobile Number
                  </label>
                  <input
                    type="text"
                    value={siteSettings.jazzCash.accountNumber}
                    onChange={e =>
                      updateSiteSettings({
                        jazzCash: { ...siteSettings.jazzCash, accountNumber: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Default: 03032226181
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Account Title / Holder Name
                  </label>
                  <input
                    type="text"
                    value={siteSettings.jazzCash.accountHolder}
                    onChange={e =>
                      updateSiteSettings({
                        jazzCash: { ...siteSettings.jazzCash, accountHolder: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Default: Usman Ali
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Payment Instructions Text
                  </label>
                  <textarea
                    rows={3}
                    value={siteSettings.jazzCash.instructions}
                    onChange={e =>
                      updateSiteSettings({
                        jazzCash: { ...siteSettings.jazzCash, instructions: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>
              </div>

              {/* Contact & Social Links */}
              <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Contact & Official Social Media
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp Contact Number (International Format)
                  </label>
                  <input
                    type="text"
                    value={siteSettings.whatsappNumber}
                    onChange={e => updateSiteSettings({ whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    e.g. 923032226181 (used for automatic WhatsApp order message routing)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.instagram}
                    onChange={e =>
                      updateSiteSettings({
                        socialMedia: { ...siteSettings.socialMedia, instagram: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.facebook}
                    onChange={e =>
                      updateSiteSettings({
                        socialMedia: { ...siteSettings.socialMedia, facebook: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.youtube}
                    onChange={e =>
                      updateSiteSettings({
                        socialMedia: { ...siteSettings.socialMedia, youtube: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    TikTok URL
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.tiktok}
                    onChange={e =>
                      updateSiteSettings({
                        socialMedia: { ...siteSettings.socialMedia, tiktok: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-200">
              <h1 className="text-2xl font-serif font-bold text-neutral-900">
                Security Audit Log
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Immutable trace of administrative actions, payment verifications, and entitlement modifications.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-600 uppercase font-mono tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Action</th>
                    <th className="p-3.5">Performed By</th>
                    <th className="p-3.5">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-neutral-50">
                      <td className="p-3.5 text-neutral-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3.5 font-bold text-neutral-900">{log.action}</td>
                      <td className="p-3.5 text-neutral-600">{log.performedBy}</td>
                      <td className="p-3.5 text-neutral-800 font-sans">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ARTICLE EDIT / CREATE MODAL WITH LIVE ON-PAGE SEO ANALYZER */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-4xl bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-neutral-900" />
                <h3 className="text-base font-serif font-bold text-neutral-900">
                  {editingArticle.id?.includes('art-') ? 'Edit Article' : 'New Article'}
                </h3>
              </div>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-6">
              {/* Live SEO Score Strip */}
              {(() => {
                const seo = evaluateArticleSEO(editingArticle);
                return (
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-mono tracking-wider text-neutral-500">
                          Live On-Page SEO Score:
                        </span>
                        <span
                          className={`font-mono font-bold text-base px-2 py-0.5 rounded ${
                            seo.overallScore >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : seo.overallScore >= 60
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {seo.overallScore} / 100
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        {seo.passedCount} passed · {seo.warningCount} warnings · {seo.errorCount} errors
                      </div>
                    </div>

                    <div className="text-xs text-neutral-600 max-w-sm">
                      {seo.checks.find(c => !c.passed)?.message || 'All primary on-page SEO checks passed!'}
                    </div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ''}
                    onChange={e =>
                      setEditingArticle({ ...editingArticle, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded"
                    placeholder="Enter article headline..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingArticle.slug || ''}
                    onChange={e =>
                      setEditingArticle({ ...editingArticle, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm font-mono border border-neutral-300 rounded"
                    placeholder="e.g. architecture-of-critical-thinking"
                  />
                </div>
              </div>

              {/* SEO Meta Box */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Search Engine Optimization (SEO) Metadata
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      value={editingArticle.seo?.focusKeyword || ''}
                      onChange={e =>
                        setEditingArticle({
                          ...editingArticle,
                          seo: { ...editingArticle.seo!, focusKeyword: e.target.value }
                        })
                      }
                      placeholder="e.g. critical thinking"
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      SEO Title (Optimal 40-60 chars)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.seo?.title || ''}
                      onChange={e =>
                        setEditingArticle({
                          ...editingArticle,
                          seo: { ...editingArticle.seo!, title: e.target.value }
                        })
                      }
                      placeholder="Custom search title tag..."
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    Meta Description (Optimal 120-160 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={editingArticle.seo?.description || ''}
                    onChange={e =>
                      setEditingArticle({
                        ...editingArticle,
                        seo: { ...editingArticle.seo!, description: e.target.value }
                      })
                    }
                    placeholder="Short summary for Google search snippets..."
                    className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={e =>
                    setEditingArticle({ ...editingArticle, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Article Body Content (HTML / Rich Text)
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingArticle.content || ''}
                  onChange={e =>
                    setEditingArticle({ ...editingArticle, content: e.target.value })
                  }
                  className="w-full p-3 text-xs font-mono border border-neutral-300 rounded leading-relaxed"
                  placeholder="Use <h2>Subheading</h2> and <p>Paragraphs</p> for structured hierarchy..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={editingArticle.featuredImage || ''}
                    onChange={e =>
                      setEditingArticle({ ...editingArticle, featuredImage: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={editingArticle.imageAlt || ''}
                    onChange={e =>
                      setEditingArticle({ ...editingArticle, imageAlt: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                    placeholder="Describe image for search & screen readers..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingArticle.category || 'Critical Thinking'}
                    onChange={e =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white"
                  >
                    <option value="Critical Thinking">Critical Thinking</option>
                    <option value="Scientific Inquiry">Scientific Inquiry</option>
                    <option value="Philosophy & Literature">Philosophy & Literature</option>
                    <option value="Digital Literacy">Digital Literacy</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 border border-neutral-300 rounded text-xs font-medium text-neutral-700 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-black transition-colors"
                >
                  Save & Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIDEO EDIT / CREATE MODAL */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-base font-serif font-bold text-neutral-900">
                {editingVideo.id?.includes('vid-') ? 'Edit YouTube Video' : 'Add New Video'}
              </h3>
              <button
                onClick={() => setEditingVideo(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  YouTube Video URL * (Supports Unlisted Links)
                </label>
                <input
                  type="url"
                  required
                  value={editingVideo.youtubeUrl || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-sm font-mono border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Custom Thumbnail Image URL
                </label>
                <input
                  type="url"
                  value={editingVideo.thumbnail || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Description & Key Topics
                </label>
                <textarea
                  rows={3}
                  value={editingVideo.description || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingVideo.category || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingVideo.duration || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    placeholder="e.g. 24:18"
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-4 py-2 border border-neutral-300 rounded text-xs font-medium text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-black"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOOK EDIT / CREATE MODAL */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-base font-serif font-bold text-neutral-900">
                {editingBook.id?.includes('book-') ? 'Edit Book / PDF Resource' : 'Add Book'}
              </h3>
              <button
                onClick={() => setEditingBook(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingBook.title || ''}
                  onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded"
                />
              </div>

              {/* Free vs Paid Selection */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-neutral-900 cursor-pointer">
                    <input
                      type="radio"
                      name="isPaid"
                      checked={editingBook.isPaid === false}
                      onChange={() => setEditingBook({ ...editingBook, isPaid: false, pricePkr: 0 })}
                      className="w-4 h-4 accent-neutral-900"
                    />
                    <span>Free Resource (Public PDF Download)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-neutral-900 cursor-pointer">
                    <input
                      type="radio"
                      name="isPaid"
                      checked={editingBook.isPaid === true}
                      onChange={() => setEditingBook({ ...editingBook, isPaid: true, pricePkr: 1500 })}
                      className="w-4 h-4 accent-neutral-900"
                    />
                    <span>Paid Book (JazzCash Manual Verification)</span>
                  </label>
                </div>

                {editingBook.isPaid && (
                  <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-neutral-200">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Regular Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={editingBook.pricePkr || 0}
                        onChange={e =>
                          setEditingBook({ ...editingBook, pricePkr: Number(e.target.value) })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Sale Price (Optional PKR)
                      </label>
                      <input
                        type="number"
                        value={editingBook.salePricePkr || ''}
                        onChange={e =>
                          setEditingBook({
                            ...editingBook,
                            salePricePkr: e.target.value ? Number(e.target.value) : undefined
                          })
                        }
                        placeholder="Leave empty if regular"
                        className="w-full px-3 py-1.5 text-xs font-mono border border-neutral-300 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingBook.shortDescription || ''}
                  onChange={e =>
                    setEditingBook({ ...editingBook, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Description & Scope
                </label>
                <textarea
                  rows={4}
                  value={editingBook.fullDescription || ''}
                  onChange={e =>
                    setEditingBook({ ...editingBook, fullDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={editingBook.coverImage || ''}
                    onChange={e => setEditingBook({ ...editingBook, coverImage: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={editingBook.pagesCount || 100}
                    onChange={e =>
                      setEditingBook({ ...editingBook, pagesCount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 border border-neutral-300 rounded text-xs font-medium text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-black"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HERO SLIDE EDIT MODAL */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-base font-serif font-bold text-neutral-900">
                Edit Hero Slide
              </h3>
              <button
                onClick={() => setEditingSlide(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={editingSlide.heading || ''}
                  onChange={e => setEditingSlide({ ...editingSlide, heading: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Subtitle
                </label>
                <textarea
                  rows={2}
                  value={editingSlide.subtitle || ''}
                  onChange={e => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Slide Image URL
                </label>
                <input
                  type="url"
                  value={editingSlide.imageUrl || ''}
                  onChange={e => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={editingSlide.ctaText || ''}
                    onChange={e => setEditingSlide({ ...editingSlide, ctaText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Primary Button URL
                  </label>
                  <input
                    type="text"
                    value={editingSlide.ctaUrl || ''}
                    onChange={e => setEditingSlide({ ...editingSlide, ctaUrl: e.target.value })}
                    placeholder="#articles or /books"
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 border border-neutral-300 rounded text-xs font-medium text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-black"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DETAILS & VERIFICATION MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                <h3 className="text-base font-serif font-bold text-neutral-900">
                  Order Verification: {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 border border-neutral-200 rounded">
                <div>
                  <span className="text-neutral-500 block">Customer Name</span>
                  <span className="font-semibold text-neutral-900 text-sm">
                    {selectedOrder.customerName}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Customer Email</span>
                  <span className="font-semibold text-neutral-900">{selectedOrder.customerEmail}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Book Title</span>
                  <span className="font-semibold text-neutral-900">{selectedOrder.bookTitle}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Amount Payable</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm">
                    PKR {selectedOrder.amountPkr}
                  </span>
                </div>
              </div>

              {/* JazzCash Transaction ID Reference */}
              <div className="p-4 bg-neutral-900 text-white rounded">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                  Submitted JazzCash Reference (TID)
                </span>
                <div className="text-lg font-mono font-bold text-amber-400">
                  {selectedOrder.transactionReference || 'No reference submitted yet'}
                </div>
              </div>

              {/* Payment Proof Screenshot Preview if Uploaded */}
              {selectedOrder.paymentProofUrl && (
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-700 block mb-2">
                    Payment Proof Screenshot
                  </span>
                  <img
                    src={selectedOrder.paymentProofUrl}
                    alt="Proof screenshot"
                    className="w-full max-h-56 object-contain rounded border border-neutral-300 bg-neutral-50"
                  />
                </div>
              )}

              {/* Internal Admin Note */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Internal Verification Note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminNoteText}
                    onChange={e => setAdminNoteText(e.target.value)}
                    placeholder="e.g. Funds verified on JazzCash portal..."
                    className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderNote(selectedOrder.id, adminNoteText);
                      triggerToast('Note saved.');
                    }}
                    className="px-3 py-1.5 bg-neutral-800 text-white text-xs rounded hover:bg-black"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Verification Decision Actions */}
              <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                {selectedOrder.status !== 'approved' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const reason = prompt('Enter rejection reason:') || 'Payment not found in JazzCash account.';
                        rejectOrderPayment(selectedOrder.id, reason);
                        setSelectedOrder(null);
                        triggerToast(`Order ${selectedOrder.orderNumber} rejected.`);
                      }}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold rounded"
                    >
                      Reject Payment
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        approveOrderPayment(selectedOrder.id);
                        setSelectedOrder(null);
                        triggerToast(`Order ${selectedOrder.orderNumber} approved. PDF access granted to ${selectedOrder.customerEmail}.`);
                      }}
                      className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Grant PDF Access</span>
                    </button>
                  </>
                ) : (
                  <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Payment verified & approved on {selectedOrder.approvedAt?.slice(0, 10)}.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
