import React from 'react'
import { Star, Quote, MapPin } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Healthcare Volunteer",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c193?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5,
    testimonial: "VolunteerHub connected me with the perfect opportunity to use my nursing skills in underserved communities. The platform made it so easy to find meaningful work that truly makes a difference.",
    hours: "120+ hours volunteered",
    category: "Healthcare"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Education Volunteer",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5,
    testimonial: "Teaching kids coding through this platform has been incredibly rewarding. The organization was professional, the training was thorough, and I've seen real impact in the students' lives.",
    hours: "200+ hours volunteered",
    category: "Education"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Environmental Volunteer",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 5,
    testimonial: "I've participated in three coastal cleanup projects through VolunteerHub. The impact tracking feature shows me exactly how much plastic we've removed from our beaches - it's incredibly motivating!",
    hours: "85+ hours volunteered",
    category: "Environment"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Disaster Relief Volunteer",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 5,
    testimonial: "When Hurricane Ian hit, VolunteerHub helped me quickly find local relief efforts. The platform's emergency response network is incredible - I was helping families within hours of signing up.",
    hours: "300+ hours volunteered",
    category: "Disaster Relief"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Community Development",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    rating: 5,
    testimonial: "Building homes with Habitat for Humanity through this platform was life-changing. The coordination was seamless, and seeing families move into homes we built together - there's nothing like it.",
    hours: "180+ hours volunteered",
    category: "Infrastructure"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Senior Volunteer",
    location: "Portland, OR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5,
    testimonial: "After retirement, I wanted to give back to my community. VolunteerHub matched me with a local food bank where I've been volunteering for over a year. It's given my retirement such purpose!",
    hours: "400+ hours volunteered",
    category: "Community"
  }
]

const stats = [
  { number: "4.9/5", label: "Average Rating" },
  { number: "50K+", label: "Happy Volunteers" },
  { number: "95%", label: "Would Recommend" },
  { number: "1M+", label: "Lives Impacted" }
]

const TestimonialPage = () => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">Volunteers</span> Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from thousands of volunteers who have 
            found meaningful ways to make a difference through our platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-pink-500" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Testimonial */}
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.testimonial}"</p>
              
              {/* Volunteer Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
              
              {/* Hours Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gradient-to-r from-pink-500 to-blue-600 text-transparent bg-clip-text font-semibold">
                    {testimonial.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {testimonial.hours}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of volunteers who have found meaningful ways to contribute to their communities. 
              Your perfect volunteer opportunity is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Start Volunteering Today
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialPage
