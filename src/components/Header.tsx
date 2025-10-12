import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-mist shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Nothing Logo" className="h-12 w-auto" />
          <span className="ml-2 text-2xl font-bold text-aqua">Nothing</span>
        </a>
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Products', 'Microplastics', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-slate hover:text-aqua transition-colors font-medium">
                {item}
              </a>)}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden bg-mist w-full py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {['Home', 'About', 'Products', 'Microplastics', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-slate hover:text-aqua transition-colors py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </a>)}
          </div>
        </div>}
    </header>;
}