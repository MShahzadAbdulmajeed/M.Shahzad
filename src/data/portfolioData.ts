import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  'object-detection': {
    id: 'object-detection',
    name: 'Object Detection',
    icon: 'Eye',
    coverImage: '/topics/Object_Detection_AI.jpg',
    images: [
      '/topics/Object_Detection_AI.jpg',
      '/topics/Object_Detection_AI_1.jpg',
      '/topics/Model_training.jpg',
    ],
    videos: [
      'https://www.youtube.com/embed/MPU2HistivI',  // YOLO object detection demo
    ],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['Computer Vision', 'Deep Learning', 'AI'],
    tools: ['TensorFlow', 'OpenCV', 'YOLOv5', 'Transformers', 'Keras', 'LabelImg', 'RTX 3060 GPU'],
    projects: [
      { name: 'Real-time Surveillance System', description: 'AI-powered security system with anomaly detection using TensorFlow and OpenCV' },
      { name: 'Retail Analytics', description: 'Customer behavior tracking using CV and object detection models' },
      { name: 'Smart Traffic Monitoring', description: 'Detecting traffic violations and vehicle count using YOLOv5 and OpenCV' },
      { name: 'Multi-Class Object Detector', description: 'Trained custom models for diverse objects using TensorFlow and PyTorch' },
    ],
    description: 'Developed object detection systems using TensorFlow, OpenCV, YOLOv5, and Transformer-based models, optimized with RTX 3060 GPU.',
    longDescription: `Built production-grade object detection pipelines capable of identifying and localizing multiple classes in real time. 
Leveraged YOLOv5 and custom Transformer-based models trained on domain-specific datasets, achieving high mAP scores across surveillance, retail, and traffic use-cases. 
The system runs inference at 30+ FPS on an RTX 3060 GPU and includes a streaming API built with FastAPI for integration into web dashboards.`,
  },

  'image-classification': {
    id: 'image-classification',
    name: 'Image Classification',
    icon: 'Image',
    coverImage: '/topics/image_classification.jpg',
    images: [
      '/topics/image_classification.jpg',
      '/topics/Model_training.jpg',
    ],
    videos: [
      'https://www.youtube.com/embed/AkMxVr9OXnU', // CNN image classification walkthrough
    ],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['Deep Learning', 'AI', 'Computer Vision'],
    tools: ['TensorFlow', 'Keras', 'CNNs', 'Matplotlib'],
    projects: [
      { name: 'Disease Detection in Plants', description: 'Classified plant leaf diseases using CNN achieving 94% accuracy' },
      { name: 'Fashion Item Classifier', description: 'Built model to identify clothing types from images for e-commerce' },
      { name: 'Dog Breed Classifier', description: 'Used TensorFlow and transfer learning (ResNet50) for breed prediction' },
    ],
    description: 'Built classification models with CNNs and TensorFlow for real-world applications in healthcare, fashion, and agriculture.',
    longDescription: `Designed and trained deep convolutional neural networks for multi-class image classification across diverse industries.
Applied transfer learning with ResNet50, MobileNetV2, and EfficientNet to maximize accuracy with limited data.
Models are exported as TensorFlow SavedModel and served via a Streamlit interface for rapid prototyping and demo purposes.`,
  },

  'face-detection': {
    id: 'face-detection',
    name: 'Face Detection',
    icon: 'User',
    coverImage: '/topics/face_recongnization.jpg',
    images: [
      '/topics/face_recongnization.jpg',
      '/topics/face.jpg',
    ],
    videos: [
      'https://www.youtube.com/embed/oHg5SJYRHA0', // face recognition demo placeholder
    ],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['Facial Recognition', 'AI', 'Computer Vision'],
    tools: ['OpenCV', 'Haar Cascades', 'MTCNN', 'DeepFace', 'TensorFlow'],
    projects: [
      { name: 'Face Attendance System', description: 'Automated attendance using real-time face recognition with 99% precision' },
      { name: 'Face Analysis Dashboard', description: 'Demographics and emotion recognition via DeepFace analytics' },
      { name: 'Real-Time Face Tracking', description: 'Multi-face tracking at 25 FPS using OpenCV and MTCNN' },
    ],
    description: 'Created real-time facial recognition and analysis tools using DeepFace and OpenCV.',
    longDescription: `Engineered end-to-end facial recognition systems using MTCNN for detection and DeepFace for verification and attribute analysis.
The attendance system processes a live webcam feed, recognizes registered faces, and logs entries to a database in real time.
The emotion analysis dashboard aggregates facial metrics (age, gender, emotion) into a live chart updated every second.`,
  },

  'agentic-ai': {
    id: 'agentic-ai',
    name: 'Agentic AI',
    icon: 'Bot',
    coverImage: '/topics/agentica.jpg',
    images: [
      '/topics/agentica.jpg',
      '/topics/chatbot1.jpg',
    ],
    videos: [
      'https://www.youtube.com/embed/sal78ACtGTc', // LangChain agents demo
    ],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['Multi-Agent Systems', 'LangChain', 'LLMs', 'RAG'],
    tools: ['LangChain', 'CrewAI', 'OpenAI', 'Gemini', 'Pinecone'],
    projects: [
      { name: 'Multi-Agent Chatbot', description: 'CrewAI-based agents that collaborate using shared memory and tools' },
      { name: 'Task-Specific AI Agents', description: 'Agents for PDF reading, web search, and structured response generation' },
    ],
    description: 'Built autonomous, collaborative agents using LangChain and CrewAI integrated with RAG architecture and memory.',
    longDescription: `Developed a multi-agent orchestration framework where specialized agents (researcher, writer, reviewer) collaborate via CrewAI to complete complex tasks autonomously.
Integrated Pinecone vector store for long-term RAG memory, allowing agents to retrieve context from large document corpora.
The system supports tool use (web search, code execution, file I/O) and is deployed as a FastAPI microservice.`,
  },

  'chatbot': {
    id: 'chatbot',
    name: 'Chatbot',
    icon: 'MessageSquare',
    coverImage: '/topics/chatbot1.jpg',
    images: [
      '/topics/chatbot1.jpg',
      '/topics/language_translation.jpg',
      '/topics/text_summerization.jpg',
    ],
    videos: [
      'https://www.youtube.com/embed/RBnuhhmD0bY', // LLM chatbot demo
    ],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['NLP', 'AI', 'Conversational Systems'],
    tools: ['LangChain', 'OpenAI', 'Google Gemini', 'Streamlit', 'Flask'],
    projects: [
      { name: 'Conversational Assistant', description: 'Intelligent assistant with contextual memory using LLMs and LangChain' },
      { name: 'Multi-Functional Chatbot', description: 'Chatbot with PDF reader, web search, and summarizer tools integrated' },
    ],
    description: 'Designed custom AI-powered chatbots using LLMs and LangChain with tools and memory integration.',
    longDescription: `Built a modular chatbot framework supporting multiple LLM backends (OpenAI GPT-4, Google Gemini) with persistent conversation memory.
The multi-tool chatbot exposes specialized agents for document Q&A, real-time web search via SerpAPI, and text summarization.
A Streamlit front-end provides an interactive UI, while a Flask API enables integration into third-party platforms.`,
  },

  'mathsolver': {
    id: 'mathsolver',
    name: 'Math Solver',
    icon: 'Calculator',
    coverImage: '/topics/mathsolver.jpg',
    images: [
      '/topics/mathsolver.jpg',
      '/topics/Model_training.jpg',
    ],
    videos: [
      'https://www.youtube.com/embed/aircAruvnKk', // math AI demo placeholder
    ],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['AI', 'OCR', 'Deep Learning'],
    tools: ['TensorFlow', 'CNN', 'Tesseract OCR', 'Streamlit'],
    projects: [
      { name: 'AI Math Solver', description: 'Solves handwritten math problems using OCR and image recognition models' },
      { name: 'Equation Recognizer', description: 'Extracts and computes equations from scanned document images' },
    ],
    description: 'Developed OCR-based AI tools to detect and solve handwritten math problems using CNNs and Streamlit.',
    longDescription: `Combined computer vision and OCR to build an end-to-end handwritten math problem solver.
A custom CNN preprocesses the image, Tesseract OCR extracts the expression, and a symbolic math engine (SymPy) computes the solution.
The Streamlit app accepts photo uploads or live webcam input and returns step-by-step solutions in real time.`,
  },

  'fullstack-development': {
    id: 'fullstack-development',
    name: 'Full-Stack Development',
    icon: 'Layers',
    coverImage: '/topics/Full_Stack_Developer.webp',
    images: [
      '/topics/Full_Stack_Developer.webp',
      '/topics/Fontend_webdevelopment.webp',
      '/topics/Backend_development.webp',
    ],
    videos: [],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['Web Development', 'Frontend', 'Backend', 'API'],
    tools: ['React', 'Tailwind CSS', 'Django', 'Django Rest Framework', 'Firebase', 'PostgreSQL'],
    projects: [
      { name: 'Multi-Agent Website', description: 'Website integrating multi-agent AI tools with a DRF REST backend' },
      { name: 'Portfolio Website', description: 'This responsive portfolio built with React, TypeScript and Tailwind CSS' },
    ],
    description: 'Experienced in building robust full-stack applications using React, Django, REST APIs, and Firebase.',
    longDescription: `Architect and deliver full-stack web applications from database schema to pixel-perfect UI.
Backend services are built with Django REST Framework, secured with JWT auth, and deployed via Docker on cloud VMs.
Frontend apps use React + TypeScript with Tailwind CSS for styling, React Router for navigation, and Framer Motion for animations.`,
  },

  'frontend-development': {
    id: 'frontend-development',
    name: 'Frontend Development',
    icon: 'Laptop',
    coverImage: '/topics/Fontend_webdevelopment.webp',
    images: [
      '/topics/Fontend_webdevelopment.webp',
      '/topics/Full_Stack_Developer.webp',
    ],
    videos: [],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['UI/UX', 'Design', 'Responsiveness'],
    tools: ['React', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
    projects: [
      { name: 'Responsive Portfolio', description: 'Modern portfolio using React, TypeScript, and Tailwind CSS' },
      { name: 'Landing Pages', description: 'Multiple responsive marketing UIs for client projects' },
    ],
    description: 'Created responsive and visually appealing UIs using React, Tailwind, and modern web design practices.',
    longDescription: `Specialise in building fast, accessible, and visually polished frontends using React and modern CSS tooling.
Every project follows accessibility best practices (WCAG AA), is fully responsive across all breakpoints, and achieves Lighthouse scores of 95+.
Animations are implemented with Framer Motion for smooth, performance-conscious transitions.`,
  },

  'backend-development': {
    id: 'backend-development',
    name: 'Backend Development',
    icon: 'Server',
    coverImage: '/topics/Backend_development.webp',
    images: [
      '/topics/Backend_development.webp',
      '/topics/Full_Stack_Developer.webp',
    ],
    videos: [],
    demoUrl: '#',
    githubUrl: '#',
    tags: ['API', 'Authentication', 'Database'],
    tools: ['Django', 'Django Rest Framework', 'Firebase', 'PostgreSQL', 'JWT'],
    projects: [
      { name: 'Auth System', description: 'Custom login/signup with JWT and refresh token rotation using Django' },
      { name: 'API for AI Tools', description: 'RESTful APIs wrapping AI services, deployed with Docker and Nginx' },
    ],
    description: 'Built secure and scalable backends using Django and DRF with token-based authentication and real-time Firebase integration.',
    longDescription: `Design and implement RESTful APIs that power both web and mobile frontends.
Authentication flows use JWT with refresh token rotation and blacklisting. Real-time features integrate Firebase Firestore.
APIs are documented with drf-spectacular (OpenAPI 3), containerised with Docker, and deployed behind Nginx reverse proxy on cloud infrastructure.`,
  },
};
