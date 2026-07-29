/**
 * Utility helper to automatically get official SVG/PNG icon URLs for developer tools,
 * AI frameworks, ML libraries, and programming languages using Simple Icons, Devicon, and official CDNs.
 */

const EXACT_ICON_URLS = {
  'chromadb': 'https://api.iconify.design/logos:chroma.svg',
  'chroma': 'https://api.iconify.design/logos:chroma.svg',
  'llamaindex': 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/api_reference/api_reference/_static/assets/LlamaLogoBrowserTab.png',
  'llama-index': 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/api_reference/api_reference/_static/assets/LlamaLogoBrowserTab.png',
  'langchain': 'https://cdn.simpleicons.org/langchain/white',
  'opencv': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg',
  'yolo': 'https://cdn.simpleicons.org/ultralytics/white',
  'yolov11': 'https://cdn.simpleicons.org/ultralytics/white',
  'mediapipe': 'https://cdn.simpleicons.org/mediapipe/white',
  'onnx': 'https://cdn.simpleicons.org/onnx/white',
  'pytorch': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg',
  'tensorflow': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
  'keras': 'https://cdn.simpleicons.org/keras/white',
  'pandas': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg',
  'numpy': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg',
  'scikit-learn': 'https://cdn.simpleicons.org/scikitlearn/white',
  'scikitlearn': 'https://cdn.simpleicons.org/scikitlearn/white',
  'sklearn': 'https://cdn.simpleicons.org/scikitlearn/white',
  'huggingface': 'https://cdn.simpleicons.org/huggingface/white',
  'hugging face': 'https://cdn.simpleicons.org/huggingface/white',
  'python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'c++': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
  'docker': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  'linux': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg',
  'next.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  'nextjs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  'mongodb': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  'postgresql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
  'postgres': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
  'git': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
  'uv': 'https://cdn.simpleicons.org/uv/white',
  'fastapi': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
  'flask': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg',
  'react': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
};

// Normalized alias mappings for simpleicons slug fallback
const SLUG_ALIASES = {
  'c#': 'csharp',
  'csharp': 'csharp',
  'django': 'django',
  'vue': 'vuedotjs',
  'angular': 'angular',
  'node': 'nodedotjs',
  'nodejs': 'nodedotjs',
  'typescript': 'typescript',
  'javascript': 'javascript',
  'html': 'html5',
  'css': 'css3',
  'tailwind': 'tailwindcss',
  'pinecone': 'pinecone',
  'qdrant': 'qdrant',
  'sqlite': 'sqlite',
  'redis': 'redis',
  'github': 'github',
  'ubuntu': 'ubuntu',
  'nvidia': 'nvidia',
  'cuda': 'nvidia',
  'aws': 'amazonwebservices',
  'gcp': 'googlecloud',
  'azure': 'microsoftazure',
  'vercel': 'vercel',
};

/**
 * Returns the official SVG/PNG icon URL for a given tool/framework name.
 * 
 * @param {string} toolName - Name of the technology (e.g., "ChromaDB", "LlamaIndex", "PyTorch")
 * @returns {string} - Image URL
 */
export function getToolIconUrl(toolName) {
  if (!toolName || typeof toolName !== 'string') return '';

  const lower = toolName.trim().toLowerCase();
  const clean = lower.replace(/\s+/g, '');

  if (EXACT_ICON_URLS[clean]) return EXACT_ICON_URLS[clean];
  if (EXACT_ICON_URLS[lower]) return EXACT_ICON_URLS[lower];

  const slug = SLUG_ALIASES[clean] || SLUG_ALIASES[lower] || clean;
  return `https://cdn.simpleicons.org/${slug}`;
}

export default getToolIconUrl;
