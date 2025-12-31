
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
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
              Mahakali Computer is your trusted B2B partner for comprehensive IT hardware and office supply solutions. Serving major bank branches and corporate offices across East Godavari.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Widget */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Company', 'Product Catalog', 'Industries Served', 'Contact Support', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-accent-500 transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className="text-gray-600" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Widget */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Our Products
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {['Computer Hardware', 'Office Stationery', 'Networking Gear', 'Printers & Toners', 'CCTV & Security', 'POS Systems'].map((item) => (
                <li key={item}>
                   <a href="#" className="hover:text-accent-500 transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className="text-gray-600" /> {item}
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
                <span>Main Road, Rajahmundry,<br/>East Godavari District, Andhra Pradesh - 533101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-500 flex-shrink-0" />
                <span>info@mahakalicomputer.net</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-brand-800 bg-brand-950">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Mahakali Computer. All rights reserved.
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
