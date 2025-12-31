
import React from 'react';

export const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-brand-900 text-white relative bg-fixed bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'}}>
      <div className="absolute inset-0 bg-brand-900/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {[
            { label: 'Banking & Corp Clients', value: '200+' },
            { label: 'Products In Stock', value: '1200+' },
            { label: 'Years Experience', value: '6+' },
            { label: 'Orders Delivered', value: '8k+' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-4">
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2 text-white">{stat.value}</div>
              <div className="text-brand-200 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
