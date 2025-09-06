import React from "react";
import feedbacks from "../../data/testimonialsData.json";
import Marquee from "react-fast-marquee";
import { Star, Quote, CheckCircle, Heart } from "lucide-react";

/**
 * PatientFeedback Component
 * -------------------------
 * Modern testimonials section showcasing patient stories and experiences.
 * Features gradient backgrounds, enhanced typography, and professional layout.
 */
export default function PatientFeedback() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Patient Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Life-Changing <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from patients, families, and donors whose lives have been transformed through our platform.
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative">
          <Marquee gradient={false} speed={25} pauseOnHover={true} className="py-4">
            {feedbacks.map((f) => (
              <TestimonialCard key={f.id} feedback={f} />
            ))}
          </Marquee>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-600">Lives Saved</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Patient Rating</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * TestimonialCard Component
 * -------------------------
 * Individual testimonial card with modern design, gradient backgrounds,
 * and enhanced visual elements.
 */
function TestimonialCard({ feedback }) {
  const getGradientColors = (rating) => {
    if (rating === 5) return "from-green-500 to-emerald-500";
    if (rating >= 4) return "from-blue-500 to-cyan-500";
    return "from-purple-500 to-pink-500";
  };

  const getBgColor = (rating) => {
    if (rating === 5) return "from-green-50 to-emerald-50";
    if (rating >= 4) return "from-blue-50 to-cyan-50";
    return "from-purple-50 to-pink-50";
  };

  return (
    <div className="mx-4 group">
      <div className={`relative bg-gradient-to-br ${getBgColor(feedback.rating)} rounded-2xl p-6 w-80 min-h-[320px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20`}>
        
        {/* Quote Icon */}
        <div className={`absolute -top-3 left-6 w-10 h-10 bg-gradient-to-r ${getGradientColors(feedback.rating)} rounded-xl flex items-center justify-center shadow-md`}>
          <Quote className="w-5 h-5 text-white" />
        </div>
        
        {/* Rating Badge */}
        <div className="absolute -top-3 right-6 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-gray-800">{feedback.rating}.0</span>
          </div>
        </div>
        
        <div className="pt-4 flex flex-col h-full">
          {/* Testimonial Text */}
          <div className="mb-4 flex-1">
            <p className="text-gray-700 leading-relaxed text-sm" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
              "{feedback.text}"
            </p>
          </div>
          
          {/* Star Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 mr-1 ${
                  i < feedback.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          
          {/* Patient Info */}
          <div className="flex items-center space-x-3 mt-auto">
            <div className="relative flex-shrink-0">
              <img
                src={feedback.img}
                alt={feedback.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r ${getGradientColors(feedback.rating)} rounded-full flex items-center justify-center`}>
                <CheckCircle className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-gray-900 font-semibold text-base truncate">{feedback.name}</h4>
              <p className="text-gray-600 text-xs truncate">{feedback.role}</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
