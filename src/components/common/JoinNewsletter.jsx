// src/components/common/JoinNewsletter.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
// Import the updated Button component
import Button from './Button'; // Adjust the path if necessary

const JoinNewsletter = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // { type: 'success' | 'error', text: '...' }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    // Basic validation
    if (!email) {
      setMessage({ type: 'error', text: t('newsletter.errors.emailRequired') || 'Email is required.' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', text: t('newsletter.errors.emailInvalid') || 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // --- INTEGRATION POINT ---
      // Replace this section with your actual API call logic.
      // Example using fetch:
      /*
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Subscription failed: ${response.statusText}`);
      }
      */
      // --- END INTEGRATION POINT ---

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success (replace with actual response handling)
      console.log("Subscribing email:", email);
      setMessage({ type: 'success', text: t('newsletter.successMessage') || 'Thank you for subscribing!' });
      setEmail(''); // Clear the input field
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage({ type: 'error', text: t('newsletter.errors.subscriptionFailed') || 'Failed to subscribe. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Ensure Outfit font is applied, use light background
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        {/* 3. Typography: Headline */}
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          {t('newsletter.title') || 'Stay Updated'}
        </h3>
        {/* 3. Typography: Body text */}
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {t('newsletter.description') || 'Subscribe to our newsletter for the latest updates and offers.'}
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-grow">
            <label htmlFor="newsletter-email" className="sr-only">
              {t('newsletter.emailLabel') || 'Email address'}
            </label>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              // 3. Typography: Input text
              // 1. Colors: Standard gray border/focus, white background
              className="w-full px-4 py-3 text-base text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-logo-dark-blue focus:border-logo-dark-blue disabled:opacity-50"
              placeholder={t('newsletter.emailPlaceholder') || 'Enter your email'}
              aria-describedby="newsletter-help"
            />
          </div>
          {/* Using the updated Button component for consistency */}
          <Button
            variant="primary" // Uses theme primary color
            size="md"
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto" // Full width on small screens
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('common.loading') || 'Submitting...'}
              </span>
            ) : (
              t('newsletter.subscribeButton') || 'Subscribe'
            )}
          </Button>
        </form>

        {/* Feedback Message */}
        {message.text && (
          <div className={`mt-4 text-sm ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {/* 3. Typography: Small helper text */}
        <p id="newsletter-help" className="mt-3 text-xs text-gray-500">
          {t('newsletter.privacyNote') || 'We respect your privacy. Unsubscribe at any time.'}
        </p>
      </div>
    </div>
  );
};

export default JoinNewsletter;