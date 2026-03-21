import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { m, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Plus, RefreshCw, FolderPlus, Github, Code, Hash, AlignLeft, Globe, X, Database, CheckCircle2 } from 'lucide-react';
import { skillIcons } from '../utils/skillIcons';

const POPULAR_TOOLS = ['React', 'Tailwind CSS', 'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'FastAPI', 'Flask', 'Docker', 'YOLO', 'LangChain', 'Pinecone', 'Vite', 'Git'];

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyAchievements, setKeyAchievements] = useState([]);
  const [achievementInput, setAchievementInput] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const filteredTools = POPULAR_TOOLS.filter(tool => 
    tool.toLowerCase().includes(searchTerm.toLowerCase()) && !techStack.includes(tool)
  );

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const resetForm = () => {
    setTitle(''); setCategory(''); setDescription(''); setTechStack([]);
    setSearchTerm(''); setGithubLink(''); setImageUrl(''); setKeyAchievements([]);
    setAchievementInput(''); setEditingId(null);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    const projectData = {
      title, category, description, techStack, keyAchievements, githubLink,
      image: imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
      } else {
        await addDoc(collection(db, "projects"), { ...projectData, createdAt: new Date().toISOString() });
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj.id);
    setTitle(proj.title || '');
    setCategory(proj.category || '');
    setDescription(proj.description || '');
    setTechStack(Array.isArray(proj.techStack) ? proj.techStack : []);
    setKeyAchievements(Array.isArray(proj.keyAchievements) ? proj.keyAchievements : []);
    setGithubLink(proj.githubLink || '');
    setImageUrl(proj.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveTag = (tagToRemove) => setTechStack(techStack.filter(tag => tag !== tagToRemove));

  const handleAddAchievement = (e) => {
    if (e.key === 'Enter' && achievementInput.trim() !== '') {
      e.preventDefault();
      if (!keyAchievements.includes(achievementInput.trim())) setKeyAchievements([...keyAchievements, achievementInput.trim()]);
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (achToRemove) => setKeyAchievements(keyAchievements.filter(ach => ach !== achToRemove));

  const handleDeleteProject = async (id) => {
    if(!window.confirm("Are you sure you want to terminate this protocol?")) return;
    try {
      if(id === editingId) resetForm();
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const seedProjects = async () => {
    if(!window.confirm("Import legacy projects? This will add hardcoded data directly to the active Firestore database.")) return;
    setLoading(true);
    const legacyProjects = [
      { 
        title: "ThyraX - Thyroid Cancer Analysis", category: "AI / Medical", 
        description: "Deep learning platform for real-time ultrasound nodule classification utilizing custom UNet++ architecture and Streamlit deployment.", 
        techStack: ["PyTorch", "FastAPI", "Python", "Docker"], githubLink: "#", 
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
        keyAchievements: ["Architected UNet++ segmentation model", "Achieved 97.5% classification accuracy", "Deployed via Dockerized FastAPI"]
      },
      { 
        title: "Aura CMS Backend", category: "Web Development", 
        description: "A highly resilient content management system featuring a sleek glowing neon-purple interface mapped completely to dynamic Firestore architecture.", 
        techStack: ["React", "Tailwind CSS", "Vite", "Firebase"], githubLink: "https://github.com", 
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        keyAchievements: ["Engineered complete CRUD system", "Implemented active Neon styling presets", "Migrated public arrays to NoSQL tables"]
      }
    ];
    try {
      for (const proj of legacyProjects) {
        await addDoc(collection(db, "projects"), { ...proj, createdAt: new Date().toISOString() });
      }
      alert("Legacy systems imported and mapped successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error seeding projects:", error);
      alert("System failed to inject legacy seed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            {editingId ? <Edit2 className="text-[#d8b4fe] w-6 h-6" /> : <FolderPlus className="text-[#d8b4fe] w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">{editingId ? 'Modify Protocol' : 'Add Protocol'}</h2>
            <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">{editingId ? 'Update active parameters' : 'Initialize new project entry'}</p>
          </div>
        </div>
        {!editingId && (
          <button onClick={seedProjects} disabled={loading} className="px-6 py-4 bg-accent/10 border border-accent text-purple-300 hover:text-accent hover:bg-accent/20 hover:border-accent rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_0_15px_rgba(192,132,252,0.1)] hover:shadow-[0_0_25px_rgba(192,132,252,0.3)]">
            <Database className="w-4 h-4" /> Import Legacy Projects
          </button>
        )}
      </div>

      <form onSubmit={handleSaveProject} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-6 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Hash className="w-3 h-3 text-[#d8b4fe]" /> Protocol Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. Neural Nexus" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Hash className="w-3 h-3 text-[#d8b4fe]" /> Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. AI Research" />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><AlignLeft className="w-3 h-3 text-[#d8b4fe]" /> Mission Overview</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold resize-none placeholder:text-muted/40" placeholder="Detailed functional and technical description..." />
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#d8b4fe]" /> Key Achievements</label>
          <div className="relative">
             <input type="text" value={achievementInput} onChange={e => setAchievementInput(e.target.value)} onKeyDown={handleAddAchievement} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="Type an achievement then press Enter" />
          </div>
          {keyAchievements.length > 0 && (
             <div className="flex flex-col gap-2 mt-3 p-4 bg-[#7c3aed]/5 rounded-xl border border-[#7c3aed]/20">
               <AnimatePresence>
                 {keyAchievements.map(ach => (
                    <m.div key={ach} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl group/ach">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#d8b4fe] shrink-0" />
                          <span className="text-xs font-bold text-white">{ach}</span>
                       </div>
                       <button type="button" onClick={() => handleRemoveAchievement(ach)} className="p-1.5 opacity-0 md:opacity-100 lg:opacity-0 group-hover/ach:opacity-100 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"><X className="w-4 h-4" /></button>
                    </m.div>
                 ))}
               </AnimatePresence>
             </div>
          )}
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Globe className="w-3 h-3 text-[#d8b4fe]" /> Visual Asset URL</label>
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="Paste Image Direct URL (e.g., from Imgur)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Code className="w-3 h-3 text-[#d8b4fe]" /> Tech Tools</label>
            <div className="relative">
              <input 
                type="text" value={searchTerm} 
                onChange={e => { setSearchTerm(e.target.value); setShowDropdown(true); }} 
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim() !== '') {
                    e.preventDefault();
                    if (!techStack.includes(searchTerm.trim())) setTechStack([...techStack, searchTerm.trim()]);
                    setSearchTerm(''); setShowDropdown(false);
                  }
                }} 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" 
                placeholder="Type a tool then press Enter"  
              />
              <AnimatePresence>
                {showDropdown && searchTerm && filteredTools.length > 0 && (
                  <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-surface border border-accent rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden max-h-48 overflow-y-auto">
                    {filteredTools.map(tool => (
                      <div key={tool} onMouseDown={(e) => e.preventDefault()} onClick={() => { if (!techStack.includes(tool)) setTechStack([...techStack, tool]); setSearchTerm(''); setShowDropdown(false); }} className="px-5 py-3 text-sm font-bold tracking-wider text-purple-100 hover:bg-accent/20 hover:text-accent cursor-pointer transition-colors border-b border-accent last:border-0 flex items-center gap-3">
                        {skillIcons[tool] ? <img src={skillIcons[tool]} alt={tool} className="w-5 h-5 object-contain" /> : <Code size={16} />}
                        {tool}
                      </div>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 p-3 bg-[#7c3aed]/5 rounded-xl border border-[#7c3aed]/20 min-h-[48px]">
                <AnimatePresence>
                  {techStack.map(tag => (
                    <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                      {skillIcons[tag] ? <img src={skillIcons[tag]} alt={tag} className="w-4 h-4 object-contain opacity-80" /> : <Code size={14} className="opacity-80 text-[#d8b4fe]" />}
                      {tag} 
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:bg-white/10 ml-1 hover:text-[#d8b4fe] rounded-full p-0.5 transition-colors text-white/50"><X size={12} /></button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Github className="w-3 h-3 text-[#d8b4fe]" /> Source Protocol URL</label>
            <input type="url" value={githubLink} onChange={e => setGithubLink(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
           <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)} 
             {loading ? "Processing..." : (editingId ? "Update Protocol" : "Deploy Protocol")}
           </button>
           {editingId && (
             <button type="button" onClick={resetForm} className="w-full md:w-auto px-6 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all">
               Cancel Update
             </button>
           )}
        </div>
      </form>

      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)]">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Active Protocols</h3>
            <button onClick={fetchProjects} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
            </button>
         </div>

         {fetching && projects.length === 0 ? (
           <div className="flex justify-center py-20"><RefreshCw className="w-8 h-8 animate-spin text-accent" /></div>
         ) : projects.length === 0 ? (
           <div className="text-center py-20 bg-background font-bold uppercase tracking-widest text-[11px] text-accent/30 border border-dashed border-accent rounded-2xl">
             No active projects found.
           </div>
         ) : (
           <div className="overflow-x-auto relative z-10">
             <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                 <tr className="border-b border-accent text-[10px] font-black uppercase tracking-[0.2em] text-accent/50">
                   <th className="py-5 px-6">Title</th>
                   <th className="py-5 px-6">Category</th>
                   <th className="py-5 px-6 w-[35%]">Core Architecture</th>
                   <th className="py-5 px-6 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-purple-500/10">
                 {projects.map(proj => (
                   <tr key={proj.id} className="hover:bg-background transition-colors group">
                     <td className="py-5 px-6"><span className="text-[13px] font-black tracking-tight text-accent block truncate max-w-[200px]">{proj.title}</span></td>
                     <td className="py-5 px-6"><span className="text-[9px] font-black text-accent bg-accent/10 border border-accent px-3 py-1.5 rounded-lg uppercase tracking-[0.2em]">{proj.category}</span></td>
                     <td className="py-5 px-6"><div className="flex items-center gap-2 flex-wrap">{proj.techStack?.map((tech, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-[9px] font-bold text-purple-100/70 bg-surface/40 border border-accent px-2.5 py-1 rounded-md uppercase tracking-wider">
                           {skillIcons[tech] ? <img src={skillIcons[tech]} alt={tech} className="w-3 h-3 object-contain opacity-70" /> : null}
                           {tech}
                        </span>
                     ))}</div></td>
                     <td className="py-5 px-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button onClick={() => handleEdit(proj)} className="p-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl transition-all border border-accent opacity-0 md:opacity-100 lg:opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(192,132,252,0)] hover:shadow-[0_0_15px_rgba(192,132,252,0.2)]"><Edit2 className="w-4 h-4" /></button>
                         <button onClick={() => handleDeleteProject(proj.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/20 opacity-0 md:opacity-100 lg:opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(239,68,68,0)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"><Trash2 className="w-4 h-4" /></button>
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

export default ProjectsManager;
