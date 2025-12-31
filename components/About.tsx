
import React from 'react';
import { Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const About: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          
          <div className="w-full lg:w-1/2 relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200/30 rounded-full blur-3xl hidden md:block"></div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl hidden md:block"></div>
             
             <div className="relative z-10 grid grid-cols-2 gap-4">
               <img 
                 src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                 className="rounded shadow-lg w-full h-48 md:h-64 object-cover transform translate-y-4 md:translate-y-8" 
                 alt="Business Office"
               />
               <img 
                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                 className="rounded shadow-lg w-full h-48 md:h-64 object-cover" 
                 alt="Professional Meeting"
               />
             </div>
             
             <div className="absolute -bottom-4 -left-4 md:bottom-10 md:left-10 bg-white p-4 md:p-6 rounded shadow-xl max-w-[150px] md:max-w-xs z-20">
                <p className="font-heading font-bold text-2xl md:text-4xl text-brand-600 mb-1">{content.about.yearsExperience}</p>
                <p className="text-gray-600 font-medium text-[10px] md:text-base">Years of Trust & Excellence</p>
             </div>
          </div>

          <div className="w-full lg:w-1/2 pt-10 md:pt-0">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 block">About Mahakali Computer</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">{content.about.title}</h2>
            
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              {content.about.description1}
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
              {content.about.description2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              {[
                "Authorized OEM Partner",
                "Trusted Banking Supplier",
                "East Godavari Specialist",
                "GST Compliant Billing",
                "24/7 Enterprise Support",
                "Genuine Hardware Warranty"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium text-xs md:text-sm">{item}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
