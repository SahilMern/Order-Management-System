import React from 'react'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and tagline */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium">ShopEasy</h3>
            <p className="text-sm text-gray-500 mt-1">Quality products, seamless shopping</p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#" className="text-sm hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-sm hover:text-gray-900 transition-colors">Shop</a>
            <a href="#" className="text-sm hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-sm hover:text-gray-900 transition-colors">Contact</a>
            <a href="#" className="text-sm hover:text-gray-900 transition-colors">Privacy Policy</a>
          </nav>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <FiFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <FiTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <FiInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <FiLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopEasy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer