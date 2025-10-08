import React from 'react';
import { ChevronDown } from 'lucide-react';
export function Hero() {
  return <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-b from-mist to-aqua-light pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-opacity-10" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-slate mb-4">
              Nothing but <span className="text-aqua">pure silicone</span>
            </h1>
            <div className="bg-aqua inline-block px-4 py-1 rounded-full mb-6">
              <p className="text-mist font-medium tracking-wider">
                FREE FROM MICROPLASTICS
              </p>
            </div>
            <p className="text-xl text-slate mb-8 max-w-lg">
              Eco-friendly silicone products with absolutely no microplastics.
              Better for you, better for our planet.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="px-6 py-3 bg-aqua text-mist rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                Explore Products
              </a>
              <a href="#about" className="px-6 py-3 bg-transparent border-2 border-aqua text-aqua rounded-full font-medium hover:bg-aqua-light transition-colors">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2"></div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <a href="#about" aria-label="Scroll down">
            <ChevronDown size={32} className="text-aqua" />
          </a>
        </div>
      </div>
    </section>;
}