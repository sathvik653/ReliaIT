
import React from 'react';
import { useContent } from '../context/ContentContext';

export const Stats: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-16 md:py-20 bg-brand-900 text-white relative bg-fixed bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'}}>
      <div className="absolute inset-0 bg-brand-900/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-8 text-center md:divide-x md:divide-white/10">
          {content.stats.items.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center px-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-2 text-white">{stat.value}</div>
              <div className="text-brand-200 text-[10px] md:text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
