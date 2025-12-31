
import React from 'react';
import { Check } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative">
             {/* Decorative element */}
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200/30 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 grid grid-cols-2 gap-4">
               <img 
                 src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                 className="rounded shadow-lg w-full h-64 object-cover transform translate-y-8" 
                 alt="Building"
               />
               <img 
                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                 className="rounded shadow-lg w-full h-64 object-cover" 
                 alt="Meeting"
               />
             </div>
             
             <div className="absolute bottom-10 left-10 bg-white p-6 rounded shadow-xl max-w-xs z-20 hidden md:block">
                <p className="font-heading font-bold text-4xl text-brand-600 mb-1">6+</p>
                <p className="text-gray-600 font-medium">Years of Excellence in Supply Chain</p>
             </div>
          </div>

          <div className="w-full lg:w-1/2">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">About Our Company</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">Your Strategic B2B Partner for <br/>Business Procurement</h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2018, ReliaIT is a premier B2B supplier of IT infrastructure and office essentials. We specialize in catering to large-scale organizational needs with precision and reliability.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              We are proud to serve as the primary supply partner for all Union Bank of India branches across the East Godavari district in Andhra Pradesh. Our commitment to quality and logistical efficiency has made us a cornerstone for banking and corporate sectors in the region.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Union Bank Trusted Partner",
                "East Godavari Distribution Network",
                "B2B Enterprise Specialist",
                "GST Compliant Invoicing",
                "Andhra Pradesh Wide Logistics",
                "Local On-site Support"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
