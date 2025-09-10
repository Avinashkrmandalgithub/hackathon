import React from 'react'
import Navbar from '../components/Navbar.jsx'
import HeroPage from '../pages/HeroPage.jsx'
import RolePage from '../pages/RolePage.jsx'
import WorkPage from '../pages/WorkPage.jsx'
import TestimonialPage from '../pages/TestimonialPage.jsx'
import Footer from '../components/Footer.jsx'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroPage />
        
        {/* About/Mission Section */}
        <section className="py-20 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Mission</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We believe every life is precious and every person deserves a second chance. 
              Our platform connects organ donors with patients in need, creating a bridge between 
              hope and healing through advanced matching technology.
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500">
                <h3 className="text-3xl font-bold text-red-500 mb-2">25,000+</h3>
                <p className="text-gray-600">Registered Donors</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <h3 className="text-3xl font-bold text-green-500 mb-2">10,000+</h3>
                <p className="text-gray-600">Lives Saved</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <h3 className="text-3xl font-bold text-blue-500 mb-2">500+</h3>
                <p className="text-gray-600">Partner Hospitals</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Roles/Opportunities Section */}
        <RolePage />
        
        {/* How It Works Section */}
        <WorkPage />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Relive?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We make organ donation safe, secure, and life-saving through advanced technology and compassionate care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rapid Matching</h3>
                <p className="text-gray-700">AI-assisted matching connects donors with compatible recipients securely and quickly.</p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Security</h3>
                <p className="text-gray-700">HIPAA compliant with end-to-end encryption ensuring all medical data remains confidential.</p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Life Impact</h3>
                <p className="text-gray-700">Track the real lives saved and families reunited through detailed impact reports and success stories.</p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-gray-700">Round-the-clock medical support and emergency response team for critical situations.</p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hospital Network</h3>
                <p className="text-gray-700">Connected with 500+ certified hospitals and medical centers worldwide for seamless care.</p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition-all duration-300">
                <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Excellence</h3>
                <p className="text-gray-700">Partnered with leading medical professionals ensuring highest standards of care and ethics.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialPage />
        
        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12">
              Join thousands of heroes who are giving hope to patients in need. Your decision today can save lives tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Register as Donor
              </button>
              <button className="px-10 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors">
                Find Help
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
