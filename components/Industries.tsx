
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

export const Industries: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="industries" className="py-24 relative bg-brand-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-400 font-bold uppercase tracking-widest text-sm mb-2 block">Sectors We Empower</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Strategic Solutions for Specialized Sectors</h2>
          <p className="text-gray-300 text-lg">We deliver tailored IT and supply solutions that align with the specific operational demands of your industry.</p>
        </div>

        {/* Updated grid to 2x2 format on medium screens and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {content.industries.map((item, idx) => (
            <Link 
              to={`/industry/${item.id}`}
              key={idx} 
              className="group relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-white/5 hover:border-accent-500/50 transition-all duration-500 block"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <OptimizedImage 
                  src={item.image} 
                  alt={item.title} 
                  containerClass="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-transparent opacity-90 transition-opacity duration-300 z-10"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="h-1.5 w-12 bg-accent-500 mb-6 rounded-full group-hover:w-20 transition-all duration-300"></div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 group-hover:text-white transition-colors leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-accent-400 group-hover:text-accent-300 transition-colors uppercase tracking-wider">
                    Explore More <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
