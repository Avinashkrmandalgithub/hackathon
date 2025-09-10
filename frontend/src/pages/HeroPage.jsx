import React from "react";
import { Heart, Users, Clock, Shield, ArrowRight, Phone } from 'lucide-react';

// Hero Component
const HeroPage = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-white overflow-hidden">
      {/* Background Shape (Decoration) */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-red-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-200 rounded-full blur-3xl opacity-20"></div>
      
      {/* Emergency Banner */}
      <div className="absolute top-0 left-0 right-0 bg-red-600 text-white py-2 z-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">24/7 Emergency Organ Donation Hotline: +1 (555) 123-LIFE</span>
            <Phone className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 md:px-12 z-10 mt-12">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2 fill-current" />
            Saving Lives Through Connection
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 mb-6">
            Save Lives.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
              Give Hope.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Connect organ donors with patients in need through our secure, compassionate platform. 
            Every registration brings us closer to saving more lives.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center">
              Register as Donor
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-200">
              Find Help
            </button>
          </div>
          
          {/* Trust Indicators */}
          {/* <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Secure</div>
            </div>
          </div> */}
        </div>

        {/* Right Content - Visual */}
        <div className="lg:w-1/2 relative">
          {/* Main Visual Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Medical Cross Background */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-red-600 rounded-sm transform rotate-45"></div>
                <div className="absolute inset-0 bg-red-600 rounded-sm"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Organ Match Found</h3>
                  <p className="text-gray-600">Compatible donor located</p>
                </div>
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Match Compatibility</span>
                  <span className="text-sm font-semibold text-green-600">98% Match</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">2.5hrs</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>HIPAA Compliant • End-to-End Encrypted</span>
              </div>
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-600 fill-current" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Active Donors</div>
                <div className="text-xs text-gray-600">25,000+ Registered</div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Lives Saved</div>
                <div className="text-xs text-gray-600">This Month: 127</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 py-6">
        <div className="w-full px-6">
          <div className="flex flex-nowrap justify-between items-center gap-8 text-center">
            <div className="flex-1 min-w-0 flex flex-col items-center">
              <div className="text-2xl font-bold text-red-600 whitespace-nowrap">25K+</div>
              <div className="text-sm text-gray-600 whitespace-nowrap">Registered Donors</div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-center">
              <div className="text-2xl font-bold text-green-600 whitespace-nowrap">10K+</div>
              <div className="text-sm text-gray-600 whitespace-nowrap">Lives Saved</div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-center">
              <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">500+</div>
              <div className="text-sm text-gray-600 whitespace-nowrap">Partner Hospitals</div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-center">
              <div className="text-2xl font-bold text-purple-600 whitespace-nowrap">24/7</div>
              <div className="text-sm text-gray-600 whitespace-nowrap">Emergency Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
