import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  AnimatedButton,
  AnimatedCounter,
  Card,
  FloatingElements,
} from "../components/ui";

const Home = () => {
  const { classes } = useApp();

  const services = [
    {
      icon: "🎓",
      title: "Student Visa Counseling",
      description: "Expert guidance for student visa applications",
    },
    {
      icon: "🌍",
      title: "Study Abroad Programs",
      description: "Wide range of programs in top universities",
    },
    {
      icon: "📘",
      title: "IELTS / PTE / Language Classes",
      description: "Comprehensive test preparation",
    },
    {
      icon: "📝",
      title: "Documentation & Interview Prep",
      description: "Complete support for applications",
    },
  ];

  const partnerUniversities = [
    { name: "University of Toronto", country: "Canada" },
    { name: "University of Manchester", country: "UK" },
    { name: "University of Tasmania", country: "Australia" },
    { name: "University of Auckland", country: "New Zealand" },
    { name: "TUFS Tokyo", country: "Japan" },
    { name: "UOW Australia", country: "Australia" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <FloatingElements className="opacity-30" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium border border-gray-200">
                <span className="mr-2">🎓</span>
                Start Your Journey Today
              </div>

              <div className="space-y-6">
                <h1 className="text-display-xl md:text-6xl text-gray-900 font-semibold leading-tight">
                  Your Gateway to{" "}
                  <span className="text-gray-900 font-semibold">
                    Global Education
                  </span>
                </h1>

                <div className="w-12 h-0.5 bg-gray-900"></div>
              </div>

              <p className="text-body-lg text-gray-600 max-w-xl leading-relaxed">
                Expert guidance for student visas, test preparation, and
                international admissions.
                <span className="font-medium text-gray-900">
                  {" "}
                  Achieve your dream of studying abroad
                </span>{" "}
                with Pascal Institute.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton
                  href="/courses"
                  variant="primary"
                  size="lg"
                  icon="🚀"
                >
                  Explore Programs
                </AnimatedButton>
                <AnimatedButton
                  href="/classes"
                  variant="secondary"
                  size="lg"
                  icon="📚"
                >
                  Apply for Classes
                </AnimatedButton>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gray-400 border border-white"
                      ></div>
                    ))}
                  </div>
                  <span className="text-body-sm text-gray-600">
                    1000+ Happy Students
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-body-sm text-gray-600">
                    95% Success Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Modern Dashboard */}
            <div className="relative hidden lg:block">
              <FloatingElements count={3} className="opacity-20" />

              {/* Main dashboard card */}
              <Card className="relative p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Pascal Dashboard
                      </h3>
                      <p className="text-xs text-gray-500">Live Statistics</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center group hover:scale-105 transition-transform">
                    <div className="text-2xl mb-2 group-hover:animate-bounce">
                      🌏
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      <AnimatedCounter value={25} suffix="+" />
                    </div>
                    <p className="text-xs text-gray-600">Countries</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center group hover:scale-105 transition-transform">
                    <div className="text-2xl mb-2 group-hover:animate-bounce">
                      ✈️
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      <AnimatedCounter value={1000} suffix="+" />
                    </div>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center group hover:scale-105 transition-transform">
                    <div className="text-2xl mb-2 group-hover:animate-bounce">
                      🏆
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      <AnimatedCounter value={95} suffix="%" />
                    </div>
                    <p className="text-xs text-gray-600">Success</p>
                  </div>
                </div>

                {/* Progress section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Applications This Month
                    </span>
                    <span className="text-sm text-gray-500">247/300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        New student enrolled
                      </p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating achievement badge */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white font-bold text-xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-white relative">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-8 border border-gray-200">
              <span className="mr-2">💎</span>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group p-8"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  {/* Icon with clean background */}
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <span className="text-2xl">{service.icon}</span>
                  </div>

                  {/* Service title */}
                  <h3 className="text-title-lg text-gray-900">
                    {service.title}
                  </h3>

                  {/* Service description */}
                  <p className="text-body-sm text-gray-600">
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <div className="flex items-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors pt-2">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">Ready to get started?</p>
            <AnimatedButton
              href="/contact"
              variant="gradient"
              size="lg"
              icon="📞"
            >
              Get Free Consultation
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Popular Classes
              </h2>
              <p className="text-lg text-gray-600">
                Join our most sought-after preparation classes
              </p>
            </div>
            <Link
              to="/classes"
              className="hidden md:inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              View All Classes
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.slice(0, 4).map((classItem, index) => (
              <Card
                key={classItem.id}
                className="p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Time badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium mb-4">
                  <span className="mr-2">🕐</span>
                  {classItem.time}
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
                  href="/classes"
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon="📝"
                >
                  Apply Now
                </AnimatedButton>
              </Card>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/classes"
              className="block w-full text-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300"
            >
              View All Classes
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-spacing bg-white relative">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-8 border border-gray-200">
                <span className="mr-2">⭐</span>
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
                  { text: "Certified Counselors", icon: "👨‍🏫" },
                  { text: "High Visa Success Rate", icon: "🎯" },
                  { text: "Affordable Fees", icon: "💰" },
                  { text: "Personalized Guidance", icon: "🎓" },
                  { text: "Trusted Partner Institutions", icon: "🏛️" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 group-hover:border-gray-300 transition-colors">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <span className="text-body-md font-medium text-gray-900">
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      <AnimatedCounter value={95} suffix="%" />
                    </div>
                    <p className="text-caption text-gray-600">Success Rate</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      <AnimatedCounter value={25} suffix="+" />
                    </div>
                    <p className="text-caption text-gray-600">Countries</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      <AnimatedCounter value={8} suffix="+" />
                    </div>
                    <p className="text-caption text-gray-600">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Universities
            </h2>
            <p className="text-lg text-gray-600">
              We partner with top universities worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerUniversities.map((uni, index) => (
              <Card
                key={index}
                className="p-6 text-center group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* University icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>

                {/* University name */}
                <h3 className="text-body-sm font-medium text-gray-900 mb-2 leading-tight">
                  {uni.name}
                </h3>

                {/* Country */}
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                  <span className="mr-1">📍</span>
                  {uni.country}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gray-900 relative">
        <div className="relative max-w-5xl mx-auto container-spacing text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-800 text-white text-sm font-medium mb-8 border border-gray-700">
            <span className="mr-2">🚀</span>
            Take the Next Step
          </div>

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
              icon="🎓"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Browse Programs
            </AnimatedButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <div className="font-medium mb-1">Free Consultation</div>
              <div className="text-sm text-gray-400">No obligation</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📋</span>
              </div>
              <div className="font-medium mb-1">Expert Guidance</div>
              <div className="text-sm text-gray-400">Professional support</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <div className="font-medium mb-1">Proven Results</div>
              <div className="text-sm text-gray-400">95% success rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
