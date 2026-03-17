import { useState, useEffect } from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../firebase';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Inject Firebase Fetch Logic Here
    // const fetchMessages = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "messages"));
    //     const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     // Sort by timestamp descending
    //     msgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    //     setMessages(msgs);
    //   } catch (error) {
    //     console.error("Error fetching messages:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchMessages();
    
    // Placeholder data to simulate until Firebase is connected
    setTimeout(() => {
        setMessages([
           { id: '1', name: 'System Tester', email: 'test@admin.com', subject: 'Initial Connection', message: 'Hello! I am verifying the Firebase configuration.', timestamp: new Date().toISOString() }
        ]);
        setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id) => {
    // TODO: Inject Firebase Delete Logic Here
    // try {
    //   await deleteDoc(doc(db, "messages", id));
    //   setMessages(messages.filter(msg => msg.id !== id));
    // } catch (error) {
    //   console.error("Error deleting document: ", error);
    // }
    console.log("Deleted message payload:", id);
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Manage <span className="text-primary italic">Messages</span></h1>
           <p className="text-secondary tracking-tight">Read and clear incoming communications from the portfolio.</p>
         </div>
         <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
            <MessageSquare size={24} className="text-primary" />
         </div>
      </div>

      <div className="bg-[#05011a]/60 border border-white/10 rounded-[2rem] backdrop-blur-xl p-8">
         {loading ? (
             <div className="flex justify-center items-center py-20">
                 <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
         ) : messages.length === 0 ? (
             <div className="text-center py-20 text-secondary/60">
                 <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                 <p className="text-sm font-bold uppercase tracking-widest">Inbox Empty</p>
             </div>
         ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                   <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-secondary/60">
                     <th className="pb-4 pl-4 w-1/5">Sender Identity</th>
                     <th className="pb-4 w-1/5">Timestamp</th>
                     <th className="pb-4 w-2/5">Payload</th>
                     <th className="pb-4 pr-4 w-1/5 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {messages.map((msg) => (
                     <tr key={msg.id} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                       <td className="py-6 pl-4">
                          <p className="text-white font-bold">{msg.name}</p>
                          <a href={`mailto:${msg.email}`} className="text-[10px] font-bold tracking-widest uppercase text-primary hover:underline">{msg.email}</a>
                       </td>
                       <td className="py-6 text-secondary text-xs font-bold uppercase tracking-widest">
                          {new Date(msg.timestamp).toLocaleDateString()}
                       </td>
                       <td className="py-6 pr-8">
                          <p className="text-white text-sm font-bold mb-1">{msg.subject}</p>
                          <p className="text-secondary/80 text-xs leading-relaxed">{msg.message}</p>
                       </td>
                       <td className="py-6 pr-4 text-right align-top">
                         <button 
                           onClick={() => handleDelete(msg.id)}
                           className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" 
                           title="Delete Payload"
                         >
                            <Trash2 size={16} />
                         </button>
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

export default ManageMessages;
