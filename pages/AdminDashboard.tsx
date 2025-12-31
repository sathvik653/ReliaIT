
import React, { useState } from 'react';
import { useContent, SiteContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, LayoutDashboard, Type, Image, Layers, Phone, RotateCcw, Package, Briefcase, List, ChevronDown, ChevronRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'about' | 'stats' | 'features' | 'products' | 'industries'>('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const handleSave = () => {
    updateContent(formData);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-900 text-white flex flex-col fixed md:relative z-20 h-full md:h-auto overflow-y-auto no-scrollbar">
        <div className="p-6 border-b border-brand-800">
          <h2 className="text-xl font-heading font-bold">CMS Admin</h2>
          <p className="text-xs text-brand-300">Mahakali Computer</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'general' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <Phone size={18} /> General Info
          </button>
          <button 
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'hero' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <Image size={18} /> Hero Section
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'features' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <List size={18} /> Features Grid
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('industries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'industries' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <Briefcase size={18} /> Industries
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'about' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <Type size={18} /> About Content
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'stats' ? 'bg-accent-500 text-white' : 'text-brand-200 hover:bg-brand-800'}`}
          >
            <Layers size={18} /> Stats & Numbers
          </button>
        </nav>
        <div className="p-4 border-t border-brand-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-brand-300 hover:text-white transition-colors text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
           <div>
             <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab} Settings</h1>
             <p className="text-sm text-gray-500">Edit your website content in real-time.</p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={() => {
                   if(confirm('Are you sure? This will reset all content to default.')) {
                      resetContent();
                      setFormData(content); // Reset local form too
                      window.location.reload();
                   }
                }}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <RotateCcw size={18} /> Reset
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md active:scale-95"
              >
                {saveStatus === 'saved' ? 'Saved!' : <><Save size={18} /> Save Changes</>}
              </button>
           </div>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-5xl">
           
           {activeTab === 'general' && (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Company Phone</label>
                   <input 
                      type="text" 
                      value={formData.general.phone}
                      onChange={(e) => handleNestedChange('general', 'phone', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Company Email</label>
                   <input 
                      type="text" 
                      value={formData.general.email}
                      onChange={(e) => handleNestedChange('general', 'email', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                   <textarea 
                      value={formData.general.address}
                      onChange={(e) => handleNestedChange('general', 'address', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-24"
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                        <input type="text" value={formData.general.facebook} onChange={(e) => handleNestedChange('general', 'facebook', e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Twitter URL</label>
                        <input type="text" value={formData.general.twitter} onChange={(e) => handleNestedChange('general', 'twitter', e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn URL</label>
                        <input type="text" value={formData.general.linkedin} onChange={(e) => handleNestedChange('general', 'linkedin', e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
                        <input type="text" value={formData.general.instagram} onChange={(e) => handleNestedChange('general', 'instagram', e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none" />
                    </div>
                </div>
             </div>
           )}

           {activeTab === 'hero' && (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Title Line 1</label>
                   <input 
                      type="text" 
                      value={formData.hero.titleLine1}
                      onChange={(e) => handleNestedChange('hero', 'titleLine1', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Title Line 2 (Colored)</label>
                   <input 
                      type="text" 
                      value={formData.hero.titleLine2}
                      onChange={(e) => handleNestedChange('hero', 'titleLine2', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none text-accent-500 font-bold"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                   <textarea 
                      value={formData.hero.subtitle}
                      onChange={(e) => handleNestedChange('hero', 'subtitle', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-24"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Background Image URL</label>
                   <input 
                      type="text" 
                      value={formData.hero.backgroundImage}
                      onChange={(e) => handleNestedChange('hero', 'backgroundImage', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                   <div className="mt-2 h-32 w-full bg-gray-100 rounded border overflow-hidden">
                       <img src={formData.hero.backgroundImage} className="w-full h-full object-cover" alt="Preview" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
                   <input 
                      type="text" 
                      value={formData.hero.buttonText}
                      onChange={(e) => handleNestedChange('hero', 'buttonText', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                </div>
             </div>
           )}

            {activeTab === 'features' && (
             <div className="grid grid-cols-1 gap-6">
                {formData.features.items.map((feature, idx) => (
                   <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-bold text-brand-900 mb-4 border-b pb-2">Feature Card {idx + 1}</h3>
                      <div className="mb-4">
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                         <input 
                            type="text" 
                            value={feature.title}
                            onChange={(e) => {
                               const newItems = [...formData.features.items];
                               newItems[idx].title = e.target.value;
                               setFormData(prev => ({ ...prev, features: { ...prev.features, items: newItems } }));
                            }}
                            className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500 outline-none"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                         <textarea 
                            rows={3}
                            value={feature.desc}
                            onChange={(e) => {
                               const newItems = [...formData.features.items];
                               newItems[idx].desc = e.target.value;
                               setFormData(prev => ({ ...prev, features: { ...prev.features, items: newItems } }));
                            }}
                            className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500 outline-none resize-none"
                         />
                      </div>
                   </div>
                ))}
             </div>
           )}

           {activeTab === 'about' && (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">About Heading</label>
                   <input 
                      type="text" 
                      value={formData.about.title}
                      onChange={(e) => handleNestedChange('about', 'title', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Paragraph 1</label>
                   <textarea 
                      value={formData.about.description1}
                      onChange={(e) => handleNestedChange('about', 'description1', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-32"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Paragraph 2</label>
                   <textarea 
                      value={formData.about.description2}
                      onChange={(e) => handleNestedChange('about', 'description2', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none h-32"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Years Experience</label>
                   <input 
                      type="text" 
                      value={formData.about.yearsExperience}
                      onChange={(e) => handleNestedChange('about', 'yearsExperience', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                   />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Left Image URL</label>
                        <input 
                            type="text" 
                            value={formData.about.image1} 
                            onChange={(e) => handleNestedChange('about', 'image1', e.target.value)} 
                            className="w-full px-4 py-2 border rounded-lg outline-none" 
                        />
                        <img src={formData.about.image1} className="h-24 w-auto mt-2 rounded" alt="prev"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Right Image URL</label>
                        <input 
                            type="text" 
                            value={formData.about.image2} 
                            onChange={(e) => handleNestedChange('about', 'image2', e.target.value)} 
                            className="w-full px-4 py-2 border rounded-lg outline-none" 
                        />
                         <img src={formData.about.image2} className="h-24 w-auto mt-2 rounded" alt="prev"/>
                    </div>
                </div>
             </div>
           )}

            {activeTab === 'products' && (
             <div className="space-y-4">
                {formData.products.map((product, idx) => (
                   <details key={product.id} className="bg-white border rounded-lg group open:ring-1 open:ring-accent-500">
                      <summary className="p-4 cursor-pointer font-bold flex items-center justify-between hover:bg-gray-50 rounded-lg">
                        <span>{product.title} <span className="text-xs font-normal text-gray-500 ml-2">({product.category})</span></span>
                        <ChevronDown className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="p-6 border-t bg-gray-50/50 space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                                <input 
                                    type="text" 
                                    value={product.title}
                                    onChange={(e) => {
                                        const newProd = [...formData.products];
                                        newProd[idx].title = e.target.value;
                                        setFormData({...formData, products: newProd});
                                    }}
                                    className="w-full px-3 py-2 border rounded" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                                <select 
                                    value={product.category}
                                    onChange={(e) => {
                                        const newProd = [...formData.products];
                                        newProd[idx].category = e.target.value as any;
                                        setFormData({...formData, products: newProd});
                                    }}
                                    className="w-full px-3 py-2 border rounded" 
                                >
                                    <option value="Hardware">Hardware</option>
                                    <option value="Stationery">Stationery</option>
                                    <option value="Networking">Networking</option>
                                    <option value="Consumables">Consumables</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Retail">Retail</option>
                                </select>
                            </div>
                         </div>
                         
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Short Description</label>
                             <input 
                                type="text"
                                value={product.description}
                                onChange={(e) => {
                                    const newProd = [...formData.products];
                                    newProd[idx].description = e.target.value;
                                    setFormData({...formData, products: newProd});
                                }}
                                className="w-full px-3 py-2 border rounded"
                             />
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Long Description</label>
                             <textarea 
                                value={product.longDescription}
                                onChange={(e) => {
                                    const newProd = [...formData.products];
                                    newProd[idx].longDescription = e.target.value;
                                    setFormData({...formData, products: newProd});
                                }}
                                rows={4}
                                className="w-full px-3 py-2 border rounded"
                             />
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Main Image URL</label>
                             <input 
                                type="text" 
                                value={product.image}
                                onChange={(e) => {
                                    const newProd = [...formData.products];
                                    newProd[idx].image = e.target.value;
                                    setFormData({...formData, products: newProd});
                                }}
                                className="w-full px-3 py-2 border rounded" 
                             />
                             <img src={product.image} className="h-16 w-auto mt-2 rounded border" alt="preview" />
                         </div>

                         {/* Simple Features */}
                         {!product.sections && (
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Features List (One per line)</label>
                                 <textarea 
                                     value={product.features.join('\n')}
                                     onChange={(e) => {
                                        const newProd = [...formData.products];
                                        newProd[idx].features = e.target.value.split('\n');
                                        setFormData({...formData, products: newProd});
                                     }}
                                     rows={5}
                                     className="w-full px-3 py-2 border rounded font-mono text-sm"
                                 />
                             </div>
                         )}

                         {/* Complex Sections (Only for stationery products mostly) */}
                         {product.sections && (
                             <div className="border p-4 rounded bg-white">
                                <h4 className="font-bold text-sm mb-4">Sub-Sections (e.g., Types of Stationery)</h4>
                                {product.sections.map((section: any, sIdx: number) => (
                                    <div key={sIdx} className="mb-6 border-b pb-4 last:border-0">
                                        <div className="grid grid-cols-2 gap-4 mb-2">
                                            <div>
                                                <label className="text-xs text-gray-500">Section Title</label>
                                                <input 
                                                    value={section.title}
                                                    onChange={(e) => {
                                                        const newProd = [...formData.products];
                                                        newProd[idx].sections![sIdx].title = e.target.value;
                                                        setFormData({...formData, products: newProd});
                                                    }}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Section Image</label>
                                                <input 
                                                    value={section.image}
                                                    onChange={(e) => {
                                                        const newProd = [...formData.products];
                                                        newProd[idx].sections![sIdx].image = e.target.value;
                                                        setFormData({...formData, products: newProd});
                                                    }}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500">Items (One per line)</label>
                                            <textarea 
                                                 value={section.items.join('\n')}
                                                 onChange={(e) => {
                                                    const newProd = [...formData.products];
                                                    newProd[idx].sections![sIdx].items = e.target.value.split('\n');
                                                    setFormData({...formData, products: newProd});
                                                 }}
                                                 rows={3}
                                                 className="w-full px-2 py-1 border rounded text-sm font-mono"
                                             />
                                        </div>
                                    </div>
                                ))}
                             </div>
                         )}
                      </div>
                   </details>
                ))}
             </div>
           )}

           {activeTab === 'industries' && (
             <div className="space-y-4">
                {formData.industries.map((ind, idx) => (
                   <details key={ind.id} className="bg-white border rounded-lg group open:ring-1 open:ring-accent-500">
                      <summary className="p-4 cursor-pointer font-bold flex items-center justify-between hover:bg-gray-50 rounded-lg">
                        <span>{ind.title}</span>
                        <ChevronDown className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="p-6 border-t bg-gray-50/50 space-y-6">
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                            <input 
                                type="text" 
                                value={ind.title}
                                onChange={(e) => {
                                    const newInd = [...formData.industries];
                                    newInd[idx].title = e.target.value;
                                    setFormData({...formData, industries: newInd});
                                }}
                                className="w-full px-3 py-2 border rounded" 
                            />
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Icon Name (Lucide React)</label>
                             <input 
                                type="text"
                                value={ind.iconName}
                                onChange={(e) => {
                                    const newInd = [...formData.industries];
                                    newInd[idx].iconName = e.target.value;
                                    setFormData({...formData, industries: newInd});
                                }}
                                className="w-full px-3 py-2 border rounded"
                             />
                             <span className="text-xs text-gray-400">Available: Building2, School, Landmark, Store</span>
                         </div>
                         
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Short Description</label>
                             <input 
                                type="text"
                                value={ind.description}
                                onChange={(e) => {
                                    const newInd = [...formData.industries];
                                    newInd[idx].description = e.target.value;
                                    setFormData({...formData, industries: newInd});
                                }}
                                className="w-full px-3 py-2 border rounded"
                             />
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Long Description</label>
                             <textarea 
                                value={ind.longDescription}
                                onChange={(e) => {
                                    const newInd = [...formData.industries];
                                    newInd[idx].longDescription = e.target.value;
                                    setFormData({...formData, industries: newInd});
                                }}
                                rows={4}
                                className="w-full px-3 py-2 border rounded"
                             />
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                             <input 
                                type="text" 
                                value={ind.image}
                                onChange={(e) => {
                                    const newInd = [...formData.industries];
                                    newInd[idx].image = e.target.value;
                                    setFormData({...formData, industries: newInd});
                                }}
                                className="w-full px-3 py-2 border rounded" 
                             />
                             <img src={ind.image} className="h-16 w-auto mt-2 rounded border" alt="preview" />
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Features / Services List (One per line)</label>
                             <textarea 
                                 value={ind.features.join('\n')}
                                 onChange={(e) => {
                                    const newInd = [...formData.industries];
                                    newInd[idx].features = e.target.value.split('\n');
                                    setFormData({...formData, industries: newInd});
                                 }}
                                 rows={5}
                                 className="w-full px-3 py-2 border rounded font-mono text-sm"
                             />
                         </div>
                      </div>
                   </details>
                ))}
             </div>
           )}

           {activeTab === 'stats' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.stats.items.map((stat, idx) => (
                   <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                      <div className="mb-2">
                         <label className="block text-xs font-bold text-gray-500 uppercase">Label {idx + 1}</label>
                         <input 
                            type="text" 
                            value={stat.label}
                            onChange={(e) => {
                               const newItems = [...formData.stats.items];
                               newItems[idx].label = e.target.value;
                               setFormData(prev => ({ ...prev, stats: { ...prev.stats, items: newItems } }));
                            }}
                            className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500 outline-none"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase">Value {idx + 1}</label>
                         <input 
                            type="text" 
                            value={stat.value}
                            onChange={(e) => {
                               const newItems = [...formData.stats.items];
                               newItems[idx].value = e.target.value;
                               setFormData(prev => ({ ...prev, stats: { ...prev.stats, items: newItems } }));
                            }}
                            className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-accent-500 outline-none"
                         />
                      </div>
                   </div>
                ))}
             </div>
           )}

        </div>
      </main>
    </div>
  );
};
