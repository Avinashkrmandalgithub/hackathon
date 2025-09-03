import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">Get in touch with us for any questions or concerns</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 rounded-full bg-teal-100 mb-4">
              <FaPhone className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+1 (234) 567-8900</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 rounded-full bg-teal-100 mb-4">
              <FaEnvelope className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">contact@relive.com</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 rounded-full bg-teal-100 mb-4">
              <FaMapMarkerAlt className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">123 Health Street, Medical City</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
  <div className="w-full h-[400px] rounded-lg overflow-hidden">
    <iframe
      title="Google Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.387201653823!2d77.31911671508385!3d28.58221179243986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50c0eaf3c93%3A0x66a3f4e056ec5ec2!2sNoida%20Sector%2062!5e0!3m2!1sen!2sin!4v1672214065441!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

        </div>

        {/* Social Media Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-teal-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;