import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import PropTypes from 'prop-types';

const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Profile = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user, updateUser, logout } = useAuth();
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('profile.loading')}</p>
          </div>
        </div>
      </AppLayout>
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
      newErrors.firstName = t('profile.errors.firstNameRequired');
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('profile.errors.lastNameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('profile.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('profile.errors.emailInvalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t('profile.errors.currentPasswordRequired');
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = t('profile.errors.newPasswordRequired');
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = t('profile.errors.passwordTooShort');
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t('profile.errors.passwordsDontMatch');
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local auth context with mock data
      updateUser({ ...user, ...formData });
      setSubmitMessage(t('profile.updateSuccess'));
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setSubmitMessage(t('profile.updateError'));
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage(t('profile.passwordChangeSuccess'));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    } catch (error) {
      console.error('Password change error:', error);
      setSubmitMessage(t('profile.passwordChangeError'));
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

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-orange-600">
                  {formData.firstName?.[0] || 'U'}{formData.lastName?.[0] || 'U'}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-gray-600">{formData.email}</p>
                <p className="text-sm text-gray-500 mt-1">{formData.companyName}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <ProfileSection title={t('profile.personalInfo')}>
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
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${
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
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t('auth.register.email')} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t('auth.register.phone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                      <p className="mt-1 text-gray-900">{formData.firstName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.lastName')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.lastName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.email')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.email || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.phone')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.phone || '-'}</p>
                    </div>
                  </div>
                )}
              </ProfileSection>

              {/* Business Information */}
              <ProfileSection title={t('profile.businessInfo')}>
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t('auth.register.companyName')}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t('auth.register.UBO')}
                      </label>
                      <input
                        type="text"
                        name="UBO"
                        value={formData.UBO}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.companyName')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.companyName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.vatNumber')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.vatNumber || '-'}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.UBO')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.UBO || '-'}</p>
                    </div>
                  </div>
                )}
              </ProfileSection>

              {/* Address Information */}
              <ProfileSection title={t('profile.addressInfo')}>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.street')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.street || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.city')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.city || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.postalCode')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.postalCode || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t('auth.register.country')}
                      </label>
                      <p className="mt-1 text-gray-900">{formData.country || '-'}</p>
                    </div>
                  </div>
                )}
              </ProfileSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Account Settings */}
              <ProfileSection title={t('profile.accountSettings')}>
                <div className="space-y-3">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        form="profile-form"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        {isSubmitting ? t('profile.saving') : t('profile.save')}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                      >
                        {t('profile.cancel')}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                      onClick={() => setIsEditing(true)}
                    >
                      {t('profile.editProfile')}
                    </button>
                  )}
                  
                  {isChangingPassword ? (
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="space-y-3 mt-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            {t('profile.currentPassword')} *
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${
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
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${
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
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            {isSubmitting ? t('profile.changing') : t('profile.changePassword')}
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                          >
                            {t('profile.cancel')}
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <button
                      className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      {t('profile.changePassword')}
                    </button>
                  )}
                  
                  <button
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    onClick={logout}
                  >
                    {t('profile.logout')}
                  </button>
                </div>
                
                {submitMessage && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    submitMessage.includes('Error') || submitMessage.includes('error') || submitMessage.includes('Failed') 
                      ? 'bg-red-50 text-red-700' 
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </ProfileSection>

              {/* Account Status */}
              <ProfileSection title={t('profile.accountStatus')}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{t('profile.memberSince')}</span>
                    <span className="text-sm font-medium">{mockUserData.joined}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{t('profile.accountType')}</span>
                    <span className="text-sm font-medium text-orange-600">{t('profile.dealer')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">{t('profile.verificationStatus')}</span>
                    <span className="text-sm font-medium text-green-600">{t('profile.verified')}</span>
                  </div>
                </div>
              </ProfileSection>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;