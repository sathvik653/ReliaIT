
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! Welcome to ReliaIT. How can I assist you with your IT or office stationery needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
         setTimeout(() => {
            setMessages(prev => [...prev, { 
                role: 'model', 
                text: "I'm currently in demo mode. We are ReliaIT, specializing in Hardware, Office Stationery, and Banking solutions. Please call us at +91 98765 43210 for a professional quote!" 
            }]);
            setIsLoading(false);
         }, 1000);
         return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            {
                role: 'user',
                parts: [{ text: `You are a helpful sales assistant for ReliaIT. 
                Business Nature: Leading supplier of IT Hardware parts, Office Stationery, and Computer Stationery in Rajahmundry.
                Target Clients: Major Bank branches, IT Companies, Educational Institutions, Government Departments.
                Goal: Educate clients on our 20+ years of trust and extensive product range. DO NOT try to sell directly online, encourage calling +91 98765 43210 or visiting our office.
                
                Product Range:
                - Computer Hardware (Authorized Dell, HP, Lenovo partner)
                - Office Stationery (Complete corporate supplies)
                - Computer Stationery (Toners, Cartridges, Cables)
                - Networking Infrastructure
                
                Be polite, professional, and emphasize reliability and genuine products.
                
                User Query: ${userMessage}` }]
            }
        ],
      });

      const text = response.text || "I'm sorry, I couldn't process that. Please try again.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please contact ReliaIT directly at +91 98765 43210." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center
          ${isOpen ? 'bg-accent-500 rotate-90' : 'bg-brand-900 animate-bounce-slow'}`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X color="white" size={24} /> : <MessageSquare color="white" size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-brand-900 p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold">ReliaIT Support</h3>
              <p className="text-xs text-brand-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span> Expert Online
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                  <Loader2 className="animate-spin text-brand-900" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="How can we help?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-accent-500 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-brand-900 rounded-full text-white hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
