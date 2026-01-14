import React, { createContext, useContext, useState, useEffect } from 'react';
import { classesData, instituteClassesData } from '../data/classesData';
import { programsData, universitiesData } from '../data/programsData';

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

  // Classes
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('classes');
    return saved ? JSON.parse(saved) : classesData;
  });

  const [instituteClasses, setInstituteClasses] = useState(() => {
    const saved = localStorage.getItem('instituteClasses');
    return saved ? JSON.parse(saved) : instituteClassesData;
  });

  // Programs
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('programs');
    return saved ? JSON.parse(saved) : programsData;
  });

  // Universities
  const [universities, setUniversities] = useState(() => {
    const saved = localStorage.getItem('universities');
    return saved ? JSON.parse(saved) : universitiesData;
  });

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

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('instituteClasses', JSON.stringify(instituteClasses));
  }, [instituteClasses]);

  useEffect(() => {
    localStorage.setItem('programs', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('universities', JSON.stringify(universities));
  }, [universities]);

  useEffect(() => {
    localStorage.setItem('classInquiries', JSON.stringify(classInquiries));
  }, [classInquiries]);

  useEffect(() => {
    localStorage.setItem('programInquiries', JSON.stringify(programInquiries));
  }, [programInquiries]);

  useEffect(() => {
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
  }, [contactMessages]);

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

  // Class Management
  const addClass = (newClass) => {
    // Ensure timeSlots is an array
    const classWithTimeSlots = {
      ...newClass,
      timeSlots: Array.isArray(newClass.timeSlots)
        ? newClass.timeSlots
        : [{ time: newClass.time || 'TBD', available: true }],
      id: Date.now()
    };
    setClasses([...classes, classWithTimeSlots]);
  };

  const updateClass = (id, updatedClass) => {
    setClasses(classes.map(c => {
      if (c.id === id) {
        // Ensure timeSlots is properly handled
        const updated = { ...c, ...updatedClass };
        if (updatedClass.timeSlots) {
          updated.timeSlots = Array.isArray(updatedClass.timeSlots)
            ? updatedClass.timeSlots
            : [{ time: updatedClass.time || 'TBD', available: true }];
        }
        return updated;
      }
      return c;
    }));
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const addInstituteClass = (newClass) => {
    setInstituteClasses([...instituteClasses, { ...newClass, id: Date.now() }]);
  };

  const updateInstituteClass = (id, updatedClass) => {
    setInstituteClasses(instituteClasses.map(c => c.id === id ? { ...c, ...updatedClass } : c));
  };

  const deleteInstituteClass = (id) => {
    setInstituteClasses(instituteClasses.filter(c => c.id !== id));
  };

  // Program Management
  const addProgram = (newProgram) => {
    setPrograms([...programs, { ...newProgram, id: Date.now() }]);
  };

  const updateProgram = (id, updatedProgram) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, ...updatedProgram } : p));
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  // University Management
  const addUniversity = (newUniversity) => {
    setUniversities([...universities, { ...newUniversity, id: Date.now() }]);
  };

  const updateUniversity = (id, updatedUniversity) => {
    setUniversities(universities.map(u => u.id === id ? { ...u, ...updatedUniversity } : u));
  };

  const deleteUniversity = (id) => {
    setUniversities(universities.filter(u => u.id !== id));
  };

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

  // Dashboard Stats
  const getDashboardStats = () => {
    return {
      totalInquiries: classInquiries.length + programInquiries.length,
      classApplications: classInquiries.length,
      programApplications: programInquiries.length,
      activeClasses: classes.filter(c => c.status === 'Active').length,
      activePrograms: programs.filter(p => p.status === 'Active').length,
      unreadMessages: contactMessages.filter(m => !m.read).length,
      pendingAppointments: appointments.filter(a => a.status === 'Pending').length
    };
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        isAdmin,
        adminEmail,
        adminLogin,
        adminLogout,

        // Classes
        classes,
        instituteClasses,
        addClass,
        updateClass,
        deleteClass,
        addInstituteClass,
        updateInstituteClass,
        deleteInstituteClass,

        // Programs
        programs,
        universities,
        addProgram,
        updateProgram,
        deleteProgram,
        addUniversity,
        updateUniversity,
        deleteUniversity,

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

        // Stats
        getDashboardStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
