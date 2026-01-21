import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './lib/theme-context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookAppointmentModal from './components/BookAppointmentModal';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import ServiceDetail from './pages/ServiceDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminClasses from './admin/AdminClasses';
import AdminClassInquiries from './admin/AdminClassInquiries';
import AdminPrograms from './admin/AdminPrograms';
import AdminProgramInquiries from './admin/AdminProgramInquiries';
import AdminInstituteClasses from './admin/AdminInstituteClasses';
import AdminUniversities from './admin/AdminUniversities';
import AdminMessages from './admin/AdminMessages';
import AdminAppointments from './admin/AdminAppointments';
import AdminBlogs from './admin/AdminBlogs';
import AdminHero from './admin/AdminHero';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);

  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route path="/*" element={
              <div className="min-h-screen flex flex-col">
                <Navbar onBookAppointment={() => setIsBookAppointmentOpen(true)} />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home onBookAppointment={() => setIsBookAppointmentOpen(true)} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/classes" element={<Classes onBookAppointment={() => setIsBookAppointmentOpen(true)} />} />
                    <Route path="/courses" element={<Courses onBookAppointment={() => setIsBookAppointmentOpen(true)} />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/contact" element={<Contact onBookAppointment={() => setIsBookAppointmentOpen(true)} />} />
                    <Route path="/services/:serviceId" element={<ServiceDetail />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:slug" element={<BlogDetail />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            }>
            </Route>

            {/* Admin Routes without Navbar and Footer */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="classes" element={<AdminClasses />} />
              <Route path="class-inquiries" element={<AdminClassInquiries />} />
              <Route path="programs" element={<AdminPrograms />} />
              <Route path="program-inquiries" element={<AdminProgramInquiries />} />
              <Route path="institute-classes" element={<AdminInstituteClasses />} />
              <Route path="universities" element={<AdminUniversities />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="hero" element={<AdminHero />} />
            </Route>
          </Routes>
          
          {/* Book Appointment Modal */}
          <BookAppointmentModal
            isOpen={isBookAppointmentOpen}
            onClose={() => setIsBookAppointmentOpen(false)}
          />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
