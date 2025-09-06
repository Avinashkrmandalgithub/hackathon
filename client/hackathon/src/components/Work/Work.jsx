import React from 'react';
import { ArrowRight, UserPlus, Search, Bell, Heart, CheckCircle, Clock, Shield, Users } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Register",
    subtitle: "Join our community",
    desc: "Create your secure profile as a donor, patient, hospital, or medical professional. Complete verification in under 5 minutes.",
    icon: <UserPlus className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    features: ["Secure registration", "Medical verification", "Privacy protected"],
    time: "5 min"
  },
  {
    id: 2,
    title: "Smart Match",
    subtitle: "AI-powered matching",
    desc: "Our advanced AI system analyzes medical compatibility, blood types, location, and urgency to find the perfect matches in real-time.",
    icon: <Search className="w-8 h-8" />,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    features: ["AI compatibility check", "Location proximity", "Medical criteria"],
    time: "24/7"
  },
  {
    id: 3,
    title: "Instant Alert",
    subtitle: "Never miss a match",
    desc: "Get immediate notifications via SMS, email, and push notifications when potential matches are found with detailed compatibility scores.",
    icon: <Bell className="w-8 h-8" />,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    features: ["Multi-channel alerts", "Compatibility scores", "Priority notifications"],
    time: "Instant"
  },
  {
    id: 4,
    title: "Safe Connect",
    subtitle: "Secure coordination",
    desc: "Connect with medical teams through our secure platform to coordinate the life-saving transplant process with full privacy protection.",
    icon: <Heart className="w-8 h-8" />,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    features: ["Medical team coordination", "Secure communication", "Full privacy protection"],
    time: "Guided"
  },
];

const stats = [
  { icon: <Users className="w-6 h-6" />, number: "50,000+", label: "Active Users" },
  { icon: <CheckCircle className="w-6 h-6" />, number: "10,000+", label: "Successful Matches" },
  { icon: <Clock className="w-6 h-6" />, number: "48 hrs", label: "Average Match Time" },
  { icon: <Shield className="w-6 h-6" />, number: "100%", label: "Secure & Private" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined, secure process connects all stakeholders in the organ donation ecosystem for maximum efficiency and life-saving impact.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-8 relative">
              {/* Connection Line */}
              <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 opacity-30"></div>
              
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <StepBox step={step} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <StepBox step={step} index={index} />
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Proven Results</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our platform has successfully connected thousands of donors and patients, creating a network of hope and healing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are already saving lives through our platform. Every registration brings us closer to a world without organ shortages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                Start Saving Lives
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBox({ step, index }) {
  return (
    <div className={`group relative ${step.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50`}>
      
      {/* Step Number Badge */}
      <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {step.id}
      </div>
      
      {/* Time Badge */}
      <div className="absolute -top-4 right-8 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
        {step.time}
      </div>
      
      <div className="pt-4">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-r ${step.gradient} text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
          {step.icon}
        </div>
        
        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-sm font-medium text-gray-600">{step.subtitle}</p>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">{step.desc}</p>
        
        {/* Features */}
        <div className="space-y-2">
          {step.features.map((feature, i) => (
            <div key={i} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop Arrow Connector */}
      {index < 3 && (
        <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
          <ArrowRight className="w-8 h-8 text-gray-300" />
        </div>
      )}
    </div>
  );
}

