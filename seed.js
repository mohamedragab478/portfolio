import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2G350fJcL_up99AC3h4JRE-5mNfFtRPY",
  authDomain: "amir-portfolio-cms.firebaseapp.com",
  projectId: "amir-portfolio-cms",
  storageBucket: "amir-portfolio-cms.firebasestorage.app",
  messagingSenderId: "870008538483",
  appId: "1:870008538483:web:12b32c753507b4781e3106",
  measurementId: "G-JCXZY31G3G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projects = [
  {
    title: "ThyraX - Thyroid Cancer Analysis",
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
    github: "https://github.com/amerelfalwo/ThyraX",
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
    github: "https://github.com/amerelfalwo/Medical-Segmentation",
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
    github: "https://github.com/amerelfalwo/Driver-Behavior",
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
    description: "Classification of chest X-rays using Transfer Learning and advanced Data Augmentation.",
    fullDescription: "Developed a robust Deep Learning model to classify chest X-ray images into COVID-19 positive and normal cases. Implemented advanced Data Augmentation (rotation, zooming, flipping) to improve generalization and robustness of the Transfer Learning backbone.",
    highlights: [
      "VGG16 architecture applied for Transfer Learning",
      "Advanced image augmentation techniques",
      "Improved generalization and prediction robustness",
      "High-accuracy binary classification setup"
    ],
    tags: ["VGG16", "Transfer Learning", "Keras", "Python"],
    github: "https://github.com/amerelfalwo/COVID-Detection",
    link: "#"
  },
  {
    title: "Sentiment Analysis Web App",
    category: "Natural Language Processing",
    image: "/project_img/2.jpeg",
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    border: "border-white/10 hover:border-primary/50",
    glow: "shadow-emerald-500/10",
    description: "End-to-end NLP pipeline for customer review classification using Naive Bayes.",
    fullDescription: "Built an end-to-end NLP pipeline designed for analyzing and classifying customer reviews. The project features robust text preprocessing pipelines (Stemming, Lemmatization) feeding directly into a Multinomial Naive Bayes classifier deployed via a Gradio interface.",
    highlights: [
      "Built custom text preprocessing pipelines",
      "Trained Multinomial Naive Bayes classifier",
      "Deployed interactive frontend via Gradio",
      "Real-time sentiment inference capabilities"
    ],
    tags: ["NLTK", "Scikit-learn", "Gradio", "Python"],
    github: "https://github.com/amerelfalwo/Sentiment-Analysis",
    link: "#"
  }
];

const technicalSkills = [
  { name: "EDA", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg", category: "Technical Skills" },
  { name: "Machine Learning", icon: "https://cdn.simpleicons.org/scikitlearn/white", category: "Technical Skills" },
  { name: "Deep Learning", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg", category: "Technical Skills" },
  { name: "Computer Vision", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg", category: "Technical Skills" },
  { name: "NLP", icon: "https://cdn.simpleicons.org/langchain/white", category: "Technical Skills" },
  { name: "Data Analysis", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg", category: "Technical Skills" },
  { name: "Model Deployment", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg", category: "Technical Skills" }
];

const toolsLibraries = [
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", category: "Tools & Libraries" },
  { name: "PyTorch", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg", category: "Tools & Libraries" },
  { name: "TensorFlow", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg", category: "Tools & Libraries" },
  { name: "Docker", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", category: "Tools & Libraries" },
  { name: "VS Code", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg", category: "Tools & Libraries" },
  { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", category: "Tools & Libraries" },
  { name: "YOLO", icon: "https://cdn.simpleicons.org/ultralytics/white", category: "Tools & Libraries" },
  { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/white", category: "Tools & Libraries" },
  { name: "NumPy", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg", category: "Tools & Libraries" },
  { name: "Pandas", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg", category: "Tools & Libraries" },
  { name: "Keras", icon: "https://cdn.simpleicons.org/keras/white", category: "Tools & Libraries" }
];

const services = [
  {
    icon: "Camera",
    title: "Computer Vision Solutions",
    description: "Developing robust image/video processing algorithms for object detection, segmentation, and classification.",
  },
  {
    icon: "Server",
    title: "AI Model Deployment",
    description: "Designing scalable inference pipelines and API integration for turning research models into production-ready software.",
  },
  {
    icon: "LineChart",
    title: "Data Analysis & EDA",
    description: "Extracting actionable insights from complex datasets and engineering features for predictive modeling.",
  },
  {
    icon: "Bot",
    title: "AI Agents",
    description: "Building autonomous systems capable of executing complex multi-step workflows and interacting with external APIs.",
  },
  {
    icon: "MessageSquareText",
    title: "Chatbots",
    description: "Engineering intelligent, conversational interfaces for seamless customer support and interactive user experiences.",
  },
  {
    icon: "FileSearch",
    title: "RAG Systems",
    description: "Creating Retrieval-Augmented Generation pipelines to anchor Large Language Models with private, domain-specific data.",
  }
];

const certifications = [
  {
    title: "AI Track",
    issuer: "NTI / Huawei Egyptian Talent Academy",
    date: "80 hrs",
    skills: ["Deep Learning", "Neural Networks", "Optimization"]
  },
  {
    title: "CCNA",
    issuer: "Digital Egypt Youth Program",
    date: "120 hrs",
    skills: ["Routing", "Switching", "Infrastructure"]
  },
  {
    title: "Computer Vision Specialized Training",
    issuer: "NTI",
    date: "Ongoing",
    skills: ["Image Analysis", "Object Detection", "Segmentation"]
  },
  {
    title: "Data Science Professional Track",
    issuer: "DEPI",
    date: "Ongoing",
    skills: ["Predictive Modeling", "Feature Engineering", "EDA"]
  },
  {
    title: "IoT & Embedded Systems Internship",
    issuer: "NTI",
    date: "120 hrs",
    skills: ["Microcontrollers", "Hardware Integration", "IoT Protocols"]
  },
  {
    title: "Deep Learning Institute (DLI) Training",
    issuer: "NVIDIA",
    date: "Completed",
    skills: ["GPU Computing", "AI Frameworks", "Acceleration"]
  }
];

const seed = async () => {
  console.log("Starting seed process...");
  for (let p of projects) {
    await addDoc(collection(db, "projects"), p);
    console.log("Added project", p.title);
  }
  for (let s of technicalSkills) {
    await addDoc(collection(db, "skills"), s);
    console.log("Added tech skill", s.name);
  }
  for (let s of toolsLibraries) {
    await addDoc(collection(db, "skills"), s);
    console.log("Added tool", s.name);
  }
  for (let s of services) {
    await addDoc(collection(db, "services"), s);
    console.log("Added service", s.title);
  }
  for (let c of certifications) {
    await addDoc(collection(db, "certifications"), c);
    console.log("Added cert", c.title);
  }
  console.log("Seeding complete!");
  process.exit(0);
};

seed().catch(console.error);
