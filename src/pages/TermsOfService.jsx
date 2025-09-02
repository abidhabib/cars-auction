// src/pages/TermsOfService.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TermsOfService = () => {
  const { t } = useLanguage();

  const termsData = {
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 15, 2024",
    introduction: {
      title: "Introduction",
      content: "Welcome to CarNetwork. These Terms of Service govern your access to and use of our website, services, and applications. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy."
    },
    services: {
      title: "Our Services",
      content: "CarNetwork provides an online platform for buying and selling vehicles. Our services include vehicle listings, dealer networks, transaction facilitation, and related automotive services."
    },
    userAccounts: {
      title: "User Accounts",
      content: [
        "You must create an account to access certain features of our services.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during registration.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    userConduct: {
      title: "User Conduct",
      content: [
        "You agree not to use our services for any unlawful purpose.",
        "You must not post false, misleading, or fraudulent information.",
        "You are responsible for all activities that occur under your account.",
        "You must not interfere with or disrupt the services or servers.",
        "You agree not to scrape, crawl, or copy content from our services without permission."
      ]
    },
    intellectualProperty: {
      title: "Intellectual Property",
      content: "All content, trademarks, and intellectual property on CarNetwork are owned by us or our licensors. You may not use our intellectual property without prior written consent."
    },
    vehicleListings: {
      title: "Vehicle Listings",
      content: [
        "Listings are provided by users and third parties.",
        "We do not guarantee the accuracy, completeness, or reliability of any listing.",
        "We reserve the right to remove any listing at our sole discretion.",
        "Users are responsible for the accuracy of their own listings."
      ]
    },
    transactions: {
      title: "Transactions",
      content: [
        "CarNetwork facilitates transactions between buyers and sellers.",
        "We are not a party to any transaction between users.",
        "All financial transactions are between users directly.",
        "We recommend users verify vehicle information and condition before purchase."
      ]
    },
    disclaimers: {
      title: "Disclaimers",
      content: [
        "Our services are provided 'as is' without warranties of any kind.",
        "We do not guarantee that our services will be uninterrupted or error-free.",
        "We do not endorse any user or vehicle listing.",
        "Results from using our services may vary."
      ]
    },
    limitation: {
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by law, CarNetwork shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or use."
    },
    termination: {
      title: "Termination",
      content: "We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms."
    },
    changes: {
      title: "Changes to Terms",
      content: "We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on our website."
    },
    contact: {
      title: "Contact Information",
      content: "If you have any questions about these Terms, please contact us at: support@carnetwork.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3b396d] mb-4">
              {termsData.title}
            </h1>
            <p className="text-gray-600">{termsData.lastUpdated}</p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.introduction.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.introduction.content}
            </p>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.services.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.services.content}
            </p>
          </section>

          {/* User Accounts */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.userAccounts.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {termsData.userAccounts.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* User Conduct */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.userConduct.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {termsData.userConduct.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.intellectualProperty.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.intellectualProperty.content}
            </p>
          </section>

          {/* Vehicle Listings */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.vehicleListings.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {termsData.vehicleListings.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Transactions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.transactions.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {termsData.transactions.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.disclaimers.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {termsData.disclaimers.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.limitation.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.limitation.content}
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.termination.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.termination.content}
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.changes.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.changes.content}
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {termsData.contact.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {termsData.contact.content}
            </p>
          </section>

          {/* Agreement */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-gray-700 text-center">
              By using CarNetwork, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;