export const projectsData = [
  {
    title: "ThyraX - Thyroid Cancer Analysis",
    category: "Graduation Project / AI Lead",
    image: "/project_img/5.png",
    color: "from-teal-500/20 to-teal-500/20",
    accent: "text-violet-400",
    border: "border-borderColor hover:border-accent/50",
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
    border: "border-borderColor hover:border-accent/50",
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
    border: "border-borderColor hover:border-accent/50",
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
    border: "border-borderColor hover:border-accent/50",
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
    border: "border-borderColor hover:border-accent/50",
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
