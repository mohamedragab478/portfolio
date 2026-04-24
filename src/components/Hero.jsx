import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { FileDown, Github, Mail } from 'lucide-react';

const TypewriterText = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      const fullWord = words[currentWordIndex];

      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setIsDeleting(true);
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }
    }, isDeleting ? deleteSpeed : (currentText === words[currentWordIndex] ? pauseTime : typeSpeed));

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-400 font-bold border-r-2 border-sky-400 pr-1 animate-[pulse_1s_infinite]">
      {currentText}
    </span>
  );
};

const Hero = () => {
  const titles = [
    "AI Engineer",
    "Computer Vision Specialist",
    "Data Scientist",
    "NLP Enthusiast"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-slate-50 relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-100/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Available for work</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-800 tracking-tighter mb-6">
            Amir Elrefai
          </h1>

          {/* Typing Description */}
          <div className="text-2xl md:text-4xl text-slate-600 font-medium mb-12 h-12 flex items-center justify-center gap-2">
            <span>I'm a</span>
            <TypewriterText words={titles} />
          </div>

          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12 font-medium">
            Building intelligent systems that solve complex real-world problems. 
            Passionate about deep learning, scalable architecture, and clean design.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/Amir_Elrefai_CV.pdf"
              download
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-500 text-white font-bold uppercase tracking-widest text-sm shadow-lg shadow-sky-500/20 hover:bg-sky-600 hover:-translate-y-1 transition-all"
            >
              <FileDown size={18} />
              Download CV
            </a>
            <a
              href="https://github.com/amirelrefai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold uppercase tracking-widest text-sm shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 transition-all"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-4 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shadow-sm"
              aria-label="Contact"
            >
              <Mail size={18} />
            </a>
          </div>
        </m.div>

        {/* Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent" />
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
