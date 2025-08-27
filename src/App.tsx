import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Mentorship from './pages/programs/Mentorship';
import Community from './pages/programs/Community';
import Blog from './pages/Blog';

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
          <Route path="/blog" element={<Blog />} />
          {/* Placeholder routes for other pages */}
          <Route path="/programs/sessions" element={<div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center"><div className="text-white text-2xl font-black">Recovery Sessions</div></div>} />
          <Route path="/programs/ebooks" element={<div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center"><div className="text-white text-2xl font-black">Ebooks</div></div>} />
          <Route path="/programs/tools" element={<div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center"><div className="text-white text-2xl font-black">Tools</div></div>} />
          <Route path="/free-ebook" element={<div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center"><div className="text-white text-2xl font-black">Free Guide</div></div>} />
          <Route path="/about/*" element={<div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center"><div className="text-white text-2xl font-black">About</div></div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;