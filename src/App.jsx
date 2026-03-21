import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SocialFloatingButton from './components/SocialFloatingButton';
import GlobalBackground from './components/GlobalBackground';

// Lazy-loaded below-fold public sections
const Services = React.lazy(() => import('./components/Services'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const ProfessionalDevelopment = React.lazy(() => import('./components/ProfessionalDevelopment'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));

// Lazy-loaded Admin pages
const AdminLayout = React.lazy(() => import('./admin/Layout'));
const DashboardHome = React.lazy(() => import('./admin/DashboardHome'));
const HeroManager = React.lazy(() => import('./admin/HeroManager'));
const ServicesManager = React.lazy(() => import('./admin/ServicesManager'));
const SkillsManager = React.lazy(() => import('./admin/SkillsManager'));
const ProjectsManager = React.lazy(() => import('./admin/ProjectsManager'));
const CertsManager = React.lazy(() => import('./admin/CertsManager'));
const Inbox = React.lazy(() => import('./admin/Inbox'));
const TrainingManager = React.lazy(() => import('./admin/TrainingManager'));
const Login = React.lazy(() => import('./admin/Login'));
const EducationManager = React.lazy(() => import('./admin/EducationManager'));
const ContactManager = React.lazy(() => import('./admin/ContactManager'));

// Shared loading fallback
const SectionLoader = () => (
  <div className="min-h-[40vh] w-full flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#7c3aed]/30 border-t-[#d8b4fe] rounded-full animate-spin" />
  </div>
);

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Services />
          <Skills />
          <ProfessionalDevelopment />
          <Projects />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialFloatingButton />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<SectionLoader />}>
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
    </Suspense>
  );
}

export default App;