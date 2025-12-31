
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();

    if (!url) return;

    // Handle external links
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Handle hash links (sections on homepage)
    if (url.includes('#')) {
      const [path, hash] = url.split('#');
      const targetId = hash;

      // If we need to change route first (e.g. from /product/x to /#about)
      if (location.pathname !== '/' && (path === '' || path === '/')) {
        navigate('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else if (location.pathname === '/') {
        // We are already on home, just scroll
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
         // It's a hash on a different page (rare in this app, but possible)
         navigate(url);
      }
    } else {
      // Standard internal route navigation
      navigate(url);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-brand-900 text-gray-400 font-sans border-t border-brand-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About Widget */}
          <div>
            <div className="mb-6">
              <Logo variant="light" height={32} />
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              {content.footer.aboutText}
            </p>
            <div className="flex gap-4">
              <a href={content.general.facebook} className="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300"><Facebook size={16} /></a>
              <a href={content.general.twitter} className="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300"><Twitter size={16} /></a>
              <a href={content.general.linkedin} className="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300"><Linkedin size={16} /></a>
              <a href={content.general.instagram} className="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300"><Instagram size={16} /></a>
            </div>
          </div>

          {/* Links Widget */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {content.footer.quickLinks.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.url} 
                    onClick={(e) => handleNavClick(e, item.url)}
                    className="hover:text-accent-500 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronRight size={14} className="text-gray-600" /> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Widget */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {content.footer.productLinks.map((item, idx) => (
                <li key={idx}>
                   <a 
                     href={item.url} 
                     onClick={(e) => handleNavClick(e, item.url)}
                     className="hover:text-accent-500 transition-colors flex items-center gap-2 cursor-pointer"
                   >
                    <ChevronRight size={14} className="text-gray-600" /> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Widget */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-500 mt-1 flex-shrink-0" />
                <span>{content.general.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-500 flex-shrink-0" />
                <span>{content.general.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-500 flex-shrink-0" />
                <span>{content.general.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-brand-800 bg-brand-950">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} ReliaIT. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
