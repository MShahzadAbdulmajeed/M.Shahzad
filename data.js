const skill_data = {
    'object-detection': {
        'name': 'Object Detection',
        'icon': 'fa-eye',
        'tags': ['Computer Vision', 'Deep Learning', 'AI'],
        'tools': ['TensorFlow', 'OpenCV', 'YOLOv5', 'Transformers', 'Keras', 'LabelImg', 'RTX 3060 GPU'],
        'projects': [
            { 'name': 'Real-time Surveillance System', 'description': 'AI-powered security system with anomaly detection using TensorFlow and OpenCV' },
            { 'name': 'Retail Analytics', 'description': 'Customer behavior tracking using CV and object detection models' },
            { 'name': 'Smart Traffic Monitoring', 'description': 'Detecting traffic violations and vehicle count using YOLOv5 and OpenCV' },
            { 'name': 'Multi-Class Object Detector', 'description': 'Trained custom models for diverse objects using TensorFlow and PyTorch' }
        ],
        'description': 'Developed object detection systems using TensorFlow, OpenCV, YOLOv5, and Transformer-based models, optimized with RTX 3060 GPU.'
    },
    'image-classification': {
        'name': 'Image Classification',
        'icon': 'fa-image',
        'tags': ['Deep Learning', 'AI', 'Computer Vision'],
        'tools': ['TensorFlow', 'Keras', 'CNNs', 'Matplotlib'],
        'projects': [
            { 'name': 'Disease Detection in Plants', 'description': 'Classified plant leaf diseases using CNN' },
            { 'name': 'Fashion Item Classifier', 'description': 'Built model to identify clothing types from images' },
            { 'name': 'Dog Breed Classifier', 'description': 'Used TensorFlow and transfer learning for breed prediction' }
        ],
        'description': 'Built classification models with CNNs and TensorFlow for real-world applications in healthcare, fashion, and agriculture.'
    },
    'face-detection': {
        'name': 'Face Detection',
        'icon': 'fa-user',
        'tags': ['Facial Recognition', 'AI', 'Computer Vision'],
        'tools': ['OpenCV', 'Haar Cascades', 'MTCNN', 'DeepFace', 'TensorFlow'],
        'projects': [
            { 'name': 'Face Attendance System', 'description': 'Automated attendance using face recognition' },
            { 'name': 'Face Analysis Dashboard', 'description': 'Demographics and emotion recognition via DeepFace' },
            { 'name': 'Real-Time Face Tracking', 'description': 'Developed with OpenCV and MTCNN' }
        ],
        'description': 'Created real-time facial recognition and analysis tools using DeepFace and OpenCV.'
    },
    'agentic-ai': {
        'name': 'Agentic AI',
        'icon': 'fa-robot',
        'tags': ['Multi-Agent Systems', 'LangChain', 'LLMs', 'RAG'],
        'tools': ['LangChain', 'CrewAI', 'OpenAI', 'Gemini', 'Pinecone'],
        'projects': [
            { 'name': 'Multi-Agent Chatbot', 'description': 'Built CrewAI-based agents that collaborate using memory and tools' },
            { 'name': 'Task-Specific AI Agents', 'description': 'Implemented agents for PDF reading, search, and response generation' }
        ],
        'description': 'Built autonomous, collaborative agents using LangChain and CrewAI integrated with RAG architecture and memory.'
    },
    'chatbot': {
        'name': 'Chatbot',
        'icon': 'fa-comments',
        'tags': ['NLP', 'AI', 'Conversational Systems'],
        'tools': ['LangChain', 'OpenAI', 'Google Gemini', 'Streamlit', 'Flask'],
        'projects': [
            { 'name': 'Conversational Assistant', 'description': 'Built intelligent assistant using LLMs and LangChain' },
            { 'name': 'Multi-Functional Chatbot', 'description': 'Chatbot with tools like PDF reader, web search, and summarizer' }
        ],
        'description': 'Designed custom AI-powered chatbots using LLMs and LangChain with tools and memory integration.'
    },
    'mathsolver': {
        'name': 'Math Solver',
        'icon': 'fa-square-root-alt',
        'tags': ['AI', 'OCR', 'Deep Learning'],
        'tools': ['TensorFlow', 'CNN', 'Tesseract OCR', 'Streamlit'],
        'projects': [
            { 'name': 'AI Math Solver', 'description': 'Solved handwritten math problems using OCR and image models' },
            { 'name': 'Equation Recognizer', 'description': 'Extracted and computed equations from scanned documents' }
        ],
        'description': 'Developed OCR-based AI tools to detect and solve handwritten math problems using CNNs and Streamlit.'
    },
    'fullstack-development': {
        'name': 'Full-Stack Development',
        'icon': 'fa-layer-group',
        'tags': ['Web Development', 'Frontend', 'Backend', 'API'],
        'tools': ['React', 'Tailwind CSS', 'Django', 'Django Rest Framework', 'Firebase', 'PostgreSQL'],
        'projects': [
            { 'name': 'Multi-Agent Website', 'description': 'Built a website integrating multi-agent AI tools with DRF backend' },
            { 'name': 'Portfolio Website', 'description': 'Responsive personal portfolio with React and Tailwind CSS' }
        ],
        'description': 'Experienced in building robust full-stack applications using React, Django, REST APIs, and Firebase.'
    },
    'frontend-development': {
        'name': 'Frontend Development',
        'icon': 'fa-laptop-code',
        'tags': ['UI/UX', 'Design', 'Responsiveness'],
        'tools': ['React', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
        'projects': [
            { 'name': 'Responsive Portfolio', 'description': 'Modern portfolio using React and Tailwind' },
            { 'name': 'Landing Pages', 'description': 'Designed multiple responsive UIs for client projects' }
        ],
        'description': 'Created responsive and visually appealing UIs using React, Tailwind, and modern web design practices.'
    },
    'backend-development': {
        'name': 'Backend Development',
        'icon': 'fa-server',
        'tags': ['API', 'Authentication', 'Database'],
        'tools': ['Django', 'Django Rest Framework', 'Firebase', 'PostgreSQL', 'JWT'],
        'projects': [
            { 'name': 'Auth System', 'description': 'Custom login/signup with JWT using Django' },
            { 'name': 'API for AI Tools', 'description': 'Built and deployed RESTful APIs for AI services' }
        ],
        'description': 'Built secure and scalable backends using Django and DRF with token-based authentication and real-time Firebase integration.'
    }
}