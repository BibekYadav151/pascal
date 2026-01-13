import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminClasses from './admin/AdminClasses';
import AdminClassInquiries from './admin/AdminClassInquiries';
import AdminPrograms from './admin/AdminPrograms';
import AdminProgramInquiries from './admin/AdminProgramInquiries';
import AdminInstituteClasses from './admin/AdminInstituteClasses';
import AdminUniversities from './admin/AdminUniversities';
import AdminMessages from './admin/AdminMessages';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/classes" element={<AdminClasses />} />
              <Route path="/admin/class-inquiries" element={<AdminClassInquiries />} />
              <Route path="/admin/programs" element={<AdminPrograms />} />
              <Route path="/admin/program-inquiries" element={<AdminProgramInquiries />} />
              <Route path="/admin/institute-classes" element={<AdminInstituteClasses />} />
              <Route path="/admin/universities" element={<AdminUniversities />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
