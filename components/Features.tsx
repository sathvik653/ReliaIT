
import React from 'react';
import { Truck, ShieldCheck, Building2, PackageCheck } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 -mt-20 md:-mt-32">
          {[
            { icon: ShieldCheck, title: "Genuine Products", desc: "100% Authentic IT hardware directly from leading OEMs." },
            { icon: Building2, title: "Govt. Approved", desc: "Trusted GeM portal and tender-ready supplier." },
            { icon: PackageCheck, title: "Bulk Wholesale", desc: "Tiered pricing models for corporate bulk orders." },
            { icon: Truck, title: "Express Delivery", desc: "Priority shipping for critical infrastructure needs." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded shadow-premium border-b-4 border-transparent hover:border-accent-500 transition-all duration-300 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-900 mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                <feature.icon size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
