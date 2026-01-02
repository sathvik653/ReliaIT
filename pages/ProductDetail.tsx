
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Contact } from '../components/Contact';
import { OptimizedImage } from '../components/OptimizedImage';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  const product = content.products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <Link to="/" className="text-accent-500 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="bg-brand-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 text-sm font-medium transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Solutions
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                {product.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold">{product.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
            <div className="prose max-w-none text-gray-600 leading-relaxed mb-10">
              <p className="text-lg font-medium text-gray-800 mb-6 border-l-4 border-accent-500 pl-4">
                {product.description}
              </p>
              <p className="mb-6">{product.longDescription}</p>
            </div>

            {product.sections ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {product.sections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="h-56 relative overflow-hidden group">
                         <OptimizedImage 
                            src={section.image} 
                            alt={section.title} 
                            containerClass="w-full h-full"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 to-transparent opacity-80 z-10"></div>
                         <h3 className="absolute bottom-4 left-4 text-white font-heading font-bold text-lg drop-shadow-md pr-4 leading-tight z-20">
                            {section.title}
                         </h3>
                      </div>
                      <div className="p-6 flex-1 bg-white">
                        <ul className="space-y-3">
                           {section.items.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                 <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                 <span className="leading-relaxed">{item}</span>
                              </li>
                           ))}
                        </ul>
                      </div>
                    </div>
                  ))}
               </div>
            ) : (
               <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 mb-10">
                 <h3 className="text-xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <ShoppingBag size={20} className="text-accent-500" />
                   Key Deliverables
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {product.features.map((feature, idx) => (
                     <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded shadow-sm border border-gray-100">
                       <CheckCircle2 size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                       <span className="text-gray-700 font-medium text-sm">{feature}</span>
                     </div>
                   ))}
                 </div>
               </div>
            )}
        </div>
      </div>
      
      <Contact />
    </div>
  );
};
