import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const ManageProfile = () => {
  const [profileData, setProfileData] = useState({
    title: 'AI ENGINEER',
    experienceYears: '1+',
    certificationsCount: '6+',
    cvLink: 'https://drive.google.com/file/d/etc'
  });

  useEffect(() => {
    // TODO: Inject Firebase/Supabase Fetch Logic Here
    // Example: const doc = await fetchDocument('globals', 'profile');
    // setProfileData(doc);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Inject Firebase/Supabase Update Logic Here
    // Example: await updateDocument('globals', 'profile', profileData);
    console.log("Saving new profile settings", profileData);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter text-accent">Manage <span className="text-accent italic">Profile</span></h1>
           <p className="text-muted tracking-tight">Update global hero metrics and CV Links.</p>
         </div>
      </div>

      <form 
        onSubmit={handleSave}
        className="bg-[#05011a]/60 border border-borderColor rounded-[2rem] backdrop-blur-xl p-8 lg:p-12 max-w-3xl space-y-8"
      >
         <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-2">Hero Job Title</label>
               <input 
                 type="text" 
                 value={profileData.title}
                 onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                 className="w-full bg-surface/20 border-2 border-borderColor rounded-2xl p-4 text-accent font-bold focus:border-accent focus:outline-none transition-colors"
               />
            </div>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-2">CV Drive Link</label>
               <input 
                 type="url" 
                 value={profileData.cvLink}
                 onChange={(e) => setProfileData({...profileData, cvLink: e.target.value})}
                 className="w-full bg-surface/20 border-2 border-borderColor rounded-2xl p-4 text-accent font-bold focus:border-accent focus:outline-none transition-colors"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-2">Years of Experience</label>
               <input 
                 type="text" 
                 value={profileData.experienceYears}
                 onChange={(e) => setProfileData({...profileData, experienceYears: e.target.value})}
                 className="w-full bg-surface/20 border-2 border-borderColor rounded-2xl p-4 text-accent font-bold focus:border-accent focus:outline-none transition-colors"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-2">Certifications Count</label>
               <input 
                 type="text" 
                 value={profileData.certificationsCount}
                 onChange={(e) => setProfileData({...profileData, certificationsCount: e.target.value})}
                 className="w-full bg-surface/20 border-2 border-borderColor rounded-2xl p-4 text-accent font-bold focus:border-accent focus:outline-none transition-colors"
               />
            </div>
         </div>

         <div className="pt-6 border-t border-borderColor flex justify-end">
           <button 
             type="submit"
             className="px-10 py-4 bg-accent text-accent font-black uppercase tracking-widest text-xs rounded-2xl hover:shadow-[0_0_30px_rgba(13,148,136,0.4)] transition-all flex items-center gap-3"
           >
             <Save size={18} /> Default Configuration
           </button>
         </div>
      </form>
    </div>
  );
};

export default ManageProfile;
