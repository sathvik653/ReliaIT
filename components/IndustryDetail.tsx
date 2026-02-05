
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Building2, School, Landmark, Store, CheckCircle2 } from 'lucide-react';
import { Contact } from '../components/Contact';
import { OptimizedImage } from '../components/OptimizedImage';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  School,
  Landmark,
  Store
};

export const IndustryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  const industry = content.industries.find(i => i.id === id);

  if (!industry) {
     return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Industry Not Found</h2>
        <Link to="/" className="text-brand-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  const Icon = iconMap[industry.iconName] || Building2;

  return (
    <div className="animate-in fade-in duration-500">
       {/* Hero for Industry */}
       <div className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 z-0">
             <OptimizedImage 
               src={industry.image} 
               alt={industry.title} 
               containerClass="w-full h-full"
               className="w-full h-full object-cover" 
             />
             <div className="absolute inset-0 bg-brand-900/80 mix-blend-multiply z-10"></div>
          </div>
          <div className="container mx-auto px-4 relative z-20 text-white">
             <Link to="/" className="inline-flex items-center text-brand-200 hover:text-white mb-6 text-sm font-medium transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
             </Link>
             <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-lg">
                   <Icon size={32} className="text-accent-400" />
                </div>
                <span className="text-accent-400 font-bold uppercase tracking-widest text-sm">Industry Focus</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-heading font-bold">{industry.title} Solutions</h1>
          </div>
       </div>

       <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
             <div className="bg-white -mt-32 relative z-20 p-8 md:p-12 rounded-xl shadow-premium border-t-4 border-accent-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                   {industry.longDescription}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Specialized Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {industry.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                         <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-600">
                            <CheckCircle2 size={20} />
                         </div>
                         <span className="font-medium text-gray-800">{feature}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>

       <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to upgrade your {industry.title} infrastructure?</h2>
             <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Contact our dedicated {industry.title} procurement specialists for a consultation and customized quote.</p>
             <a href="#contact" className="inline-block px-8 py-3 bg-brand-600 text-white font-bold rounded shadow-lg hover:bg-brand-700 transition-colors">
                Contact Specialist
             </a>
          </div>
       </div>

       <Contact />
    </div>
  );
};
