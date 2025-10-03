import React, { useState, useEffect } from 'react';
import type { SlideContent } from '../types';
import { COMPANY_NAME } from '../constants';
import { CameraIcon, Bars3Icon, XMarkIcon } from './IconComponents';

interface NavbarProps {
  slides: SlideContent[];
  scrollToSection: (id: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ slides, scrollToSection, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = isScrolled
    ? 'bg-black/80 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-2 text-white">
              <CameraIcon className="w-8 h-8 text-white" />
              <span className="text-xl font-bold tracking-wider">{COMPANY_NAME}</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {slides.map((slide) => (
                <a
                  key={slide.id}
                  href={`#${slide.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(slide.id); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activeSection === slide.id
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {slide.name}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {slides.map((slide) => (
              <a
                key={slide.id}
                href={`#${slide.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(slide.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === slide.id ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {slide.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;