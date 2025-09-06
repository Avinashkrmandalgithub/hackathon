import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Send,
  Clock,
  HeadphonesIcon,
  MessageSquare,
  CheckCircle,
  Heart,
  Shield,
  Users
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle form submission logic here
      alert('Message sent successfully!');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about organ donation or need support? We're here to help you make a life-saving difference.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            <ContactCard 
              icon={<Phone className="w-6 h-6" />}
              title="24/7 Helpline"
              subtitle="Emergency Support"
              info="+1 (555) 123-4567"
              gradient="from-blue-500 to-cyan-500"
              bgColor="from-blue-50 to-cyan-50"
            />
            
            <ContactCard 
              icon={<Mail className="w-6 h-6" />}
              title="Email Support"
              subtitle="Quick Response"
              info="support@organbridge.com"
              gradient="from-green-500 to-emerald-500"
              bgColor="from-green-50 to-emerald-50"
            />
            
            <ContactCard 
              icon={<MapPin className="w-6 h-6" />}
              title="Main Office"
              subtitle="Visit Us"
              info="123 Medical Plaza, Health City"
              gradient="from-purple-500 to-pink-500"
              bgColor="from-purple-50 to-pink-50"
            />
            
            <ContactCard 
              icon={<Clock className="w-6 h-6" />}
              title="Operating Hours"
              subtitle="Always Available"
              info="24/7 Emergency Line"
              gradient="from-orange-500 to-red-500"
              bgColor="from-orange-50 to-red-50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Info Section */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Location</h2>
                  <p className="text-gray-600">Visit our main office or reach out to us anytime.</p>
                </div>
                <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
                    <p className="text-gray-600 mb-2">123 Medical Plaza, Health City</p>
                    <p className="text-sm text-gray-500">Click here to view in maps</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">We're Here to Help</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                      <HeadphonesIcon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold mb-1">24/7</div>
                    <div className="text-sm opacity-90">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold mb-1">50K+</div>
                    <div className="text-sm opacity-90">People Helped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Trust Section */}
          <div className="mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Connected</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Follow us on social media for updates, success stories, and important information about organ donation.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Social Links */}
                <div className="flex space-x-6 mb-6 md:mb-0">
                  <SocialLink 
                    href="#" 
                    icon={<Facebook className="w-6 h-6" />} 
                    label="Facebook" 
                    bgColor="bg-blue-600" 
                  />
                  <SocialLink 
                    href="#" 
                    icon={<Twitter className="w-6 h-6" />} 
                    label="Twitter" 
                    bgColor="bg-sky-500" 
                  />
                  <SocialLink 
                    href="#" 
                    icon={<Linkedin className="w-6 h-6" />} 
                    label="LinkedIn" 
                    bgColor="bg-blue-700" 
                  />
                </div>
                
                {/* Trust Badges */}
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-2">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">HIPAA Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-2">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">Lives Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-2">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">Verified Platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ContactCard Component
function ContactCard({ icon, title, subtitle, info, gradient, bgColor }) {
  return (
    <div className={`group relative bg-gradient-to-br ${bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50`}>
      <div className={`absolute -top-3 left-6 w-10 h-10 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      <div className="pt-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-xs font-medium text-gray-600">{subtitle}</p>
        </div>
        <p className="text-sm text-gray-700 font-medium">{info}</p>
      </div>
    </div>
  );
}

// SocialLink Component
function SocialLink({ href, icon, label, bgColor }) {
  return (
    <a 
      href={href}
      className={`group inline-flex items-center justify-center w-12 h-12 ${bgColor} text-white rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-200`}
      aria-label={label}
    >
      {icon}
    </a>
  );
}

export default Contact;
