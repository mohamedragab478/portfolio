import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    // TODO: Inject Firebase/Supabase Fetch Logic Here
    // Example: const data = await fetchCollection('certifications');
    // setCertifications(data);
  }, []);

  const handleDelete = (id) => {
    // TODO: Inject Firebase/Supabase Delete Logic Here
    // Example: await deleteDocument('certifications', id);
    console.log("Delete cert:", id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Manage <span className="text-primary italic">Certifications</span></h1>
           <p className="text-secondary tracking-tight">Add or update records of your training and official tracks.</p>
         </div>
         <button className="px-6 py-3 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center gap-2">
            <Plus size={16} /> New Cert
         </button>
      </div>

      <div className="bg-[#05011a]/60 border border-white/10 rounded-[2rem] backdrop-blur-xl p-8">
         {/* Form placeholder */}
         <div className="text-secondary/60 text-sm font-bold uppercase text-center py-10 border-2 border-dashed border-white/5 rounded-2xl mb-8">
            [ Form: Title, Issuer, Duration/Date, Skills ]
         </div>

         {/* Data Table */}
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-secondary/60">
                 <th className="pb-4 pl-4">Title</th>
                 <th className="pb-4">Issuer</th>
                 <th className="pb-4">Date/Duration</th>
                 <th className="pb-4 pr-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {/* Example Row Mapping Placeholder */}
               <tr className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                 <td className="py-4 pl-4 text-white font-bold">AI Track</td>
                 <td className="py-4 text-secondary text-sm">NTI / Huawei</td>
                 <td className="py-4 text-primary font-bold text-xs uppercase">80 hrs</td>
                 <td className="py-4 pr-4 text-right">
                   <button className="p-2 text-secondary hover:text-white transition-colors" title="Edit"><Edit2 size={16} /></button>
                   <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export default ManageCertifications;
