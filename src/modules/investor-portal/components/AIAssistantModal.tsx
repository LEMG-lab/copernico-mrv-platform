import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { DocumentPrompt, CategoryPrompt, MASTER_PROMPT } from '../data/dataRoomPrompts';
import { sendMessageToGemini, isGeminiConfigured, ChatMessage } from '../services/geminiService';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

interface AIAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    prompt: DocumentPrompt | CategoryPrompt | null;
    documentName?: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
    isOpen,
    onClose,
    prompt,
    documentName
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const activePrompt = prompt || MASTER_PROMPT;
    const isConfigured = isGeminiConfigured();

    // Initialize with welcome message when modal opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: '1',
                role: 'assistant',
                content: activePrompt.welcomeMessage,
                timestamp: new Date()
            }]);
            setError(null);
        }
    }, [isOpen, activePrompt.welcomeMessage, messages.length]);

    // Reset messages when prompt changes
    useEffect(() => {
        if (isOpen) {
            setMessages([{
                id: '1',
                role: 'assistant',
                content: activePrompt.welcomeMessage,
                timestamp: new Date()
            }]);
            setError(null);
        }
    }, [activePrompt, isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Convert messages to Gemini format
    const getGeminiHistory = (): ChatMessage[] => {
        return messages
            .filter(m => m.role !== 'system')
            .slice(1) // Skip welcome message
            .map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            }));
    };

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setError(null);

        if (!isConfigured) {
            // Fallback to placeholder response
            setTimeout(() => {
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: `Para habilitar respuestas de IA, agrega tu API key de Gemini en el archivo .env.local:

VITE_GEMINI_API_KEY=tu_api_key_aquí

Luego reinicia el servidor de desarrollo.`,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, assistantMessage]);
                setIsTyping(false);
            }, 500);
            return;
        }

        try {
            const history = getGeminiHistory();
            const response = await sendMessageToGemini(
                activePrompt.systemPrompt,
                history,
                content.trim()
            );

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Lo siento, ocurrió un error: ${errorMessage}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestedQuestion = (question: string) => {
        handleSendMessage(question);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white text-lg">
                                {activePrompt.title}
                            </h2>
                            {documentName && (
                                <p className="text-xs text-slate-400">{documentName}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isConfigured ? (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                Gemini Activo
                            </span>
                        ) : (
                            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                                Sin API Key
                            </span>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="px-4 py-2 bg-red-900/30 border-b border-red-500/30 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">{error}</span>
                    </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.role === 'assistant' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-md'
                                        : 'bg-slate-800 text-slate-100 rounded-bl-md'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-300" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3 justify-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length <= 1 && (
                    <div className="px-4 pb-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold text-slate-400">Preguntas sugeridas</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {activePrompt.suggestedQuestions.map((question, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-full border border-slate-700 hover:border-cyan-500/50 transition-all"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                    <div className="flex gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu pregunta..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isTyping}
                        />
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isTyping}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        Asistente potenciado por Gemini AI. Las respuestas son informativas y no constituyen asesoría legal o financiera.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;
