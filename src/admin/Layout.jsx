import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../api';
import { LayoutDashboard, Settings, Users, FileText, Award, Inbox as InboxIcon, LogOut, Hexagon, Phone, User as UserIcon } from 'lucide-react';


const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero', path: '/admin/hero', icon: Hexagon },
    { name: 'Services', icon: Settings, path: '/admin/services' },
    { name: 'Arsenal', path: '/admin/arsenal', icon: FileText },
    { name: 'Training', path: '/admin/training', icon: FileText },
    { name: 'Projects', path: '/admin/projects', icon: FileText },
    { name: 'Education', path: '/admin/education', icon: Award },
    { name: 'Certs', path: '/admin/certs', icon: Award },
    { name: 'Contact Info', path: '/admin/contact', icon: Phone },
    { name: 'Inbox', path: '/admin/inbox', icon: InboxIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans selection:bg-accent/30 bg-background text-primary transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-[#7c3aed]/20 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(124,58,237,0.05)] bg-[#7c3aed]/5 backdrop-blur-xl transition-colors duration-500">
        <div className="p-8 border-b border-[#7c3aed]/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <Hexagon className="text-[#d8b4fe] w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">Aura CMS</h2>

        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto hidden md:block">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => 
                `flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#7c3aed]/20 text-white border border-[#7c3aed]/50 shadow-[0_0_20px_rgba(124,58,237,0.15)] glow-aura' 
                    : 'text-muted/60 hover:bg-[#7c3aed]/10 hover:text-white border border-transparent hover:border-[#7c3aed]/30'
                }`
              }
            >
              <item.icon size={18} className="shrink-0" />
              <span className="uppercase tracking-widest">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Nav */}
        <nav className="md:hidden flex overflow-x-auto p-4 gap-2 no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-[#7c3aed]/20 text-white border border-[#7c3aed]/50 shadow-[0_0_15px_rgba(124,58,237,0.1)]' 
                    : 'text-muted/60 hover:bg-[#7c3aed]/10 hover:text-white border border-transparent hover:border-[#7c3aed]/30'
                }`
              }
            >
              <item.icon size={14} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-[#7c3aed]/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all border border-red-500/20 group shadow-[0_0_15px_rgba(239,68,68,0.05)]"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d8b4fe]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="p-6 md:p-10 flex-1 relative z-10 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
