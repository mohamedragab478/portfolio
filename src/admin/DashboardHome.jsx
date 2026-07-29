import { useState, useEffect } from 'react';
import { getProjects, getMessages } from '../api';
import { LayoutDashboard, Activity, Database, Zap, MessageSquare, Globe, ArrowUpRight, Loader2 } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    unreadMessages: 0,
    recentMessages: [],
    analytics: null,
    loading: true
  });
  const [gaError, setGaError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Fetch Projects Count
        const projects = await getProjects() || [];
        
        // 2. Fetch Messages
        const messages = await getMessages() || [];
        
        // 3. Filter unread and recent messages
        const unreadCount = messages.filter(m => !m.read).length;
        const recent = [...messages]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        // 4. Fetch GA4 Analytics via our internal API
        let analyticsData = null;
        try {
          const res = await fetch('/api/analytics');
          if (!res.ok) {
            const data = await res.json();
            setGaError(data.error);
            console.error("Dashboard GA4 Fetch Error:", data.error);
          } else {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              analyticsData = await res.json();
            } else {
              console.warn("Analytics uplink returned non-JSON response (expected in local dev)");
            }
          }
        } catch (err) {
          console.warn("Analytics uplink failed:", err);
        }

        setStats({
          projects: projects.length,
          unreadMessages: unreadCount,
          recentMessages: recent,
          analytics: analyticsData,
          loading: false
        });
      } catch (error) {
        console.error("Dashboard data extraction failed:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-[#7c3aed] animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 animate-pulse">Establishing Secure Uplink...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-[#7c3aed]/10 rounded-2xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <LayoutDashboard className="text-[#d8b4fe] w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe] drop-shadow-md">Command Center</h1>
          <p className="text-muted/60 text-sm font-bold tracking-[0.2em] mt-1">Real-time Analytics & System Control</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Active Modules (Projects) */}
        <div className="p-8 rounded-[2rem] bg-[#7c3aed]/5 border border-white/5 relative overflow-hidden group hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-all duration-500 shadow-lg">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <Database className="w-16 h-16 text-[#d8b4fe]" />
          </div>
          <span className="text-muted/60 text-xs font-black uppercase tracking-widest mb-4 block">Active Modules</span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{stats.projects}</span>
            <span className="text-[10px] font-black text-[#d8b4fe] uppercase tracking-widest">Protocols</span>
          </div>
        </div>

        {/* Card 2: Network Status (GA4) */}
        <div className="p-8 rounded-[2rem] bg-[#7c3aed]/5 border border-white/5 relative overflow-hidden group hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-500 shadow-lg">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <Globe className="w-16 h-16 text-emerald-400" />
          </div>
          <span className="text-muted/60 text-xs font-black uppercase tracking-widest mb-4 block">System Traffic (7D)</span>
          {stats.analytics ? (
            <div className="flex flex-col">
               <span className="text-5xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">{stats.analytics.totalViews}</span>
               <span className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest mt-1">Page Views • {stats.analytics.activeUsers} Users</span>
            </div>
          ) : (
            <span className="text-xl font-black text-white/30 uppercase tracking-widest">Establishing Link...</span>
          )}
        </div>

        {/* Card 3: Comms Load (Messages) */}
        <div className={`p-8 rounded-[2rem] bg-[#7c3aed]/5 border border-white/5 relative overflow-hidden group transition-all duration-500 shadow-lg ${stats.unreadMessages > 0 ? 'hover:border-rose-500/40 hover:bg-rose-500/5' : 'hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10'}`}>
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <MessageSquare className={`w-16 h-16 ${stats.unreadMessages > 0 ? 'text-rose-400' : 'text-[#d8b4fe]'}`} />
          </div>
          <span className="text-muted/60 text-xs font-black uppercase tracking-widest mb-4 block">Communication Load</span>
          <div className="flex items-baseline gap-2">
            <m.span 
              animate={stats.unreadMessages > 0 ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`text-5xl font-black ${stats.unreadMessages > 0 ? 'text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'text-white'}`}
            >
              {stats.unreadMessages}
            </m.span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${stats.unreadMessages > 0 ? 'text-rose-400/60' : 'text-[#d8b4fe]'}`}>Unread</span>
          </div>
        </div>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
         {/* Recent Messages */}
         <div className="p-8 rounded-[2.5rem] bg-[#7c3aed]/5 border border-white/5 min-h-[300px] shadow-lg group hover:border-[#7c3aed]/20 transition-all">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-sm font-black uppercase text-white tracking-[0.3em] flex items-center gap-3">
                  <Zap size={16} className="text-[#d8b4fe]" /> Recent Uplinks
               </h3>
               <ArrowUpRight size={16} className="text-white/20 group-hover:text-[#d8b4fe] transition-colors" />
            </div>
            
            {stats.recentMessages.length > 0 ? (
              <div className="space-y-4">
                 {stats.recentMessages.map(msg => (
                   <div key={msg.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#7c3aed]/30 transition-all group/msg">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[11px] font-black text-white/90">{msg.name}</span>
                         <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[10px] text-white/50 line-clamp-1 italic font-medium">"{msg.message}"</p>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-muted/40 text-[10px] font-black tracking-widest uppercase border border-dashed border-[#7c3aed]/20 rounded-[1.5rem]">
                No recent activity recorded
              </div>
            )}
         </div>

         {/* System Traffic / Stats Details */}
         <div className="p-8 rounded-[2.5rem] bg-[#7c3aed]/5 border border-white/5 min-h-[300px] shadow-lg group hover:border-[#7c3aed]/20 transition-all">
            <h3 className="text-sm font-black uppercase text-white tracking-[0.3em] mb-10">System Status</h3>
            <div className="space-y-6">
               <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Database Node</span>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Optimized</span>
               </div>
               <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">GA4 Link</span>
                  {stats.analytics ? (
                     <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Encrypted Uplink</span>
                  ) : (
                     <span className="text-xs font-black text-rose-400 uppercase tracking-widest animate-pulse">Disconnected</span>
                  )}
               </div>
               <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">API Latency</span>
                  <span className="text-xs font-black text-white/80 uppercase tracking-widest">12ms</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;
