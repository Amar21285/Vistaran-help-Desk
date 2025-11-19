import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { decode, decodeAudioData } from '../utils/audio';

// Define the structure for a chat message
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTtsEnabled, setIsTtsEnabled] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext on first user interaction
    const initAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
    };

    // Scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const playAudioResponse = async (text: string) => {
        if (!isTtsEnabled || !text.trim()) return;

        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
                const audioBuffer = await decodeAudioData(
                    decode(base64Audio),
                    audioContextRef.current,
                    24000,
                    1,
                );
                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContextRef.current.destination);
                source.start();
            }
        } catch (error) {
            console.error('Error generating or playing audio:', error);
            // Optionally, inform the user about the audio error
            setMessages(prev => [...prev, { sender: 'ai', text: "(Sorry, I couldn't generate audio for that response.)" }]);
        }
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        initAudioContext(); // Ensure AudioContext is ready

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const prompt = `You are "Vistaran AI", a helpful assistant for the Vistaran Help Desk. The user can speak English, Hindi, or Hinglish. Your primary goal is to answer questions related to IT issues, ticket creation, and general help desk queries. Respond in the same language and tone as the user. Keep your answers friendly and concise. If you don't know the answer, say so politely.

            User's question: "${input}"`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            
            const aiText = response.text;
            const aiMessage: Message = { sender: 'ai', text: aiText };
            setMessages(prev => [...prev, aiMessage]);

            await playAudioResponse(aiText);

        } catch (error) {
            console.error('Error with Gemini API:', error);
            const errorMessage: Message = { sender: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-0 right-0 m-6 transition-all duration-300 z-50 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'}`}>
                <button
                    onClick={() => { setIsOpen(true); initAudioContext(); }}
                    className="bg-primary text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-primary-hover transition-transform transform hover:scale-110"
                    aria-label="Open AI Assistant"
                >
                    <i className="fas fa-comments text-2xl"></i>
                </button>
            </div>

            <div className={`fixed bottom-0 right-0 m-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Vistaran AI Assistant</h3>
                    <div className="flex items-center gap-3">
                         <button onClick={() => setIsTtsEnabled(prev => !prev)} className={`text-xl ${isTtsEnabled ? 'text-primary' : 'text-slate-400'}`} aria-label={isTtsEnabled ? 'Disable audio responses' : 'Enable audio responses'}>
                            <i className={`fas ${isTtsEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl" aria-label="Close chat">
                            &times;
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0"><i className="fas fa-robot"></i></div>}
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-2 justify-start">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0"><i className="fas fa-robot"></i></div>
                            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 rounded-bl-none">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-700">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition disabled:bg-slate-400" disabled={isLoading || !input.trim()}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;