
import React, { Suspense, lazy, Component, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ContentProvider, useContent } from './context/ContentContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { WhatsAppButton } from './components/WhatsAppButton.tsx';
import { Loader2, AlertCircle } from 'lucide-react';

// Lazy load pages for performance optimization
const HomePage = lazy(() => import('./pages/HomePage.tsx').then(module => ({ default: module.HomePage })));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail.tsx').then(module => ({ default: module.IndustryDetail })));
const ProductDetail = lazy(() => import('./pages/ProductDetail.tsx').then(module => ({ default: module.ProductDetail })));
const LoginPage = lazy(() => import('./pages/LoginPage.tsx').then(module => ({ default: module.LoginPage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.tsx').then(module => ({ default: module.AdminDashboard })));

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error Boundary Component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-lg w-full text-center">
             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <AlertCircle size={32} />
             </div>
             <h1 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h1>
             <p className="text-gray-500 mb-6 text-sm">
               We couldn't load the application. This might be due to a connection issue or a missing configuration.
             </p>
             <div className="bg-gray-100 p-4 rounded text-left text-xs font-mono text-gray-700 overflow-auto max-h-40 mb-6">
                {this.state.error?.message || 'Unknown Error'}
             </div>
             <button 
               onClick={() => window.location.reload()}
               className="bg-brand-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-800 transition-colors"
             >
               Reload Page
             </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-2 text-brand-900">
      <Loader2 size={40} className="animate-spin text-accent-500" />
      <span className="text-sm font-bold animate-pulse">Connecting to Cloud...</span>
    </div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const AppContent: React.FC = () => {
  const { isLoading } = useContent();

  if (isLoading) return <PageLoader />;

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans text-slate-800">
        <Suspense fallback={<PageLoader />}>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
              <Route path="/industry/:id" element={<PublicLayout><IndustryDetail /></PublicLayout>} />
              <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
