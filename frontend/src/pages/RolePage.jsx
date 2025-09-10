import React from 'react'
import { Heart, Users, Building2, Stethoscope, UserCheck, Hospital } from 'lucide-react'

const donationTypes = [
  {
    icon: Heart,
    title: "Heart Donation",
    description: "Give the gift of life through heart transplantation for patients with end-stage heart disease",
    waiting: "3,500+ patients waiting",
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    urgency: "Critical"
  },
  {
    icon: Stethoscope,
    title: "Kidney Donation",
    description: "Help patients with kidney failure live normal, healthy lives through transplantation",
    waiting: "90,000+ patients waiting",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    urgency: "High"
  },
  {
    icon: Users,
    title: "Liver Donation",
    description: "Support patients with liver disease through life-saving liver transplants",
    waiting: "12,000+ patients waiting",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    urgency: "Critical"
  },
  {
    icon: UserCheck,
    title: "Living Donor",
    description: "Become a living donor and help save lives while you're still alive",
    waiting: "Available now",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    urgency: "Immediate"
  },
  {
    icon: Hospital,
    title: "Tissue Donation",
    description: "Donate tissues like corneas, bone, and skin to restore sight and mobility",
    waiting: "2,000+ patients waiting",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    urgency: "Moderate"
  },
  {
    icon: Building2,
    title: "Hospital Partner",
    description: "Medical institutions can join our network to facilitate organ matching",
    waiting: "500+ partner hospitals",
    color: "from-gray-500 to-slate-500",
    bgColor: "from-gray-50 to-slate-50",
    urgency: "Ongoing"
  }
]

const RolePage = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Save Lives</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Every organ donation can save up to 8 lives and enhance the lives of 75 more people. 
            Choose the type of donation that's right for you and give the gift of life.
          </p>
        </div>

        {/* Donation Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donationTypes.map((donation, index) => {
            const Icon = donation.icon
            const urgencyColors = {
              'Critical': 'text-red-600 bg-red-100',
              'High': 'text-orange-600 bg-orange-100',
              'Immediate': 'text-purple-600 bg-purple-100',
              'Moderate': 'text-blue-600 bg-blue-100',
              'Ongoing': 'text-gray-600 bg-gray-100'
            }
            return (
              <div 
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${donation.bgColor} hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${donation.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyColors[donation.urgency]}`}>
                    {donation.urgency}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{donation.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{donation.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{donation.waiting}</span>
                  <button className={`text-transparent bg-clip-text bg-gradient-to-r ${donation.color} font-semibold hover:underline`}>
                    Learn More →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Become a Life-Saver?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our registry and be matched with patients who need your help. Every donation, 
              whether living or after death, can transform lives and give families hope.
            </p>
            
            {/* Emergency Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-4 border border-red-100">
                <div className="text-2xl font-bold text-red-600">17</div>
                <div className="text-sm text-gray-600">People die daily waiting</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Lives saved per donor</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">107,000+</div>
                <div className="text-sm text-gray-600">Currently waiting</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Register Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RolePage
