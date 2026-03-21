import { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Settings, Users, FileText } from 'lucide-react';
import ProjectsManager from './ProjectsManager';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-accent flex">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-surface/20 border-r border-borderColor hidden md:flex flex-col">
        <div className="p-6 border-b border-borderColor">
          <h2 className="text-xl font-black uppercase tracking-widest text-accent">Aura CMS</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'dashboard' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'hover:bg-surface/20 text-accent/70 hover:text-accent border border-transparent'}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'projects' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'hover:bg-surface/20 text-accent/70 hover:text-accent border border-transparent'}`}
          >
            <FileText size={18} />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'messages' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'hover:bg-surface/20 text-accent/70 hover:text-accent border border-transparent'}`}
          >
            <Users size={18} />
            Messages
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'hover:bg-surface/20 text-accent/70 hover:text-accent border border-transparent'}`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-borderColor">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold text-sm transition-all border border-red-500/20 group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="h-20 border-b border-borderColor flex items-center justify-between px-8 bg-surface/20 backdrop-blur-md relative z-10">
          <h1 className="text-2xl font-black uppercase tracking-tight">Welcome to <span className="text-accent">Amir Aura CMS</span></h1>
          
          {/* Mobile Logout */}
          <button 
            onClick={handleLogout}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-bold text-xs transition-all border border-red-500/20"
          >
            <LogOut size={14} />
            Logout
          </button>
        </header>

        <div className="p-8 flex-1 relative z-10 overflow-y-auto w-full">
          {activeTab === 'dashboard' ? (
            <div className="animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-surface/20 border border-borderColor h-32 flex flex-col justify-center shadow-lg">
                  <span className="text-accent/50 text-xs font-black uppercase tracking-widest mb-2">Total Projects</span>
                  <span className="text-4xl font-black text-accent">12</span>
                </div>
                <div className="p-6 rounded-2xl bg-surface/20 border border-borderColor h-32 flex flex-col justify-center shadow-lg">
                  <span className="text-accent/50 text-xs font-black uppercase tracking-widest mb-2">Active Messages</span>
                  <span className="text-4xl font-black text-accent">4</span>
                </div>
                <div className="p-6 rounded-2xl bg-surface/20 border border-borderColor h-32 flex flex-col justify-center shadow-lg">
                  <span className="text-accent/50 text-xs font-black uppercase tracking-widest mb-2">System Status</span>
                  <span className="text-2xl font-black text-green-400 uppercase tracking-widest">Online</span>
                </div>
              </div>
              
              <div className="mt-8 p-8 rounded-2xl bg-surface/20 border border-borderColor min-h-[400px]">
                <h3 className="text-lg font-black uppercase text-accent/50 tracking-widest mb-6">Recent Activity</h3>
                <div className="flex items-center justify-center h-full text-accent/30 text-sm font-medium">
                  Data visualizations will appear here. No recent activity.
                </div>
              </div>
            </div>
          ) : activeTab === 'projects' ? (
            <ProjectsManager />
          ) : (
            <div className="flex justify-center items-center h-[50vh] text-accent/30 text-xs font-black tracking-widest uppercase border border-borderColor border-dashed rounded-3xl animate-in zoom-in-95 duration-500">
              Module "{activeTab}" under construction
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
