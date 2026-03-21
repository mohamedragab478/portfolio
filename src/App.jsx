import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProfessionalDevelopment from './components/ProfessionalDevelopment';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SocialFloatingButton from './components/SocialFloatingButton';
import GlobalBackground from './components/GlobalBackground';

// Admin Imports
import AdminLayout from './admin/Layout';
import DashboardHome from './admin/DashboardHome';
import HeroManager from './admin/HeroManager';
import ServicesManager from './admin/ServicesManager';
import SkillsManager from './admin/SkillsManager';
import ProjectsManager from './admin/ProjectsManager';
import CertsManager from './admin/CertsManager';
import Inbox from './admin/Inbox';
import TrainingManager from './admin/TrainingManager';
import Login from './admin/Login';
import EducationManager from './admin/EducationManager';
import ContactManager from './admin/ContactManager';

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Skills />
        <ProfessionalDevelopment />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <SocialFloatingButton />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="hero" element={<HeroManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="arsenal" element={<SkillsManager />} />
        <Route path="training" element={<TrainingManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="certs" element={<CertsManager />} />
        <Route path="education" element={<EducationManager />} />
        <Route path="contact" element={<ContactManager />} />
        <Route path="inbox" element={<Inbox />} />
      </Route>
    </Routes>
  );
}

export default App;