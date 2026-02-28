import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
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
    <div className="relative min-h-screen">
      <GlobalBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
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