import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"

import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Users,
  FileText,
  HelpCircle,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react'

// Modern Footer Component for Organ Donation Platform
// Features: Modern gradient design, comprehensive links, social media integration,
// emergency contact info, and responsive layout with hover effects

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='53' cy='7' r='2'/%3E%3Ccircle cx='7' cy='53' r='2'/%3E%3Ccircle cx='53' cy='53' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="currentColor"/>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                  Relive
                </h3>
                <p className="text-blue-200 text-sm">Save Lives, Give Hope</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Connecting donors and patients through a secure, compassionate platform. 
              Every registration brings us closer to saving more lives.
            </p>
            
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-semibold text-sm">Emergency Hotline</span>
              </div>
              <p className="text-white font-bold text-lg">+91 8083552623</p>
              <p className="text-gray-300 text-sm">Available 24/7</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-400"/>
              How You Can Help
            </h4>
            <ul className="space-y-4">
              {
                [
                  { name: 'Become a Donor', link: '/signup', icon: Heart },
                  { name: 'Register as Patient', link: '/signup', icon: Users },
                  { name: 'Volunteer with Us', link: '/contact', icon: Users },
                  { name: 'Spread Awareness', link: '/about', icon: Users }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index}>
                      <Link 
                        to={item.link} 
                        className="flex items-center space-x-3 text-gray-300 hover:text-white group transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  );
                })
              }
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-400"/>
              Learn & Support
            </h4>
            <ul className="space-y-4">
              {
                [
                  { name: 'Types of Donation', link: '/about' },
                  { name: 'Organ Transplant Guide', link: '/work' },
                  { name: 'Medical Requirements', link: '/about' },
                  { name: 'Success Stories', link: '/about' },
                  { name: 'FAQs', link: '/contact' },
                  { name: 'Statistics', link: '/about' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.link} 
                      className="flex items-center space-x-3 text-gray-300 hover:text-white group transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors duration-300"></div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Contact & Connect */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <Phone className="w-5 h-5 mr-2 text-green-400"/>
              Contact & Connect
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Barasat, Kolkata</p>
                  <p className="text-gray-300 text-sm">West Bengal, India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white">support@relive.org</p>
                  <p className="text-gray-300 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300 text-sm">Emergency support 24/7</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-lg font-semibold text-white mb-4">Follow Our Mission</h5>
              <div className="flex space-x-4">
                {
                  [
                    { Icon: Facebook, color: 'hover:bg-blue-600' },
                    { Icon: Twitter, color: 'hover:bg-sky-500' },
                    { Icon: Instagram, color: 'hover:bg-pink-600' },
                    { Icon: Linkedin, color: 'hover:bg-blue-700' },
                    { Icon: Youtube, color: 'hover:bg-red-600' }
                  ].map(({ Icon, color }, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-3">Stay Updated on Our Life-Saving Mission</h4>
            <p className="text-gray-300 mb-6">
              Get the latest updates on successful transplants, new donor registrations, and ways to help save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-300">
                © {currentYear} <span className="font-semibold text-white">Relive</span>. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Building bridges between hope and healing, one life at a time.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                Medical Guidelines
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action for Emergency */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="tel:+918083552623"
          className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse"
          title="Emergency Organ Donation Hotline"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
