import React from "react";
import { Card, AnimatedButton } from "../components/ui";
import { Building2, Briefcase, Sparkles, Globe, BookOpen, FileText, Users, Plane, GraduationCap } from "lucide-react";
import logo from "../assets/pascal-logos.png";
import backgroundImage from "../assets/background.jpg";

const About = () => {
  const services = [
    {
      icon: Globe,
      title: "Country & Course Selection",
      description:
        "Expert guidance to help you choose the right country and course based on your interests, qualifications, and career goals.",
    },
    {
      icon: BookOpen,
      title: "Test Preparation",
      description:
        "Comprehensive preparation for IELTS, PTE, Japanese JLPT, and other language proficiency tests.",
    },
    {
      icon: FileText,
      title: "Visa Documentation",
      description:
        "Complete support in preparing and reviewing all necessary documents for visa applications.",
    },
    {
      icon: Users,
      title: "Interview Preparation",
      description:
        "Mock interviews and coaching to help you prepare for visa and university admission interviews.",
    },
    {
      icon: Plane,
      title: "Pre-departure Briefing",
      description:
        "Essential information and tips to help you prepare for life and studies in your destination country.",
    },
    {
      icon: GraduationCap,
      title: "University Application",
      description:
        "Assistance with university applications, personal statements, and admission requirements.",
    },
  ];

  const stats = [
    { number: "12,000+", label: "Students Placed" },
    { number: "99.9%", label: "Visa Success Rate" },
    { number: "50+", label: "Partner Universities" },
    { number: "30+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen">
      {/* About Header */}
      <section className="page-top bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <h1 className="text-display-lg text-gray-900 mb-4">About Pascal Education Consultancy & Institute</h1>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in achieving your dreams of international
              education
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 border border-gray-200">
                <Building2 className="w-4 h-4 mr-2" />
                Our Story
              </div>
              <h2 className="text-display-md text-gray-900 mb-6">Who We Are</h2>
              <Card className="">
                <div className="relative text-center p-6 rounded-xl">
                  {/* Background Image with optional overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-22 h-22 rounded-xl mx-auto flex items-center justify-center mb-6 ">
                      <img
                        src={logo}
                        alt="Pascal Logo"
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <h3 className="text-title-lg text-white mb-4">
                      Pascal Education Consultancy
                    </h3>
                    <p className="text-body-sm text-white/90">
                      A professional student visa consultancy helping students
                      achieve their dream of studying abroad.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-title-lg text-gray-900 font-bold mb-4">A Legacy of Excellence Since 1995</h3>
                <p className="text-body-lg text-gray-600 mb-4">
                  Established in 2052 BS (1995 AD), Pascal Education Consultancy and Pascal Institute Pvt. Ltd. represent over three decades of unwavering commitment to international education. Based in Chabahil, Kathmandu, we are one of Nepal's founding education consultancies, built on a foundation of integrity, expertise, and student success.
                </p>
                <p className="text-body-lg text-gray-600">
                  With three specialized branches across Kathmandu, we continue to serve as "Your Path Founder," guiding the next generation toward global opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-lg text-gray-900 text-center mb-4 group-hover:text-orange-600 transition-colors">
                Our Mission
              </h3>
              <p className="text-body-sm text-gray-600 leading-relaxed text-center">
                To provide honest, transparent, and result-driven education
                consulting services that empower students to achieve their
                dreams of studying abroad. We are committed to personalized
                guidance, ethical practices, and delivering excellence in every
                aspect of our services.
              </p>
            </Card>

            {/* Vision */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-lg text-gray-900 text-center mb-4 group-hover:text-orange-600 transition-colors">
                Our Vision
              </h3>
              <p className="text-body-sm text-gray-600 leading-relaxed text-center">
                As your "Path Founder," our goal is to simplify the complex world of international admissions. We combine our 30 years of traditional values with modern educational trends to provide the most reliable counseling in Nepal.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing bg-gray-900">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl font-bold mb-3 text-white">
                  {stat.number}
                </div>
                <p className="text-body-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Global Reach */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <Globe className="w-4 h-4 mr-2" />
              Global Presence
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">Our Global Reach</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-body-lg text-gray-600 mb-6 text-center">
              We provide premium processing and counseling for the world's most sought-after study destinations. While we are renowned for our best-in-class services for Canada, UK, South Korea, and Australia, our network spans the globe.
            </p>
            <p className="text-body-lg text-gray-600 text-center">
              We tailor our services to match the specific academic and financial needs of every student, ensuring a perfect fit for universities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Premier Language & Test Preparation */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <BookOpen className="w-4 h-4 mr-2" />
              Training Excellence
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">Premier Language & Test Preparation</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-body-lg text-gray-600 mb-8 text-center">
              At Pascal Institute, we believe that strong communication is the key to global success. Our state-of-the-art training center in Chabahil offers expert-led coaching for:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-title-md text-gray-900 mb-4 font-semibold">Proficiency Tests</h3>
                <ul className="space-y-2 text-body-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    IELTS
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    PTE
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    TOEFL
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    SAT
                  </li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-title-md text-gray-900 mb-4 font-semibold">Language Programs</h3>
                <ul className="space-y-2 text-body-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Japanese
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Korean (EPS)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Chinese
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why 12,000+ Students Chose Pascal */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6 border border-gray-200">
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

      {/* Why Experience Matters */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <Sparkles className="w-4 h-4 mr-2" />
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
          <div className="max-w-3xl mx-auto text-center">
            <Card className="p-8 bg-gray to-blue-50 border-2 border-gray-200">
              <p className="text-title-md text-gray-900 font-semibold italic">
                "At Pascal, we don't just follow the path; we've been building it since 2052 BS."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <Briefcase className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">What We Do</h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive services to support your entire journey to
              international education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-body-sm text-gray-600">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-4xl mx-auto container-spacing text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-8 border border-gray-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Our Values
          </div>
          <h2 className="text-display-md text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="group p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Integrity</h3>
              <p className="text-body-sm text-gray-600">
                Honest and ethical practices in all our dealings
              </p>
            </Card>
            <Card className="group p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Excellence</h3>
              <p className="text-body-sm text-gray-600">
                Commitment to delivering the highest quality service
              </p>
            </Card>
            <Card className="group p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                Student Focus
              </h3>
              <p className="text-body-sm text-gray-600">
                Putting students' needs and success first
              </p>
            </Card>
            <Card className="group p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-title-md text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Innovation</h3>
              <p className="text-body-sm text-gray-600">
                Continuously improving our services and processes
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gray-900">
        <div className="relative max-w-4xl mx-auto container-spacing text-center">
          <h2 className="text-display-md text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-body-lg text-gray-300 mb-8">
            Let's work together to achieve your dreams of studying abroad
          </p>
          <AnimatedButton
            href="/contact"
            variant="secondary"
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            Get in Touch
          </AnimatedButton>
        </div>
      </section>
    </div>
  );
};

export default About;
