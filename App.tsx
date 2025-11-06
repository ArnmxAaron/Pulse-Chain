import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import NewRequestPage from './pages/admin/NewRequestPage';
import RequestsDashboard from './pages/admin/RequestsDashboard';
import DonorRegisterPage from './pages/donor/DonorRegisterPage';
import DonorProfilePage from './pages/donor/DonorProfilePage';
import AdminLayout from './components/AdminLayout';
import DonorLayout from './components/DonorLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Donor Routes */}
          <Route path="/donor" element={<DonorLayout />}>
            <Route path="register" element={<DonorRegisterPage />} />
            <Route path="profile" element={<DonorProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="requests" element={<RequestsDashboard />} />
              <Route path="new-request" element={<NewRequestPage />} />
            </Route>
          </Route>

        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
