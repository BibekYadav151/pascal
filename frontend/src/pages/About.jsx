import React from 'react';

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
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in achieving your dreams of international education
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                Who We Are
              </h2>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mx-auto flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-4xl">P</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    Pascal Institute
                  </h3>
                  <p className="text-gray-700">
                    A professional student visa consultancy helping students achieve
                    their dream of studying abroad.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg text-gray-700 mb-6">
                Pascal Institute is a leading educational consultancy firm dedicated
                to helping students achieve their dreams of studying abroad. With
                years of experience and a team of certified counselors, we provide
                comprehensive guidance throughout the entire process.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                From initial counseling to university selection, test preparation,
                visa documentation, and pre-departure briefing, we support our
                students every step of the way.
              </p>
              <p className="text-lg text-gray-700">
                Our success is measured by the success of our students, and we take
                pride in our high visa approval rate and the countless students we've
                helped achieve their educational goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 text-lg">
                To provide honest, transparent, and result-driven education consulting
                services that empower students to achieve their dreams of studying abroad.
                We are committed to personalized guidance, ethical practices, and
                delivering excellence in every aspect of our services.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 text-lg">
                To be the most trusted global education partner, known for our
                commitment to student success, integrity, and innovative approaches
                to educational consulting. We aim to create a network of successful
                global citizens who contribute positively to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <p className="text-lg text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive services to support your entire journey to international education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Integrity</h3>
              <p className="text-gray-600">Honest and ethical practices in all our dealings</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Excellence</h3>
              <p className="text-gray-600">Commitment to delivering the highest quality service</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Student Focus</h3>
              <p className="text-gray-600">Putting students' needs and success first</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Innovation</h3>
              <p className="text-gray-600">Continuously improving our services and processes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's work together to achieve your dreams of studying abroad
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
