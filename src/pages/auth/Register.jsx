
// src/pages/auth/Register.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiBriefcase, FiMapPin,
  FiCheck, FiAward, FiPlus, FiTrash2, FiChevronRight, FiChevronLeft, FiFileText, FiGlobe
} from 'react-icons/fi';
import Button from '../../components/common/Button';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t, language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- New state for Dealer Locations and Role ---
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  // --- End New State ---

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 2: Business Information
    companyName: '',
    vatNumber: '',
    // Split address fields
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: '',
    rdwNumber: '', // Conditional
    invoiceEmail: '',
    // Step 3: Shareholders Information & UBO
    shareholders: [{ fullName: '', idFile: null }],
    UBO: '',
    // Step 4: Account Security
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false, // Assuming this was intended to be kept based on the provided file
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- Mock data for Dealer Locations and Roles ---
  const availableLocations = [
    { id: 'loc1', name: 'Amsterdam Branch' },
    { id: 'loc2', name: 'Rotterdam HQ' },
    { id: 'loc3', name: 'Utrecht Office' },
  ];

  const availableRoles = [
    { id: 'sales_advisor', name: 'Sales Advisor', description: 'Limited rights per location' },
    { id: 'purchasing_manager', name: 'Purchasing Manager', description: 'Extended rights across all locations' },
    { id: 'admin', name: 'Administrator', description: 'Full access' },
  ];
  // --- End Mock Data ---

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  // --- Handlers for new fields ---
  const handleLocationChange = (locationId) => {
    setSelectedLocations(prev =>
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
    // Clear error if any
    if (errors.selectedLocations) {
      setErrors(prev => ({ ...prev, selectedLocations: '' }));
    }
  };

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    // Clear error if any
    if (errors.selectedRole) {
      setErrors(prev => ({ ...prev, selectedRole: '' }));
    }
  };
  // --- End Handlers ---

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
      case 2: // Business Info (Split Address)
        if (!formData.companyName) newErrors.companyName = t('auth.register.errors.companyNameRequired');
        if (!formData.vatNumber) newErrors.vatNumber = t('auth.register.errors.vatNumberRequired');
        if (!formData.street) newErrors.street = t('auth.register.errors.streetRequired');
        if (!formData.houseNumber) newErrors.houseNumber = t('auth.register.errors.houseNumberRequired');
        if (!formData.postalCode) newErrors.postalCode = t('auth.register.errors.postalCodeRequired');
        if (!formData.city) newErrors.city = t('auth.register.errors.cityRequired');
        if (!formData.country) newErrors.country = t('auth.register.errors.countryRequired');
        if (!formData.invoiceEmail) {
          newErrors.invoiceEmail = t('auth.register.errors.invoiceEmailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.invoiceEmail)) {
          newErrors.invoiceEmail = t('auth.register.errors.emailInvalid');
        }
        // Conditional validation for RDW Number
        if (formData.country === 'NL' && !formData.rdwNumber) {
          newErrors.rdwNumber = t('auth.register.errors.rdwNumberRequired');
        }
        break;
      case 3: // Shareholders & UBO validation
        if (!formData.UBO) newErrors.UBO = t('auth.register.errors.UBORequired');
        if (!formData.shareholders || formData.shareholders.length === 0) {
          newErrors.shareholders = t('auth.register.errors.shareholdersRequired');
        } else {
          formData.shareholders.forEach((shareholder, index) => {
            if (!shareholder.fullName) {
              newErrors[`shareholder-${index}-fullName`] = t('auth.register.errors.shareholderNameRequired');
            }
            // Note: File validation is tricky on frontend, backend should validate
            // if (!shareholder.idFile) {
            //   newErrors[`shareholder-${index}-idFile`] = t('auth.register.errors.shareholderIdRequired');
            // }
          });
        }
        break;
      case 4: // Account Security validation
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
        // Optional: Validate marketing consent if required
        // if (!formData.marketingAccepted) newErrors.marketingAccepted = t('auth.register.errors.marketingRequired');
        break;
      default:
        break;
    }
    return newErrors;
  };

  // --- Validation for Role-based access step ---
  const validateRoleStep = () => {
    const newErrors = {};
    if (selectedLocations.length === 0) {
      newErrors.selectedLocations = t('auth.register.errors.locationsRequired');
    }
    if (!selectedRole) {
      newErrors.selectedRole = t('auth.register.errors.roleRequired');
    }
    return newErrors;
  };
  // --- End Validation ---

  const handleNext = () => {
    let newErrors = {};
    // Special handling for the Role step (inserted as Step 3)
    if (currentStep === 2) { // If moving from Step 2 to Step 3 (Role)
      newErrors = validateStep(2); // Validate Step 2 first
      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(3); // Move to Step 3 (Role)
      }
    } else if (currentStep === 3) { // If moving from Step 3 (Role) to Step 4
      newErrors = validateRoleStep(); // Validate Step 3
      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(4); // Move to Step 4
      }
    } else {
      // Default behavior for other steps
      newErrors = validateStep(currentStep);
      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(currentStep + 1);
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    // Special handling for the Role step
    if (currentStep === 4) { // If going back from Step 4
      setCurrentStep(3); // Go back to Step 3 (Role)
    } else if (currentStep === 3) { // If going back from Step 3 (Role)
      setCurrentStep(2); // Go back to Step 2
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the last visible step (Step 4 - Account Security)
    const newErrors = validateStep(4);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setErrors({});
      try {
        // In a real app, you would send formData to your API
        // For demo, we'll simulate a successful registration
        console.log("Form Data Submitted:", formData);
        console.log("Selected Locations:", selectedLocations);
        console.log("Selected Role:", selectedRole);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Assume successful registration
        alert("Registration successful! Redirecting to login.");
        navigate('/login');
        // If you had a real register function:
        // await register(formDataToSend);
        // navigate('/sellerDashboard');
      } catch (error) {
        console.error('Registration error:', error);
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
      case 1: // Personal Info
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('auth.register.personalInfo')}</h3>
              <p className="text-gray-500 text-sm">{t('auth.register.personalInfoDesc')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.firstName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={t('auth.register.firstNamePlaceholder') || 'First name'}
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.lastName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    placeholder={t('auth.register.lastNamePlaceholder') || 'Last name'}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                {t('auth.register.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('auth.register.emailPlaceholder') || 'your.email@example.com'}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                {t('auth.register.phone')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  placeholder={t('auth.register.phonePlaceholder') || '+1234567890'}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>
        );
      case 2: // Business Info (Split Address)
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('auth.register.businessInfo')}</h3>
              <p className="text-gray-500 text-sm">{t('auth.register.businessInfoDesc')}</p>
            </div>
            <div>
              <label htmlFor="companyName" className="block text-xs font-medium text-gray-700 mb-1">
                {t('auth.register.companyName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder={t('auth.register.companyNamePlaceholder') || 'Company Name'}
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vatNumber" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.vatNumber')}
                </label>
                <input
                  type="text"
                  id="vatNumber"
                  name="vatNumber"
                  placeholder={t('auth.register.vatNumberPlaceholder') || 'VAT123456789'}
                  value={formData.vatNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.vatNumber && <p className="mt-1 text-xs text-red-600">{errors.vatNumber}</p>}
              </div>
              <div>
                <label htmlFor="invoiceEmail" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.invoiceEmail')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="invoiceEmail"
                    name="invoiceEmail"
                    placeholder={t('auth.register.invoiceEmailPlaceholder') || 'billing@company.com'}
                    value={formData.invoiceEmail}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.invoiceEmail && <p className="mt-1 text-xs text-red-600">{errors.invoiceEmail}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="street" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.street')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    placeholder={t('auth.register.streetPlaceholder') || 'Street'}
                    value={formData.street}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.street && <p className="mt-1 text-xs text-red-600">{errors.street}</p>}
              </div>
              <div>
                <label htmlFor="houseNumber" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.houseNumber')}
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  placeholder={t('auth.register.houseNumberPlaceholder') || '123'}
                  value={formData.houseNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.houseNumber && <p className="mt-1 text-xs text-red-600">{errors.houseNumber}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="postalCode" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.postalCode')}
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder={t('auth.register.postalCodePlaceholder') || '12345'}
                  value={formData.postalCode}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.postalCode && <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.city')}
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder={t('auth.register.cityPlaceholder') || 'City'}
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="country" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.country')}
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{t('auth.register.selectCountry')}</option>
                  <option value="NL">Netherlands</option>
                  <option value="DE">Germany</option>
                  <option value="BE">Belgium</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                  <option value="DK">Denmark</option>
                  <option value="SE">Sweden</option>
                  <option value="NO">Norway</option>
                  <option value="FI">Finland</option>
                </select>
                {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
              </div>
            </div>
            {/* Conditional RDW Number Field */}
            {formData.country === 'NL' && (
              <div>
                <label htmlFor="rdwNumber" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.rdwNumber')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFileText className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="rdwNumber"
                    name="rdwNumber"
                    placeholder={t('auth.register.rdwNumberPlaceholder') || 'RDW Number'}
                    value={formData.rdwNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.rdwNumber && <p className="mt-1 text-xs text-red-600">{errors.rdwNumber}</p>}
                <p className="mt-1 text-xs text-gray-500">{t('auth.register.rdwInfo')}</p>
              </div>
            )}
          </div>
        );
      case 3: // New Step: Role-based Access
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('auth.register.roleAccess')}</h3>
              <p className="text-gray-500 text-sm">{t('auth.register.roleAccessDesc')}</p>
            </div>
            {/* Dealer Locations Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t('auth.register.dealerLocations')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableLocations.map(location => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationChange(location.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedLocations.includes(location.id)
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        selectedLocations.includes(location.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {selectedLocations.includes(location.id) && (
                          <FiCheck className="text-white text-xs" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{location.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.selectedLocations && (
                <p className="mt-2 text-sm text-red-600">{errors.selectedLocations}</p>
              )}
            </div>
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t('auth.register.roleFunction')}
              </label>
              <div className="space-y-3">
                {availableRoles.map(role => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleChange(role.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-5 h-5 rounded-full border mr-3 mt-0.5 flex items-center justify-center ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {selectedRole === role.id && (
                          <FiCheck className="text-white text-xs" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{role.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.selectedRole && (
                <p className="mt-2 text-sm text-red-600">{errors.selectedRole}</p>
              )}
            </div>
          </div>
        );
      case 4: // Shareholders Info & UBO
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('auth.register.shareholdersInfo')}</h3>
              <p className="text-gray-500 text-sm">{t('auth.register.shareholdersInfoDesc')}</p>
            </div>
            {/* --- UBO Field --- */}
            <div>
              <label htmlFor="UBO" className="block text-xs font-medium text-gray-700 mb-1">
                {t('auth.register.UBO')}
              </label>
              <input
                type="text"
                id="UBO"
                name="UBO"
                placeholder={t('auth.register.uboPlaceholder') || 'Ultimate Beneficial Owner'}
                value={formData.UBO}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.UBO && <p className="mt-1 text-xs text-red-600">{errors.UBO}</p>}
            </div>
            {/* --- Shareholders --- */}
            <div className="space-y-5">
              {formData.shareholders.map((shareholder, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center text-sm">
                    <FiUser className="mr-2 h-4 w-4" />
                    {t('auth.register.shareholder')} {index + 1}
                  </h4>
                  <div className="mb-4">
                    <label htmlFor={`shareholder-${index}-fullName`} className="block text-xs font-medium text-gray-700 mb-1">
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
                      disabled={isLoading}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('auth.register.enterFullName')}
                    />
                    {errors[`shareholder-${index}-fullName`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`shareholder-${index}-fullName`]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('auth.register.shareholderIdUpload')}
                    </label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                      shareholder.idFile ? 'border-blue-500 bg-blue-500/5' : 'border-gray-300'
                    }`}>
                      <div className="space-y-1 text-center">
                        {shareholder.idFile ? (
                          <div className="flex items-center justify-between p-3 bg-white rounded border">
                            <span className="text-xs text-gray-600 truncate max-w-xs">{shareholder.idFile.name}</span>
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
                              disabled={isLoading}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-xs text-gray-600 justify-center">
                              <label htmlFor={`shareholder-${index}-idFile`} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-800">
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
                                  disabled={isLoading}
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
                    {/* Note: File validation is tricky on frontend */}
                    {/* {errors[`shareholder-${index}-idFile`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`shareholder-${index}-idFile`]}</p>
                    )} */}
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      shareholders: [...prev.shareholders, { fullName: '', idFile: null }]
                    }));
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs"
                >
                  <FiPlus className="mr-1 h-3 w-3" />
                  {t('auth.register.addAnotherShareholder')}
                </Button>
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
                    disabled={isLoading}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FiTrash2 className="mr-1 h-3 w-3" />
                    {t('auth.register.removeLastShareholder')}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case 5: // Account Security (Updated with style guide colors and Button component)
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('auth.register.accountSecurity')}</h3>
              <p className="text-gray-500 text-sm">{t('auth.register.accountSecurityDesc')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder={t('auth.register.passwordPlaceholder') || 'Password'}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-500">{t('auth.register.passwordHint')}</p>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                  {t('auth.register.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder={t('auth.register.confirmPasswordPlaceholder') || 'Confirm Password'}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showConfirmPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-2 text-xs">
                  <label htmlFor="termsAccepted" className="text-gray-700">
                    {t('auth.register.acceptTerms')}{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      {t('auth.register.termsAndConditions')}
                    </a>
                  </label>
                </div>
              </div>
              {errors.termsAccepted && <p className="text-xs text-red-600">{errors.termsAccepted}</p>}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacyAccepted"
                    name="privacyAccepted"
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-2 text-xs">
                  <label htmlFor="privacyAccepted" className="text-gray-700">
                    {t('auth.register.acceptPrivacy')}{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      {t('auth.register.privacyPolicy')}
                    </a>
                  </label>
                </div>
              </div>
              {errors.privacyAccepted && <p className="text-xs text-red-600">{errors.privacyAccepted}</p>}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketingAccepted"
                    name="marketingAccepted"
                    type="checkbox"
                    checked={formData.marketingAccepted}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-2 text-xs">
                  <label htmlFor="marketingAccepted" className="text-gray-700">
                    {t('auth.register.acceptMarketing')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* LANGUAGE DROPDOWN - FIXED AND MINIMAL */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-white/10 "
          >
            <FiGlobe className="mr-2" />
            <span className="hidden sm:inline">{getLanguageName(language)}</span>
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {languageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-10 z-50 border border-gray-200 overflow-hidden">
              <div className="py-1">
                {supportedLanguages.map((langCode) => (
                  <button
                    key={langCode}
                    type="button"
                    onClick={() => {
                      setLanguage(langCode);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                      language === langCode
                        ? 'text-blue-600 bg-blue-50 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 ${language === langCode ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                      {getLanguageName(langCode)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LEFT SIDE - HERO CONTENT (Simplified from Login) */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://trade.carcollect.com/_next/static/media/masking_tool_login_desktop.b0215844.jpg')"
          }}
        />

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
              <span className="ml-3 text-sm font-semibold uppercase tracking-wider text-blue-300">
                {t('hero.tagline') || "Join the Network"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('hero.title') || "Expand Your Business Reach"}
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <div className="mr-2 text-blue-400">
                  <FiCheck className="w-5 h-5" />
                </div>
                <span className="text-sm">{t('hero.benefit2') || 'Access to Market'}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-blue-400">
                  <FiCheck className="w-5 h-5" />
                </div>
                <span className="text-sm">{t('hero.benefit3') || 'Verified Buyers'}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-blue-400">
                  <FiCheck className="w-5 h-5" />
                </div>
                <span className="text-sm">{t('hero.benefit1') || 'Secure Platform'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/features')}
                className="px-5 py-2.5 text-sm font-semibold bg-transparent border border-white text-white hover:bg-white/10"
              >
                {t('hero.explore') || 'Explore Features'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full lg:p-24">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-6 md:hidden">
              <img
                src="/logo.svg"
                alt="Company Logo"
                className="h-12 w-auto cursor-pointer"
                onClick={() => navigate('/home')}
              />
            </div>

            {/* Progress Steps */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs ${
                        step < currentStep
                          ? 'bg-blue-600 text-white'
                          : step === currentStep
                            ? 'bg-blue-600 text-white border-2 border-blue-400'
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step < currentStep ? <FiCheck className="w-4 h-4" /> : step}
                    </div>
                    <div className={`mt-1 text-[0.6rem] ${step <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                      {step === 1 ? t('auth.register.step1') :
                       step === 2 ? t('auth.register.step2') :
                       step === 3 ? t('auth.register.step3') :
                       step === 4 ? t('auth.register.step4') :
                       step === 5 ? t('auth.register.step5') : ''}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep - 1) * 25}%` }} // 5 steps: 0%, 25%, 50%, 75%, 100%
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm"
                  >
                    <FiChevronLeft className="w-4 h-4 mr-1" />
                    {t('back')}
                  </Button>
                ) : <div></div>}

                {currentStep < 5 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm"
                  >
                    {t('next')}
                    <FiChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm"
                  >
                    {isLoading ? (
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
                  </Button>
                )}
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="rounded-md bg-red-50 p-3 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <p className="text-sm text-red-800">{errors.submit}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {t('auth.register.alreadyHaveAccount')}{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                {t('auth.register.loginHere')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;