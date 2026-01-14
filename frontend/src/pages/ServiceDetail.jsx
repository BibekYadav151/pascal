import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Users, Clock, Award, Shield, Star } from 'lucide-react';
import { AnimatedButton } from '../components/ui';

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Service data with detailed information
  const serviceDetails = {
    'student-visa-counseling': {
      title: 'Student Visa Counseling',
      icon: '🎓',
      shortDesc: 'Expert guidance for student visa applications',
      heroImage: '/api/placeholder/800/400',
      overview: 'Our comprehensive student visa counseling service provides expert guidance throughout your entire visa application process. From initial consultation to visa approval, our experienced counselors ensure you have the best chance of success.',
      features: [
        'Personalized visa strategy development',
        'Document preparation and review',
        'Application form assistance',
        'Interview preparation and mock sessions',
        'Visa status tracking and follow-up',
        'Rejection appeal support'
      ],
      benefits: [
        { icon: 'Users', text: '95% visa success rate' },
        { icon: 'Clock', text: 'Average processing: 15-30 days' },
        { icon: 'Award', text: 'Certified counselors' },
        { icon: 'Shield', text: '100% confidentiality' }
      ],
      process: [
        { step: 1, title: 'Initial Consultation', description: 'We assess your profile and discuss your study goals.' },
        { step: 2, title: 'Document Collection', description: 'Guidance on required documents and preparation.' },
        { step: 3, title: 'Application Preparation', description: 'Complete application form assistance.' },
        { step: 4, title: 'Review & Submission', description: 'Final review before submission to embassy.' },
        { step: 5, title: 'Interview Preparation', description: 'Mock interviews and tips for success.' },
        { step: 6, title: 'Approval & Travel', description: 'Guidance on final steps and travel arrangements.' }
      ],
      testimonials: [
        { name: 'Sarah Johnson', country: 'Canada', text: 'The visa counseling team was incredibly helpful. They guided me through every step and I got my Canadian study visa approved on the first attempt.' },
        { name: 'Rajesh Kumar', country: 'Australia', text: 'Professional service with great attention to detail. Highly recommend for anyone planning to study abroad.' }
      ]
    },
    'study-abroad-programs': {
      title: 'Study Abroad Programs',
      icon: '🌍',
      shortDesc: 'Wide range of programs in top universities',
      heroImage: '/api/placeholder/800/400',
      overview: 'Discover your perfect study abroad opportunity with our extensive network of partner universities worldwide. We offer comprehensive support from program selection to university admission.',
      features: [
        'University selection based on your profile',
        'Application assistance for multiple universities',
        'Scholarship guidance and application support',
        'Course counseling and career guidance',
        'Pre-departure orientation',
        'Post-arrival support services'
      ],
      benefits: [
        { icon: 'Users', text: '1000+ successful placements' },
        { icon: 'Award', text: 'Top-ranked universities' },
        { icon: 'Shield', text: 'Admission guarantee programs' },
        { icon: 'Star', text: 'Personalized counseling' }
      ],
      process: [
        { step: 1, title: 'Profile Assessment', description: 'Complete evaluation of your academic background and goals.' },
        { step: 2, title: 'University Shortlisting', description: 'Selection of suitable universities based on your profile.' },
        { step: 3, title: 'Application Strategy', description: 'Strategic planning for applications and deadlines.' },
        { step: 4, title: 'Document Preparation', description: 'Assistance with all required application documents.' },
        { step: 5, title: 'Application Submission', description: 'Coordinated submission to multiple universities.' },
        { step: 6, title: 'Offer Management', description: 'Help with offer evaluation and acceptance.' }
      ],
      testimonials: [
        { name: 'Maria Garcia', country: 'UK', text: 'Found my dream university in the UK with their expert guidance. The entire process was smooth and well-organized.' },
        { name: 'Ahmed Hassan', country: 'USA', text: 'Outstanding service! They helped me secure admission to a top US university with a full scholarship.' }
      ]
    },
    'ielts-pte-language-classes': {
      title: 'IELTS / PTE / Language Classes',
      icon: '📘',
      shortDesc: 'Comprehensive test preparation',
      heroImage: '/api/placeholder/800/400',
      overview: 'Master English language proficiency tests with our comprehensive preparation programs. Our expert instructors and proven methodologies ensure you achieve your target scores.',
      features: [
        'Small batch sizes (max 8 students)',
        'Experienced native-speaking instructors',
        'Regular mock tests and assessments',
        'Individual speaking practice sessions',
        'Comprehensive study materials',
        'Flexible timing options'
      ],
      benefits: [
        { icon: 'Award', text: 'Average 1.5 band improvement' },
        { icon: 'Users', text: '500+ successful students' },
        { icon: 'Clock', text: '4-12 week programs' },
        { icon: 'Star', text: '7.0+ average scores achieved' }
      ],
      process: [
        { step: 1, title: 'Diagnostic Test', description: 'Initial assessment to identify strengths and weaknesses.' },
        { step: 2, title: 'Personalized Study Plan', description: 'Customized learning plan based on your needs.' },
        { step: 3, title: 'Skill Development', description: 'Focused training in all four modules.' },
        { step: 4, title: 'Practice Sessions', description: 'Regular mock tests and practice exercises.' },
        { step: 5, title: 'Strategy Building', description: 'Test-taking strategies and time management.' },
        { step: 6, title: 'Final Preparation', description: 'Intensive revision and last-minute tips.' }
      ],
      testimonials: [
        { name: 'Priya Sharma', score: 'IELTS 7.5', text: 'Improved from 5.5 to 7.5 in just 8 weeks. The instructors were amazing and the study materials were excellent.' },
        { name: 'David Chen', score: 'PTE 75', text: 'The PTE preparation was thorough and well-structured. Achieved my target score comfortably.' }
      ]
    },
    'documentation-interview-prep': {
      title: 'Documentation & Interview Prep',
      icon: '📝',
      shortDesc: 'Complete support for applications',
      heroImage: '/api/placeholder/800/400',
      overview: 'Navigate the complex documentation and interview process with confidence. Our comprehensive support ensures your applications are complete, accurate, and compelling.',
      features: [
        'Document checklist and verification',
        'Application form assistance',
        'Statement of Purpose writing',
        'Letter of Recommendation guidance',
        'Financial document preparation',
        'Interview coaching and mock sessions'
      ],
      benefits: [
        { icon: 'Shield', text: '100% document accuracy guarantee' },
        { icon: 'Users', text: '98% application success rate' },
        { icon: 'Clock', text: 'Same-day document review' },
        { icon: 'Star', text: 'Expert interview coaching' }
      ],
      process: [
        { step: 1, title: 'Document Assessment', description: 'Review of all required documents and gaps identification.' },
        { step: 2, title: 'Document Collection', description: 'Guidance on obtaining missing documents.' },
        { step: 3, title: 'Application Preparation', description: 'Complete application form assistance.' },
        { step: 4, title: 'SOP & LOR Support', description: 'Professional writing assistance for essays and recommendations.' },
        { step: 5, title: 'Interview Preparation', description: 'Mock interviews and comprehensive coaching.' },
        { step: 6, title: 'Final Submission', description: 'Quality check and submission assistance.' }
      ],
      testimonials: [
        { name: 'Anjali Patel', university: 'University of Melbourne', text: 'Their documentation support was exceptional. They helped me prepare a compelling application that got me accepted.' },
        { name: 'Michael Wong', university: 'University of Toronto', text: 'The interview preparation was crucial for my success. The mock sessions built my confidence significantly.' }
      ]
    }
  };

  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const IconComponent = {
    Users,
    Clock,
    Award,
    Shield,
    Star
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {service.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-md text-gray-900 mb-6">Service Overview</h2>
              <p className="text-body-lg text-gray-600 mb-8 leading-relaxed">
                {service.overview}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {service.benefits.map((benefit, index) => {
                  const Icon = IconComponent[benefit.icon] || Star;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <AnimatedButton
                href="/contact"
                variant="primary"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started Today
              </AnimatedButton>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-spacing bg-gray-50">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <h2 className="text-display-md text-gray-900 mb-4">Our Process</h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Step-by-step guidance to ensure your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <h2 className="text-display-md text-gray-900 mb-4">Success Stories</h2>
            <p className="text-body-lg text-gray-600">
              Hear from our successful students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    {testimonial.country && (
                      <div className="text-sm text-gray-600">{testimonial.country}</div>
                    )}
                    {testimonial.score && (
                      <div className="text-sm text-green-600 font-medium">{testimonial.score}</div>
                    )}
                    {testimonial.university && (
                      <div className="text-sm text-blue-600">{testimonial.university}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-blue-600">
        <div className="max-w-4xl mx-auto container-spacing text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful students who have achieved their dreams with our guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Contact Us Today
            </AnimatedButton>
            <AnimatedButton
              href="/classes"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              View Our Classes
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;