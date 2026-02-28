export const projectsData = [
  {
    title: "ThyraX - Medical Diagnostic System",
    category: "Graduation Project / AI Lead",
    image: "/project_img/5.png",
    color: "from-violet-500/20 to-purple-500/20",
    accent: "text-violet-400",
    border: "border-white/10 hover:border-primary/50",
    glow: "shadow-violet-500/10",
    description: "Multi-stage deep learning platform for thyroid ultrasound analysis and intelligent medical research.",
    fullDescription: "ThyraX is an end-to-end medical research platform designed to revolutionize the analysis of thyroid ultrasound images. The system utilizes a multi-stage deep learning pipeline to provide clinicians with precise diagnostics by fusing visual data with patient metadata.",
    highlights: [
      "UNet++ Segmentation for precise nodule delineation",
      "Multi-Modal Fusion of image features & clinical metadata",
      "Medical RAG Assistant using LangChain & Pinecone",
      "Scalable Deployment on Render for real-time inference"
    ],
    tags: ["PyTorch", "UNet++", "LangChain", "Pinecone", "FastAPI"],
    github: "https://github.com/amirelrefai",
    link: "#"
  },
  {
    title: "Medical Image Segmentation",
    category: "Deep Learning / Healthcare",
    image: "/project_img/1.jpeg",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-400",
    border: "border-white/10 hover:border-primary/50",
    glow: "shadow-blue-500/10",
    description: "High-precision abnormalities delineation in medical ultrasound scans using UNet++ architectures.",
    fullDescription: "Developed a high-precision segmentation model to delineate abnormalities in medical ultrasound scans. By implementing UNet++ (Nested UNet), the system captures fine-grained details that standard architectures might miss, providing doctors with accurate masks for diagnosis.",
    highlights: [
      "Utilized UNet++ with nested, dense skip pathways",
      "Captured fine-grained details for accurate clinical masks",
      "Multi-stage processing for clinical-grade mapping",
      "Core visual analysis engine for ThyraX system"
    ],
    tags: ["UNet++", "TensorFlow", "Python", "OpenCV"],
    github: "https://github.com/amirelrefai",
    link: "#"
  },
  {
    title: "Driver Behavior Classification",
    category: "Computer Vision Product",
    image: "/project_img/4.jpeg",
    color: "from-amber-500/20 to-orange-500/20",
    accent: "text-amber-400",
    border: "border-white/10 hover:border-primary/50",
    glow: "shadow-amber-500/10",
    description: "Real-time safety system to monitor and classify driver states like safe driving, distraction, or drowsiness.",
    fullDescription: "Developed a real-time safety system designed to monitor and classify driver behavior to enhance road safety. The system identifies various states such as safe driving, distracted (using a phone, eating), drowsy, or drinking while driving.",
    highlights: [
      "ResNet50 architecture for high-accuracy feature extraction",
      "FastAPI backend for minimal latency inference",
      "Secure tunnel deployment using ngrok for remote testing",
      "Interactive UI with real-time analysis & 99.90% confidence"
    ],
    tags: ["TensorFlow", "ResNet50", "FastAPI", "Python", "ngrok"],
    github: "https://github.com/amirelrefai",
    link: "#"
  },
  {
    title: "Automated COVID-19 Detection",
    category: "Deep Learning / Diagnostics",
    image: "/project_img/3.jpeg",
    color: "from-rose-500/20 to-pink-500/20",
    accent: "text-rose-400",
    border: "border-white/10 hover:border-primary/50",
    glow: "shadow-rose-500/10",
    description: "Chest X-ray classification into COVID-19 positive and normal cases using Transfer Learning.",
    fullDescription: "Developed a robust Deep Learning model to classify chest X-ray images into COVID-19 positive and normal cases. The project aimed to demonstrate the efficiency of Transfer Learning in medical diagnostics.",
    highlights: [
      "VGG16 architecture as a feature extractor backbone",
      "Custom-designed top layers for binary classification",
      "Advanced data augmentation (rotation, zoom, flip)",
      "Fine-tuned weights for specific medical feature capture"
    ],
    tags: ["VGG16", "TensorFlow", "Deep Learning", "Python"],
    github: "https://github.com/amirelrefai",
    link: "#"
  },
  {
    title: "Sentiment Analysis Web App",
    category: "NLP / Web Application",
    image: "/project_img/2.jpeg",
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    border: "border-white/10 hover:border-primary/50",
    glow: "shadow-emerald-500/10",
    description: "End-to-end NLP pipeline classifying customer reviews into Positive or Negative sentiments with Gradio.",
    fullDescription: "Build an end-to-end NLP pipeline to classify customer reviews into Positive or Negative sentiments. The project features full text preprocessing and real-time interactive testing.",
    highlights: [
      "Stemming (PorterStemmer) & Lemmatization processing",
      "Multinomial Naive Bayes for efficient classification",
      "Interactive Gradio UI for real-time model testing",
      "Insightful WordCloud visualizations of sentiment data"
    ],
    tags: ["NLTK", "Scikit-learn", "Gradio", "WordCloud"],
    github: "https://github.com/amirelrefai",
    link: "#"
  }
];
