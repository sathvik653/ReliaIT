
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Loader2 } from 'lucide-react';

// Lazy load pages for performance optimization (Fast Loading)
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail').then(module => ({ default: module.IndustryDetail })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Loading Spinner for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-2 text-brand-900">
      <Loader2 size={40} className="animate-spin text-accent-500" />
      <span className="text-sm font-bold animate-pulse">Loading ReliaIT...</span>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Layout for public pages (includes Header/Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen font-sans text-slate-800">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                  {/* Admin Routes - Loaded lazily only when needed */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />

                  {/* Public Routes */}
                  <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                  <Route path="/industry/:id" element={<PublicLayout><IndustryDetail /></PublicLayout>} />
                  <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
