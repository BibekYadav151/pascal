import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import heroStudentImage from "../assets/hero-student.png";
import { RiMapPinFill } from "react-icons/ri";

import {
  GraduationCap,
  Globe,
  BookOpen,
  FileText,
  Users,
  Diamond,
  UserCheck,
  Target,
  DollarSign,
  Building2,
  Award,
  CheckCircle,
  Zap,
  ClipboardList,
  TrendingUp
} from "lucide-react";
import {
  AnimatedButton,
  AnimatedCounter,
  Card,
  FloatingElements,
} from "../components/ui";

import { useOffers } from '../hooks/useOffers';
import { useClasses } from '../hooks/useClasses';
import { useUniversities } from '../hooks/usePrograms';

// Offers Slider Component
const OffersSlider = () => {
  const { data: offersResponse } = useOffers('current');
  const offersData = offersResponse?.data || [];

  const [offers, setOffers] = useState([]);
  const offersCarouselRef = useRef(null);

  useEffect(() => {
    if (offersData.length > 0) {
      // Duplicate offers for seamless infinite scroll
      setOffers([...offersData, ...offersData, ...offersData]);
    }
  }, [offersData]);

  // Auto-sliding carousel effect (same as Partner Universities)
  useEffect(() => {
    const container = offersCarouselRef.current;
    if (!container || offers.length === 0) return;

    const uniqueOffersCount = offers.length / 3;
    if (uniqueOffersCount < 1) return;

    let scrollSpeed = 0.5;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;

        // Reset when scrolled past the first set (seamless infinite loop)
        // Calculate width: each item is approximately 300-400px (title + discount + gap)
        const firstSetWidth = uniqueOffersCount * 350; // estimated width per item
        if (container.scrollLeft >= firstSetWidth) {
          container.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 16); // ~60fps

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };
    const handleMouseLeave = () => {
      isPaused = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [offers.length]);

  return (
    <section className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto container-spacing">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-display-md text-gray-900 mb-3">
              Special Offers
            </h2>
            <p className="text-body-md text-gray-600">
              Don't miss out on our exclusive deals
            </p>
          </div>
          <Link
            to="/offers"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>View Offers</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {offers.length > 0 ? (
          <div ref={offersCarouselRef} className="flex gap-8 overflow-hidden pb-2 cursor-grab active:cursor-grabbing" style={{ scrollBehavior: 'auto' }}>
            {offers.map((offer, index) => (
              <Link
                key={`${offer.id}-${index}`}
                to="/offers"
                className="flex-shrink-0 flex items-center gap-4 whitespace-nowrap hover:opacity-80 transition-opacity"
                style={{ minWidth: 'fit-content' }}
              >
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  {offer.title}
                </span>
                <span className={`px-4 py-2 rounded-lg font-black text-white text-lg ${offer.bgColor || 'bg-orange-500'}`}>
                  {offer.discount} OFF
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No current offers available</p>
          </div>
        )}
      </div>
    </section>
  );
};



const Home = ({ onBookAppointment }) => {
  const { data: classesResponse } = useClasses();
  const classes = classesResponse?.data || [];

  const { data: universitiesResponse } = useUniversities();
  const universities = universitiesResponse?.data || [];

  const { addClassInquiry, heroStats, heroImages } = useApp();
  const scrollContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    message: "",
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Auto-slide hero images with pause on hover
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (heroImages && heroImages.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [heroImages, isPaused]);

  // Modal handlers
  const handleApplyNow = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setSelectedTimeSlot("");
    setFormData({
      fullName: "",
      contactNumber: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }

    addClassInquiry({
      studentName: formData.fullName,
      phone: formData.contactNumber,
      email: formData.email,
      className: selectedClass.title,
      classTime:
        selectedTimeSlot ||
        selectedClass.timeSlots?.[0]?.time ||
        selectedClass.time,
      message: formData.message,
    });

    alert(
      "Your inquiry has been submitted successfully! We will contact you soon."
    );
    handleCloseModal();
  };

  // Drag functionality
  const handleMouseDown = (e) => {
    // Prevent dragging when clicking on buttons or interactive elements
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      return;
    }

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleTouchStart = (e) => {
    // Prevent dragging when touching buttons or interactive elements
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      return;
    }

    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.cursor = "grab";
        }
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mouseleave", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Arrow scroll functions
  const scrollLeftArrow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightArrow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: GraduationCap,
      title: "Student Visa Counseling",
      description: "Expert guidance for student visa applications",
      slug: "student-visa-counseling",
    },
    {
      icon: Globe,
      title: "Study Abroad Programs",
      description: "Wide range of programs in top universities",
      slug: "study-abroad-programs",
    },
    {
      icon: BookOpen,
      title: "IELTS / PTE / Language Classes",
      description: "Comprehensive test preparation",
      slug: "ielts-pte-language-classes",
    },
    {
      icon: FileText,
      title: "Documentation & Interview Prep",
      description: "Complete support for applications",
      slug: "documentation-interview-prep",
    },
  ];

  // Filter only partner universities
  const basePartnerUniversities = universities.filter(
    (uni) => uni.isPartner && uni.status === "Active"
  );

  // Duplicate universities for seamless infinite scroll
  const partnerUniversities = [
    ...basePartnerUniversities,
    ...basePartnerUniversities,
    ...basePartnerUniversities,
  ];

  // Auto-sliding carousel effect
  useEffect(() => {
    const container = carouselRef.current;
    if (!container || basePartnerUniversities.length <= 6) return;

    let scrollSpeed = 0.5; // adjust speed (0.3 slow | 1 fast)
    let isPaused = false;

    const scroll = () => {
      if (!isPaused) {
        container.scrollLeft += scrollSpeed;

        // Reset when scrolled past the first set (seamless infinite loop)
        const firstSetWidth = basePartnerUniversities.length * 208; // 192px card + 16px gap
        if (container.scrollLeft >= firstSetWidth) {
          container.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 16); // ~60fps

    // Pause on hover
    container.addEventListener("mouseenter", () => (isPaused = true));
    container.addEventListener("mouseleave", () => (isPaused = false));

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", () => (isPaused = true));
      container.removeEventListener("mouseleave", () => (isPaused = false));
    };
  }, [basePartnerUniversities.length]);

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <FloatingElements className="opacity-30" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-0 md:pt-28 md:pb-0 overflow-hidden min-h-[70vh] flex flex-col animate-fade-in">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50"></div>


        {/* Subtle Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-float animation-delay-300"></div>
          <div className="absolute bottom-16 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-float animation-delay-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-blue-100/10 rounded-full blur-3xl animate-float animation-delay-1100"></div>
        </div>

        <div className="relative max-w-7xl mx-auto container-spacing w-full mt-8 md:mt-12 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
            {/* Left Content */}
            <div className="space-y-6 z-10">
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight animate-fade-in-up animation-delay-300">
                Let's Work Together to <span className="text-orange-600">Create Wonders</span> with Us
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-500">
                A visionary educational consultancy, crafting captivating
                opportunities through expert guidance and personalized support.
                Adept at turning your study abroad dreams into extraordinary
                reality.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fade-in-up animation-delay-700">
                <AnimatedButton
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm md:text-base font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  Let's Talk.
                </AnimatedButton>
                <AnimatedButton
                  href="/courses"
                  variant="secondary"
                  size="md"
                  className="bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 border border-gray-200 hover:border-orange-300 px-6 py-3 rounded-lg text-sm md:text-base font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  Select Courses
                </AnimatedButton>
              </div>

              {/* Statistics */}
              <div className="flex flex-wrap gap-8 pt-8 md:pt-10">
                <div className="animate-fade-in-up animation-delay-900">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1 transform hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter value={parseInt(heroStats?.experience?.replace('+', '') || '8')} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    years experience
                  </p>
                </div>
                <div className="animate-fade-in-up animation-delay-1100">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1 transform hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter value={parseInt(heroStats?.students?.replace(/[^\d]/g, '') || '1000')} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    students success
                  </p>
                </div>
                <div className="animate-fade-in-up animation-delay-1300">
                  <div className="text-4xl md:text-5xl font-bold text-gray-000 mb-1 transform hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter value={parseInt(heroStats?.satisfaction?.replace('%', '') || '95')} suffix="%" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    satisfied rate
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Image Carousel with Floating Tags */}
            <div className="relative z-10 flex justify-center lg:justify-end animate-scale-in animation-delay-1500">
              {/* Image Container */}
              <div
                className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2x1  transform hover:scale-105 transition-transform duration-500 cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Image Slideshow */}
                <div className="relative w-full h-full">
                  {heroImages && heroImages.length > 0 ? (
                    heroImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Hero image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ))
                  ) : (
                    <img
                      src={heroStudentImage}
                      alt="Student counseling illustration"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  )}
                </div>

                {/* Image indicators with progress */}
                {heroImages && heroImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-10">
                    {/* Pause indicator */}
                    {isPaused && (
                      <div className="flex items-center space-x-1 text-white/80 text-xs">
                        <div className="w-1 h-3 bg-white/60 rounded-sm"></div>
                        <div className="w-1 h-3 bg-white/60 rounded-sm ml-0.5"></div>
                      </div>
                    )}

                    {/* Progress indicators */}
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-8 h-2 rounded-full transition-all duration-300 overflow-hidden ${index === currentImageIndex
                          ? 'bg-white/80'
                          : 'bg-white/30 hover:bg-white/50'
                          }`}
                      >
                        {index === currentImageIndex && !isPaused && (
                          <div
                            className="absolute left-0 top-0 h-full bg-white rounded-full"
                            style={{
                              animation: 'slide-right 4s linear infinite',
                              width: '100%'
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Floating Tags (desktop only) - Outside container to avoid clipping */}
              <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 right-4 bg-white backdrop-blur-md rounded-2xl px-3 py-1 shadow-xl flex items-center animate-float z-20 cursor-pointer hover:bg-white/600 hover:scale-105 transition-all duration-300 pointer-events-auto">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap ml-2">
                      Student Visa Counseling
                    </span>
                  </div>

                  <div
                    className="absolute top-1/2 -translate-y-1/2 -left-6 bg-white backdrop-blur-md rounded-2xl px-3 py-1 shadow-xl flex items-center animate-float z-20 cursor-pointer hover:bg-white/60 hover:scale-105 transition-all duration-300 pointer-events-auto"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap ml-2">
                      Study Abroad Programs
                    </span>
                  </div>

                  <div
                    className="absolute bottom-0 right-8 bg-white backdrop-blur-md rounded-2xl px-3 py-1 shadow-xl flex items-center gap-3 animate-float z-20 pointer-events-auto"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Test Preparation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Booking Intro Section - Bottom of Hero */}
        <div className="w-full relative z-10 mt-auto pt-8 md:pt-10 pb-8 md:pb-10">
          <div className="max-w-7xl mx-auto container-spacing">
            <p className="text-base md:text-lg text-gray-700 w-full text-left">
              Schedule a personalized appointment with our expert counselors to discuss your study abroad journey.
              Get guidance on course selection, visa requirements, university applications, and class enrollment.
              Explore our comprehensive classes and programs designed to help you achieve your educational goals.
              Your future starts with a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Slider Section */}
      <OffersSlider />

      {/* Services Section */}
      <section className="section-spacing bg-white relative">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <Diamond className="w-4 h-4 mr-2" />
              Our Expertise
            </div>
            <h2 className="text-display-lg text-gray-900 mb-6">
              Comprehensive{" "}
              <span className="text-gray-900 font-semibold">Services</span>
            </h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              From visa counseling to university admissions, we provide
              end-to-end solutions for your international education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2  lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  {/* Icon with clean background */}
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <service.icon className="w-6 h-6 text-gray-700" />
                  </div>

                  {/* Service title */}
                  <h3 className="text-title-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Service description */}
                  <p className="text-body-sm text-gray-600">
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex items-center gap-1 text-orange-600 group-hover:gap-2 transition-all pt-2"
                  >
                    <span className="font-medium">Learn more</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </Card>
            ))}
          </div>


        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="section-spacing bg-gray-50">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-display-sm text-gray-900 mb-2">
                Popular Classes
              </h2>
              <p className="text-body-sm text-gray-600">
                Join our most sought-after preparation classes
              </p>
            </div>
            <Link
              to="/classes"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm"
            >
              View All Classes
            </Link>
          </div>

          {/* Scrollable Classes Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeftArrow}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:scale-110 active:scale-95 hover:shadow-2xl"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRightArrow}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:scale-110 active:scale-95 hover:shadow-2xl"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-16 ${isDragging ? "cursor-grabbing" : "cursor-grab"
                } select-none`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {classes.map((classItem, index) => (
                <div key={classItem.id} className="flex-shrink-0 w-80">
                  <Card
                    className="p-6 group h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Time badge */}
                    <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium mb-4">
                      <span className="mr-2">🕐</span>
                      <div className="flex flex-wrap gap-1">
                        {classItem.timeSlots?.map((slot, index) => (
                          <span key={index}>
                            {slot.time}
                            {index < classItem.timeSlots.length - 1 ? ", " : ""}
                          </span>
                        )) || <span>{classItem.time || "TBD"}</span>}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-title-md text-gray-900 mb-4 leading-tight">
                      {classItem.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-body-sm font-medium">
                          {classItem.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-body-sm font-medium">
                          {classItem.fee}
                        </span>
                      </div>
                    </div>

                    {/* Apply button */}
                    <AnimatedButton
                      onClick={() => handleApplyNow(classItem)}
                      variant="primary"
                      size="md"
                      className="w-full"

                    >
                      Apply Now
                    </AnimatedButton>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/classes"
              className="block w-full text-center px-5 py-2.5 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 text-sm"
            >
              View All Classes
            </Link>
          </div>
        </div>
      </section>


      {/* Why Experience Matters */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6 border border-gray-200">

              The Pascal Advantage
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">Why Experience Matters: The Pascal Advantage</h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto mb-8">
              In the world of international education, policies change, visa rules shift, and university requirements evolve. When you choose Pascal Education, you aren't just hiring a consultant; you are partnering with three decades of expertise.
            </p>
            <h3 className="text-title-lg text-gray-900 mb-8 font-semibold">
              What does our 30+ year legacy mean for you?
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                Unmatched Industry Knowledge
              </h3>
              <p className="text-body-sm text-gray-600">
                Since 1995, we have navigated every major change in global education. We know the "ins and outs" of visa systems that newer agencies are still learning.
              </p>
            </Card>
            <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                A Network Built Over Decades
              </h3>
              <p className="text-body-sm text-gray-600">
                Thirty years of operation has allowed us to build direct, rock-solid relationships with prestigious universities and international partners across Canada, Australia, the UK, and Korea.
              </p>
            </Card>
            <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                Reliability You Can Trust
              </h3>
              <p className="text-body-sm text-gray-600">
                We have seen the dreams of over 12,000 students through to completion. Our longevity is proof of our ethical practices—we were here yesterday, we are here today, and we will be here for your entire journey.
              </p>
            </Card>
            <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                Expertise in Complex Cases
              </h3>
              <p className="text-body-sm text-gray-600">
                With 30 years of documentation experience, we know how to handle complex profiles and turn potential rejections into success stories.
              </p>
            </Card>

          </div>
        </div>
      </section>

      {/* Why 12,000+ Students Chose Pascal */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <Users className="w-4 h-4 mr-2" />
              Student Success
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">Why 12,000+ Students Chose Pascal</h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Experience matters. With 30+ years in the industry, we offer a level of expertise that few can match:
            </p>
          </div>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                  Three Decades of Trust
                </h3>
                <p className="text-body-sm text-gray-600">
                  Serving students and parents since 1995.
                </p>
              </Card>
              <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                  MOE Certified
                </h3>
                <p className="text-body-sm text-gray-600">
                  Fully recognized and certified by the Ministry of Education (MOE), Nepal.
                </p>
              </Card>
              <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                  Proven Success
                </h3>
                <p className="text-body-sm text-gray-600">
                  A massive alumni network of over 12,000 successfully placed students worldwide.
                </p>
              </Card>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                    Expert Counselors
                  </h3>
                  <p className="text-body-sm text-gray-600">
                    Our team consists of veteran consultants who stay updated on the latest visa policies and immigration rules.
                  </p>
                </Card>
                <Card className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-semibold">
                    High Visa Approval
                  </h3>
                  <p className="text-body-sm text-gray-600">
                    Our meticulous documentation process leads to one of the highest visa success rates in the capital.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-spacing bg-white relative">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6 border border-gray-200">
                <Award className="w-4 h-4 mr-2" />
                Why Choose Us
              </div>

              <h2 className="text-display-lg text-gray-900 mb-6">
                Your Trusted{" "}
                <span className="text-gray-900 font-semibold">
                  Education Partner
                </span>
              </h2>

              <p className="text-body-lg text-gray-600 mb-10">
                With years of experience and thousands of successful placements,
                we are your trusted partner for international education.
              </p>

              <div className="space-y-4">
                {[
                  { text: "Certified Counselors", icon: UserCheck },
                  { text: "High Visa Success Rate", icon: Target },
                  { text: "Affordable Fees", icon: DollarSign },
                  { text: "Personalized Guidance", icon: GraduationCap },
                  { text: "Trusted Partner Institutions", icon: Building2 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 group-hover:border-gray-300 transition-colors">
                      <item.icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-body-md font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {item.text}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Card */}
            <div className="relative">
              <Card className="p-10 text-center">
                {/* Main statistic */}
                <div className="mb-8">
                  <div className="text-6xl font-bold text-gray-900 mb-4">
                    <AnimatedCounter value={12000} suffix="+" />
                  </div>
                  <p className="text-title-lg text-gray-900 mb-3">
                    Students Placed
                  </p>
                  <p className="text-body-sm text-gray-600">
                    Join thousands of students who have successfully achieved
                    their dreams of studying abroad
                  </p>
                </div>

                {/* Additional stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1 sm:mb-2">
                      <AnimatedCounter value={99} suffix="%" />
                    </div>
                    <p className="text-xs sm:text-caption text-gray-600">Success Rate</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                      <AnimatedCounter value={50} suffix="+" />
                    </div>
                    <p className="text-xs sm:text-caption text-gray-600">Countries</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1 sm:mb-2">
                      <AnimatedCounter value={30} suffix="+" />
                    </div>
                    <p className="text-xs sm:text-caption text-gray-600">
                      Years Experience
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Universities Section */}
      <section className="section-spacing bg-gray-50">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-10">
            <h2 className="text-display-md text-gray-900 mb-3">
              Partner Universities
            </h2>
            <p className="text-body-md text-gray-600">
              We partner with top universities worldwide
            </p>
          </div>

          <div ref={carouselRef} className="flex gap-0 overflow-hidden pb-2">
            {partnerUniversities.map((uni, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <Card
                  className="p-2 text-center group h-full !bg-transparent !border-0 !shadow-none"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* University logo */}
                  <div className="w-20 h-20  rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden  ">
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg>';
                      }}
                    />
                  </div>

                  {/* University name */}
                  <h3 className="text-body-sm font-medium text-gray-900 mb-2 leading-tight">
                    {uni.website ? (
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        {uni.name}
                      </a>
                    ) : (
                      uni.name
                    )}
                  </h3>

                  {/* Country */}
                  <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                    <span className="mr-1">
                      <RiMapPinFill />
                    </span>
                    {uni.country}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gray-900 relative">
        <div className="relative max-w-5xl mx-auto container-spacing text-center">
          {/* Badge */}

          <h2 className="text-display-lg text-white mb-8">
            Ready to Start Your{" "}
            <span className="text-white font-semibold">Journey?</span>
          </h2>

          <p className="text-body-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Get in touch with us today and let us help you achieve your dreams
            of studying abroad. Your success story starts here.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              href="/contact"
              variant="secondary"
              size="lg"
              icon="📞"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Contact Us Now
            </AnimatedButton>

            <AnimatedButton
              href="/courses"
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Browse Programs
            </AnimatedButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-gray-300" />
              </div>
              <div className="font-medium mb-1">Free Consultation</div>
              <div className="text-sm text-gray-400">No obligation</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="w-6 h-6 text-gray-300" />
              </div>
              <div className="font-medium mb-1">Expert Guidance</div>
              <div className="text-sm text-gray-400">Professional support</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-gray-300" />
              </div>
              <div className="font-medium mb-1">Proven Results</div>
              <div className="text-sm text-gray-400">95% success rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gray-900 p-4 rounded-t-2xl">
              <h2 className="text-lg font-bold text-white">Apply for Class</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Auto-filled Info */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={selectedClass.title}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                  />
                </div>
                {selectedClass.timeSlots &&
                  selectedClass.timeSlots.length > 1 ? (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Select Time Slot *
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                      required
                    >
                      <option value="">Choose a time slot</option>
                      {selectedClass.timeSlots
                        .filter((slot) => slot.available)
                        .map((slot, index) => (
                          <option key={index} value={slot.time}>
                            {slot.time}
                          </option>
                        ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Class Time
                    </label>
                    <input
                      type="text"
                      value={
                        selectedClass.timeSlots?.[0]?.time ||
                        selectedClass.time ||
                        "TBD"
                      }
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* User Input Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                    placeholder="Your phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Gmail Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                  placeholder="your.email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                  rows="2"
                  placeholder="Any questions?"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Apply Now
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  onClick={handleCloseModal}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
