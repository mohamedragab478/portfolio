/**
 * portfolioData.js
 * Central configuration file for Mohamed Ragab Abo-Elfarh's Portfolio.
 * Edit this file to update personal details, projects, skills, experience, and contact links.
 */

export const portfolioData = {
  // ── PERSONAL INFO ──
  personalInfo: {
    name: "MOHAMED RAGAB",
    fullName: "Mohamed Ragab Abo-Elfarh",
    logoText: "MOHAMED.AI",
    title: "AI/ML Engineer",
    heroBadgeText: "SYSTEM ONLINE :: AI/ML ENGINEER",
    typewriterWords: [
      "AI & Machine Learning Engineer",
      "RAG & LLMs Specialist",
      "Full-Stack AI Solutions Developer",
      "NLP & Computer Vision Architect"
    ],
    bio: "AI/ML Engineer specializing in Computer Vision, NLP, and Retrieval-Augmented Generation (RAG). Experienced in building end-to-end production AI applications using PyTorch, TensorFlow, FastAPI, and Vector Databases with latency reductions of up to 70%.",
    cvUrl: "#",
    profileImageUrl: "/hero1.png",
    email: "moragab478@gmail.com",
    phone: "+20 106 562 2688",
    location: "Egypt",
    githubUrl: "https://github.com/mohamedragab478",
    linkedinUrl: "https://linkedin.com/in/mohamedragab478",
    whatsappUrl: "https://wa.me/201065622688",
    siteTitle: "Mohamed Ragab Abo-Elfarh | AI/ML Engineer",
    siteLogoUrl: "",
    jobTitle: "AI/ML Engineering & RAG Architect"
  },

  // ── HERO STATS ──
  heroStats: [
    { title: "B.Sc. AI Degree", description: "Menoufia University", iconName: "Brain" },
    { title: "RAG & LLM Expert", description: "ChromaDB, Llama 3.2, SSE", iconName: "Cpu" },
    { title: "70% Latency Cut", description: "Inference Optimization", iconName: "Zap" },
    { title: "Full-Stack AI", description: "FastAPI + React + PyTorch", iconName: "Code" }
  ],

  // ── ABOUT SECTION ──
  aboutConfig: {
    title: "Mohamed Ragab",
    subtitle: "Architecting end-to-end AI applications, RAG pipelines, and full-stack intelligent systems.",
    paragraph1: "I am an AI/ML Engineer with a B.Sc. in Artificial Intelligence from Menoufia University. My passion lies in building real-world AI applications across Computer Vision, Natural Language Processing, and Retrieval-Augmented Generation (RAG).",
    paragraph2: "From architecting semantic search and translation systems for Arabic Sign Language with a 70% reduction in inference latency, to deploying real-time RAG nutrition chatbots using Llama 3.2 and FastAPI, I bridge the gap between high-performance ML models and production-ready applications.",
    quote: '"Turning complex neural architectures into fast, accessible, and high-impact digital solutions."',
    yearsExp: "2026 Graduate",
    deployments: "Production AI Apps",
    availability: "Open to ML Engineering & Full-Stack AI Roles",
    workTypes: "REMOTE / ONSITE / HYBRID"
  },

  // ── PROJECTS ──
  projects: [
    {
      id: "arsl",
      title: "Arabic Text-to-Sign Language System (ArSL)",
      category: "cv",
      categoryName: "Computer Vision & NLP",
      image: "/project_img/5.png",
      color: "from-purple-500/20 to-cyan-500/20",
      accent: "text-purple-400",
      border: "border-white/10 hover:border-purple-500/50",
      glow: "shadow-purple-500/10",
      description: "Graduation Capstone Project: Accessibility solution for deaf & hard-of-hearing Arabic speakers.",
      fullDescription: "Architected a semantic embedding-based retrieval system using E5 Transformers and cosine similarity to improve Arabic sign language matching accuracy across a 27GB dataset. Designed a FastAPI backend with interactive GIF-based sign visualization and reduced inference latency by 70% through caching and similarity threshold filtering (θ=0.92).",
      highlights: [
        "E5 Transformers & Cosine Similarity for semantic matching",
        "FastAPI Backend with interactive GIF sign visualization",
        "70% Latency Reduction via thresholding (θ=0.92) & caching",
        "Character-level fallback for unknown word translation"
      ],
      tags: ["PyTorch", "E5 Transformers", "FastAPI", "Arabic NLP", "Computer Vision"],
      github: "https://github.com/mohamedragab478/ARsl_search",
      link: "https://github.com/mohamedragab478/ARsl_search"
    },
    {
      id: "nutriguide",
      title: "NutriGuide-AI: RAG Nutrition Chatbot",
      category: "gen_ai",
      categoryName: "RAG & Generative AI",
      image: "/project_img/1.jpeg",
      color: "from-blue-500/20 to-teal-500/20",
      accent: "text-blue-400",
      border: "border-white/10 hover:border-blue-500/50",
      glow: "shadow-blue-500/10",
      description: "DEPI Capstone: Reliable AI chatbot reducing hallucinations through Retrieval-Augmented Generation.",
      fullDescription: "Architected a Retrieval-Augmented Generation (RAG) pipeline using Sentence Transformers, ChromaDB vector store, and local Llama 3.2 (Ollama) to deliver context-aware nutrition recommendations. Built a FastAPI backend supporting Server-Sent Events (SSE) for real-time streaming markdown responses with safety filtering.",
      highlights: [
        "Sentence Transformers + ChromaDB Vector Database",
        "Llama 3.2 via Ollama for local low-latency inference",
        "FastAPI with Server-Sent Events (SSE) streaming",
        "Intent classification & safety response filtering"
      ],
      tags: ["RAG", "Llama 3.2", "ChromaDB", "FastAPI", "Ollama", "SentenceTransformers"],
      github: "https://github.com/mohamedragab478/NutriGuide-AI",
      link: "https://github.com/mohamedragab478/NutriGuide-AI"
    },
    {
      id: "smart-reader",
      title: "Smart Reader: Intelligent Article Platform",
      category: "nlp",
      categoryName: "Full-Stack AI Development",
      image: "/project_img/3.jpeg",
      color: "from-emerald-500/20 to-green-500/20",
      accent: "text-emerald-400",
      border: "border-white/10 hover:border-emerald-500/50",
      glow: "shadow-emerald-500/10",
      description: "Comprehensive reading platform with AI-powered article summarization and sentiment analysis.",
      fullDescription: "Developed a web scraping pipeline with BeautifulSoup4 and integrated Groq API (Llama 3.3 70B) for multilingual article summaries while preserving original text nuances. Built a responsive React frontend with Tailwind CSS and RTL Arabic support, paired with a FastAPI + SQLAlchemy + JWT authentication backend.",
      highlights: [
        "Groq API with Llama 3.3 70B for fast multilingual summaries",
        "BeautifulSoup4 web scraping pipeline for article extractions",
        "Multilingual sentiment analysis & Text-to-Speech integration",
        "React + Tailwind CSS frontend with full RTL Arabic support"
      ],
      tags: ["React", "FastAPI", "Groq API", "Llama 3.3", "Tailwind CSS", "SQLAlchemy"],
      github: "https://github.com/mohamedragab478",
      link: "https://smart-reader-frontend.vercel.app/"
    }
  ],

  // ── TECHNICAL SKILLS ──
  skills: [
    // Deep Learning
    { name: "PyTorch", category: "deep_learning", level: 92, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg" },
    { name: "TensorFlow", category: "deep_learning", level: 88, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" },
    { name: "CNN / RNN / LSTM", category: "deep_learning", level: 90 },
    { name: "ResNet & Attention", category: "deep_learning", level: 88 },
    { name: "Transformers & E5", category: "deep_learning", level: 90 },

    // RAG & NLP
    { name: "ChromaDB & Vector DBs", category: "nlp_ai", level: 92, icon: "https://cdn.simpleicons.org/langchain/white" },
    { name: "Llama 3.2 / Ollama", category: "nlp_ai", level: 90 },
    { name: "Sentence Transformers", category: "nlp_ai", level: 90 },
    { name: "Groq API & LLMs", category: "nlp_ai", level: 88 },
    { name: "Arabic NLP & Sentiment", category: "nlp_ai", level: 92 },

    // Backend
    { name: "FastAPI", category: "development", level: 94, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" },
    { name: "Python", category: "development", level: 95, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    { name: "SQL & SQLAlchemy", category: "development", level: 85, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
    { name: "JWT Auth & REST APIs", category: "development", level: 88 },

    // Frontend
    { name: "React.js & Vite", category: "development", level: 88, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
    { name: "Tailwind CSS & RTL", category: "development", level: 90, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },

    // DevOps
    { name: "Docker", category: "devops", level: 82, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
    { name: "Git & GitHub", category: "devops", level: 92, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
    { name: "Linux & Bash", category: "devops", level: 88, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" },
    { name: "Hugging Face & Vercel", category: "devops", level: 85 }
  ],

  // ── SERVICES ──
  services: [
    {
      icon: "Brain",
      title: "RAG & LLM Architectures",
      description: "Designing end-to-end Retrieval-Augmented Generation pipelines using ChromaDB, Llama 3.2/3.3, Sentence Transformers, and custom safety filters."
    },
    {
      icon: "Server",
      title: "FastAPI & REST Backend",
      description: "Building production-grade REST APIs, Server-Sent Events (SSE) streaming, SQLAlchemy ORMs, and secure JWT auth setups."
    },
    {
      icon: "Eye",
      title: "Computer Vision & Deep Learning",
      description: "Developing custom PyTorch & TensorFlow models for image classification, semantic segmentation, sign language translation, and visual feature extraction."
    },
    {
      icon: "Code",
      title: "Full-Stack AI Web Apps",
      description: "Connecting intelligent ML backends to responsive React + Tailwind CSS frontends with native Arabic RTL support and streaming interfaces."
    }
  ],

  // ── CERTIFICATIONS & TRAINING ──
  certifications: [
    {
      title: "Generative AI & Machine Learning Specialist",
      issuer: "DEPI (Digital Egypt Pioneers Initiative)",
      date: "Nov 2025 – Present",
      skills: ["Preprocessing", "MLP", "CNN", "RNN", "Computer Vision", "Generative AI"]
    },
    {
      title: "Natural Language Processing Specialist",
      issuer: "ITIDA - NTI",
      date: "July 2025 – Aug 2025",
      skills: ["Score: 90.5%", "Text Analysis", "Embeddings", "Applied Machine Learning", "Python"]
    },
    {
      title: "AI & Machine Learning Foundations",
      issuer: "NTI & Huawei Egyptian Talent Academy",
      date: "July 2025",
      skills: ["Score: 99%", "AI & ML Fundamentals", "Model Evaluation", "Python"]
    }
  ],

  // ── EDUCATION ──
  educationDegree: {
    degree: "B.Sc. Artificial Intelligence",
    institution: "Menoufia University",
    year: "Graduated: Jul 2026",
    grade: "Grade: Very Good",
    details: "Specialized in Machine Learning, Computer Vision, Natural Language Processing, and Software Architecture."
  },

  // ── CONTACT DATA ──
  contactInfo: {
    email: "moragab478@gmail.com",
    phone: "+20 106 562 2688",
    location: "Egypt",
    github: "https://github.com/mohamedragab478",
    linkedin: "https://linkedin.com/in/mohamedragab478"
  }
};
