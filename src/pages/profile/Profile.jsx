// src/pages/profile/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';

const ProfileSection = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h3>
    {children}
  </div>
);

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const { t } = useLanguage(); // Add this line to use language context
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    vatNumber: '',
    UBO: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    companyName: 'Auto Dealership Inc.',
    vatNumber: 'VAT123456789',
    UBO: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    postalCode: '10001',
    country: 'United States',
    joined: '2020-01-01',
  };

  // Initialize with mock data
  useEffect(() => {
    if (user) {
      // Use real user data if available, otherwise mock data
      const userData = user || mockUserData;
      setFormData({
        firstName: userData.firstName || mockUserData.firstName,
        lastName: userData.lastName || mockUserData.lastName,
        email: userData.email || mockUserData.email,
        phone: userData.phone || mockUserData.phone,
        companyName: userData.companyName || mockUserData.companyName,
        vatNumber: userData.vatNumber || mockUserData.vatNumber,
        UBO: userData.UBO || mockUserData.UBO,
        street: userData.street || mockUserData.street,
        city: userData.city || mockUserData.city,
        postalCode: userData.postalCode || mockUserData.postalCode,
        country: userData.country || mockUserData.country
      });
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3b396d] mx-auto"></div>
          </div>
        </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('auth.register.errors.firstNameRequired') || 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('auth.register.errors.lastNameRequired') || 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('auth.register.errors.emailRequired') || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.register.errors.emailInvalid') || 'Email address is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t('profile.currentPasswordRequired') || 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = t('auth.register.errors.passwordRequired') || 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = t('auth.register.errors.passwordTooShort') || 'Password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.passwordsDoNotMatch') || 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Mock API call - simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local auth context with mock data
      updateUser({ ...user, ...formData });
      setSubmitMessage(t('profile.updateSuccess') || 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setSubmitMessage(t('profile.updateFailed') || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Mock API call - simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSubmitMessage(t('profile.passwordChangeSuccess') || 'Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    } catch (error) {
      console.error('Password change error:', error);
      setSubmitMessage(t('profile.passwordChangeFailed') || 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    // Reset form data to original user data
    const userData = user || mockUserData;
    setFormData({
      firstName: userData.firstName || mockUserData.firstName,
      lastName: userData.lastName || mockUserData.lastName,
      email: userData.email || mockUserData.email,
      phone: userData.phone || mockUserData.phone,
      companyName: userData.companyName || mockUserData.companyName,
      vatNumber: userData.vatNumber || mockUserData.vatNumber,
      UBO: userData.UBO || mockUserData.UBO,
      street: userData.street || mockUserData.street,
      city: userData.city || mockUserData.city,
      postalCode: userData.postalCode || mockUserData.postalCode,
      country: userData.country || mockUserData.country
    });
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setSubmitMessage('');
  };

  // Ensure isAuthenticated is checked
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#3b396d]/10 flex items-center justify-center">
            <span className="text-xl font-semibold text-[#3b396d]">
              {formData.firstName?.[0] || 'U'}{formData.lastName?.[0] || 'U'}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-900">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-gray-600 text-sm">{formData.email}</p>
            <p className="text-xs text-gray-500 mt-1">{formData.companyName}</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <ProfileSection title={t('auth.register.personalInfo') || "Personal Information"}>
            {isEditing ? (
              <form onSubmit={handleProfileSubmit} id="profile-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('auth.register.firstName')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('auth.register.firstNamePlaceholder')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d] ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('auth.register.lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t('auth.register.lastNamePlaceholder')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d] ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('auth.register.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('auth.register.emailPlaceholder')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d] ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('auth.register.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('auth.register.phonePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.firstName')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.firstName || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.lastName')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.lastName || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.email')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.email || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.phone')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.phone || '-'}</p>
                </div>
              </div>
            )}
          </ProfileSection>

          {/* Business Information */}
          <ProfileSection title={t('auth.register.businessInfo') || "Business Information"}>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.companyName')}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.companyNamePlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.vatNumber')}
                  </label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.vatNumberPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.UBO')}
                  </label>
                  <input
                    type="text"
                    name="UBO"
                    value={formData.UBO}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.uboPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.companyName')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.companyName || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.vatNumber')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.vatNumber || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.UBO')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.UBO || '-'}</p>
                </div>
              </div>
            )}
          </ProfileSection>

          {/* Address Information */}
          <ProfileSection title={t('profile.addressInfo') || "Address Information"}>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.street')}
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.streetPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.city')}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.cityPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.postalCode')}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.postalCodePlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t('auth.register.country')}
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder={t('auth.register.selectCountry')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.street')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.street || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.city')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.city || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.postalCode')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.postalCode || '-'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t('auth.register.country')}
                  </label>
                  <p className="mt-1 text-gray-900 text-sm">{formData.country || '-'}</p>
                </div>
              </div>
            )}
          </ProfileSection>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Account Settings */}
          <ProfileSection title={t('profile.accountSettings') || "Account Settings"}>
            <div className="space-y-4">
              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    form="profile-form"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] transition-colors text-sm font-medium disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('profile.saving') || "Saving..."}
                      </span>
                    ) : t('profile.save') || 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {t('profile.cancel') || "Cancel"}
                  </button>
                </div>
              ) : (
                <button
                  className="w-full px-4 py-2.5 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] transition-colors text-sm font-medium"
                  onClick={() => setIsEditing(true)}
                >
                  {t('profile.editProfile') || "Edit Profile"}
                </button>
              )}
              
              {isChangingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('profile.currentPassword')} *
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder={t('profile.currentPasswordPlaceholder')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d] ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('profile.newPassword')} *
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder={t('auth.register.passwordPlaceholder')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d] ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('profile.confirmPassword')} *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder={t('auth.register.confirmPasswordPlaceholder')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d] ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] transition-colors text-sm font-medium disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('profile.changingPassword') || "Changing..."}
                        </span>
                      ) : t('profile.changePassword') || 'Change Password'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      {t('profile.cancel') || "Cancel"}
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={() => setIsChangingPassword(true)}
                >
                  {t('profile.changePassword') || "Change Password"}
                </button>
              )}
              
              <button
                className="w-full px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                onClick={logout}
              >
                {t('profile.logout') || "Logout"}
              </button>
            </div>
            
            {submitMessage && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                submitMessage.includes('Failed') || submitMessage.includes(t('profile.updateFailed')) || submitMessage.includes(t('profile.passwordChangeFailed'))
                  ? 'bg-red-50 text-red-700' 
                  : 'bg-green-50 text-green-700'
              }`}>
                {submitMessage}
              </div>
            )}
          </ProfileSection>

          {/* Account Status */}
          <ProfileSection title={t('profile.accountStatus') || "Account Status"}>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">{t('profile.memberSince') || "Member Since"}</span>
                <span className="text-sm font-medium">{mockUserData.joined}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">{t('profile.accountType') || "Account Type"}</span>
                <span className="text-sm font-medium text-[#3b396d]">{t('profile.dealer') || "Dealer"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">{t('profile.verificationStatus') || "Verification Status"}</span>
                <span className="text-sm font-medium text-green-600">{t('profile.verified') || "Verified"}</span>
              </div>
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default Profile;