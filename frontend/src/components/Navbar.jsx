import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Heart, User, Search, Bell } from 'lucide-react';

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/how-it-works", text: "How It Works" },
  { to: "/about", text: "About Us" },
  { to: "/hospitals", text: "Hospitals" },
  { to: "/contact", text: "Contact" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Relive</h1>
              <p className="text-xs text-gray-500 -mt-1">Save Lives, Give Hope</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.text}
                to={link.to} 
                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group"
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Emergency Indicator */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">24/7 Emergency</span>
            </div>
            
            {/* CTA Buttons */}
            <button className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              <Link to='/signup'>SignUp</Link>
            </button>
            <Link to="/role-selection" className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-red-600" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Search Bar Overlay */}
      {/* {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40 lg:block hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals, donors, or information..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        </div>
      )} */}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden">
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40">
            <div className="px-4 py-6 space-y-4">
              {/* Search on Mobile */}
              {/* <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hospitals or donors..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div> */}
              
              {/* Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.text}
                    to={link.to}
                    className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  <button className="block w-full text-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Sign In
                  </button>
                  <Link to="/role-selection" className="block w-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-center py-3 rounded-lg font-medium">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar