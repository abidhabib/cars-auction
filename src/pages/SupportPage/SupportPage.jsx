import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('support.phone'),
      content: '+1 (555) 123-4567',
      description: t('support.phoneDesc')
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('support.email'),
      content: 'support@carauction.com',
      description: t('support.emailDesc')
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('support.address'),
      content: t('support.fullAddress'),
      description: t('support.addressDesc')
    }
  ];

  const faqs = [
    {
      question: t('faq.questions.0.question'),
      answer: t('faq.questions.0.answer')
    },
    {
      question: t('faq.questions.1.question'),
      answer: t('faq.questions.1.answer')
    },
    {
      question: t('faq.questions.2.question'),
      answer: t('faq.questions.2.answer')
    },
    {
      question: t('faq.questions.3.question'),
      answer: t('faq.questions.3.answer')
    },
    {
      question: t('faq.questions.4.question'),
      answer: t('faq.questions.4.answer')
    },
    {
      question: t('faq.questions.5.question'),
      answer: t('faq.questions.5.answer')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('support.title')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('support.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-[#3b396d] text-[#3b396d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('support.contactTab')}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-[#3b396d] text-[#3b396d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('support.faqTab')}
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  {t('support.sendMessage')}
                </h2>
                
                {submitSuccess && (
                  <div className="mb-5 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                    {t('support.successMessage')}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.namePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.emailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.subjectPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.messagePlaceholder')}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3b396d] text-white font-medium py-2.5 px-4 rounded-md hover:bg-[#2a285a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? t('support.sending') : t('support.sendButton')}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  {t('support.contactInfo')}
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#3b396d]/10 text-[#3b396d] rounded-md flex items-center justify-center mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{info.title}</h3>
                        <p className="text-[#3b396d] font-medium text-sm mb-1">{info.content}</p>
                        <p className="text-gray-600 text-xs">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
              <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('support.officeLocation')}</h3>

      <div className="relative bg-gray-50 rounded-lg h-64 overflow-hidden">
        {/* Simplified map of Amsterdam with key landmarks */}
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Background */}
          <rect width="800" height="500" fill="#e6f2ff" />
          
          {/* Water channels - characteristic of Dutch cities */}
          <path d="M100,100 Q250,50 400,150 T700,200" stroke="#99c2ff" strokeWidth="40" fill="none" />
          <path d="M50,300 Q200,250 350,350 T750,400" stroke="#99c2ff" strokeWidth="30" fill="none" />
          
          {/* City blocks */}
          <rect x="120" y="80" width="120" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="260" y="60" width="100" height="100" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="380" y="100" width="140" height="70" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="540" y="80" width="110" height="90" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          
          <rect x="100" y="200" width="130" height="90" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="250" y="180" width="100" height="100" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="370" y="200" width="140" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="530" y="190" width="120" height="90" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          
          <rect x="90" y="320" width="140" height="70" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="250" y="300" width="110" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="380" y="320" width="130" height="70" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          <rect x="530" y="300" width="120" height="90" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2" />
          
          {/* Main roads */}
          <path d="M50,150 L750,150" stroke="#adb5bd" strokeWidth="8" fill="none" />
          <path d="M150,50 L150,450" stroke="#adb5bd" strokeWidth="8" fill="none" />
          <path d="M400,50 L400,450" stroke="#adb5bd" strokeWidth="8" fill="none" />
          <path d="M650,50 L650,450" stroke="#adb5bd" strokeWidth="8" fill="none" />
          
          {/* Landmark icons */}
          <circle cx="200" cy="120" r="15" fill="#3b396d" />
          <circle cx="400" cy="200" r="15" fill="#3b396d" />
          <circle cx="600" cy="280" r="15" fill="#3b396d" />
          
          {/* Our location marker */}
          <circle cx="400" cy="300" r="20" fill="#3b396d" stroke="#fff" strokeWidth="3" />
          <text x="400" y="305" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
        </svg>
        
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#3b396d] mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Amsterdam Office</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p>Singel 250, 1016 AB Amsterdam</p>
          <p>Netherlands</p>
        </div>
        
        <button className="px-4 py-2 bg-[#3b396d] text-white text-sm font-medium rounded-lg hover:bg-[#2a285a] transition-colors">
                  {t('support.getDirections')}
        </button>
      </div>
    </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {t('faq.frequentlyAsked')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('faq.description')}
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
                  >
                    <button
                      className="w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-medium text-gray-900 text-sm md:text-base">{faq.question}</span>
                      <svg 
                        className={`w-5 h-5 text-[#3b396d] transform transition-transform duration-200 ${
                          openFAQIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-200 ${
                        openFAQIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 bg-white border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Still Need Help */}
              <div className="mt-12 bg-[#3b396d] rounded-lg p-6 text-center text-white">
                <h3 className="text-xl font-semibold mb-3">
                  {t('faq.stillNeedHelp')}
                </h3>
                <p className="text-white/90 mb-5 max-w-xl mx-auto">
                  {t('faq.stillNeedHelpDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => setActiveTab('contact')}
                    className="px-5 py-2.5 bg-white text-[#3b396d] font-medium rounded-md hover:bg-gray-100 transition-colors text-sm"
                  >
                    {t('faq.contactSupport')}
                  </button>
                  <button 
                    className="px-5 py-2.5 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-[#3b396d] transition-colors text-sm"
                  >
                    {t('faq.liveChat')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;