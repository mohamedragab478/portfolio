import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SocialFloatingButton from './components/SocialFloatingButton';
import GlobalBackground from './components/GlobalBackground';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden  ">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Skills />
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

export default App;