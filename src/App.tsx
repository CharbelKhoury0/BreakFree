import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PageTransitionLoader from './components/PageTransitionLoader';

// Lazy load all pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Calculator = React.lazy(() => import('./pages/Calculator'));
const Mentorship = React.lazy(() => import('./pages/programs/Mentorship'));
const Community = React.lazy(() => import('./pages/programs/Community'));
const RecoverySessions = React.lazy(() => import('./pages/programs/RecoverySessions'));
const Ebooks = React.lazy(() => import('./pages/programs/Ebooks'));
const Tools = React.lazy(() => import('./pages/programs/Tools'));
const Blog = React.lazy(() => import('./pages/Blog'));
const FreeEbook = React.lazy(() => import('./pages/FreeEbook'));
const MyStory = React.lazy(() => import('./pages/about/MyStory'));
const Testimonials = React.lazy(() => import('./pages/about/Testimonials'));
const Certifications = React.lazy(() => import('./pages/about/Certifications'));
const Donations = React.lazy(() => import('./pages/about/Donations'));
const Privacy = React.lazy(() => import('./pages/legal/Privacy'));
const Terms = React.lazy(() => import('./pages/legal/Terms'));
const Disclaimer = React.lazy(() => import('./pages/legal/Disclaimer'));
const AuthPage = React.lazy(() => import('./pages/auth/AuthPage').then(module => ({ default: module.AuthPage })));
const AuthCallback = React.lazy(() => import('./components/auth/AuthCallback').then(module => ({ default: module.AuthCallback })));
const BlogManagement = React.lazy(() => import('./pages/admin/BlogManagement').then(module => ({ default: module.BlogManagement })));
const Profile = React.lazy(() => import('./pages/Profile'));
const Booking = React.lazy(() => import('./pages/Booking'));

// Global ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 300);
  }, [location.pathname]);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-950">
          <Navigation />
          <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
              <PageTransitionLoader isLoading={true} />
            </div>
          }>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/programs/mentorship" element={<Mentorship />} />
            <Route path="/programs/community" element={<Community />} />
            <Route path="/programs/sessions" element={<RecoverySessions />} />
            <Route path="/programs/ebooks" element={<Ebooks />} />
            <Route path="/programs/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/free-ebook" element={<FreeEbook />} />
            <Route path="/about/story" element={<MyStory />} />
            <Route path="/about/testimonials" element={<Testimonials />} />
            <Route path="/about/certifications" element={<Certifications />} />
            <Route path="/about/donations" element={<Donations />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />


            <Route 
              path="/admin/blogs" 
              element={
                <ProtectedRoute>
                  <BlogManagement />
                </ProtectedRoute>
              } 
            />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;