import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;