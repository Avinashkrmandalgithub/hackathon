import React from 'react'
import { UserCheck, Stethoscope, Heart, Users, CheckCircle, Clock, Shield, Activity } from 'lucide-react'

const steps = [
  {
    icon: UserCheck,
    number: "01",
    title: "Register as Donor",
    description: "Complete your medical profile and consent forms. Our medical team will review your eligibility and health status.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Stethoscope,
    number: "02",
    title: "Medical Assessment",
    description: "Undergo comprehensive medical tests and evaluations to ensure compatibility and donor safety.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    number: "03",
    title: "Matching Process",
    description: "Our AI system matches you with compatible recipients based on blood type, tissue compatibility, and medical urgency.",
    color: "from-pink-500 to-red-500"
  },
  {
    icon: Users,
    number: "04",
    title: "Save Lives",
    description: "Proceed with the donation process under expert medical care and follow-up support for your recovery.",
    color: "from-green-500 to-emerald-500"
  }
]

const features = [
  {
    icon: Shield,
    title: "Medical Safety",
    description: "All procedures follow strict medical protocols with expert surgical teams"
  },
  {
    icon: Activity,
    title: "24/7 Monitoring",
    description: "Continuous medical monitoring and support throughout the entire process"
  },
  {
    icon: CheckCircle,
    title: "HIPAA Compliant",
    description: "Complete medical privacy protection and secure data handling"
  }
]

const WorkPage = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our secure and medically supervised organ donation process ensures safety for donors 
            and life-saving outcomes for recipients. Every step is guided by medical experts.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-20">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-pink-200 to-green-200 transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8">
                      <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mt-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Relive?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the most secure and comprehensive organ donation platform with medical excellence at its core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Save Lives?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of heroes who have already given the gift of life. 
              Your decision today can transform multiple families tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Register as Donor
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all">
                Medical Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkPage