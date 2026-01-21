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

const Home = () => {
  const { classes, addClassInquiry, universities, heroStats, heroImages } = useApp();
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
      <section className="w-full pt-20 md:pt-24 lg:pt-28 pb-14 md:pb-16 lg:pb-20 relative">
        {/* HERO GRID */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* TITLE AND STATS SECTION */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8  pt-12 lg:pt-16">
            {/* MAIN TITLE */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-black drop-shadow-lg font-serif text-left">
                Let's Work Together to Create<br />
                Wonders with Us
              </h1>
            </div>

            {/* STATS */}
            <div className="flex gap-6 lg:gap-8 lg:justify-end">
              <div className="text-left lg:text-right">
                <h3 className="text-orange-500 text-2xl lg:text-3xl xl:text-4xl font-bold">15+</h3>
                <p className="text-sm text-mutedText">Years Of Experience</p>
              </div>
              <div className="text-left lg:text-right">
                <h3 className="text-orange-500 text-2xl lg:text-3xl xl:text-4xl font-bold">100+</h3>
                <p className="text-sm text-mutedText">Projects Delivered</p>
              </div>
              <div className="text-left lg:text-right">
                <h3 className="text-orange-500 text-2xl lg:text-3xl xl:text-4xl font-bold">98%</h3>
                <p className="text-sm text-mutedText">Client's Satisfaction</p>
              </div>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 flex flex-col justify-center md:space-y-20">

            <p className="text-mutedText max-w-xl leading-relaxed text-base md:text-lg mx-auto lg:mx-0 text-center lg:text-left">
              A visionary educational consultancy, crafting captivating opportunities through expert guidance and personalized support. Adept at turning your study abroad dreams into extraordinary reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                className="bg-orange-500 text-white px-6 py-3 font-semibold hover:bg-orange-600 transition rounded-lg"
              >
                Select Courses
              </button>
              <button
                className="bg-white text-orange-600 border-2 border-orange-500 px-6 py-3 font-semibold hover:bg-orange-50 transition rounded-lg"
              >
                Let's Talk
              </button>
            </div>

            {/* ARROWS */}
            <div className="flex gap-3 justify-center lg:justify-start">
              <button className="w-10 h-10 border flex items-center justify-center">
                ←
              </button>
              <button className="w-10 h-10 border flex items-center justify-center">
                →
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="lg:col-span-7 relative mt-1">

            {/* IMAGE */}
            <img
              src={heroStudentImage}
              alt="Building"
              className="w-full md:w-5/6 lg:w-3/4 xl:w-4/5 h-64 md:h-80 lg:h-[460px] object-cover mt-4 md:mt-8 lg:mt-12 ml-auto rounded-lg lg:rounded-none"
            />
{/* 
            <div className="hidden lg:block absolute top-28 -left-12 z-10">
              <img
                src={heroStudentImage}
                alt="Small decorative image"
                className="w-56 h-40 object-cover shadow-lg rounded-lg"
              />
            </div> 

            {/* SERVICE CARDS */}
            <div className="hidden lg:flex absolute bottom-0 -left-40 gap-4">
              <div className="bg-orange-500 text-white w-44 xl:w-48 h-72 xl:h-80 p-4 flex flex-col justify-center rounded-lg">
                <div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3"
                >
                  🏠
                </div>
                <h4 className="font-semibold text-sm mb-2 text-center">A Network Built Over Decades</h4>
                <p className="text-xs leading-relaxed opacity-90 text-center">
                  Thirty years of operation has allowed us to build direct, rock-solid relationships with prestigious universities and international partners across Canada, Australia, the UK, and Korea.
                </p>
              </div>

              <div className="bg-orange-500 text-white w-44 xl:w-48 h-72 xl:h-80 p-4 flex flex-col justify-center rounded-lg">
                <div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3"
                >
                  🏢
                </div>
                <h4 className="font-semibold text-sm mb-2 text-center">Reliability You Can Trust</h4>
                <p className="text-xs leading-relaxed opacity-90 text-center">
                  We have seen the dreams of over 12,000 students through to completion. Our longevity is proof of our ethical practices—we were here yesterday, we are here today, and we will be here for your entire journey.
                </p>
              </div>
            </div>

          </div>
          </div>
        </div>
      </section>

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
              className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-16 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
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
                    <AnimatedCounter value={1000} suffix="+" />
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
                      <AnimatedCounter value={95} suffix="%" />
                    </div>
                    <p className="text-xs sm:text-caption text-gray-600">Success Rate</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
                      <AnimatedCounter value={25} suffix="+" />
                    </div>
                    <p className="text-xs sm:text-caption text-gray-600">Countries</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1 sm:mb-2">
                      <AnimatedCounter value={8} suffix="+" />
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
