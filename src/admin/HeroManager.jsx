import { useState, useEffect } from 'react';
import { getHeroConfig, saveHeroConfig } from '../api';
import { Hexagon, Save, RefreshCw } from 'lucide-react';

const HeroManager = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    cvUrl: '',
    githubUrl: '',
    profileImageUrl: '',
    siteLogoUrl: '',
    typewriterWords: [],
    heroStats: []
  });

  const handleStatChange = (index, field, value) => {
    const newStats = [...(formData.heroStats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, heroStats: newStats });
  };

  const addStat = () => {
    setFormData({ 
      ...formData, 
      heroStats: [...(formData.heroStats || []), { title: '', description: '', iconName: 'Terminal' }] 
    });
  };

  const removeStat = (index) => {
    const newStats = [...(formData.heroStats || [])];
    newStats.splice(index, 1);
    setFormData({ ...formData, heroStats: newStats });
  };

  const fetchConfig = async () => {
    setFetching(true);
    try {
      const data = await getHeroConfig();
      if (data && Object.keys(data).length > 0) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching hero config:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveHeroConfig(formData);
      alert("Hero configuration saved successfully!");
    } catch (error) {
      console.error("Error saving hero config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (fetching) return <div className="flex justify-center py-20"><RefreshCw className="w-8 h-8 animate-spin text-accent" /></div>;

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30">
          <Hexagon className="text-[#d8b4fe] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Hero Configuration</h2>
          <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage public landing parameters</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-6 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Display Name</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Professional Title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold" />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Biography</label>
          <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">CV URL</label>
            <input type="text" name="cvUrl" value={formData.cvUrl || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">GitHub URL</label>
            <input type="text" name="githubUrl" value={formData.githubUrl || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold" />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Profile Image</label>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setFormData({ ...formData, profileImageUrl: reader.result });
              reader.readAsDataURL(file);
            }
          }} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-[#7c3aed]/20 file:text-[#d8b4fe] hover:file:bg-[#7c3aed]/30" />
          {formData.profileImageUrl && (
            <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-[8px] font-black uppercase text-white/30 tracking-widest mb-2">Preview</p>
              <img src={formData.profileImageUrl} alt="Preview" referrerPolicy="no-referrer" crossOrigin="anonymous" className="w-24 h-24 object-cover rounded-xl border border-white/10" onError={(e) => { e.target.style.display='none'; e.target.nextElementSibling.style.display='flex'; }} />
              <div className="hidden items-center justify-center w-24 h-24 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 text-[8px] font-bold uppercase">Failed to load</div>
            </div>
          )}
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Site Logo / Favicon</label>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setFormData({ ...formData, siteLogoUrl: reader.result });
              reader.readAsDataURL(file);
            }
          }} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-[#7c3aed]/20 file:text-[#d8b4fe] hover:file:bg-[#7c3aed]/30" />
          {formData.siteLogoUrl && (
            <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-xl inline-flex items-center gap-3">
              <img src={formData.siteLogoUrl} alt="Logo Preview" referrerPolicy="no-referrer" crossOrigin="anonymous" className="w-10 h-10 object-contain rounded-lg" onError={(e) => { e.target.src=''; }} />
              <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Logo Preview</span>
            </div>
          )}
        </div>

        {/* Typewriter Words Section */}
        <div className="space-y-4 relative z-10 border-t border-[#7c3aed]/20 pt-6">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Typewriter Titles</label>
            <button type="button" onClick={() => setFormData({ ...formData, typewriterWords: [...(formData.typewriterWords || []), ''] })} className="text-[10px] px-3 py-1.5 bg-[#7c3aed]/20 text-[#d8b4fe] rounded-lg hover:bg-[#7c3aed]/40 uppercase font-black transition-all">
              + Add Title
            </button>
          </div>
          <p className="text-[9px] text-white/30 ml-2 -mt-2">These titles rotate in the hero typewriter animation</p>
          <div className="space-y-3">
            {(formData.typewriterWords || []).map((word, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder={`Title ${idx + 1} (e.g. AI & ML Engineer)`}
                  value={word}
                  onChange={(e) => {
                    const newWords = [...(formData.typewriterWords || [])];
                    newWords[idx] = e.target.value;
                    setFormData({ ...formData, typewriterWords: newWords });
                  }}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newWords = [...(formData.typewriterWords || [])];
                    newWords.splice(idx, 1);
                    setFormData({ ...formData, typewriterWords: newWords });
                  }}
                  className="text-red-400 hover:text-red-300 p-2 font-bold uppercase text-[10px] transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 relative z-10 border-t border-[#7c3aed]/20 pt-6">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Managed Stats Cards</label>
            <button type="button" onClick={addStat} className="text-[10px] px-3 py-1.5 bg-[#7c3aed]/20 text-[#d8b4fe] rounded-lg hover:bg-[#7c3aed]/40 uppercase font-black transition-all">
              + Add Stat
            </button>
          </div>
          <div className="space-y-4">
            {(formData.heroStats || []).map((stat, idx) => (
              <div key={idx} className="p-4 bg-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-xl flex flex-col md:flex-row gap-4 items-center">
                <input type="text" placeholder="Title/Number (e.g. 1+ YEAR)" value={stat.title} onChange={e => handleStatChange(idx, 'title', e.target.value)} className="w-full md:w-1/3 bg-transparent border-b border-white/10 px-2 py-2 text-sm text-white font-bold focus:border-[#d8b4fe] focus:outline-none transition-colors" />
                <input type="text" placeholder="Description (e.g. AI & CV Experience)" value={stat.description} onChange={e => handleStatChange(idx, 'description', e.target.value)} className="w-full md:w-1/3 bg-transparent border-b border-white/10 px-2 py-2 text-sm text-white font-bold focus:border-[#d8b4fe] focus:outline-none transition-colors" />
                <select value={stat.iconName} onChange={e => handleStatChange(idx, 'iconName', e.target.value)} className="w-full md:w-1/4 bg-[#030014] border border-[#7c3aed]/20 text-[#d8b4fe] text-sm py-2 px-3 rounded-lg focus:outline-none font-bold">
                  <option value="Terminal">Terminal</option>
                  <option value="Database">Database</option>
                  <option value="Award">Award</option>
                  <option value="Briefcase">Briefcase</option>
                  <option value="Zap">Zap</option>
                  <option value="Brain">Brain</option>
                  <option value="Code">Code</option>
                  <option value="Star">Star</option>
                </select>
                <button type="button" onClick={() => removeStat(idx)} className="text-red-400 hover:text-red-300 p-2 font-bold uppercase text-[10px] transition-colors">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 mt-6 shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </form>
    </div>
  );
};

export default HeroManager;
