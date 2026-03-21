import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User, RefreshCw, Save, Image as ImageIcon, FileText, BarChart, Database, Layout } from 'lucide-react';

const AboutManager = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [heading, setHeading] = useState("Architecting Scalable Digital Frontiers");
  const [paragraph, setParagraph] = useState("I specialize in engineering high-performance AI ecosystems...");
  const [imageUrl, setImageUrl] = useState("/my_img.jpeg");
  const [floatingTag, setFloatingTag] = useState("Full-Stack AI");
  
  // Array states
  const [features, setFeatures] = useState([
    { title: "Neural Architectures", description: "Designing complex models...", icon: "Database" },
    { title: "Eco-System Ops", description: "Scalable MLOps...", icon: "Layout" }
  ]);
  const [stats, setStats] = useState([
    { value: "12+", label: "Core Deployments" },
    { value: "99%", label: "Precision Rate" }
  ]);

  const fetchAboutData = async () => {
    setFetching(true);
    try {
      const docRef = doc(db, 'portfolioConfig', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.heading) setHeading(data.heading);
        if (data.paragraph) setParagraph(data.paragraph);
        if (data.imageUrl) setImageUrl(data.imageUrl);
        if (data.floatingTag) setFloatingTag(data.floatingTag);
        if (data.features) setFeatures(data.features);
        if (data.stats) setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching about config:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'portfolioConfig', 'about'), {
        heading,
        paragraph,
        imageUrl,
        floatingTag,
        features,
        stats,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      alert("About Section Config Saved!");
    } catch (error) {
      console.error("Error saving about config", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  const updateStat = (index, field, value) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <User className="text-[#d8b4fe] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">About Section</h2>
            <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage autobiography & core focus</p>
          </div>
        </div>
        <button onClick={fetchAboutData} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white shrink-0">
           <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-8 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible z-20">
        
        {/* Core Identity */}
        <div>
           <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#7c3aed]/50" /> Core Identity
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-3 md:col-span-2">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><FileText className="w-3 h-3 text-[#d8b4fe]" /> Main Heading</label>
               <input type="text" value={heading} onChange={e => setHeading(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3 md:col-span-2">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><FileText className="w-3 h-3 text-[#d8b4fe]" /> Main Paragraph</label>
               <textarea value={paragraph} onChange={e => setParagraph(e.target.value)} rows={4} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold resize-none placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><ImageIcon className="w-3 h-3 text-[#d8b4fe]" /> Profile Image URL</label>
               <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><User className="w-3 h-3 text-[#d8b4fe]" /> Floating Tag</label>
               <input type="text" value={floatingTag} onChange={e => setFloatingTag(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" />
             </div>
           </div>
        </div>

        {/* Features Array (Limit 2 currently in UI) */}
        <div>
           <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 mt-8 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#7c3aed]/50" /> Highlight Features (Fixed 2)
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feat, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                    <p className="text-[10px] uppercase font-black text-[#d8b4fe] tracking-widest border-b border-white/10 pb-2">Feature {i+1}</p>
                    <input type="text" value={feat.title} onChange={e => updateFeature(i, 'title', e.target.value)} placeholder="Title" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-bold focus:border-[#d8b4fe] focus:outline-none transition-all" />
                    <input type="text" value={feat.description} onChange={e => updateFeature(i, 'description', e.target.value)} placeholder="Short Description" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-xs font-medium focus:border-[#d8b4fe] focus:outline-none transition-all" />
                    <select value={feat.icon} onChange={e => updateFeature(i, 'icon', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-bold focus:border-[#d8b4fe] focus:outline-none appearance-none">
                       <option value="Database">Database</option>
                       <option value="Layout">Layout</option>
                       <option value="Code">Code</option>
                       <option value="Terminal">Terminal</option>
                    </select>
                 </div>
              ))}
           </div>
        </div>

        {/* Impact Stats (Limit 2 currently in UI) */}
        <div>
           <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 mt-8 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#7c3aed]/50" /> Impact Stats (Fixed 2)
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                    <p className="text-[10px] uppercase font-black text-[#d8b4fe] tracking-widest border-b border-white/10 pb-2">Stat {i+1}</p>
                    <input type="text" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="e.g. 12+" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-xl font-black focus:border-[#d8b4fe] focus:outline-none transition-all tracking-wider" />
                    <input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-xs font-bold uppercase tracking-widest focus:border-[#d8b4fe] focus:outline-none transition-all" />
                 </div>
              ))}
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-[#7c3aed]/20">
           <button type="submit" disabled={loading} className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
             Synchronize Settings
           </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;
