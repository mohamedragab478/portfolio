import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Award, RefreshCw, Trash2, ExternalLink, Briefcase } from 'lucide-react';

const CertsManager = () => {
  const [certs, setCerts] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchCerts = async () => {
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, "certifications"));
      setCerts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching certs:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Revoke this certification?")) return;
    try {
      await deleteDoc(doc(db, "certifications", id));
      fetchCerts();
    } catch (error) {
      console.error("Error deleting cert:", error);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <Award className="text-[#d8b4fe] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Certifications Archive</h2>
          <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage verified credentials</p>
        </div>
      </div>

      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)]">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Verified Database</h3>
            <button onClick={fetchCerts} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
            </button>
         </div>

         {fetching && certs.length === 0 ? (
           <div className="flex justify-center py-12"><RefreshCw className="w-8 h-8 animate-spin text-white" /></div>
         ) : certs.length === 0 ? (
           <div className="text-center py-12 bg-[#7c3aed]/5 font-bold uppercase tracking-widest text-[11px] text-white/40 border border-dashed border-[#7c3aed]/30 rounded-2xl">
             No credentials on record.
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
             {certs.map(cert => (
               <div key={cert.id} className="p-6 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center text-center group hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 transition-all relative">
                 <button onClick={() => handleDelete(cert.id)} className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-red-500/20 z-20">
                   <Trash2 className="w-4 h-4" />
                 </button>
                 
                 {cert.syncedFromTraining && (
                   <div className="absolute top-4 left-4 p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center gap-2 group/tooltip">
                      <Briefcase className="w-3 h-3 text-cyan-400" />
                      <span className="absolute left-full ml-2 px-2 py-1 bg-[#030014] border border-cyan-500/30 text-cyan-400 text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Synced from Training</span>
                   </div>
                 )}

                 <div className="w-16 h-16 flex items-center justify-center p-3 bg-white/10 border border-white/20 rounded-2xl mb-4 shadow-inner">
                   {cert.issuerLogo || cert.issuerLogoUrl ? <img src={cert.issuerLogo || cert.issuerLogoUrl} alt={cert.title} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" /> : <Award className="w-8 h-8 text-[#d8b4fe]/50" />}
                 </div>
                 
                 <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 leading-relaxed">{cert.title}</h4>
                 {cert.issuer && <p className="text-[10px] font-bold uppercase tracking-widest text-[#d8b4fe] mb-6 border-b border-white/10 pb-4 w-full">{cert.issuer}</p>}
                 
                 <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="mt-auto flex items-center gap-2 px-4 py-2 bg-white/5 text-white hover:text-[#d8b4fe] hover:bg-white/10 text-[10px] font-black tracking-widest uppercase rounded-lg border border-white/10 transition-all">
                   Verify <ExternalLink size={12} />
                 </a>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
};

export default CertsManager;
