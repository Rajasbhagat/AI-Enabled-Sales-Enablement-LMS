import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegistrationPage from './pages/auth/RegistrationPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage';
import ManagerDashboardPage from './pages/dashboard/ManagerDashboardPage';
import UserManagementPage from './pages/user/UserManagementPage';
import TeamOverviewPage from './pages/team/TeamOverviewPage';
import TeamMembersPage from './pages/team/TeamMembersPage';
import ContentLibraryPage from './pages/content/ContentLibraryPage';
import ModuleBuilderPage from './pages/content/ModuleBuilderPage';
import LearningPathsPage from './pages/content/LearningPathsPage';
import AssignmentsPage from './pages/assignments/AssignmentsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import IndividualPerformancePage from './pages/analytics/IndividualPerformancePage';
import SkillsAnalysisPage from './pages/analytics/SkillsAnalysisPage';
import SettingsPage from './pages/settings/SettingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function App() {
  return <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/:token" element={<RegistrationPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboardPage />
              </ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <UserManagementPage />
              </ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <ContentLibraryPage />
              </ProtectedRoute>} />
          <Route path="/admin/content/create" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <ModuleBuilderPage />
              </ProtectedRoute>} />
          <Route path="/admin/content/paths" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <LearningPathsPage />
              </ProtectedRoute>} />
          <Route path="/admin/assignments" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <AssignmentsPage />
              </ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <AnalyticsPage />
              </ProtectedRoute>} />
          <Route path="/admin/analytics/departments" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <AnalyticsPage />
              </ProtectedRoute>} />
          <Route path="/admin/analytics/content" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <AnalyticsPage />
              </ProtectedRoute>} />
          <Route path="/admin/analytics/users" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <AnalyticsPage />
              </ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                <SettingsPage />
              </ProtectedRoute>} />
          {/* Manager Routes */}
          <Route path="/manager/dashboard" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <ManagerDashboardPage />
              </ProtectedRoute>} />
          <Route path="/manager/team" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <TeamOverviewPage />
              </ProtectedRoute>} />
          <Route path="/manager/team/members" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <TeamMembersPage />
              </ProtectedRoute>} />
          <Route path="/manager/content" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <ContentLibraryPage />
              </ProtectedRoute>} />
          <Route path="/manager/content/create" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <ModuleBuilderPage />
              </ProtectedRoute>} />
          <Route path="/manager/content/paths" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <LearningPathsPage />
              </ProtectedRoute>} />
          <Route path="/manager/assignments" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <AssignmentsPage />
              </ProtectedRoute>} />
          <Route path="/manager/analytics" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <AnalyticsPage />
              </ProtectedRoute>} />
          <Route path="/manager/analytics/members" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <IndividualPerformancePage />
              </ProtectedRoute>} />
          <Route path="/manager/analytics/skills" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <SkillsAnalysisPage />
              </ProtectedRoute>} />
          <Route path="/manager/settings" element={<ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                <SettingsPage />
              </ProtectedRoute>} />
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} />
      </BrowserRouter>
    </AuthProvider>;
}