import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Shahzad's AI assistant. Ask me anything about his expertise in AI and Full-Stack development!" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('tech')) return "Shahzad is proficient in Python, JavaScript, TypeScript, Django, React, TensorFlow, and PyTorch. He specializes in Agentic AI and Computer Vision.";
    if (q.includes('project')) return "He has built Real-time Object Tracking systems, Multi-Agent chatbots with CrewAI, and robust Full-Stack apps with Django and React.";
    if (q.includes('contact')) return "You can reach Shahzad via LinkedIn or email at shahzad.abdulmajeed4894@gmail.com.";
    return "That's a great question! Shahzad has extensive experience in building end-to-end AI solutions. Would you like to hear about his Computer Vision or NLP projects?";
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass-card shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-4 bg-primary flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="font-bold">Portfolio AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg text-sm ${
                      m.role === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-secondary text-foreground border border-glass-border rounded-bl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-glass-border bg-secondary/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-background border border-glass-border rounded-xl py-2 px-4 pr-10 text-sm focus:outline-none focus:border-primary transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1.5 p-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white relative"
      >
        {isOpen ? <X /> : <Bot />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};

export default Assistant;
