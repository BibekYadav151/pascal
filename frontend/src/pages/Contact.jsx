import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, AnimatedButton } from '../components/ui';
import { FiMapPin } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Contact = () => {
  const { addContactMessage } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addContactMessage({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });

    alert('Your message has been sent successfully! We will get back to you soon.');

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="w-4 h-4" />,
      title: "Address",
      details: "Kathmandu, Nepal",
    },
    {
      icon: <FaPhoneAlt className="w-4 h-4" />,
      title: "Phone",
      details: "+977-1-44XXXXXX",
    },
    {
      icon: <MdEmail className="w-4 h-4" />,
      title: "Email",
      details: "info@pascalinstitute.edu.np",
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook />, url: "#" },
    // { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Instagram", icon: <FaSquareInstagram />, url: "#" },
    // { name: "LinkedIn", icon: "💼", url: "#" },
  ];

  const branches = [
    {
      name: "Main Branch - Kathmandu",
      location: "Kathmandu, Nepal",
      address: "Putalisadak, Kathmandu 44600",
      phone: "+977-1-44XXXXXX",
      email: "info@pascalinstitute.edu.np",
      hours: "Sun-Fri: 9:00 AM - 6:00 PM",
      mapUrl: "#"
    },
    {
      name: "Branch Office - Pokhara",
      location: "Pokhara, Nepal",
      address: "Lakeside Road, Pokhara 33700",
      phone: "+977-61-XXXXXX",
      email: "pokhara@pascalinstitute.edu.np",
      hours: "Sun-Fri: 9:00 AM - 5:00 PM",
      mapUrl: "#"
    },
    {
      name: "Branch Office - Chitwan",
      location: "Chitwan, Nepal",
      address: "Bharatpur, Chitwan 44200",
      phone: "+977-56-XXXXXX",
      email: "chitwan@pascalinstitute.edu.np",
      hours: "Sun-Fri: 9:00 AM - 5:00 PM",
      mapUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="page-top bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
           
            <h1 className="text-display-lg text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? Get in touch with us today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-display-md text-gray-900 mb-6">
                  Get In Touch
                </h2>
                <p className="text-body-lg text-gray-600 mb-8">
                  We'd love to hear from you. Fill out the form or reach out through
                  any of our contact channels below.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{info.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-title-sm text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-body-sm text-gray-600">{info.details}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <Card className="p-6">
                <h3 className="text-title-md text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg text-2xl transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-title-lg text-gray-900 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input-field"
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder="Your phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Send Message
                </AnimatedButton>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <h2 className="text-display-md text-gray-900 mb-4">
              Our Branches
            </h2>
            <p className="text-body-lg text-gray-600">
              Visit us at any of our convenient locations across Nepal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {/* Branch Header */}
                  <div>
                    <h3 className="text-title-md text-gray-900 mb-2">
                      {branch.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FiMapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {branch.location}
                    </div>
                  </div>

                  {/* Branch Details */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700">{branch.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaPhoneAlt className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{branch.phone}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MdEmail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{branch.email}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="w-4 h-4 text-gray-400 flex-shrink-0">🕒</span>
                      <p className="text-sm text-gray-700">{branch.hours}</p>
                    </div>
                  </div>

                  {/* Visit Button */}
                  <AnimatedButton
                    href={branch.mapUrl}
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Get Directions
                  </AnimatedButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">

            <h2 className="text-display-md text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-body-lg text-gray-600">
              Visit any of our branches across Nepal
            </p>
          </div>

          <Card className="overflow-hidden">
            {/* Placeholder for Map */}
            <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-title-md text-gray-900 mb-2">
                  Map Integration Coming Soon
                </p>
                <p className="text-body-sm text-gray-600">
                  Our branches are located across Nepal - Kathmandu, Pokhara, and Chitwan
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gray-900">
        <div className="relative max-w-4xl mx-auto container-spacing text-center">
          <h2 className="text-display-md text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-body-lg text-gray-300 mb-8">
            Contact us today and let us help you achieve your dreams of studying abroad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              href="/courses"
              variant="secondary"
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Browse Programs
            </AnimatedButton>
            <AnimatedButton
              href="/classes"
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              View Classes
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
