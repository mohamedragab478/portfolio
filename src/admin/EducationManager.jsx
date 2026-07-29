import { useState, useEffect } from 'react';
import { getEducationDegree, saveEducationDegree } from '../api';
import { GraduationCap, RefreshCw, Save, MapPin, Calendar, BookOpen, FileText } from 'lucide-react';

const EducationManager = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [degree, setDegree] = useState("B.Sc. Computer Science");
  const [university, setUniversity] = useState("Mansoura University");
  const [location, setLocation] = useState("Mansoura, Egypt");
  const [period, setPeriod] = useState("2020 — 2024");
  const [description, setDescription] = useState("Specialized in Artificial Intelligence and High-Performance Software Engineering. Graduated with a focus on neural architectures and deep learning frameworks.");

  const fetchEducationData = async () => {
    setFetching(true);
    try {
      const data = await getEducationDegree();
      if (data) {
        if (data.degree) setDegree(data.degree);
        if (data.university) setUniversity(data.university);
        if (data.location) setLocation(data.location);
        if (data.period) setPeriod(data.period);
        if (data.description) setDescription(data.description);
      }
    } catch (error) {
      console.error("Error fetching education config:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveEducationDegree({
        degree,
        university,
        location,
        period,
        description
      });
      alert("Education Degree Config Saved!");
    } catch (error) {
      console.error("Error saving education config", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <GraduationCap className="text-[#d8b4fe] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Degree / Education</h2>
            <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage Academic Foundation</p>
          </div>
        </div>
        <button onClick={fetchEducationData} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white shrink-0">
           <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-8 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible z-20">
        
        <div>
           <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#7c3aed]/50" /> Academic Parameters
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><BookOpen className="w-3 h-3 text-[#d8b4fe]" /> Main Degree</label>
               <input type="text" value={degree} onChange={e => setDegree(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" placeholder="e.g. B.Sc. Computer Science" />
             </div>
             
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><GraduationCap className="w-3 h-3 text-[#d8b4fe]" /> University / Institution</label>
               <input type="text" value={university} onChange={e => setUniversity(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>

             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><MapPin className="w-3 h-3 text-[#d8b4fe]" /> Location</label>
               <input type="text" value={location} onChange={e => setLocation(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" placeholder="e.g. Mansoura, Egypt" />
             </div>

             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Calendar className="w-3 h-3 text-[#d8b4fe]" /> Time Period</label>
               <input type="text" value={period} onChange={e => setPeriod(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" placeholder="e.g. 2020 — 2024" />
             </div>
             
             <div className="space-y-3 md:col-span-2">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><FileText className="w-3 h-3 text-[#d8b4fe]" /> Description / Details</label>
               <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold resize-none placeholder:text-muted/40" />
             </div>
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-[#7c3aed]/20">
           <button type="submit" disabled={loading} className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
             Update Degree Record
           </button>
        </div>
      </form>
    </div>
  );
};

export default EducationManager;
