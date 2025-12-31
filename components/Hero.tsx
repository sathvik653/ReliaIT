
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="IT Infrastructure"
          className="w-full h-full object-cover"
        />
        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/40"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative h-full flex items-center">
        <div className="w-full lg:w-2/3 pt-16 lg:pt-0 text-white">
          <div className="inline-block px-4 py-1.5 bg-accent-500 text-white text-xs font-bold tracking-wider uppercase mb-6 rounded shadow-lg transform -skew-x-12">
            <span className="block transform skew-x-12">Authorized IT Partner Since 2018</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 drop-shadow-md">
            Reliable B2B IT & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">Banking Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl font-light border-l-4 border-accent-500 pl-6">
            Providing high-performance infrastructure and essential supplies for all Union Bank branches in East Godavari.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('products')}
              className="px-8 py-4 bg-accent-500 text-white font-bold rounded shadow-lg hover:bg-accent-600 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore Solutions
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white/10 text-white backdrop-blur-md font-semibold rounded shadow-md border border-white/30 hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-2"
            >
              Request Quote
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-medium text-gray-200">
             <div className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/10 backdrop-blur-sm">
                <CheckCircle2 size={20} className="text-accent-400" />
                <span>100% Genuine Hardware</span>
             </div>
             <div className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/10 backdrop-blur-sm">
                <CheckCircle2 size={20} className="text-accent-400" />
                <span>Union Bank Branch Partner</span>
             </div>
             <div className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/10 backdrop-blur-sm">
                <CheckCircle2 size={20} className="text-accent-400" />
                <span>Fast Local Logistics</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
