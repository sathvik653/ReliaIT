
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Hero: React.FC = () => {
  const { content } = useContent();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] md:h-[85vh] md:min-h-[600px] flex items-center overflow-hidden py-20 md:py-0">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-brand-950 via-brand-950/90 md:via-brand-900/80 to-brand-900/40"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative h-full flex items-center">
        <div className="w-full lg:w-2/3 pt-12 md:pt-16 lg:pt-0 text-white text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-accent-500 text-white text-[10px] md:text-xs font-bold tracking-wider uppercase mb-6 rounded shadow-lg transform -skew-x-12">
            <span className="block transform skew-x-12">Authorized IT Partner Since 2018</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-[1.2] md:leading-[1.1] mb-6 drop-shadow-md">
            {content.hero.titleLine1} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">{content.hero.titleLine2}</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-100 mb-8 leading-relaxed max-w-xl font-light border-l-0 md:border-l-4 border-accent-500 pl-0 md:pl-6 mx-auto md:mx-0 drop-shadow-sm">
            {content.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => scrollToSection('industries')}
              className="px-8 py-4 bg-accent-500 text-white font-bold rounded shadow-lg hover:bg-accent-600 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {content.hero.buttonText}
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white/10 text-white backdrop-blur-md font-semibold rounded shadow-md border border-white/30 hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Request Quote
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm font-medium text-gray-200">
             <div className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
                <CheckCircle2 size={20} className="text-accent-400 flex-shrink-0" />
                <span>100% Genuine Hardware</span>
             </div>
             <div className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
                <CheckCircle2 size={20} className="text-accent-400 flex-shrink-0" />
                <span>Banking Sector Partner</span>
             </div>
             <div className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/10 backdrop-blur-sm text-left sm:col-span-2 lg:col-span-1 hover:bg-white/10 transition-colors">
                <CheckCircle2 size={20} className="text-accent-400 flex-shrink-0" />
                <span>Fast Local Logistics</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
