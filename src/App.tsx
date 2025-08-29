import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Mentorship from './pages/programs/Mentorship';
import Community from './pages/programs/Community';
import RecoverySessions from './pages/programs/RecoverySessions';
import Ebooks from './pages/programs/Ebooks';
import Tools from './pages/programs/Tools';
import Blog from './pages/Blog';
import FreeEbook from './pages/FreeEbook';
import MyStory from './pages/about/MyStory';
import Testimonials from './pages/about/Testimonials';
import Certifications from './pages/about/Certifications';
import Donations from './pages/about/Donations';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Disclaimer from './pages/legal/Disclaimer';
import { AuthPage } from './pages/auth/AuthPage';
import { AuthCallback } from './components/auth/AuthCallback';
import { BlogManagement } from './pages/admin/BlogManagement';
import Profile from './pages/Profile';
import Booking from './pages/Booking';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950">
          <Navigation />
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
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;