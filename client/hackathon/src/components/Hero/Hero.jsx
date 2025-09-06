import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Users, Clock, Shield, ArrowRight, Star } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-red-100 rounded-full opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Saving Lives Together
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Connect.
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Contribute.
              </span>
              <br />
              <span className="text-gray-900">Change Lives.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Join the world's most trusted organ donation platform. Connect donors with patients, 
              save lives, and make a difference in someone's world today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
              >
                Learn How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                <div className="text-sm text-gray-600">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50,000+</div>
                <div className="text-sm text-gray-600">Registered Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            {/* Main Illustration Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Live Matching</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
              </div>

              {/* Mock Matching Interface */}
              <div className="space-y-4">
                {/* Donor Card */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Compatible Donor Found</div>
                      <div className="text-sm text-gray-600">Blood Type: O+, Location: 5 miles</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">98%</div>
                  </div>
                </div>

                {/* Patient Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Patient Match</div>
                      <div className="text-sm text-gray-600">Urgent: Kidney needed</div>
                    </div>
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Emergency
                    </div>
                  </div>
                </div>

                {/* Success Notification */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Match Successful!</div>
                      <div className="text-sm opacity-90">Connection established with medical team</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Avg. match time: 48 hrs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">100% Secure</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white animate-pulse" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
