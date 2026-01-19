import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import HotelAdminDashboard from './pages/HotelAdminDashboard';
import HotelAdminProfile from './pages/HotelAdminProfile';
import HotelPage from './pages/HotelPage';
import HotelListingPage from './pages/HotelListingPage';
import UserProfile from './pages/UserProfile';
import UserActivityPage from './pages/UserActivityPage';

// Simple Auth Wrapper (to be improved)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/hotels" replace />; // Redirect to hotels instead of root
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* User Profile */}
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['USER', 'HOTEL_ADMIN', 'SUPER_ADMIN']}>
            <UserProfile />
          </ProtectedRoute>
        } />

        {/* User Activity */}
        <Route path="/my-activity" element={
          <ProtectedRoute allowedRoles={['USER', 'HOTEL_ADMIN', 'SUPER_ADMIN']}>
            <UserActivityPage />
          </ProtectedRoute>
        } />

        {/* Public Hotel Page */}
        <Route path="/hotels" element={<HotelListingPage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />

        {/* Protected Routes */}
        <Route
          path="/admin/super"
          element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hotel"
          element={
            <ProtectedRoute allowedRoles={['HOTEL_ADMIN', 'SUPER_ADMIN']}>
              <HotelAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hotel/profile"
          element={
            <ProtectedRoute allowedRoles={['HOTEL_ADMIN', 'SUPER_ADMIN']}>
              <HotelAdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
