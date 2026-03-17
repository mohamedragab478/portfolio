import { motion } from 'framer-motion';
import { Camera, Server, LineChart, Bot, MessageSquareText, FileSearch } from 'lucide-react';

const services = [
  {
    icon: <Camera size={32} className="text-primary" />,
    title: "Computer Vision Solutions",
    description: "Developing robust image/video processing algorithms for object detection, segmentation, and classification.",
  },
  {
    icon: <Server size={32} className="text-primary" />,
    title: "AI Model Deployment",
    description: "Designing scalable inference pipelines and API integration for turning research models into production-ready software.",
  },
  {
    icon: <LineChart size={32} className="text-primary" />,
    title: "Data Analysis & EDA",
    description: "Extracting actionable insights from complex datasets and engineering features for predictive modeling.",
  },
  {
    icon: <Bot size={32} className="text-primary" />,
    title: "AI Agents",
    description: "Building autonomous systems capable of executing complex multi-step workflows and interacting with external APIs.",
  },
  {
    icon: <MessageSquareText size={32} className="text-primary" />,
    title: "Chatbots",
    description: "Engineering intelligent, conversational interfaces for seamless customer support and interactive user experiences.",
  },
  {
    icon: <FileSearch size={32} className="text-primary" />,
    title: "RAG Systems",
    description: "Creating Retrieval-Augmented Generation pipelines to anchor Large Language Models with private, domain-specific data.",
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Services
            </h2>
            <div className="h-[2px] w-24 bg-primary/50" />
          </div>
          <p className="text-secondary font-medium tracking-tight">What I bring to the table</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 glass-card border border-white/5 hover:border-primary/30 transition-all rounded-3xl group"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
