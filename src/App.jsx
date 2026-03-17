import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SocialFloatingButton from './components/SocialFloatingButton';
import GlobalBackground from './components/GlobalBackground';

// Admin Imports
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import ManageProjects from './admin/ManageProjects';
import ManageCertifications from './admin/ManageCertifications';
import ManageServices from './admin/ManageServices';
import ManageMessages from './admin/ManageMessages';
import ManageProfile from './admin/ManageProfile';

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Testimonials />
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
        {/* Dashboard sub-routes */}
        <Route index element={<ManageProjects />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="certifications" element={<ManageCertifications />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="profile" element={<ManageProfile />} />
      </Route>
    </Routes>
  );
}

export default App;