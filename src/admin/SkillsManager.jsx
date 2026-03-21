import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Trash2, Edit2, Plus, RefreshCw, Layers, Database, Image as ImageIcon, Hash, Code } from 'lucide-react';
import { skillIcons } from '../utils/skillIcons';
import { m, AnimatePresence } from 'framer-motion';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [row, setRow] = useState('1');
  const [showDropdown, setShowDropdown] = useState(false);

  const availableTools = Object.keys(skillIcons);
  const filteredTools = name.trim() === '' ? availableTools : availableTools.filter(tool => tool.toLowerCase().includes(name.toLowerCase()));

  const fetchSkills = async () => {
    setFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "skills"));
      const skillsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSkills(skillsData.sort((a,b) => (a.row || '1').localeCompare(b.row || '1')));
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const resetForm = () => {
    setName(''); setIconUrl(''); setRow('1'); setEditingId(null);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resolvedIcon = iconUrl || skillIcons[name] || "";
    const payload = {
      name, 
      iconUrl: resolvedIcon,
      icon: resolvedIcon, // Legacy compatibility
      row: row || '1',
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "skills", editingId), payload);
      } else {
        await addDoc(collection(db, "skills"), { ...payload, createdAt: new Date().toISOString() });
      }
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setName(skill.name || '');
    setIconUrl(skill.iconUrl || skill.icon || '');
    setRow(skill.row || '1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSkill = async (id) => {
    if(!window.confirm("Remove this technology from your arsenal?")) return;
    try {
      if(id === editingId) resetForm();
      await deleteDoc(doc(db, "skills", id));
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const seedSkills = async () => {
    if(!window.confirm("Import default legacy tech arsenal? This will inject base tools directly into Firestore.")) return;
    setLoading(true);
    
    const row1 = [
      { name: "PyTorch", icon: skillIcons["PyTorch"], row: "1" },
      { name: "TensorFlow", icon: skillIcons["TensorFlow"], row: "1" },
      { name: "OpenCV", icon: skillIcons["OpenCV"], row: "1" },
      { name: "YOLO", icon: skillIcons["YOLO"], row: "1" },
      { name: "LangChain", icon: skillIcons["LangChain"], row: "1" }
    ];
    
    const row2 = [
      { name: "Python", icon: skillIcons["Python"], row: "2" },
      { name: "C++", icon: skillIcons["C++"], row: "2" },
      { name: "FastAPI", icon: skillIcons["FastAPI"], row: "2" },
      { name: "Docker", icon: skillIcons["Docker"], row: "2" },
      { name: "Git", icon: skillIcons["Git"], row: "2" }
    ];

    try {
      for (const skill of [...row1, ...row2]) {
        await addDoc(collection(db, "skills"), { ...skill, createdAt: new Date().toISOString() });
      }
      alert("Legacy skills seeded gracefully!");
      fetchSkills();
    } catch (error) {
      console.error("Error seeding skills:", error);
      alert("Failed to inject legacy seed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <Layers className="text-[#d8b4fe] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">{editingId ? 'Modify Technology' : 'Add Technology'}</h2>
            <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage Marquee Arsenal</p>
          </div>
        </div>
        {!editingId && (
          <button onClick={seedSkills} disabled={loading} className="px-6 py-4 bg-accent/10 border border-accent text-purple-300 hover:text-accent hover:bg-accent/20 hover:border-accent rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3">
            <Database className="w-4 h-4" /> Import Default Skills
          </button>
        )}
      </div>

      <form onSubmit={handleSaveSkill} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-6 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          
          <div className="space-y-3 relative">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Hash className="w-3 h-3 text-[#d8b4fe]" /> Technology Name</label>
            <div className="relative">
              <input type="text" value={name} 
                onChange={e => {
                  setName(e.target.value);
                  setShowDropdown(true);
                  if(!iconUrl && skillIcons[e.target.value]) setIconUrl(skillIcons[e.target.value]);
                }} 
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. React" />
              <AnimatePresence>
                {showDropdown && filteredTools.length > 0 && (
                  <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-surface border border-accent rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden max-h-48 overflow-y-auto">
                    {filteredTools.map(tool => (
                      <div key={tool} onMouseDown={(e) => e.preventDefault()} onClick={() => { setName(tool); setIconUrl(skillIcons[tool]); setShowDropdown(false); }} className="px-5 py-3 text-sm font-bold tracking-wider text-purple-100 hover:bg-accent/20 hover:text-accent cursor-pointer transition-colors border-b border-accent last:border-0 flex items-center gap-3">
                        {skillIcons[tool] ? <img src={skillIcons[tool]} alt={tool} className="w-5 h-5 object-contain" /> : <Code size={16} />}
                        {tool}
                      </div>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><ImageIcon className="w-3 h-3 text-[#d8b4fe]" /> Devicon URL</label>
            <input type="text" value={iconUrl} onChange={e => setIconUrl(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="https://raw...svg" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Layers className="w-3 h-3 text-[#d8b4fe]" /> Marquee Row Target</label>
            <select value={row} onChange={e => setRow(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold appearance-none">
              <option value="1">Row 1 (Moves Right)</option>
              <option value="2">Row 2 (Moves Left)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 relative z-10">
           <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)} 
             {editingId ? "Update Skill" : "Add Skill"}
           </button>
           {editingId && (
             <button type="button" onClick={resetForm} className="w-full md:w-auto px-6 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center transition-all">Cancel</button>
           )}
           {iconUrl && (
             <div className="ml-auto w-12 h-12 bg-surface/20 border border-borderColor rounded-xl p-2 flex items-center justify-center">
                <img src={iconUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.target.style.opacity = 0} />
             </div>
           )}
        </div>
      </form>

      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)]">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Active Arsenal</h3>
            <button onClick={fetchSkills} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 text-white ${fetching ? 'animate-spin' : ''}`} />
            </button>
         </div>

         {fetching && skills.length === 0 ? (
           <div className="flex justify-center py-20"><RefreshCw className="w-8 h-8 animate-spin text-accent" /></div>
         ) : skills.length === 0 ? (
           <div className="text-center py-20 text-accent/30 uppercase tracking-widest text-[11px] font-bold border border-dashed border-accent rounded-2xl">No skills configured.</div>
         ) : (
           <div className="overflow-x-auto relative z-10">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-accent text-[10px] font-black uppercase tracking-[0.2em] text-accent/50">
                   <th className="py-5 px-6 w-16">Icon</th>
                   <th className="py-5 px-6">Name</th>
                   <th className="py-5 px-6">Row</th>
                   <th className="py-5 px-6 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-purple-500/10">
                 {skills.map(skill => (
                   <tr key={skill.id} className="hover:bg-background transition-colors group">
                     <td className="py-5 px-6">
                        <div className="w-10 h-10 p-2 bg-accent/10 border border-accent rounded-xl flex items-center justify-center overflow-hidden">
                           {(skill.iconUrl || skill.icon) ? (
                             <>
                                <img 
                                   src={skill.iconUrl || skill.icon} 
                                   alt={skill.name} 
                                   className="w-full h-full object-contain" 
                                   onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} 
                                />
                                <Code size={18} className="text-accent hidden" />
                             </>
                           ) : (
                             <Code size={18} className="text-accent" />
                           )}
                        </div>
                     </td>
                     <td className="py-5 px-6"><span className="text-[12px] font-black text-accent uppercase tracking-wider">{skill.name}</span></td>
                     <td className="py-5 px-6"><span className="text-[9px] font-bold text-accent px-3 py-1.5 rounded-lg bg-accent/10 border border-accent">ROW {skill.row}</span></td>
                     <td className="py-5 px-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button onClick={() => handleEdit(skill)} className="p-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl transition-all border border-accent opacity-0 group-hover:opacity-100"><Edit2 className="w-4 h-4" /></button>
                         <button onClick={() => handleDeleteSkill(skill.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/20 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}
      </div>
    </div>
  );
};
export default SkillsManager;
