
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronDown, Facebook, Twitter, Linkedin, Instagram, Lock } from 'lucide-react';
import { NavItem } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Services', 
    children: [
      { label: 'IT Stationery', href: '/product/it-peripherals' },
      { label: 'Computer Stationery', href: '/product/printing-supplies' },
      { label: 'Office Stationery', href: '/product/office-stationery' },
    ]
  },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export const Header: React.FC = () => {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSubMenu = (label: string) => {
    if (mobileSubMenuOpen === label) {
      setMobileSubMenuOpen(null);
    } else {
      setMobileSubMenuOpen(label);
    }
  };

  const handleNavClick = (e: React.MouseEvent, href?: string) => {
    if (!href) return;

    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      
      setIsOpen(false);

      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
           const element = document.getElementById(targetId);
           if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
           }
        }, 100);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-900 text-white py-2 text-xs md:text-sm hidden md:block border-b border-brand-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${content.general.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <Phone size={14} /> 
              <span>{content.general.phone}</span>
            </a>
            <a href={`mailto:${content.general.email}`} className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <Mail size={14} /> 
              <span>{content.general.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
             <a href={content.general.facebook} className="hover:text-accent-400 transition-transform hover:-translate-y-0.5"><Facebook size={15}/></a>
             <a href={content.general.twitter} className="hover:text-accent-400 transition-transform hover:-translate-y-0.5"><Twitter size={15}/></a>
             <a href={content.general.linkedin} className="hover:text-accent-400 transition-transform hover:-translate-y-0.5"><Linkedin size={15}/></a>
             <a href={content.general.instagram} className="hover:text-accent-400 transition-transform hover:-translate-y-0.5"><Instagram size={15}/></a>
             <Link to="/login" className="ml-2 hover:text-accent-400" title="Admin Login"><Lock size={12} /></Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-100 ${scrolled ? 'bg-white shadow-lg py-1 mt-0' : 'bg-white py-2 shadow-sm md:mt-10'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Identity Logo */}
            <Link to="/" className="flex items-center py-2 group">
              <Logo height={32} className="transition-transform duration-300 group-hover:scale-105" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex space-x-8">
                {navItems.map((item) => (
                  <div key={item.label} className="relative group">
                    {item.children ? (
                      <button className="flex items-center gap-1 text-sm font-bold text-brand-900 hover:text-accent-500 transition-colors uppercase tracking-wide font-heading py-4">
                        {item.label}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                    ) : (
                      <Link 
                        to={item.href || '#'}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`text-sm font-bold ${location.pathname === item.href ? 'text-accent-500' : 'text-brand-900'} hover:text-accent-500 transition-colors uppercase tracking-wide font-heading relative py-4 block flex items-center gap-2`}
                      >
                         {item.label}
                         <span className={`absolute bottom-2 left-0 h-0.5 bg-accent-500 transition-all duration-300 ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {item.children && (
                      <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-lg border-t-2 border-accent-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="py-2">
                          {item.children.map((child) => (
                            <Link
                                key={child.label}
                                to={child.href || '#'}
                                onClick={(e) => handleNavClick(e, child.href)}
                                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent-500 hover:pl-8 transition-all border-b border-gray-50 last:border-0"
                            >
                                {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brand-900 hover:text-accent-500 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 animate-in slide-in-from-top-5 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col p-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button 
                        onClick={() => toggleMobileSubMenu(item.label)}
                        className="flex items-center justify-between w-full text-left text-brand-900 font-bold text-lg py-3 border-b border-gray-50"
                      >
                        {item.label}
                        <ChevronDown size={20} className={`transition-transform ${mobileSubMenuOpen === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {mobileSubMenuOpen === item.label && (
                        <div className="bg-gray-50 px-4 py-2 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href || '#'}
                              onClick={(e) => handleNavClick(e, child.href)}
                              className="block py-2 text-gray-600 hover:text-accent-500 text-base pl-2 border-l-2 border-gray-200 hover:border-accent-500"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href || '#'}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block text-brand-900 font-bold text-lg py-3 border-b border-gray-50 hover:text-accent-500 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                         {item.label}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link to="/login" className="flex items-center gap-2 text-brand-500 text-sm font-semibold">
                  <Lock size={14} /> Admin Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
