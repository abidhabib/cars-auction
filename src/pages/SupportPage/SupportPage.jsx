// src/components/help/HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { FiMessageSquare, FiX, FiSend, FiClock, FiMail, FiPhone, FiChevronLeft, FiChevronRight, FiCheck, FiUser } from 'react-icons/fi';

const HelpCenter = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to read URL params
  const [activeTab, setActiveTabInternal] = useState('contact'); // Internal state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Effect to set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'faq') {
      setActiveTabInternal('faq');
    } else {
      setActiveTabInternal('contact'); // Default to contact
    }
  }, [searchParams]);

  // Function to update both internal state and URL param
  const updateActiveTab = (tab) => {
    setActiveTabInternal(tab);
    setSearchParams({ tab }); // Update URL: /contact?tab=faq or /contact?tab=contact
  };

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

  // Handle sending a message in chat
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand. Let me check that for you.",
        "Thanks for your message. Our team will get back to you shortly.",
        "For more detailed assistance, you can also contact our support team at support@carnetwork.com",
        "Is there anything else I can help you with?",
        "I've noted your concern. A support representative will contact you within 24 hours."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  // Handle pressing Enter to send in chat
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const contactInfo = [
    {
      icon: (
        <FiPhone className="w-5 h-5" />
      ),
      title: t('support.phone'),
      content: '+1 (555) 123-4567',
      description: t('support.phoneDesc')
    },
    {
      icon: (
        <FiMail className="w-5 h-5" />
      ),
      title: t('support.email'),
      content: 'support@carnetwork.com',
      description: t('support.emailDesc')
    },
    {
      icon: (
        <FiClock className="w-5 h-5" />
      ),
      title: t('support.address'),
      content: t('support.fullAddress'),
      description: t('support.addressDesc')
    }
  ];

  const faqs = [
    {
      question: t('faq.questions.0.question') || "How do I create an account?",
      answer: t('faq.questions.0.answer') || "Click on the 'Sign Up' button at the top right corner and fill in your details. You'll receive a confirmation email to verify your account."
    },
    {
      question: t('faq.questions.1.question') || "How can I list my car for sale?",
      answer: t('faq.questions.1.answer') || "After logging in, go to the 'Sell Cars' section and click 'Sell Your Car'. Fill in the vehicle details and upload photos to create your listing."
    },
    {
      question: t('faq.questions.2.question') || "What payment methods do you accept?",
      answer: t('faq.questions.2.answer') || "We accept all major credit cards, bank transfers, and PayPal. Payment details are securely processed through our payment partners."
    },
    {
      question: t('faq.questions.3.question') || "How long does it take to verify my listing?",
      answer: t('faq.questions.3.answer') || "Most listings are verified within 24 hours. Premium listings get priority verification and are typically approved within 2 hours."
    },
    {
      question: t('faq.questions.4.question') || "Can I edit my listing after publishing?",
      answer: t('faq.questions.4.answer') || "Yes, you can edit your listing at any time by going to your dashboard and selecting the listing you want to modify."
    },
    {
      question: t('faq.questions.5.question') || "How do I contact a seller?",
      answer: t('faq.questions.5.answer') || "Each listing has a 'Contact Seller' button. Click this to send a message directly through our secure messaging system."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('support.title') || 'Help Center'}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('support.subtitle') || 'Find answers to common questions or get in touch with our support team'}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => updateActiveTab('contact')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-[#3b396d] text-[#3b396d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('support.contactTab') || 'Contact Us'}
          </button>
          <button
            onClick={() => updateActiveTab('faq')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-[#3b396d] text-[#3b396d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('support.faqTab') || 'FAQ'}
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
                  {t('support.sendMessage') || 'Send us a message'}
                </h2>
                
                {submitSuccess && (
                  <div className="mb-5 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                    {t('support.successMessage') || 'Your message has been sent successfully! We\'ll get back to you soon.'}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.name') || 'Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.namePlaceholder') || 'Enter your name'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.email') || 'Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.emailPlaceholder') || 'Enter your email'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.subject') || 'Subject'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.subjectPlaceholder') || 'What is this regarding?'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('support.message') || 'Message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-colors text-sm"
                      placeholder={t('support.messagePlaceholder') || 'How can we help you?'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3b396d]  text-white font-medium py-2.5 px-4 rounded-md hover:bg-[#2a285a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (t('support.sending') || 'Sending...') : (t('support.sendButton') || 'Send Message')}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  {t('support.contactInfo') || 'Contact Information'}
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('support.officeLocation') || 'Our Office Location'}</h3>
                  <div className="relative bg-gray-50 rounded-lg h-64 overflow-hidden">
                    <svg viewBox="0 0 800 500" className="w-full h-full">
                      <rect width="800" height="500" fill="#e6f2ff" />
                      <path d="M100,100 Q250,50 400,150 T700,200" stroke="#99c2ff" strokeWidth="40" fill="none" />
                      <path d="M50,300 Q200,250 350,350 T750,400" stroke="#99c2ff" strokeWidth="30" fill="none" />
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
                      <path d="M50,150 L750,150" stroke="#adb5bd" strokeWidth="8" fill="none" />
                      <path d="M150,50 L150,450" stroke="#adb5bd" strokeWidth="8" fill="none" />
                      <path d="M400,50 L400,450" stroke="#adb5bd" strokeWidth="8" fill="none" />
                      <path d="M650,50 L650,450" stroke="#adb5bd" strokeWidth="8" fill="none" />
                      <circle cx="200" cy="120" r="15" fill="#3b396d" />
                      <circle cx="400" cy="200" r="15" fill="#3b396d" />
                      <circle cx="600" cy="280" r="15" fill="#3b396d" />
                      <circle cx="400" cy="300" r="20" fill="#3b396d" stroke="#fff" strokeWidth="3" />
                      <text x="400" y="305" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
                    </svg>
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#3b396d] mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">{t('support.amsterdamOffice') || 'Amsterdam Office'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="text-sm text-gray-600">
                      <p>{t('support.addressLine1') || 'Singel 250, 1016 AB Amsterdam'}</p>
                      <p>{t('support.addressLine2') || 'Netherlands'}</p>
                    </div>
                    <button className="px-4 py-2 bg-[#3b396d] text-white text-sm font-medium rounded-lg hover:bg-[#2a285a] transition-colors whitespace-nowrap">
                      {t('support.getDirections') || 'Get Directions'}
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
                  {t('faq.frequentlyAsked') || 'Frequently Asked Questions'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('faq.description') || 'Find answers to common questions about our services'}
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
                  {t('faq.stillNeedHelp') || 'Still need help?'}
                </h3>
                <p className="text-white/90 mb-5 max-w-xl mx-auto">
                  {t('faq.stillNeedHelpDesc') || "Can't find the answer you're looking for? Our support team is here to help."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => updateActiveTab('contact')} // Navigate to Contact tab
                    className="px-5 py-2.5 bg-white text-[#3b396d] font-medium rounded-md hover:bg-gray-100 transition-colors text-sm"
                  >
                    {t('faq.contactSupport') || 'Contact Support'}
                  </button>
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="px-5 py-2.5 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-[#3b396d] transition-colors text-sm"
                  >
                    {t('faq.liveChat') || 'Live Chat'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Bot Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-[#3b396d] text-white p-4 rounded-full shadow-lg hover:bg-[#2a285a] transition-colors z-40"
      >
        <FiMessageSquare className="text-xl" />
      </button>

      {/* Chat Bot UI */}
      {isChatOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 w-full sm:w-[350px] bg-white sm:rounded-xl shadow-2xl z-50 flex flex-col h-full sm:h-[500px]">
          {/* Chat Header - Minimal */}
          <div className="bg-[#3b396d] text-white p-3 sm:rounded-t-xl flex justify-between items-center">
            <div className="flex items-center">
              <FiMessageSquare className="text-lg mr-2" />
              <span className="font-medium text-sm truncate">{t('support.supportAssistant') || 'Support Assistant'}</span>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200 p-1"
              aria-label={t('support.closeChat') || "Close chat"}
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Chat Messages - Clean Scroll */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    message.sender === 'user' 
                      ? 'bg-[#3b396d] text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input - Compact */}
          <div className="border-t border-gray-200 p-2 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('support.typeMessage') || "Type a message..."}
                className="flex-1 border border-gray-300 rounded-l-lg px-2 py-2 text-sm focus:outline-none focus:ring-0.1 focus:ring-[#3b396d] focus:border-[#3b396d]"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className={`px-3 py-2 rounded-r-lg flex items-center ml-1 justify-center ${
                  inputMessage.trim() === '' 
                    ? 'bg-gray-200 text-gray-400' 
                    : 'bg-[#3b396d] text-white hover:bg-[#2a285a]'
                }`}
                aria-label={t('support.sendMessage') || "Send message"}
              >
                <FiSend className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;