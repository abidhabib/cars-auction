// In src/components/seller/NewsLatter.jsx
import React, { useState } from 'react';
import { FiInfo, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function NewsLatter() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedNewsId, setExpandedNewsId] = useState(null);

  // Build news items array from flat keys with full content for expanding
  const newsItems = [
    {
      id: 1,
      title: t('newsItem1Title'),
      excerpt: t('newsItem1Excerpt'),
      fullContent: t('newsItem1FullContent') || t('newsItem1Excerpt') + " " + t('newsItem1Excerpt'),
      date: t('newsItem1Date'),
      readTime: t('newsItem1ReadTime')
    },
    {
      id: 2,
      title: t('newsItem2Title'),
      excerpt: t('newsItem2Excerpt'),
      fullContent: t('newsItem2FullContent') || t('newsItem2Excerpt') + " " + t('newsItem2Excerpt'),
      date: t('newsItem2Date'),
      readTime: t('newsItem2ReadTime')
    },
    {
      id: 3,
      title: t('newsItem3Title'),
      excerpt: t('newsItem3Excerpt'),
      fullContent: t('newsItem3FullContent') || t('newsItem3Excerpt') + " " + t('newsItem3Excerpt'),
      date: t('newsItem3Date'),
      readTime: t('newsItem3ReadTime')
    },
    {
      id: 4,
      title: t('newsItem4Title'),
      excerpt: t('newsItem4Excerpt'),
      fullContent: t('newsItem4FullContent') || t('newsItem4Excerpt') + " " + t('newsItem4Excerpt'),
      date: t('newsItem4Date'),
      readTime: t('newsItem4ReadTime')
    }
  ];

  const handleWebsiteClick = () => {
    const website = t('websiteValue');
    window.open(`https://${website}`, '_blank', 'noopener,noreferrer');
  };

  const handleViewAllNews = () => {
    navigate('/seller/newsletter');
  };

  // Toggle expand/collapse for specific news item
  const toggleExpandNews = (id) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };

  // Navigate to newsletter page with specific news item selected
  const handleReadMore = (id) => {
    navigate(`/seller/newsletter?newsId=${id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* === COMPANY PROFILE CARD === */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-gray-50 px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <FiInfo className="mr-3 h-5 w-5 text-indigo-600" />
            {t('companyProfile')}
          </h3>
        </div>

        <div className="p-6 space-y-5">
          <div className="group">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t('companyName')}
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-200 transition-colors duration-200">
              <span className="text-gray-900 font-medium">{t('companyNameValue')}</span>
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t('address')}
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-200 transition-colors duration-200">
              <span className="text-gray-900 leading-relaxed">{t('addressValue')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {t('vatNumber')}
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-200 transition-colors duration-200">
                <span className="text-gray-900 font-mono text-sm">{t('vatNumberValue')}</span>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {t('iban')}
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-200 transition-colors duration-200">
                <span className="text-gray-900 font-mono text-sm break-all">{t('ibanValue')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {t('email')}
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-200 transition-colors duration-200">
                <a href={`mailto:${t('emailValue')}`} className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                  {t('emailValue')}
                </a>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {t('phone')}
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-200 transition-colors duration-200">
                <a href={`tel:${t('phoneValue')}`} className="text-gray-900 hover:text-indigo-600 font-medium">
                  {t('phoneValue')}
                </a>
              </div>
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t('website')}
            </label>
            <div 
              onClick={handleWebsiteClick}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-indigo-200 cursor-pointer group-hover:shadow-md transition-all duration-200 flex items-center justify-between"
            >
              <span className="text-indigo-700 font-medium">{t('websiteValue')}</span>
              <FiExternalLink className="h-4 w-4 text-indigo-500 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      {/* === NEWS WIDGET CARD === */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-rose-50 px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <FiInfo className="mr-3 h-5 w-5 text-rose-600" />
            {t('latestNews')}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          {newsItems.map((news) => (
            <article 
              key={news.id} 
              className="group border border-gray-100 rounded-xl overflow-hidden hover:border-rose-200 hover:shadow-md transition-all duration-300"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-rose-700 transition-colors">
                    {news.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full font-medium">
                      {news.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  {expandedNewsId === news.id ? (
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line py-2 px-1 bg-gray-50 rounded-lg">
                      {news.fullContent}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {news.excerpt}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <time className="text-gray-500 font-medium">{news.date}</time>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpandNews(news.id);
                      }}
                      className="flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors text-xs"
                    >
                      {expandedNewsId === news.id ? (t('readLess') || 'Read Less') : (t('readMore') || 'Read More')}
                      <FiChevronRight 
                        className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${
                          expandedNewsId === news.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadMore(news.id);
                      }}
                      className="flex items-center text-rose-600 font-medium hover:text-rose-800 transition-colors text-xs"
                    >
                      {t('viewDetails') || 'View Details'}
                      <FiChevronRight className="ml-1 h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={handleViewAllNews}
            className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium text-rose-600 bg-white rounded-xl border border-rose-200 hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 group"
          >
            {t('viewAllNews')}
            <FiChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}