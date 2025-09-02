// src/pages/PrivacyPolicy.jsx
import React from 'react';
// Removed unused import: import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicy = () => {
  // Removed unused variable: const { t } = useLanguage();

  const privacyData = {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 15, 2024",
    introduction: {
      title: "Introduction",
      content: "CarNetwork respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services."
    },
    informationWeCollect: {
      title: "Information We Collect",
      content: [
        {
          heading: "Personal Information",
          details: [
            "Name, email address, phone number, and postal address",
            "Account credentials (username, password)",
            "Profile information (profile picture, preferences)",
            "Payment information (credit card details, billing address)"
          ]
        },
        {
          heading: "Automatically Collected Information",
          details: [
            "IP address, browser type, and device information",
            "Usage data (pages visited, time spent, clicks)",
            "Location data (with your consent)",
            "Cookies and similar tracking technologies"
          ]
        },
        {
          heading: "Vehicle-Related Information",
          details: [
            "Vehicle details for listings (make, model, year, photos)",
            "Search preferences and saved searches",
            "Communication with dealers and sellers"
          ]
        }
      ]
    },
    howWeUseInformation: {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To process transactions and send transactional notifications",
        "To communicate with you about your account and services",
        "To personalize your experience and content",
        "To improve our website and services",
        "To detect, prevent, and address technical issues",
        "To comply with legal obligations",
        "To send marketing communications (with your consent)"
      ]
    },
    sharingInformation: {
      title: "Sharing Your Information",
      content: [
        {
          heading: "With Your Consent",
          details: "We may share your information when you give us explicit permission."
        },
        {
          heading: "Service Providers",
          details: "We may share information with trusted third-party vendors who assist us in operating our services."
        },
        {
          heading: "Legal Requirements",
          details: "We may disclose information if required by law or to protect our rights and safety."
        },
        {
          heading: "Business Transfers",
          details: "In connection with a merger, sale, or acquisition, your information may be transferred."
        }
      ]
    },
    cookies: {
      title: "Cookies and Tracking Technologies",
      content: [
        "We use cookies to enhance your browsing experience",
        "Essential cookies for site functionality",
        "Analytics cookies to understand user behavior",
        "Marketing cookies for personalized advertising",
        "You can manage cookie preferences in your browser settings"
      ]
    },
    dataSecurity: {
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure."
    },
    dataRetention: {
      title: "Data Retention",
      content: "We retain your information for as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, we securely delete it."
    },
    yourRights: {
      title: "Your Rights and Choices",
      content: [
        "Access, update, or delete your personal information",
        "Object to processing of your personal data",
        "Request restriction of processing",
        "Data portability (receive a copy of your data)",
        "Withdraw consent at any time",
        "Opt-out of marketing communications"
      ]
    },
    childrenPrivacy: {
      title: "Children's Privacy",
      content: "Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal information from children."
    },
    thirdPartyLinks: {
      title: "Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies."
    },
    californiaRights: {
      title: "California Privacy Rights",
      content: "California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to request deletion."
    },
    changes: {
      title: "Changes to This Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date."
    },
    contact: {
      title: "Contact Us",
      content: "If you have questions about this Privacy Policy or our privacy practices, please contact us at:",
      email: "privacy@carnetwork.com",
      address: "CarNetwork Privacy Department\n123 Auto Street\nAutomotive City, AC 12345"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3b396d] mb-4">
              {privacyData.title}
            </h1>
            <p className="text-gray-600">{privacyData.lastUpdated}</p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.introduction.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.introduction.content}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.informationWeCollect.title}
            </h2>
            <div className="space-y-6">
              {privacyData.informationWeCollect.content.map((section, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-800 mb-2 text-lg">{section.heading}</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    {section.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="leading-relaxed">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.howWeUseInformation.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {privacyData.howWeUseInformation.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Sharing Your Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.sharingInformation.title}
            </h2>
            <div className="space-y-6">
              {privacyData.sharingInformation.content.map((section, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-800 mb-2 text-lg">{section.heading}</h3>
                  <p className="text-gray-700 leading-relaxed ml-4">{section.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.cookies.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {privacyData.cookies.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.dataSecurity.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.dataSecurity.content}
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.dataRetention.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.dataRetention.content}
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.yourRights.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {privacyData.yourRights.content.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.childrenPrivacy.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.childrenPrivacy.content}
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.thirdPartyLinks.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.thirdPartyLinks.content}
            </p>
          </section>

          {/* California Rights */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.californiaRights.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.californiaRights.content}
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.changes.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {privacyData.changes.content}
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b396d] mb-4">
              {privacyData.contact.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {privacyData.contact.content}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-[#3b396d] font-medium">{privacyData.contact.email}</p>
              <p className="text-gray-700 whitespace-pre-line mt-2">{privacyData.contact.address}</p>
            </div>
          </section>

          {/* Agreement */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-gray-700 text-center">
              By using CarNetwork, you acknowledge that you have read, understood, and agree to this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;