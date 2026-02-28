import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Skills = () => {
  const row1 = [
    { name: "PyTorch", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg" },
    { name: "TensorFlow", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" },
    { name: "OpenCV", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg" },
    { name: "YOLO", icon: "https://cdn.simpleicons.org/ultralytics/white" },
    { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/white" },
    { name: "NumPy", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
    { name: "Pandas", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" },
    { name: "Keras", icon: "https://cdn.simpleicons.org/keras/white" }
  ];

  const row2 = [
    { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    { name: "C++", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
    { name: "C", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" },
    { name: "FastAPI", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" },
    { name: "Arduino", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg" },
    { name: "Docker", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
    { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
    { name: "MediaPipe", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/google.svg" }
  ];

  const MarqueeRow = ({ items, direction = 1 }) => (
    <div className="flex overflow-hidden py-4 group">
      <motion.div 
        animate={{ 
          x: direction > 0 ? [0, -100 + "%"] : [-100 + "%", 0] 
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex gap-6 whitespace-nowrap min-w-full items-center"
      >
        {[...items, ...items, ...items].map((skill, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-4 px-8 py-4 glass-card border-white/5 hover:border-primary/40 transition-all duration-300"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-full h-full object-contain filter " 
              />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-secondary group-hover:text-white">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="skills" className="py-16 bg-transparent relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
           <Zap className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Technical Arsenal</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black italic uppercase leading-none">
          Powering the <span className="gradient-text">Future.</span>
        </h2>
      </div>

      <div className="relative flex flex-col gap-8 w-full max-w-[100vw]">
        <MarqueeRow items={row1} direction={1} />
        <MarqueeRow items={row2} direction={-1} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default Skills;
