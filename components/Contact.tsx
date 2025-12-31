
import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Contact: React.FC = () => {
  const { content } = useContent();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // --- CONFIGURATION ---
    const ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; 
    // ---------------------

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New Quote Request from ${formData.name}`,
          from_name: "Mahakali Website",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('sent');
        setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        console.error("Form submission error:", result);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-24 flex items-center min-h-screen md:min-h-[800px]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Office background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto">
            <div className="lg:w-5/12 bg-brand-800 text-white p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-accent-500/10"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-accent-500/10"></div>

                <div className="relative z-10">
                  <span className="text-accent-400 font-bold uppercase tracking-widest text-xs mb-2 block">Connect With Us</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">Let's Discuss Your Needs</h3>
                  <p className="text-gray-300 mb-10 leading-relaxed border-l-2 border-accent-500 pl-4 text-sm md:text-base">
                      Serving all major bank branches in East Godavari. Our dedicated account managers are ready to assist with your B2B requirements.
                  </p>

                  <div className="space-y-6 md:space-y-8">
                      <div className="flex items-start gap-4 group">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                              <Phone size={20} />
                          </div>
                          <div>
                              <h4 className="font-semibold text-base md:text-lg">Sales Inquiries</h4>
                              <p className="text-gray-400 text-xs mb-1">Mon-Sat 9am to 7pm IST</p>
                              <a href={`tel:${content.general.phone.replace(/\s/g, '')}`} className="text-lg md:text-xl font-bold hover:text-accent-400 transition-colors">{content.general.phone}</a>
                          </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                              <Mail size={20} />
                          </div>
                          <div>
                              <h4 className="font-semibold text-base md:text-lg">Support Email</h4>
                              <p className="text-gray-400 text-xs mb-1">Quotes & Tender bids</p>
                              <a href={`mailto:${content.general.email}`} className="font-bold hover:text-accent-400 transition-colors break-all text-sm md:text-base">{content.general.email}</a>
                          </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                              <MapPin size={20} />
                          </div>
                          <div>
                              <h4 className="font-semibold text-base md:text-lg">Headquarters</h4>
                              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                  {content.general.address}
                              </p>
                          </div>
                      </div>
                  </div>
                </div>
            </div>

            <div className="lg:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-900 mb-2">Secure Your Quote</h3>
                <p className="text-gray-500 mb-8 text-sm md:text-base">Submit your requirements for competitive enterprise pricing.</p>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-gray-700">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition-all bg-gray-50 text-sm"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs md:text-sm font-semibold text-gray-700">Organization</label>
                            <input 
                                type="text" 
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition-all bg-gray-50 text-sm"
                                placeholder="Company Ltd."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                         <div className="space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-gray-700">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition-all bg-gray-50 text-sm"
                                placeholder="corporate@email.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-gray-700">Contact</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition-all bg-gray-50 text-sm"
                                placeholder="+91"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-gray-700">Requirements</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition-all bg-gray-50 text-sm resize-none"
                            placeholder="Please list the items or services you need a quote for..."
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={formStatus === 'sending' || formStatus === 'sent'}
                        className={`w-full py-4 font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-sm md:text-base
                          ${formStatus === 'sent' 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : formStatus === 'error'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-accent-500 text-white hover:bg-accent-600'
                          }`}
                    >
                        {formStatus === 'idle' && (
                            <>Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                        {formStatus === 'sending' && (
                            <><Loader2 size={20} className="animate-spin" /> Processing...</>
                        )}
                        {formStatus === 'sent' && (
                            <><CheckCircle2 size={20} /> Request Submitted!</>
                        )}
                        {formStatus === 'error' && (
                            <><AlertCircle size={20} /> Failed. Try Again.</>
                        )}
                    </button>
                    
                    {formStatus === 'sent' && (
                      <p className="text-green-600 text-xs text-center font-medium animate-in fade-in">
                        We have received your details. Our team will contact you shortly.
                      </p>
                    )}
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};
