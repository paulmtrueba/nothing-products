import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Heart } from 'lucide-react';
export function Footer() {
  return <footer className="bg-slate text-mist py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/oie_FdDMHR4IuNob_%282%29.png" alt="Nothing Logo" className="h-10 w-auto mr-2" />
              <span className="text-2xl font-bold text-aqua">Nothing</span>
            </div>
            <p className="text-mist text-opacity-80 mb-2 max-w-md">
              Creating a future with pure silicone products that are better for
              you and our planet. No microplastics, no compromise, nothing
              harmful.
            </p>
            <p className="text-aqua font-medium mb-4">
              Free From Microplastics
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-mist text-opacity-60 hover:text-aqua transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-mist text-opacity-60 hover:text-aqua transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-mist text-opacity-60 hover:text-aqua transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-mist text-opacity-60 hover:text-aqua transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-aqua">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#microplastics" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-aqua">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#contact" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-mist text-opacity-80 hover:text-mist transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mist text-opacity-60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nothing Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-mist text-opacity-60 hover:text-mist text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-mist text-opacity-60 hover:text-mist text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-mist text-opacity-60">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for a
            cleaner planet
          </p>
        </div>
      </div>
    </footer>;
}