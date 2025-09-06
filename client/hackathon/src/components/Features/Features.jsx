import React from 'react';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  MapPin, 
  Stethoscope,
  Award,
  Phone,
  CheckCircle 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Smart Matching",
      description: "AI-powered algorithm matches donors and patients based on blood type, location, and medical compatibility.",
      color: "bg-red-50 text-red-600 border-red-100"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Secure",
      description: "HIPAA-compliant platform with end-to-end encryption to protect all medical information and personal data.",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Instant notifications for urgent cases and match updates to ensure timely medical interventions.",
      color: "bg-green-50 text-green-600 border-green-100"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Join thousands of donors and patients in a supportive community dedicated to saving lives.",
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location-Based",
      description: "Find compatible matches in your area to minimize travel time and maximize success rates.",
      color: "bg-orange-50 text-orange-600 border-orange-100"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Medical Integration",
      description: "Seamlessly connect with healthcare providers and medical institutions for verified care.",
      color: "bg-teal-50 text-teal-600 border-teal-100"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Lives Saved", icon: <Heart className="w-5 h-5" /> },
    { number: "50,000+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { number: "500+", label: "Hospitals", icon: <Award className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <Phone className="w-5 h-5" /> }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Why Choose RELIVE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">thousands</span> worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with compassionate care to create 
            the most effective organ donation network in the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Making a Real Impact
            </h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Every number represents a life touched, a family reunited, and hope restored.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Save Lives?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community today and be part of something bigger than yourself. 
              Together, we can give the gift of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Become a Donor
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
                Find a Match
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
