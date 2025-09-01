import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiBriefcase, FiMapPin, FiCheck, FiAward, FiPlus, FiTrash2, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Button from '../../components/common/Button';
import AppLayout from '../../components/layout/AppLayout';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 2: Business Information
    companyName: '',
    vatNumber: '',
    UBO: '',
    // Step 3: Address Information
    street: '',
    city: '',
    postalCode: '',
    country: '',
    // Step 4: Account Security
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false,
    // Step 5: Shareholders Information
    shareholders: [{ fullName: '', idFile: null }]
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = t('auth.register.errors.firstNameRequired');
        if (!formData.lastName) newErrors.lastName = t('auth.register.errors.lastNameRequired');
        if (!formData.email) {
          newErrors.email = t('auth.register.errors.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('auth.register.errors.emailInvalid');
        }
        if (!formData.phone) newErrors.phone = t('auth.register.errors.phoneRequired');
        break;

      case 2:
        if (!formData.companyName) newErrors.companyName = t('auth.register.errors.companyNameRequired');
        if (!formData.vatNumber) newErrors.vatNumber = t('auth.register.errors.vatNumberRequired');
        if (!formData.UBO) newErrors.UBO = t('auth.register.errors.UBORequired');
        break;

      case 3:
        if (!formData.street) newErrors.street = t('auth.register.errors.streetRequired');
        if (!formData.city) newErrors.city = t('auth.register.errors.cityRequired');
        if (!formData.postalCode) newErrors.postalCode = t('auth.register.errors.postalCodeRequired');
        if (!formData.country) newErrors.country = t('auth.register.errors.countryRequired');
        break;

      case 4:
        if (!formData.password) {
          newErrors.password = t('auth.register.errors.passwordRequired');
        } else if (formData.password.length < 8) {
          newErrors.password = t('auth.register.errors.passwordTooShort');
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = t('auth.register.errors.confirmPasswordRequired');
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = t('auth.register.errors.passwordsDoNotMatch');
        }
        if (!formData.termsAccepted) newErrors.termsAccepted = t('auth.register.errors.termsRequired');
        if (!formData.privacyAccepted) newErrors.privacyAccepted = t('auth.register.errors.privacyRequired');
        break;

      case 5:
        if (!formData.shareholders || formData.shareholders.length === 0) {
          newErrors.shareholders = t('auth.register.errors.shareholdersRequired');
        } else {
          formData.shareholders.forEach((shareholder, index) => {
            if (!shareholder.fullName) {
              newErrors[`shareholder-${index}-fullName`] = t('auth.register.errors.shareholderNameRequired');
            }
            if (!shareholder.idFile) {
              newErrors[`shareholder-${index}-idFile`] = t('auth.register.errors.shareholderIdRequired');
            }
          });
        }
        break;

      default:
        break;
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep(currentStep);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Create FormData object to handle file uploads
        const formDataToSend = new FormData();
        
        // Append all form data
        Object.keys(formData).forEach(key => {
          if (key !== 'shareholders') {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        // Append shareholders data
        formData.shareholders.forEach((shareholder, index) => {
          formDataToSend.append(`shareholders[${index}][fullName]`, shareholder.fullName);
          if (shareholder.idFile) {
            formDataToSend.append(`shareholders[${index}][idFile]`, shareholder.idFile);
          }
        });
        
        await register(formDataToSend);
        navigate('/dashboard');
      } catch (error) {
        setErrors({
          submit: error.message || t('auth.register.errors.registrationFailed')
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{t('auth.register.personalInfo')}</h3>
              <p className="text-gray-500 mt-2 text-sm">{t('auth.register.personalInfoDesc')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.firstName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder='Enter your first name'
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-4 py-3 border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.lastName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    placeholder='Enter your last name'
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-4 py-3 border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='your.email@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-4 py-3 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.phone')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  placeholder='+1 (555) 123-4567'
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-4 py-3 border ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{t('auth.register.businessInfo')}</h3>
              <p className="text-gray-500 mt-2 text-sm">{t('auth.register.businessInfoDesc')}</p>
            </div>
            
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.companyName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder='Your Company Name'
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-4 py-3 border ${
                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                />
              </div>
              {errors.companyName && (
                <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* VAT Number */}
              <div>
                <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.vatNumber')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="vatNumber"
                    name="vatNumber"
                    placeholder='VAT123456789'
                    value={formData.vatNumber}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 py-3 border ${
                      errors.vatNumber ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                </div>
                {errors.vatNumber && (
                  <p className="mt-2 text-sm text-red-600">{errors.vatNumber}</p>
                )}
              </div>

              {/* UBO */}
              <div>
                <label htmlFor="UBO" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.UBO')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="UBO"
                    name="UBO"
                    placeholder='Ultimate Beneficial Owner'
                    value={formData.UBO}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 py-3 border ${
                      errors.UBO ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                </div>
                {errors.UBO && (
                  <p className="mt-2 text-sm text-red-600">{errors.UBO}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{t('auth.register.addressInfo')}</h3>
              <p className="text-gray-500 mt-2 text-sm">{t('auth.register.addressInfoDesc')}</p>
            </div>
            
            {/* Street */}
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.street')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  placeholder='123 Main Street'
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-4 py-3 border ${
                    errors.street ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                />
              </div>
              {errors.street && (
                <p className="mt-2 text-sm text-red-600">{errors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.city')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    placeholder='New York'
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 py-3 border ${
                      errors.city ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                </div>
                {errors.city && (
                  <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.postalCode')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    placeholder='10001'
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 py-3 border ${
                      errors.postalCode ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                </div>
                {errors.postalCode && (
                  <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.country')}
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-4 py-3 border ${
                    errors.country ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                >
                  <option value="">{t('auth.register.selectCountry')}</option>
                  <option value="NL">Netherlands</option>
                  <option value="DE">Germany</option>
                  <option value="BE">Belgium</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="UK">United Kingdom</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.country && (
                <p className="mt-2 text-sm text-red-600">{errors.country}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{t('auth.register.accountSecurity')}</h3>
              <p className="text-gray-500 mt-2 text-sm">{t('auth.register.accountSecurityDesc')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder='Create a strong password'
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Use 8+ characters with a mix of letters, numbers & symbols</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder='Confirm your password'
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="text-gray-700">
                    {t('auth.register.acceptTerms')}{' '}
                    <a href="#" className="text-[#3b396d] hover:text-[#2a285a] font-medium">
                      {t('auth.register.termsAndConditions')}
                    </a>
                  </label>
                </div>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600">{errors.termsAccepted}</p>
              )}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacyAccepted"
                    name="privacyAccepted"
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacyAccepted" className="text-gray-700">
                    {t('auth.register.acceptPrivacy')}{' '}
                    <a href="#" className="text-[#3b396d] hover:text-[#2a285a] font-medium">
                      {t('auth.register.privacyPolicy')}
                    </a>
                  </label>
                </div>
              </div>
              {errors.privacyAccepted && (
                <p className="text-sm text-red-600">{errors.privacyAccepted}</p>
              )}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketingAccepted"
                    name="marketingAccepted"
                    type="checkbox"
                    checked={formData.marketingAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketingAccepted" className="text-gray-700">
                    {t('auth.register.acceptMarketing')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{t('auth.register.shareholdersInfo')}</h3>
              <p className="text-gray-500 mt-2 text-sm">{t('auth.register.shareholdersInfoDesc')}</p>
            </div>
            
            <div className="space-y-5">
              {formData.shareholders.map((shareholder, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    {t('auth.register.shareholder')} {index + 1}
                  </h4>
                  
                  <div className="mb-4">
                    <label htmlFor={`shareholder-${index}-fullName`} className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.register.shareholderFullName')}
                    </label>
                    <input
                      type="text"
                      id={`shareholder-${index}-fullName`}
                      value={shareholder.fullName}
                      onChange={(e) => {
                        const newShareholders = [...formData.shareholders];
                        newShareholders[index].fullName = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          shareholders: newShareholders
                        }));
                        if (errors[`shareholder-${index}-fullName`]) {
                          setErrors(prev => ({
                            ...prev,
                            [`shareholder-${index}-fullName`]: ''
                          }));
                        }
                      }}
                      className={`appearance-none block w-full px-4 py-3 border ${
                        errors[`shareholder-${index}-fullName`] ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition`}
                      placeholder={t('auth.register.enterFullName')}
                    />
                    {errors[`shareholder-${index}-fullName`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`shareholder-${index}-fullName`]}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.register.shareholderIdUpload')}
                    </label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                      shareholder.idFile ? 'border-[#3b396d] bg-[#3b396d]/5' : 'border-gray-300'
                    }`}>
                      <div className="space-y-1 text-center">
                        {shareholder.idFile ? (
                          <div className="flex items-center justify-between p-3 bg-white rounded border">
                            <span className="text-sm text-gray-600 truncate max-w-xs">{shareholder.idFile.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newShareholders = [...formData.shareholders];
                                newShareholders[index].idFile = null;
                                setFormData(prev => ({
                                  ...prev,
                                  shareholders: newShareholders
                                }));
                              }}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label htmlFor={`shareholder-${index}-idFile`} className="relative cursor-pointer bg-white rounded-md font-medium text-[#3b396d] hover:text-[#2a285a] focus-within:outline-none">
                                <span>{t('auth.register.uploadFile')}</span>
                                <input
                                  id={`shareholder-${index}-idFile`}
                                  name={`shareholder-${index}-idFile`}
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const newShareholders = [...formData.shareholders];
                                      newShareholders[index].idFile = file;
                                      setFormData(prev => ({
                                        ...prev,
                                        shareholders: newShareholders
                                      }));
                                      if (errors[`shareholder-${index}-idFile`]) {
                                        setErrors(prev => ({
                                          ...prev,
                                          [`shareholder-${index}-idFile`]: ''
                                        }));
                                      }
                                    }
                                  }}
                                  accept="image/*,.pdf,.doc,.docx"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {t('auth.register.fileTypes')}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {errors[`shareholder-${index}-idFile`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`shareholder-${index}-idFile`]}</p>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      shareholders: [...prev.shareholders, { fullName: '', idFile: null }]
                    }));
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                >
                  <FiPlus className="mr-2 h-4 w-4" />
                  {t('auth.register.addAnotherShareholder')}
                </button>
                
                {formData.shareholders.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.shareholders.length > 1) {
                        setFormData(prev => ({
                          ...prev,
                          shareholders: prev.shareholders.slice(0, -1)
                        }));
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    {t('auth.register.removeLastShareholder')}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16  rounded-2xl mb-4">
              <img
                src="/icon.svg"
                alt="Car Network Logo"
                className="h-10 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Car Network Europe</h1>
            <p className="text-gray-600 mt-2">Join Europe's premier automotive marketplace</p>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      step < currentStep
                        ? 'bg-[#3b396d] text-white'
                        : step === currentStep
                        ? 'bg-[#3b396d] text-white border-4 border-[#3b396d]/20'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step < currentStep ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <span className="font-medium text-sm">{step}</span>
                    )}
                  </div>
                  <div className={`mt-2 text-xs font-medium ${
                    step <= currentStep ? 'text-[#3b396d]' : 'text-gray-400'
                  }`}>
                    {t(`auth.register.step${step}`)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-[#3b396d] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep - 1) * 25}%` }}
              ></div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                  >
                    <FiChevronLeft className="w-4 h-4 mr-2" />
                    {t('back')}
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type={currentStep === 5 ? "submit" : "button"}
                  onClick={currentStep < 5 ? handleNext : undefined}
                  disabled={isLoading}
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                >
                  {currentStep < 5 ? (
                    <>
                      {t('next')}
                      <FiChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('auth.register.creatingAccount')}
                    </>
                  ) : (
                    <>
                      <FiAward className="w-4 h-4 mr-2" />
                      {t('auth.register.createAccount')}
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="rounded-md bg-red-50 p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {errors.submit}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              {t('auth.register.alreadyHaveAccount')}{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-[#3b396d] hover:text-[#2a285a]"
              >
                {t('auth.register.loginHere')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;