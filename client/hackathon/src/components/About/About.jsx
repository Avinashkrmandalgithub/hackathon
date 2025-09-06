import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Target,
  Award,
  Globe,
  Stethoscope,
  Activity,
  UserCheck,
  Building2,
  Lightbulb,
  Eye,
  Star
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50,000+", label: "Lives Connected", color: "from-blue-500 to-cyan-500" },
    { icon: <Heart className="w-8 h-8" />, number: "10,000+", label: "Successful Matches", color: "from-red-500 to-pink-500" },
    { icon: <Clock className="w-8 h-8" />, number: "48 hrs", label: "Average Match Time", color: "from-green-500 to-emerald-500" },
    { icon: <Shield className="w-8 h-8" />, number: "100%", label: "Secure Platform", color: "from-purple-500 to-indigo-500" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassion",
      description: "Every life matters. We approach organ donation with empathy, understanding the profound impact on both donors and recipients.",
      gradient: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description: "We maintain the highest standards of privacy and security, ensuring all medical information is protected and confidential.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Matching",
      description: "Our advanced algorithms ensure accurate compatibility matching, maximizing the success rate of transplant procedures.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "We're building a worldwide network of hope, connecting donors and patients across geographical boundaries.",
      gradient: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      description: "Leading transplant surgeon with 20+ years of experience in organ transplantation.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "CEO & Founder",
      description: "Technology entrepreneur passionate about leveraging innovation to save lives.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Research",
      description: "Biomedical researcher specializing in organ compatibility and matching algorithms.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "David Park",
      role: "Head of Technology",
      description: "Software architect ensuring our platform is secure, scalable, and user-friendly.",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            About OrganBridge
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Saving Lives Through <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Technology</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
            We're revolutionizing organ donation by creating a transparent, efficient, and compassionate platform that connects donors with patients in need, giving everyone a second chance at life.
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <MissionCard
              icon={<Target className="w-8 h-8" />}
              title="Our Mission"
              content="To save lives by creating the world's most trusted and efficient organ donation platform, connecting hope with healing through cutting-edge technology and compassionate care."
              gradient="from-blue-500 to-cyan-500"
              bgColor="from-blue-50 to-cyan-50"
            />
            <MissionCard
              icon={<Eye className="w-8 h-8" />}
              title="Our Vision"
              content="A world where no life is lost due to organ shortage. We envision a future where organ donation is seamless, transparent, and accessible to everyone who needs it."
              gradient="from-green-500 to-emerald-500"
              bgColor="from-green-50 to-emerald-50"
            />
          </div>

          {/* Story Section */}
          <div className="mb-24">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 text-sm font-medium mb-6">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Our Story
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Born from a Need to <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Make a Difference</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    OrganBridge was founded in 2020 when our team witnessed firsthand the challenges faced by patients waiting for organ transplants. The traditional system was fragmented, slow, and often left families in despair.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We realized that technology could bridge the gap between willing donors and desperate patients. By combining advanced matching algorithms, secure data handling, and a user-friendly interface, we created a platform that saves both time and lives.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Today, we're proud to have facilitated thousands of successful matches, giving families hope and patients a second chance at life.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-6">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Every Second Counts</h3>
                    <p className="text-gray-600">
                      In organ transplantation, time is the difference between life and death. Our platform reduces critical matching time from weeks to hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4 mr-2" />
                Our Values
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Drives</span> Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our core values guide every decision we make and every feature we build, ensuring we never lose sight of our mission to save lives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 text-sm font-medium mb-6">
                <Users className="w-4 h-4 mr-2" />
                Our Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet the <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Experts</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse team of medical professionals, technologists, and researchers work together to make organ donation more accessible and efficient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of donors and patients who trust OrganBridge to connect hope with healing. Every registration brings us closer to saving more lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Become a Donor
                </button>
                <button 
                  onClick={() => navigate('/work')}
                  className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component definitions
function StatCard({ stat }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 text-white`}>
        {stat.icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>
  );
}

function MissionCard({ icon, title, content, gradient, bgColor }) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl mb-6 text-white`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">{content}</p>
    </div>
  );
}

function ValueCard({ value }) {
  return (
    <div className={`group bg-gradient-to-br ${value.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50`}>
      <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${value.gradient} rounded-xl mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
        {value.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
      <p className="text-gray-600 leading-relaxed">{value.description}</p>
    </div>
  );
}

function TeamMemberCard({ member }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 text-center">
      <div className="relative inline-block mb-4">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-20 h-20 rounded-full object-cover mx-auto shadow-md"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
      <p className="text-sm font-medium text-blue-600 mb-3">{member.role}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
    </div>
  );
}

export default About;
