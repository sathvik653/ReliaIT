
import React, { useState, useEffect } from 'react';
import { useContent, SiteContent, LinkItem } from '../context/ContentContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Image, Layers, Phone, RotateCcw, Briefcase, List, ChevronDown, PanelBottom, Plus, Trash2, Link as LinkIcon, Type as TypeIcon, Globe, ShoppingBag, LayoutGrid, Settings, Home, Loader2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<string>('general'); 
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Sync internal state with content updates
  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await updateContent(formData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNestedChange = (section: keyof SiteContent, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // --- Footer Link Editor Logic ---
  const sectionOptions = [
    { label: 'SECTION: Home Page (Top)', value: '/' },
    { label: 'SECTION: About Section', value: '/#about' },
    { label: 'SECTION: Contact Section', value: '/#contact' },
    { label: 'SECTION: Industries Section', value: '/#industries' },
  ];

  const productPageOptions = formData.products.map(p => ({
    label: `PAGE: ${p.title}`,
    value: `/product/${p.id}`
  }));

  const allPageOptions = [
      ...sectionOptions,
      ...productPageOptions,
      { label: 'PAGE: Admin Login', value: '/login' },
      { label: 'PAGE: Privacy Policy', value: '#' },
  ];

  const renderLinkEditor = (
    title: string, 
    links: LinkItem[], 
    setLinks: (newLinks: LinkItem[]) => void, 
    options: { label: string; value: string }[]
  ) => {
    const addLink = () => {
      setLinks([...links, { label: 'New Link', url: options.length > 0 ? options[0].value : '#contact' }]);
    };

    const removeLink = (index: number) => {
      const newLinks = [...links];
      newLinks.splice(index, 1);
      setLinks(newLinks);
    };

    const updateLink = (index: number, field: keyof LinkItem, value: string) => {
      const newLinks = [...links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      setLinks(newLinks);
    };

    const hasOptions = options && options.length > 0;

    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
           <h3 className="font-bold text-gray-700 flex items-center gap-2">
             <LinkIcon size={16} /> {title}
           </h3>
           <button 
             onClick={addLink}
             className="text-xs flex items-center gap-1 bg-brand-900 text-white px-3 py-1.5 rounded hover:bg-brand-700 transition-colors"
           >
             <Plus size={12} /> Add Item
           </button>
        </div>
        
        <div className="space-y-3">
          {links.length === 0 && <p className="text-sm text-gray-400 italic">No links added yet.</p>}
          
          {links.map((link, idx) => {
             const isCustom = hasOptions && !options.some(opt => opt.value === link.url) && link.url !== '';

             return (
              <div key={idx} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-white p-3 rounded shadow-sm border border-gray-100">
                <div className="flex-1 w-full">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Label Text</label>
                    <div className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-1 focus-within:ring-accent-500">
                      <TypeIcon size={14} className="text-gray-400" />
                      <input 
                        type="text" 
                        value={link.label}
                        onChange={(e) => updateLink(idx, 'label', e.target.value)}
                        className="w-full outline-none text-sm text-gray-700 font-medium"
                        placeholder="Link Label"
                      />
                    </div>
                </div>
                
                <div className="flex-1 w-full">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Destination</label>
                    <div className="relative">
                      {hasOptions && !isCustom ? (
                          <>
                              <select
                                  value={link.url}
                                  onChange={(e) => {
                                    if(e.target.value === '__custom__') {
                                        updateLink(idx, 'url', ''); 
                                    } else {
                                        updateLink(idx, 'url', e.target.value);
                                    }
                                  }}
                                  className="w-full border rounded px-3 py-2 text-sm text-gray-700 outline-none appearance-none bg-white focus:ring-1 focus:ring-accent-500 pr-8"
                              >
                                  <option value="" disabled>Select a destination</option>
                                  {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                  ))}
                                  <option value="__custom__" className="text-blue-600 font-bold">+ Enter Custom URL</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </>
                      ) : (
                          <div className="flex items-center gap-2">
                             <div className="relative flex-1">
                                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input 
                                    type="text" 
                                    value={link.url}
                                    onChange={(e) => updateLink(idx, 'url', e.target.value)}
                                    className="w-full border rounded pl-9 pr-3 py-2 text-sm text-gray-700 outline-none bg-white focus:ring-1 focus:ring-accent-500"
                                    placeholder="https:// or /page"
                                    autoFocus={isCustom}
                                />
                             </div>
                             {hasOptions && (
                                <button 
                                  onClick={() => updateLink(idx, 'url', options[0].value)}
                                  className="text-xs text-blue-600 underline whitespace-nowrap"
                                >
                                  Back to List
                                </button>
                             )}
                          </div>
                      )}
                    </div>
                </div>

                <div className="pt-5">
                  <button 
                    onClick={() => removeLink(idx)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Remove Link"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderProductEditor = () => {
    const productId = activeTab.replace('product-', '');
    const productIndex = formData.products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return <div>Product not found</div>;

    const product = formData.products[productIndex];

    const updateProductField = (field: string, value: any) => {
        const newProducts = [...formData.products];
        newProducts[productIndex] = { ...newProducts[productIndex], [field]: value };
        setFormData({ ...formData, products: newProducts });
    };

    const updateSection = (sectionIndex: number, field: string, value: any) => {
        const newProducts = [...formData.products];
        const sections = [...(newProducts[productIndex].sections || [])];
        sections[sectionIndex] = { ...sections[sectionIndex], [field]: value };
        newProducts[productIndex].sections = sections;
        setFormData({ ...formData, products: newProducts });
    };

    const addSection = () => {
        const newProducts = [...formData.products];
        const sections = newProducts[productIndex].sections || [];
        sections.push({
            title: 'New Product Section',
            image: 'https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?auto=format&fit=crop&w=600&q=80',
            items: ['Item 1', 'Item 2']
        });
        newProducts[productIndex].sections = sections;
        setFormData({ ...formData, products: newProducts });
    };

    const removeSection = (sectionIndex: number) => {
        if(confirm('Are you sure you want to remove this section?')) {
            const newProducts = [...formData.products];
            newProducts[productIndex].sections?.splice(sectionIndex, 1);
            setFormData({ ...formData, products: newProducts });
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Page Details</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Page Title</label>
                        <input 
                            type="text" 
                            value={product.title}
                            onChange={(e) => updateProductField('title', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                        <textarea 
                            value={product.description}
                            onChange={(e) => updateProductField('description', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500 h-20"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Long Description (Intro)</label>
                        <textarea 
                            value={product.longDescription}
                            onChange={(e) => updateProductField('longDescription', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500 h-32"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Content Cards / Sections</h3>
                        <p className="text-sm text-gray-500">Manage the grid of cards displayed on this page.</p>
                    </div>
                    <button 
                        onClick={addSection}
                        className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                    >
                        <Plus size={16} /> Add New Card
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {(product.sections || []).map((section, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                             <div className="flex justify-between items-start mb-4">
                                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">Card #{idx + 1}</span>
                                <button onClick={() => removeSection(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"><Trash2 size={16}/></button>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Title</label>
                                    <input 
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500"
                                    />
                                    
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 mt-4">Card Image URL</label>
                                    <input 
                                        type="text"
                                        value={section.image}
                                        onChange={(e) => updateSection(idx, 'image', e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500"
                                    />
                                    <img src={section.image} className="h-20 w-auto mt-2 rounded border" alt="card preview" />
                                 </div>
                                 
                                 <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">List Items (One per line)</label>
                                     <textarea 
                                        value={section.items.join('\n')}
                                        onChange={(e) => updateSection(idx, 'items', e.target.value.split('\n'))}
                                        className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500 h-40 font-mono text-sm"
                                        placeholder="Item 1&#10;Item 2&#10;Item 3"
                                     />
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  };


  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-brand-900 text-white flex flex-col fixed md:relative z-20 h-full md:h-auto overflow-y-auto no-scrollbar">
        <div className="p-6 border-b border-brand-800">
          <h2 className="text-xl font-heading font-bold">CMS Admin</h2>
          <p className="text-xs text-brand-300">ReliaIT (Cloud Sync)</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 px-2">Global Settings</h3>
            <div className="space-y-1">
              <button onClick={() => setActiveTab('general')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'general' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <Settings size={16} /> General Info
              </button>
              <button onClick={() => setActiveTab('footer')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'footer' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <PanelBottom size={16} /> Footer
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 px-2">Home Page</h3>
            <div className="space-y-1">
              <button onClick={() => setActiveTab('hero')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'hero' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <Home size={16} /> Hero Section
              </button>
              <button onClick={() => setActiveTab('features')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'features' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <List size={16} /> Features
              </button>
              <button onClick={() => setActiveTab('industries')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'industries' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <Briefcase size={16} /> Industries
              </button>
              <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'about' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <TypeIcon size={16} /> About
              </button>
              <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === 'stats' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                <Layers size={16} /> Stats
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 px-2">Product Pages</h3>
            <div className="space-y-1">
              {formData.products.map((p) => (
                <button key={p.id} onClick={() => setActiveTab(`product-${p.id}`)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium text-left truncate ${activeTab === `product-${p.id}` ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
                  <ShoppingBag size={16} className="flex-shrink-0" /> <span className="truncate">{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-brand-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-brand-300 hover:text-white transition-colors text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
           <div>
             <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {activeTab.startsWith('product-') 
                  ? formData.products.find(p => `product-${p.id}` === activeTab)?.title 
                  : `${activeTab} Settings`
                }
             </h1>
             <p className="text-sm text-gray-500">Edit your cloud-synced CMS data.</p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={async () => {
                   if(confirm('Are you sure? This will reset cloud content to default.')) {
                      await resetContent();
                      window.location.reload();
                   }
                }}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <RotateCcw size={18} /> Reset
              </button>
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md active:scale-95 disabled:opacity-50 min-w-[140px] justify-center"
              >
                {saveStatus === 'saving' ? <Loader2 size={18} className="animate-spin" /> : saveStatus === 'saved' ? 'Saved!' : saveStatus === 'error' ? 'Error!' : <><Save size={18} /> Save Changes</>}
              </button>
           </div>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-5xl">
           {activeTab.startsWith('product-') && renderProductEditor()}
           {activeTab === 'general' && (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Company Phone</label>
                   <input type="text" value={formData.general.phone} onChange={(e) => handleNestedChange('general', 'phone', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
                   <input type="text" value={formData.general.whatsapp} onChange={(e) => handleNestedChange('general', 'whatsapp', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none" placeholder="e.g. 919876543210" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Company Email</label>
                   <input type="text" value={formData.general.email} onChange={(e) => handleNestedChange('general', 'email', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                   <textarea value={formData.general.address} onChange={(e) => handleNestedChange('general', 'address', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-24" />
                </div>
             </div>
           )}

           {activeTab === 'hero' && (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Title Line 1</label>
                   <input type="text" value={formData.hero.titleLine1} onChange={(e) => handleNestedChange('hero', 'titleLine1', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Title Line 2 (Colored)</label>
                   <input type="text" value={formData.hero.titleLine2} onChange={(e) => handleNestedChange('hero', 'titleLine2', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none text-accent-500 font-bold" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                   <textarea value={formData.hero.subtitle} onChange={(e) => handleNestedChange('hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-24" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Background Image URL</label>
                   <input type="text" value={formData.hero.backgroundImage} onChange={(e) => handleNestedChange('hero', 'backgroundImage', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none" />
                </div>
             </div>
           )}

           {activeTab === 'footer' && (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Footer Description</label>
                   <textarea value={formData.footer.aboutText} onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, aboutText: e.target.value } }))} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-24" />
                </div>
                {renderLinkEditor("Quick Links (Homepage Sections)", formData.footer.quickLinks, (newLinks) => setFormData(prev => ({...prev, footer: {...prev.footer, quickLinks: newLinks}})), allPageOptions)}
                {renderLinkEditor("Services Menu (Footer & Nav)", formData.footer.productLinks, (newLinks) => setFormData(prev => ({...prev, footer: {...prev.footer, productLinks: newLinks}})), allPageOptions)}
             </div>
           )}
        </div>
      </main>
    </div>
  );
};
