
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

export const Products: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="products" className="py-24 relative">
      {/* Background with Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Warehouse background"
          containerClass="w-full h-full"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-50/95 backdrop-blur-sm z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div className="max-w-2xl">
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">Our Product Range</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Quality Supplies for Every Business Need</h2>
           </div>
           <a href="/#contact" className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors bg-white px-6 py-3 rounded shadow-sm">
              Download Full Catalog <ArrowRight size={18} />
           </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.products.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-premium transition-all duration-500 border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/60 transition-colors z-10 duration-500"></div>
                <OptimizedImage 
                  src={product.image} 
                  alt={product.title}
                  containerClass="w-full h-full"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/95 backdrop-blur-sm text-brand-800 text-xs font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                {/* Hover Action */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                   <Link to={`/product/${product.id}`} className="px-6 py-3 bg-white text-brand-900 font-bold rounded shadow-xl hover:bg-yellow-400 transition-colors">
                      View Details
                   </Link>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-500 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="w-12 h-1 bg-gray-100 group-hover:bg-brand-500 transition-colors duration-500"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
            <a href="/#contact" className="inline-flex items-center gap-2 text-brand-600 font-bold bg-white px-6 py-3 rounded shadow-sm">
              Download Full Catalog <ArrowRight size={18} />
           </a>
        </div>
      </div>
    </section>
  );
};
