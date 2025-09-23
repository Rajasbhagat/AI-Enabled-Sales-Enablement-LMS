import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon, MailIcon, BriefcaseIcon, BuildingIcon, KeyIcon, SaveIcon, EyeIcon, EyeOffIcon, BellIcon, GlobeIcon, MoonIcon } from 'lucide-react';
import { toast } from 'react-toastify';
const SettingsPage = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const {
    user,
    logout,
    updateUserProfile
  } = useAuth();
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profileImage: ''
  });
  // State for notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    assignmentNotifications: true,
    completionNotifications: true,
    weeklyDigest: false
  });
  // State for appearance preferences
  const [appearancePreferences, setAppearancePreferences] = useState({
    theme: 'light',
    language: 'en'
  });
  // State for showing/hiding password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');
  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        role: user.role || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: user.profileImage || ''
      });
    }
  }, [user]);
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle notification preference changes
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked
    } = e.target;
    setNotificationPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  // Handle appearance preference changes
  const handleAppearanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setAppearancePreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    // In a real app, you would call an API to update the profile
    // For now, we'll just show a success message
    toast.success('Profile updated successfully');
    console.log('Updated profile data:', formData);
    // If you have an updateUserProfile function in your auth context, you would call it here
    if (updateUserProfile) {
      updateUserProfile({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        profileImage: formData.profileImage
      });
    }
  };
  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate password data
    if (!formData.currentPassword) {
      toast.error('Current password is required');
      return;
    }
    if (!formData.newPassword) {
      toast.error('New password is required');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    // In a real app, you would call an API to update the password
    // For now, we'll just show a success message
    toast.success('Password updated successfully');
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };
  // Handle notification preferences update
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to update notification preferences
    // For now, we'll just show a success message
    toast.success('Notification preferences updated successfully');
    console.log('Updated notification preferences:', notificationPreferences);
  };
  // Handle appearance preferences update
  const handleAppearanceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to update appearance preferences
    // For now, we'll just show a success message
    toast.success('Appearance preferences updated successfully');
    console.log('Updated appearance preferences:', appearancePreferences);
  };
  // Departments and roles for dropdowns
  const departments = ['Sales', 'Marketing', 'Customer Success', 'Support', 'Product', 'Engineering'];
  const roles = ['Sales Representative', 'Sales Manager', 'Admin', 'Marketing Specialist', 'Support Specialist'];
  const languages = ['en', 'es', 'fr', 'de', 'zh'];
  const themes = ['light', 'dark', 'system'];
  return <DashboardLayout title="Settings">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="flex border-b">
            <button onClick={() => setActiveTab('profile')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Profile
            </button>
            <button onClick={() => setActiveTab('security')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Security
            </button>
            <button onClick={() => setActiveTab('notifications')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Notifications
            </button>
            <button onClick={() => setActiveTab('appearance')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'appearance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Appearance
            </button>
          </div>
          <div className="p-6">
            {activeTab === 'profile' && <form onSubmit={handleProfileUpdate}>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {formData.profileImage ? <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                          <UserIcon className="h-10 w-10 text-gray-400" />
                        </div>}
                    </div>
                    <div className="ml-5">
                      <div className="flex items-center">
                        <input type="text" name="profileImage" value={formData.profileImage} onChange={handleInputChange} placeholder="Enter profile image URL" className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Enter URL of your profile picture
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="john.doe@example.com" />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BuildingIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <select id="department" name="department" value={formData.department} onChange={handleInputChange} className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                          <option value="">Select Department</option>
                          {departments.map(dept => <option key={dept} value={dept}>
                              {dept}
                            </option>)}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="role" id="role" value={formData.role} readOnly className="block w-full pl-10 rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm" />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Role cannot be changed. Contact administrator for role
                        changes.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>}
            {activeTab === 'security' && <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <KeyIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Password Security
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            We recommend using a strong password that you don't
                            use elsewhere. Your password should be at least 8
                            characters long and include a mix of uppercase
                            letters, lowercase letters, numbers, and symbols.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type={showCurrentPassword ? 'text' : 'password'} name="currentPassword" id="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className="block w-full pl-10 pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Enter current password" />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="text-gray-400 hover:text-gray-500">
                            {showCurrentPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type={showNewPassword ? 'text' : 'password'} name="newPassword" id="newPassword" value={formData.newPassword} onChange={handleInputChange} className="block w-full pl-10 pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Enter new password" />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-gray-400 hover:text-gray-500">
                            {showNewPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="block w-full pl-10 pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Confirm new password" />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 hover:text-gray-500">
                            {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && <p className="mt-1 text-sm text-red-600">
                            Passwords do not match
                          </p>}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={logout} className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Logout
                    </button>
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </div>
              </form>}
            {activeTab === 'notifications' && <form onSubmit={handleNotificationUpdate}>
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <BellIcon className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Notification Preferences
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Control how and when you receive notifications about
                            assignments, completions, and other activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input id="emailNotifications" name="emailNotifications" type="checkbox" checked={notificationPreferences.emailNotifications} onChange={handleNotificationChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">
                          Receive notifications via email
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input id="assignmentNotifications" name="assignmentNotifications" type="checkbox" checked={notificationPreferences.assignmentNotifications} onChange={handleNotificationChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="assignmentNotifications" className="font-medium text-gray-700">
                          Assignment Notifications
                        </label>
                        <p className="text-gray-500">
                          Receive notifications when you are assigned new
                          content
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input id="completionNotifications" name="completionNotifications" type="checkbox" checked={notificationPreferences.completionNotifications} onChange={handleNotificationChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="completionNotifications" className="font-medium text-gray-700">
                          Completion Notifications
                        </label>
                        <p className="text-gray-500">
                          Receive notifications when team members complete
                          assignments
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input id="weeklyDigest" name="weeklyDigest" type="checkbox" checked={notificationPreferences.weeklyDigest} onChange={handleNotificationChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="weeklyDigest" className="font-medium text-gray-700">
                          Weekly Digest
                        </label>
                        <p className="text-gray-500">
                          Receive a weekly summary of activities and progress
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </form>}
            {activeTab === 'appearance' && <form onSubmit={handleAppearanceUpdate}>
                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MoonIcon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-purple-800">
                          Appearance Settings
                        </h3>
                        <div className="mt-2 text-sm text-purple-700">
                          <p>Customize how the application looks and feels.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MoonIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <select id="theme" name="theme" value={appearancePreferences.theme} onChange={handleAppearanceChange} className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                          {themes.map(theme => <option key={theme} value={theme}>
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </option>)}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GlobeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <select id="language" name="language" value={appearancePreferences.language} onChange={handleAppearanceChange} className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </form>}
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default SettingsPage;