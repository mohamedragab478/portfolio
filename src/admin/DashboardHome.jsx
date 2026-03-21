import { LayoutDashboard, Activity, Database, Zap } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-[#7c3aed]/10 rounded-2xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <LayoutDashboard className="text-[#d8b4fe] w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe] drop-shadow-md">Command Center</h1>
          <p className="text-muted/60 text-sm font-bold tracking-[0.2em] mt-1">System Overview & Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-[#7c3aed]/5 border border-[#7c3aed]/20 relative overflow-hidden group hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-all duration-500 shadow-lg shadow-[#7c3aed]/5">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <Database className="w-16 h-16 text-[#d8b4fe]" />
          </div>
          <span className="text-muted/60 text-xs font-black uppercase tracking-widest mb-4 block">Active Modules</span>
          <span className="text-5xl font-black text-white">5</span>
        </div>
        <div className="p-8 rounded-[2rem] bg-[#7c3aed]/5 border border-[#7c3aed]/20 relative overflow-hidden group hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-all duration-500 shadow-lg shadow-[#7c3aed]/5">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <Activity className="w-16 h-16 text-[#d8b4fe]" />
          </div>
          <span className="text-muted/60 text-xs font-black uppercase tracking-widest mb-4 block">System Load</span>
          <span className="text-5xl font-black text-white">Optimal</span>
        </div>
        <div className="p-8 rounded-[2rem] bg-[#7c3aed]/5 border border-[#7c3aed]/20 relative overflow-hidden group hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-all duration-500 shadow-lg shadow-[#7c3aed]/5">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <Zap className="w-16 h-16 text-[#d8b4fe]" />
          </div>
          <span className="text-muted/60 text-xs font-black uppercase tracking-widest mb-4 block">Network Status</span>
          <span className="text-5xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
         <div className="p-8 rounded-[2.5rem] bg-[#7c3aed]/5 border border-[#7c3aed]/20 min-h-[300px] shadow-lg shadow-[#7c3aed]/5">
            <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6">Recent Uplinks</h3>
            <div className="flex items-center justify-center h-48 text-muted/40 text-xs font-bold tracking-widest uppercase border border-dashed border-[#7c3aed]/30 rounded-[1.5rem]">
              No recent activity recorded
            </div>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-[#7c3aed]/5 border border-[#7c3aed]/20 min-h-[300px] shadow-lg shadow-[#7c3aed]/5">
            <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6">System Health</h3>
            <div className="flex items-center justify-center h-48 text-muted/40 text-xs font-bold tracking-widest uppercase border border-dashed border-[#7c3aed]/30 rounded-[1.5rem]">
              All systems nominal
            </div>
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;
