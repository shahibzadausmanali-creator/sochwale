import { Article, SEOAnalysis, SEOCheckResult } from '../types';

export function analyzeArticleSEO(article: Partial<Article>): SEOAnalysis {
  const checks: SEOCheckResult[] = [];
  const focusKeyword = (article.seo?.focusKeyword || '').trim().toLowerCase();
  const title = (article.title || '').trim();
  const seoTitle = (article.seo?.title || title).trim();
  const metaDescription = (article.seo?.description || article.excerpt || '').trim();
  const content = (article.content || '').trim();
  const slug = (article.slug || '').trim().toLowerCase();
  const imageAlt = (article.imageAlt || '').trim();
  const featuredImage = (article.featuredImage || '').trim();

  // 1. Focus Keyword Provided
  if (!focusKeyword) {
    checks.push({
      id: 'focus_kw_missing',
      title: 'Focus Keyword',
      passed: false,
      score: 0,
      type: 'error',
      message: 'No focus keyword set. Add a central keyword to evaluate targeted on-page SEO.'
    });
  } else {
    checks.push({
      id: 'focus_kw_present',
      title: 'Focus Keyword Set',
      passed: true,
      score: 10,
      type: 'success',
      message: `Focus keyword "${focusKeyword}" is defined.`
    });
  }

  // 2. SEO Title Length & Presence
  if (!seoTitle) {
    checks.push({
      id: 'seo_title_missing',
      title: 'SEO Title Missing',
      passed: false,
      score: 0,
      type: 'error',
      message: 'Article requires an SEO title for search snippets.'
    });
  } else if (seoTitle.length < 30) {
    checks.push({
      id: 'seo_title_short',
      title: 'SEO Title Too Short',
      passed: false,
      score: 4,
      type: 'warning',
      message: `SEO title is ${seoTitle.length} chars. Aim between 40 and 60 characters for maximum search visibility.`
    });
  } else if (seoTitle.length > 65) {
    checks.push({
      id: 'seo_title_long',
      title: 'SEO Title Length Exceeded',
      passed: false,
      score: 5,
      type: 'warning',
      message: `SEO title is ${seoTitle.length} chars and may be truncated on Google mobile screens. Aim for 40-60 characters.`
    });
  } else {
    checks.push({
      id: 'seo_title_optimal',
      title: 'SEO Title Length',
      passed: true,
      score: 10,
      type: 'success',
      message: `Optimal title length (${seoTitle.length} characters).`
    });
  }

  // 3. Keyword in SEO Title
  if (focusKeyword) {
    if (seoTitle.toLowerCase().includes(focusKeyword)) {
      checks.push({
        id: 'kw_in_title',
        title: 'Keyword in Title',
        passed: true,
        score: 10,
        type: 'success',
        message: 'Focus keyword appears prominently in the SEO title.'
      });
    } else {
      checks.push({
        id: 'kw_in_title_missing',
        title: 'Keyword in Title',
        passed: false,
        score: 0,
        type: 'warning',
        message: 'Include your focus keyword near the beginning of the SEO title.'
      });
    }
  }

  // 4. Meta Description Length
  if (!metaDescription) {
    checks.push({
      id: 'meta_desc_missing',
      title: 'Meta Description Missing',
      passed: false,
      score: 0,
      type: 'error',
      message: 'Add a concise summary meta description to improve search click-through rate.'
    });
  } else if (metaDescription.length < 90) {
    checks.push({
      id: 'meta_desc_short',
      title: 'Meta Description Short',
      passed: false,
      score: 4,
      type: 'warning',
      message: `Meta description is ${metaDescription.length} chars. Optimal length is between 120 and 160 characters.`
    });
  } else if (metaDescription.length > 165) {
    checks.push({
      id: 'meta_desc_long',
      title: 'Meta Description Too Long',
      passed: false,
      score: 5,
      type: 'warning',
      message: `Meta description is ${metaDescription.length} chars and will be clipped in search results.`
    });
  } else {
    checks.push({
      id: 'meta_desc_optimal',
      title: 'Meta Description Optimal',
      passed: true,
      score: 10,
      type: 'success',
      message: `Meta description is concise and optimal (${metaDescription.length} chars).`
    });
  }

  // 5. Keyword in Meta Description
  if (focusKeyword && metaDescription) {
    if (metaDescription.toLowerCase().includes(focusKeyword)) {
      checks.push({
        id: 'kw_in_meta',
        title: 'Keyword in Meta Description',
        passed: true,
        score: 10,
        type: 'success',
        message: 'Focus keyword appears in the meta description.'
      });
    } else {
      checks.push({
        id: 'kw_in_meta_missing',
        title: 'Keyword in Meta Description',
        passed: false,
        score: 2,
        type: 'warning',
        message: 'Consider naturally mentioning the focus keyword in the meta description.'
      });
    }
  }

  // 6. URL Slug Structure
  if (!slug) {
    checks.push({
      id: 'slug_missing',
      title: 'URL Slug Missing',
      passed: false,
      score: 0,
      type: 'error',
      message: 'Define a clean, lowercase URL slug.'
    });
  } else {
    const isCleanSlug = /^[a-z0-9-]+$/.test(slug);
    const hasKeyword = focusKeyword ? slug.includes(focusKeyword.replace(/\s+/g, '-')) : true;

    if (!isCleanSlug) {
      checks.push({
        id: 'slug_invalid',
        title: 'Clean Slug Characters',
        passed: false,
        score: 2,
        type: 'warning',
        message: 'URL slug should contain only lowercase alphanumeric characters and hyphens.'
      });
    } else if (!hasKeyword && focusKeyword) {
      checks.push({
        id: 'slug_no_kw',
        title: 'Keyword in URL Slug',
        passed: false,
        score: 4,
        type: 'warning',
        message: 'The URL slug does not contain the focus keyword.'
      });
    } else {
      checks.push({
        id: 'slug_valid',
        title: 'URL Slug Structure',
        passed: true,
        score: 10,
        type: 'success',
        message: 'URL slug is clean, readable, and search-friendly.'
      });
    }
  }

  // 7. Word Count & Readability Depth
  const wordCount = content ? content.trim().split(/\s+/).length : 0;
  if (wordCount < 150) {
    checks.push({
      id: 'content_thin',
      title: 'Content Depth',
      passed: false,
      score: 2,
      type: 'error',
      message: `Content has only ${wordCount} words. High-ranking editorial articles typically have at least 300-600 words.`
    });
  } else if (wordCount < 300) {
    checks.push({
      id: 'content_short',
      title: 'Content Depth',
      passed: false,
      score: 6,
      type: 'warning',
      message: `Content has ${wordCount} words. Expanding with further analysis will enhance search authority.`
    });
  } else {
    checks.push({
      id: 'content_optimal',
      title: 'Content Depth & Scope',
      passed: true,
      score: 15,
      type: 'success',
      message: `Comprehensive article length (${wordCount} words).`
    });
  }

  // 8. Keyword Density & Overuse Prevention
  if (focusKeyword && wordCount > 0) {
    const escapedKw = focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = content.toLowerCase().match(new RegExp(escapedKw, 'g'));
    const count = matches ? matches.length : 0;
    const density = (count / wordCount) * 100;

    if (count === 0) {
      checks.push({
        id: 'kw_density_zero',
        title: 'Keyword In Content',
        passed: false,
        score: 0,
        type: 'warning',
        message: `Focus keyword "${focusKeyword}" was not found in the body text.`
      });
    } else if (density > 3.0) {
      checks.push({
        id: 'kw_density_high',
        title: 'Keyword Density Warning',
        passed: false,
        score: 4,
        type: 'warning',
        message: `Keyword density is high (${density.toFixed(1)}%). Avoid excessive repetition to protect search quality.`
      });
    } else {
      checks.push({
        id: 'kw_density_healthy',
        title: 'Keyword Natural Density',
        passed: true,
        score: 10,
        type: 'success',
        message: `Keyword appears ${count} times (${density.toFixed(1)}% density) — natural distribution.`
      });
    }
  }

  // 9. Heading Hierarchy (H2 / Subheadings)
  const hasSubheadings = /<h2|<h3|##|###/i.test(content);
  if (hasSubheadings) {
    checks.push({
      id: 'heading_hierarchy',
      title: 'Heading Hierarchy',
      passed: true,
      score: 10,
      type: 'success',
      message: 'Article incorporates subheadings for structured readability.'
    });
  } else {
    checks.push({
      id: 'heading_missing',
      title: 'Heading Hierarchy',
      passed: false,
      score: 2,
      type: 'warning',
      message: 'Break longer content with subheadings (H2, H3) to improve reader scanability.'
    });
  }

  // 10. Featured Image & Alt Text
  if (!featuredImage) {
    checks.push({
      id: 'featured_img_missing',
      title: 'Featured Image',
      passed: false,
      score: 0,
      type: 'error',
      message: 'No featured image selected. Visual cards and social shares require a primary image.'
    });
  } else if (!imageAlt) {
    checks.push({
      id: 'img_alt_missing',
      title: 'Image Alt Text',
      passed: false,
      score: 3,
      type: 'warning',
      message: 'Featured image is missing descriptive alt text for accessibility and image search.'
    });
  } else {
    checks.push({
      id: 'img_alt_optimal',
      title: 'Featured Image & Alt Text',
      passed: true,
      score: 10,
      type: 'success',
      message: 'Featured image present with descriptive accessibility alt text.'
    });
  }

  // 11. Links (Internal / External references)
  const hasLinks = /<a|\[.+\]\(http|http:\/\/|https:\/\//i.test(content);
  if (hasLinks) {
    checks.push({
      id: 'link_citations',
      title: 'Citations & References',
      passed: true,
      score: 5,
      type: 'success',
      message: 'Contains links or references supporting editorial depth.'
    });
  } else {
    checks.push({
      id: 'link_citations_none',
      title: 'Citations & Internal Links',
      passed: false,
      score: 2,
      type: 'warning',
      message: 'Consider referencing related Soch Wale articles or authoritative sources.'
    });
  }

  const totalPossible = checks.reduce((acc, c) => acc + (c.type === 'error' ? 10 : 10), 0);
  const earned = checks.reduce((acc, c) => acc + c.score, 0);
  const rawScore = totalPossible > 0 ? Math.round((earned / totalPossible) * 100) : 0;
  const overallScore = Math.min(100, Math.max(0, rawScore));

  const passedCount = checks.filter(c => c.passed).length;
  const warningCount = checks.filter(c => c.type === 'warning').length;
  const errorCount = checks.filter(c => c.type === 'error').length;

  return {
    overallScore,
    checks,
    passedCount,
    warningCount,
    errorCount
  };
}
