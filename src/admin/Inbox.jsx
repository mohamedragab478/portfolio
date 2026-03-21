import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Inbox as InboxIcon, RefreshCw, Trash2, MailOpen } from 'lucide-react';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchMessages = async () => {
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, "messages"));
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this transmission?")) return;
    try {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
    } catch (error) {
      console.error("Error deleting msg:", error);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <InboxIcon className="text-[#d8b4fe] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Transmission Inbox</h2>
          <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Review incoming secure communications</p>
        </div>
      </div>

      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)]">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Encrypted Messages</h3>
            <button onClick={fetchMessages} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
            </button>
         </div>

         {fetching && messages.length === 0 ? (
           <div className="flex justify-center py-20"><RefreshCw className="w-8 h-8 animate-spin text-white" /></div>
         ) : messages.length === 0 ? (
           <div className="text-center py-20 bg-[#7c3aed]/5 font-bold uppercase tracking-widest text-[11px] text-white/40 border border-dashed border-[#7c3aed]/30 rounded-2xl">
             No transmissions detected.
           </div>
         ) : (
           <div className="space-y-4 relative z-10">
             {messages.map(msg => (
               <div key={msg.id} className="p-6 border border-white/10 rounded-2xl bg-white/5 flex flex-col md:flex-row gap-6 md:items-start group hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                 <div className="p-4 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_15px_rgba(124,58,237,0.1)] shrink-0">
                    <MailOpen className="w-6 h-6 text-[#d8b4fe]" />
                 </div>
                 <div className="flex-1">
                   <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                     <div>
                       <h4 className="text-lg font-black text-white">{msg.name}</h4>
                       <p className="text-white/60 text-xs tracking-widest uppercase font-bold mt-1">{msg.email}</p>
                     </div>
                     <div className="text-[10px] font-black tracking-widest uppercase text-[#d8b4fe]/80 bg-[#7c3aed]/10 px-3 py-1.5 rounded-lg border border-[#7c3aed]/30">
                       {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Unknown Timestamp'}
                     </div>
                   </div>
                   <div className="p-5 bg-black/20 rounded-xl border border-white/5">
                     <p className="text-sm font-medium text-white/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                   </div>
                 </div>
                 <button onClick={() => handleDelete(msg.id)} className="shrink-0 p-4 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 rounded-xl md:opacity-0 group-hover:opacity-100 transition-all border border-red-500/20 flex flex-col items-center justify-center gap-2">
                   <Trash2 className="w-5 h-5" />
                   <span className="text-[8px] font-black uppercase tracking-widest">Delete</span>
                 </button>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
};

export default Inbox;
