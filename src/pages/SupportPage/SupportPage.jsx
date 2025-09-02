// src/pages/SupportPage/SupportPage.jsx
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

  // Contact form handlers
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

  // FAQ handlers
  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Contact information
  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('support.phone'),
      content: '+1 (555) 123-4567',
      description: t('support.phoneDesc')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('support.email'),
      content: 'support@carauction.com',
      description: t('support.emailDesc')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('support.address'),
      content: t('support.fullAddress'),
      description: t('support.addressDesc')
    }
  ];

  // Sample FAQ data
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
    <div className="pt-16 overflow-x-hidden max-w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#3b396d] to-[#2a285a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {t('support.title')}
            </h1>
            <p className="text-base md:text-lg text-white text-opacity-90 max-w-2xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#3b396d] mb-5">
                  {t('support.sendMessage')}
                </h2>
                
                {submitSuccess && (
                  <div className="mb-5 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                    {t('support.successMessage')}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-transparent transition-colors text-sm"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-transparent transition-colors text-sm"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-transparent transition-colors text-sm"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-transparent transition-colors text-sm"
                      placeholder={t('support.messagePlaceholder')}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3b396d] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#2a285a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? t('support.sending') : t('support.sendButton')}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-bold text-[#3b396d] mb-5">
                  {t('support.contactInfo')}
                </h2>
                
                <div className="space-y-5">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start p-5 bg-[#f8f9ff] rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#3b396d] text-white rounded-lg flex items-center justify-center mr-3">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{info.title}</h3>
                        <p className="text-[#3b396d] font-medium text-sm mb-1">{info.content}</p>
                        <p className="text-gray-600 text-xs">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="mt-6 bg-gray-200 rounded-xl h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-xs">{t('support.mapPlaceholder')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#3b396d] mb-3">
                  {t('faq.frequentlyAsked')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                  {t('faq.description')}
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      className="w-full p-5 text-left bg-white hover:bg-[#f8f9ff] transition-colors flex justify-between items-center"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-medium text-gray-900 text-sm md:text-base">{faq.question}</span>
                      <svg 
                        className={`w-5 h-5 text-[#3b396d] transform transition-transform duration-300 ${
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
                      className={`overflow-hidden transition-all duration-300 ${
                        openFAQIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-5 bg-white border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Still Need Help */}
              <div className="mt-12 bg-gradient-to-r from-[#3b396d] to-[#2a285a] rounded-xl p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-3">
                  {t('faq.stillNeedHelp')}
                </h3>
                <p className="text-white text-opacity-90 mb-5 max-w-xl mx-auto text-sm md:text-base">
                  {t('faq.stillNeedHelpDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href={`/${language === 'en' ? '' : language}/contact`.replace(/^\/\//, '/')} 
                    className="px-5 py-2.5 bg-white text-[#3b396d] font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    {t('faq.contactSupport')}
                  </a>
                  <a 
                    href={`/${language === 'en' ? '' : language}/live-chat`.replace(/^\/\//, '/')} 
                    className="px-5 py-2.5 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#3b396d] transition-colors text-sm"
                  >
                    {t('faq.liveChat')}
                  </a>
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