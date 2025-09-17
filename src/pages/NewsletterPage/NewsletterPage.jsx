// src/components/seller/NewsletterPage.jsx
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const NewsletterPage = () => {
  const { t } = useLanguage();
  const [expandedNewsId, setExpandedNewsId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  // Complete news items with full content
  const allNewsItems = [
    {
      id: 1,
      title: t('newsItem1Title'),
      excerpt: t('newsItem1Excerpt'),
      fullContent: t('newsItem1FullContent') || t('newsItem1Excerpt') + " " + t('newsItem1Excerpt'),
      date: t('newsItem1Date'),
      readTime: t('newsItem1ReadTime'),
      category: 'Update',
      image: null
    },
    {
      id: 2,
      title: t('newsItem2Title'),
      excerpt: t('newsItem2Excerpt'),
      fullContent: t('newsItem2FullContent') || t('newsItem2Excerpt') + " " + t('newsItem2Excerpt'),
      date: t('newsItem2Date'),
      readTime: t('newsItem2ReadTime'),
      category: 'Feature',
      image: null
    },
    {
      id: 3,
      title: t('newsItem3Title'),
      excerpt: t('newsItem3Excerpt'),
      fullContent: t('newsItem3FullContent') || t('newsItem3Excerpt') + " " + t('newsItem3Excerpt'),
      date: t('newsItem3Date'),
      readTime: t('newsItem3ReadTime'),
      category: 'Announcement',
      image: null
    },
    {
      id: 4,
      title: t('newsItem4Title'),
      excerpt: t('newsItem4Excerpt'),
      fullContent: t('newsItem4FullContent') || t('newsItem4Excerpt') + " " + t('newsItem4Excerpt'),
      date: t('newsItem4Date'),
      readTime: t('newsItem4ReadTime'),
      category: 'Maintenance',
      image: null
    },
    {
      id: 5,
      title: "New Dashboard Features Released",
      excerpt: "We've added powerful new analytics and reporting tools to help you better understand your sales performance.",
      fullContent: "We're excited to announce the release of our new dashboard features! These updates include advanced analytics charts, customizable reports, and real-time sales tracking. You can now create custom dashboards that display exactly the metrics that matter most to your business. The new export functionality allows you to download reports in multiple formats including PDF, CSV, and Excel. We've also improved the loading speed by 40% and added dark mode support for late-night analysis sessions.",
      date: "November 15, 2023",
      readTime: "3 min read",
      category: "Feature",
      image: null
    },
    {
      id: 6,
      title: "Holiday Season Preparation Guide",
      excerpt: "Get ready for the busiest shopping season with our comprehensive guide to maximizing your holiday sales.",
      fullContent: "The holiday season is approaching fast, and we want to ensure you're fully prepared to make the most of this peak sales period. Our new Holiday Season Preparation Guide includes tips for inventory management, marketing strategies tailored to holiday shoppers, and recommendations for staffing during peak hours. We've also compiled data from previous years to help you forecast demand and avoid stockouts. Don't forget to take advantage of our special holiday promotion tools that allow you to create countdown timers, gift bundles, and limited-time offers with just a few clicks.",
      date: "October 28, 2023",
      readTime: "5 min read",
      category: "Guide",
      image: null
    },
    {
      id: 7,
      title: "Mobile App Update Now Available",
      excerpt: "Our mobile app has been completely redesigned with a focus on speed, usability, and new management features.",
      fullContent: "We're thrilled to announce the release of our completely redesigned mobile app! This major update features a streamlined interface that makes it easier than ever to manage your business on the go. Key improvements include: one-tap order processing, real-time inventory updates, simplified customer management, and integrated messaging with buyers. The new app also includes offline functionality, allowing you to continue working even when you don't have an internet connection - all changes will sync automatically when you're back online. Download the update today to take advantage of these powerful new features!",
      date: "September 12, 2023",
      readTime: "4 min read",
      category: "Update",
      image: null
    },
    {
      id: 8,
      title: "Security Enhancements Implemented",
      excerpt: "We've implemented additional security measures to protect your account and customer data.",
      fullContent: "Your security is our top priority. We've recently implemented several important security enhancements to better protect your account and customer data. These include: two-factor authentication for all accounts, improved password requirements, automated security monitoring, and enhanced data encryption both in transit and at rest. We've also added new activity logs that allow you to see exactly who has accessed your account and what actions they've taken. For additional protection, we recommend enabling two-factor authentication in your account settings and regularly reviewing your connected devices.",
      date: "August 3, 2023",
      readTime: "3 min read",
      category: "Security",
      image: null
    }
  ];

  // Get current news items for pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsItems = allNewsItems.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(allNewsItems.length / newsPerPage);

  const toggleExpand = (id) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setExpandedNewsId(null); // Collapse all when changing pages
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setExpandedNewsId(null); // Collapse all when changing pages
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Update': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Feature': 'bg-blue-50 text-blue-700 border-blue-200',
      'Announcement': 'bg-rose-50 text-rose-700 border-rose-200',
      'Maintenance': 'bg-amber-50 text-amber-700 border-amber-200',
      'Guide': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Security': 'bg-purple-50 text-purple-700 border-purple-200',
      'Default': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[category] || colors['Default'];
  };

  // Add padding top to account for fixed header
  useEffect(() => {
    // You can adjust this value based on your header height
    document.querySelector('body')?.style.setProperty('--header-height', '64px');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 md:pt-24">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center mr-4 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('latestNews')}
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl">
          {t('stayUpdatedWithLatest') || 'Stay informed with our latest updates, platform enhancements, and industry insights designed to help you maximize your success.'}
        </p>
      </div>

      {/* News Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {currentNewsItems.map((news) => (
          <div 
            key={news.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              {/* News Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <h3 className="font-bold text-gray-900 text-xl leading-tight">
                  {news.title}
                </h3>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getCategoryColor(news.category)}`}>
                  {news.category}
                </span>
              </div>

              {/* Date and Read Time */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-5">
                <div className="flex items-center">
                  <FiCalendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{news.date}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{news.readTime}</span>
                </div>
              </div>

              {/* Content - Collapsed or Expanded */}
              <div className="mb-6">
                {expandedNewsId === news.id ? (
                  <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                    {news.fullContent}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
                    {news.excerpt}
                  </p>
                )}
              </div>

              {/* Read More/Less Button */}
              <button
                onClick={() => toggleExpand(news.id)}
                className="flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors group"
              >
                {expandedNewsId === news.id ? (t('readLess') || 'Read Less') : (t('readMore') || 'Read More')}
                <FiChevronRight 
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    expandedNewsId === news.id ? 'rotate-90' : 'group-hover:translate-x-1'
                  }`} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-10 mb-16">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
              currentPage === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 bg-white'
            }`}
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setExpandedNewsId(null);
                }}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 text-sm font-medium ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
              currentPage === totalPages
                ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 bg-white'
            }`}
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Newsletter Subscription Section */}
      <div className="mt-8 bg-gray-50 rounded-xl p-8 border border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t('subscribeToNewsletter') || 'Subscribe to Our Newsletter'}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t('newsletterDescription') || 'Get exclusive insights, platform updates, and expert tips delivered straight to your inbox.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('enterYourEmail') || 'Enter your email'}
              className="flex-1 px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
            />
            <button className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md text-base">
              {t('subscribe') || 'Subscribe'}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            {t('newsletterConsent') || 'We respect your privacy. Unsubscribe at any time. No spam, ever.'}
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors p-3 rounded-lg hover:bg-gray-100"
        >
          <FiArrowLeft className="h-5 w-5 mr-2" />
          {t('backToDashboard') || 'Back to Dashboard'}
        </button>
      </div>
    </div>
  );
};

export default NewsletterPage;