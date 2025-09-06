import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, Building2, Stethoscope, Check, ArrowRight, Star } from 'lucide-react';

const roles = [
  {
    title: "Organ Donor",
    subtitle: "Give the gift of life",
    description: "Register as an organ donor and help save lives through your generous gift. Make a lasting impact on families in need.",
    points: [
      "Quick & secure registration",
      "Complete medical history tracking",
      "Flexible donation preferences",
      "Automated family notifications",
      "Real-time availability status"
    ],
    buttonText: "Become a Donor",
    buttonLink: "/signup",
    gradient: "from-red-500 to-pink-600",
    cardBg: "bg-gradient-to-br from-red-50 to-pink-50",
    iconBg: "bg-gradient-to-br from-red-500 to-pink-600",
    icon: <Heart className="w-8 h-8 text-white" />,
    featured: true,
    stats: "10,000+ lives saved"
  },
  {
    title: "Patient",
    subtitle: "Find hope & healing",
    description: "Find compatible organ matches and track your position on the waiting list with our advanced matching system.",
    points: [
      "Real-time waiting list status",
      "Instant match notifications",
      "Regular medical updates",
      "Priority status tracking",
      "24/7 support access"
    ],
    buttonText: "Register as Patient",
    buttonLink: "/signup",
    gradient: "from-blue-500 to-cyan-600",
    cardBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
    icon: <User className="w-8 h-8 text-white" />,
    featured: true,
    stats: "95% match success rate"
  },
  {
    title: "Hospital",
    subtitle: "Institutional access",
    description: "Access our comprehensive network to coordinate organ transplants and manage patient cases efficiently.",
    points: [
      "Advanced patient management",
      "AI-powered real-time matching",
      "Coordination & communication tools",
      "Comprehensive analytics dashboard",
      "Integration with existing systems"
    ],
    buttonText: "Hospital Registration",
    buttonLink: "/contact",
    gradient: "from-green-500 to-emerald-600",
    cardBg: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    icon: <Building2 className="w-8 h-8 text-white" />,
    featured: false,
    stats: "500+ partner hospitals"
  },
  {
    title: "Medical Professional",
    subtitle: "Expert coordination",
    description: "Facilitate organ matching and coordinate between donors, patients, and hospitals with professional tools.",
    points: [
      "Comprehensive case management",
      "Advanced medical assessments",
      "Priority decision support",
      "Multi-team coordination",
      "Professional certification tracking"
    ],
    buttonText: "Professional Access",
    buttonLink: "/contact",
    gradient: "from-purple-500 to-indigo-600",
    cardBg: "bg-gradient-to-br from-purple-50 to-indigo-50",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    icon: <Stethoscope className="w-8 h-8 text-white" />,
    featured: false,
    stats: "1,000+ verified professionals"
  },
];

function RoleSelection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Join Our Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Role</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking to save lives as a donor, find hope as a patient, or support as a medical professional - we have a place for you.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Roles - Larger Cards */}
          {roles.filter(role => role.featured).map((role, index) => (
            <div
              key={index}
              className={`group relative ${role.cardBg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50 overflow-hidden`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br ${role.gradient} rounded-full blur-2xl`}></div>
              </div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${role.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {role.icon}
                </div>

                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-lg font-medium bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                    {role.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {role.points.map((point, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="mb-6 p-4 bg-white/60 rounded-xl border border-white/40">
                  <p className="text-sm font-medium text-gray-800">{role.stats}</p>
                </div>

                {/* CTA Button */}
                <Link
                  to={role.buttonLink}
                  className={`group/btn inline-flex items-center justify-center w-full bg-gradient-to-r ${role.gradient} text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
                >
                  {role.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Non-Featured Roles - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.filter(role => !role.featured).map((role, index) => (
            <div
              key={index}
              className={`group ${role.cardBg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`flex-shrink-0 p-3 rounded-xl ${role.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  {role.icon}
                </div>

                <div className="flex-1">
                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{role.title}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">{role.subtitle}</p>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{role.description}</p>

                  {/* Key Features - First 3 */}
                  <ul className="space-y-2 mb-4">
                    {role.points.slice(0, 3).map((point, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-xs">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <p className="text-xs font-medium text-gray-500 mb-4">{role.stats}</p>

                  {/* CTA Button */}
                  <Link
                    to={role.buttonLink}
                    className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${role.gradient} text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200`}
                  >
                    {role.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Not sure which role fits you?</h3>
            <p className="text-gray-600 mb-6">Contact our team for personalized guidance on how you can contribute to saving lives.</p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Guidance
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoleSelection;
