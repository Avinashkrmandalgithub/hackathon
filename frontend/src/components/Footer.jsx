import React from 'react'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

const footerLinks = {
  platform: [
    { name: 'How It Works', href: '#' },
    { name: 'Register as Donor', href: '#' },
    { name: 'Find Help (Patients)', href: '#' },
    { name: 'Partner Hospitals', href: '#' },
    { name: 'Success Stories', href: '#' }
  ],
  donors: [
    { name: 'Why Become a Donor', href: '#' },
    { name: 'Living Donation', href: '#' },
    { name: 'After-Death Donation', href: '#' },
    { name: 'Medical Guidelines', href: '#' },
    { name: 'FAQs', href: '#' }
  ],
  hospitals: [
    { name: 'Join as Partner', href: '#' },
    { name: 'Organ Matching Portal', href: '#' },
    { name: 'Compliance & Safety', href: '#' },
    { name: 'Training & Support', href: '#' },
    { name: 'Contact Medical Team', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Emergency Contacts', href: '#' },
    { name: 'Guides & Resources', href: '#' },
    { name: 'Safety & Privacy', href: '#' },
    { name: 'Report an Issue', href: '#' }
  ],
  company: [
    { name: 'About Relive', href: '#' },
    { name: 'Our Mission', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'HIPAA Compliance', href: '#' },
    { name: 'Data & Security', href: '#' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0b0f1a] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Relive</h2>
                <p className="text-sm text-gray-400">Save Lives, Give Hope.</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Relive connects registered donors, patients, and hospitals through a secure, medically supervised platform.
              Together, we are building a reliable path from hope to healing.
            </p>
            
            {/* Emergency Hotline */}
            <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-600/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-300 font-semibold text-sm">24/7 Emergency Line</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-lg">+1 (555) 123-LIFE</span>
              </div>
              <p className="text-gray-300 text-xs mt-1">For urgent organ donation needs</p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@relive.org</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Volunteers */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Donors</h3>
            <ul className="space-y-3">
              {footerLinks.donors.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Organizations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Hospitals</h3>
            <ul className="space-y-3">
              {footerLinks.hospitals.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical Certifications & Newsletter */}
        <div className="border-t border-white/10 mt-12 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Medical Certifications */}
            <div>
              <h3 className="text-xl font-bold mb-6">Medical Certifications & Compliance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm font-semibold text-white mb-1">HIPAA</div>
                  <div className="text-xs text-gray-400">Compliant</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm font-semibold text-white mb-1">FDA</div>
                  <div className="text-xs text-gray-400">Regulated</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm font-semibold text-white mb-1">UNOS</div>
                  <div className="text-xs text-gray-400">Partner</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm font-semibold text-white mb-1">SOC 2</div>
                  <div className="text-xs text-gray-400">Type II</div>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
              <p className="text-gray-400 mb-6">
                Get medical guidelines, success stories, and platform updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Relive. All rights reserved. Save Lives, Give Hope.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {footerLinks.legal.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
