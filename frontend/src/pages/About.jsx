import React from 'react';
import { Card, AnimatedButton } from '../components/ui';

const About = () => {
  const services = [
    {
      icon: '🌍',
      title: 'Country & Course Selection',
      description: 'Expert guidance to help you choose the right country and course based on your interests, qualifications, and career goals.'
    },
    {
      icon: '📚',
      title: 'Test Preparation',
      description: 'Comprehensive preparation for IELTS, PTE, Japanese JLPT, and other language proficiency tests.'
    },
    {
      icon: '📝',
      title: 'Visa Documentation',
      description: 'Complete support in preparing and reviewing all necessary documents for visa applications.'
    },
    {
      icon: '💼',
      title: 'Interview Preparation',
      description: 'Mock interviews and coaching to help you prepare for visa and university admission interviews.'
    },
    {
      icon: '✈️',
      title: 'Pre-departure Briefing',
      description: 'Essential information and tips to help you prepare for life and studies in your destination country.'
    },
    {
      icon: '🎓',
      title: 'University Application',
      description: 'Assistance with university applications, personal statements, and admission requirements.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Students Placed' },
    { number: '95%', label: 'Visa Success Rate' },
    { number: '50+', label: 'Partner Universities' },
    { number: '10+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* About Header */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-8 border border-gray-200">
              👥 About Pascal Institute
            </div>
            <h1 className="text-display-lg text-gray-900 mb-6">
              About Us
            </h1>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in achieving your dreams of international education
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 border border-gray-200">
                🏢 Our Story
              </div>
              <h2 className="text-display-md text-gray-900 mb-6">
                Who We Are
              </h2>
              <Card className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-xl mx-auto flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-2xl">P</span>
                  </div>
                  <h3 className="text-title-lg text-gray-900 mb-4">
                    Pascal Institute
                  </h3>
                  <p className="text-body-sm text-gray-600">
                    A professional student visa consultancy helping students achieve
                    their dream of studying abroad.
                  </p>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <p className="text-body-lg text-gray-600">
                Pascal Institute is a leading educational consultancy firm dedicated
                to helping students achieve their dreams of studying abroad. With
                years of experience and a team of certified counselors, we provide
                comprehensive guidance throughout the entire process.
              </p>
              <p className="text-body-lg text-gray-600">
                From initial counseling to university selection, test preparation,
                visa documentation, and pre-departure briefing, we support our
                students every step of the way.
              </p>
              <p className="text-body-lg text-gray-600">
                Our success is measured by the success of our students, and we take
                pride in our high visa approval rate and the countless students we've
                helped achieve their educational goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-title-lg text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-body-sm text-gray-600 leading-relaxed">
                To provide honest, transparent, and result-driven education consulting
                services that empower students to achieve their dreams of studying abroad.
                We are committed to personalized guidance, ethical practices, and
                delivering excellence in every aspect of our services.
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-title-lg text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-body-sm text-gray-600 leading-relaxed">
                To be the most trusted global education partner, known for our
                commitment to student success, integrity, and innovative approaches
                to educational consulting. We aim to create a network of successful
                global citizens who contribute positively to society.
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

      {/* What We Do */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-gray-700 text-sm font-medium mb-8 border border-gray-200">
              💼 Our Services
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive services to support your entire journey to international education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-title-md text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-body-sm text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-4xl mx-auto container-spacing text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-8 border border-gray-200">
            ✨ Our Values
          </div>
          <h2 className="text-display-md text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 text-center">
              <h3 className="text-title-md text-gray-900 mb-3">Integrity</h3>
              <p className="text-body-sm text-gray-600">Honest and ethical practices in all our dealings</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-title-md text-gray-900 mb-3">Excellence</h3>
              <p className="text-body-sm text-gray-600">Commitment to delivering the highest quality service</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-title-md text-gray-900 mb-3">Student Focus</h3>
              <p className="text-body-sm text-gray-600">Putting students' needs and success first</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-title-md text-gray-900 mb-3">Innovation</h3>
              <p className="text-body-sm text-gray-600">Continuously improving our services and processes</p>
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
