import React, { createContext, useContext, useState, useEffect } from 'react';
import heroStudentImage from '../assets/hero-student.png';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Admin Authentication
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  // Inquiries
  const [classInquiries, setClassInquiries] = useState(() => {
    const saved = localStorage.getItem('classInquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [programInquiries, setProgramInquiries] = useState(() => {
    const saved = localStorage.getItem('programInquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('contactMessages');
    return saved ? JSON.parse(saved) : [];
  });

  // Hero Section
  const [heroStats, setHeroStats] = useState(() => {
    const saved = localStorage.getItem('heroStats');
    return saved ? JSON.parse(saved) : {
      experience: '8+',
      students: '1,000+',
      satisfaction: '95%'
    };
  });

  const [heroImages, setHeroImages] = useState(() => {
    const saved = localStorage.getItem('heroImages');
    return saved ? JSON.parse(saved) : [heroStudentImage];
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('classInquiries', JSON.stringify(classInquiries));
  }, [classInquiries]);

  useEffect(() => {
    localStorage.setItem('programInquiries', JSON.stringify(programInquiries));
  }, [programInquiries]);

  useEffect(() => {
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('heroStats', JSON.stringify(heroStats));
  }, [heroStats]);

  useEffect(() => {
    localStorage.setItem('heroImages', JSON.stringify(heroImages));
  }, [heroImages]);

  // Admin Login
  const adminLogin = (email, password) => {
    // Demo credentials
    if (email === 'admin@pascal.edu.np' && password === 'admin123') {
      setIsAdmin(true);
      setAdminEmail(email);
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminEmail', email);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const adminLogout = () => {
    setIsAdmin(false);
    setAdminEmail('');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
  };

  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
      setAdminEmail(savedEmail || '');
    }
  }, []);

  // Inquiry Management
  const addClassInquiry = (inquiry) => {
    setClassInquiries([...classInquiries, {
      ...inquiry,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'New'
    }]);
  };

  const updateClassInquiryStatus = (id, status) => {
    setClassInquiries(classInquiries.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteClassInquiry = (id) => {
    setClassInquiries(classInquiries.filter(i => i.id !== id));
  };

  const addProgramInquiry = (inquiry) => {
    setProgramInquiries([...programInquiries, {
      ...inquiry,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'New'
    }]);
  };

  const updateProgramInquiryStatus = (id, status) => {
    setProgramInquiries(programInquiries.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteProgramInquiry = (id) => {
    setProgramInquiries(programInquiries.filter(i => i.id !== id));
  };

  // Contact Messages
  const addContactMessage = (message) => {
    setContactMessages([...contactMessages, {
      ...message,
      id: Date.now(),
      date: new Date().toISOString(),
      read: false
    }]);
  };

  const markContactMessageRead = (id) => {
    setContactMessages(contactMessages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteContactMessage = (id) => {
    setContactMessages(contactMessages.filter(m => m.id !== id));
  };

  // Appointment Management
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, {
      ...appointment,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }]);
  };

  const updateAppointment = (id, updatedAppointment) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...updatedAppointment } : a));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  // Hero Management
  const updateHeroStats = (newStats) => {
    setHeroStats(newStats);
  };

  const addHeroImage = (imageUrl) => {
    if (heroImages.length >= 10) {
      alert('Maximum 10 images allowed. Please remove some images before adding more.');
      return;
    }
    setHeroImages([...heroImages, imageUrl]);
  };

  const removeHeroImage = (imageUrl) => {
    setHeroImages(heroImages.filter(img => img !== imageUrl));
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        isAdmin,
        adminEmail,
        adminLogin,
        adminLogout,

        // Inquiries
        classInquiries,
        programInquiries,
        addClassInquiry,
        updateClassInquiryStatus,
        deleteClassInquiry,
        addProgramInquiry,
        updateProgramInquiryStatus,
        deleteProgramInquiry,

        // Contact Messages
        contactMessages,
        addContactMessage,
        markContactMessageRead,
        deleteContactMessage,

        // Appointments
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,

        // Hero Section
        heroStats,
        heroImages,
        updateHeroStats,
        addHeroImage,
        removeHeroImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
