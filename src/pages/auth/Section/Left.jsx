import React from 'react'
import Button from '../../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../../context/LanguageContext';

export const Left = () => {
    const { t } = useLanguage();

    const navigate = useNavigate()
    return (
<div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200">
            
          <div 
    className="absolute inset-0 object-none bg-center bg-cover"
    
    style={{ 
      backgroundImage: "url('./login_bg.jpg')"
    }}
  />

            {/* Darker Overlay */}
            <div className="absolute inset-0 bg-logo-dark-blue bg-opacity-50"></div>

            {/* Logo */}
            <div className="absolute top-6 left-6 z-10">
                <img
                    src="/logoLight.svg"
                    alt="Company Logo"
                    className="h-10 w-auto cursor-pointer"
                    onClick={() => navigate('/home')}
                />
            </div>

            {/* Content */}
            <div className="relative z-1 flex flex-col justify-center items-start p-12 text-white">
                <div className="max-w-lg">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="ml-3 text-sm font-semibold uppercase tracking-wider text-white">
                            {t('hero.tagline') || "The future of car trading"}
                        </span>
                    </div>

                    {/* Bigger and Bolder Title */}
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-wide">
                        {t('hero.title') || "Europe's largest wholesale platform for used cars"}
                    </h1>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="flex items-center">
                            <div className="mr-2 text-blue-400">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm">{t('hero.benefit1') || 'Competitive Pricing'}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 text-blue-400">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm">{t('hero.benefit2') || 'Wide Selection'}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 text-blue-400">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm">{t('hero.benefit3') || 'Expert Support'}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => navigate('/features')}
                            className="px-6 py-3 text-base font-bold bg-transparent border border-white text-white hover:bg-white/10"
                        >
                            {t('hero.explore') || 'Explore'}
                        </Button>
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => navigate('/how-it-works')}
                            className="px-6 py-3 text-base font-bold bg-transparent border border-white text-white hover:bg-white/10"
                        >
                            {t('hero.howItWorks') || 'How it works'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
