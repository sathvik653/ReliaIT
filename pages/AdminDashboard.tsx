
import React, { useState } from 'react';
import { useContent, SiteContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, LayoutDashboard, Type, Image, Layers, Phone, RotateCcw } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'about' | 'stats'>('general');
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
      <aside className="w-full md:w-64 bg-brand-900 text-white flex flex-col">
        <div className="p-6 border-b border-brand-800">
          <h2 className="text-xl font-heading font-bold">CMS Admin</h2>
          <p className="text-xs text-brand-300">Mahakali Computer</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
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
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab} Settings</h1>
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl">
           
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
                   <img src={formData.hero.backgroundImage} className="h-20 w-auto mt-2 rounded border" alt="Preview" />
                </div>
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
