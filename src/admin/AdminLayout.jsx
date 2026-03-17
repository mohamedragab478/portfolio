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
    <div className="relative min-h-screen flex bg-[#030014] text-white overflow-hidden">
      <GlobalBackground />
      
      {/* Sidebar */}
      <aside className="relative z-20 w-64 border-r border-white/10 bg-[#05011a]/80 backdrop-blur-2xl flex flex-col">
        <div className="p-8 border-b border-white/10">
          <span className="text-2xl font-black tracking-tighter uppercase text-white">
            Admin<span className="text-primary italic">.Panel</span>
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
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]' 
                    : 'text-secondary hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
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
