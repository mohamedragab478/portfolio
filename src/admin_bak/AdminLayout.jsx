import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, Award, Layers, User, LogOut, MessageSquare } from 'lucide-react';
import GlobalBackground from '../components/GlobalBackground';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Inject Firebase/Supabase Auth SignOut Logic Here
    // For now, redirect to login
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase size={20} /> },
    { name: 'Certifications', path: '/admin/certifications', icon: <Award size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Layers size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="relative min-h-screen flex bg-background text-accent overflow-hidden">
      <GlobalBackground />
      
      {/* Sidebar */}
      <aside className="relative z-20 w-64 border-r border-borderColor bg-[#05011a]/80 backdrop-blur-2xl flex flex-col">
        <div className="p-8 border-b border-borderColor">
          <span className="text-2xl font-black tracking-tighter uppercase text-accent">
            Admin<span className="text-accent italic">.Panel</span>
          </span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold uppercase tracking-widest text-xs ${
                  isActive 
                    ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_20px_rgba(13,148,136,0.2)]' 
                    : 'text-muted hover:bg-surface/20 hover:text-accent'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-borderColor">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 overflow-y-auto p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
