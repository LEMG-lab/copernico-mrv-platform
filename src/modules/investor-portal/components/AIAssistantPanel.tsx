import React, { useState } from 'react';
import { Bot, Sparkles, ChevronRight, MessageSquare, Send } from 'lucide-react';

interface AIAssistantPanelProps {
    suggestedQuestions: string[];
    onQuestionClick: (question: string) => void;
    onOpenChat: () => void;
    documentName?: string;
}

/**
 * AIAssistantPanel - Premium floating AI assistant with suggested questions
 * Always visible to encourage user interaction
 */
const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
    suggestedQuestions,
    onQuestionClick,
    onOpenChat,
    documentName
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="ai-panel-container">
            {/* Header */}
            <div className="ai-panel-header">
                <div className="ai-panel-icon">
                    <Bot className="w-5 h-5" />
                    <div className="ai-pulse" />
                </div>
                <div className="ai-panel-title">
                    <span className="title-text">Asistente de IA</span>
                    <span className="status-badge">
                        <Sparkles className="w-3 h-3" />
                        Gemini Activo
                    </span>
                </div>
            </div>

            {/* Context indicator */}
            {documentName && (
                <div className="ai-context">
                    <span>Contexto:</span>
                    <span className="context-name">{documentName}</span>
                </div>
            )}

            {/* Suggested Questions */}
            <div className="ai-questions-container">
                <p className="questions-label">Preguntas sugeridas</p>
                <div className="questions-list">
                    {suggestedQuestions.slice(0, 4).map((question, index) => (
                        <button
                            key={index}
                            className={`question-item ${hoveredIndex === index ? 'hovered' : ''}`}
                            onClick={() => onQuestionClick(question)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <MessageSquare className="question-icon" />
                            <span className="question-text">{question}</span>
                            <ChevronRight className="chevron-icon" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom question button */}
            <button className="ai-custom-btn" onClick={onOpenChat}>
                <Send className="w-4 h-4" />
                <span>Hacer otra pregunta</span>
            </button>

            <style>{`
                .ai-panel-container {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(6, 182, 212, 0.2);
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 
                        0 0 40px rgba(6, 182, 212, 0.1),
                        0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    position: relative;
                    overflow: hidden;
                }
                
                .ai-panel-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent);
                }
                
                .ai-panel-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                
                .ai-panel-icon {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #06B6D4;
                }
                
                .ai-pulse {
                    position: absolute;
                    inset: 0;
                    border-radius: 12px;
                    border: 2px solid rgba(6, 182, 212, 0.4);
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                
                .ai-panel-title {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                
                .title-text {
                    font-weight: 700;
                    color: white;
                    font-size: 16px;
                    letter-spacing: -0.02em;
                }
                
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 11px;
                    color: #22D3EE;
                    background: rgba(6, 182, 212, 0.1);
                    padding: 2px 8px;
                    border-radius: 20px;
                    width: fit-content;
                }
                
                .ai-context {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #94A3B8;
                    padding: 8px 12px;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    margin-bottom: 16px;
                }
                
                .context-name {
                    color: #CBD5E1;
                    font-weight: 500;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .ai-questions-container {
                    margin-bottom: 16px;
                }
                
                .questions-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #64748B;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                
                .questions-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .question-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 14px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                    width: 100%;
                }
                
                .question-item:hover,
                .question-item.hovered {
                    background: rgba(6, 182, 212, 0.1);
                    border-color: rgba(6, 182, 212, 0.3);
                    transform: translateX(4px);
                }
                
                .question-icon {
                    width: 14px;
                    height: 14px;
                    color: #06B6D4;
                    flex-shrink: 0;
                }
                
                .question-text {
                    flex: 1;
                    font-size: 13px;
                    color: #E2E8F0;
                    line-height: 1.4;
                }
                
                .chevron-icon {
                    width: 14px;
                    height: 14px;
                    color: #475569;
                    opacity: 0;
                    transform: translateX(-4px);
                    transition: all 0.2s ease;
                }
                
                .question-item:hover .chevron-icon,
                .question-item.hovered .chevron-icon {
                    opacity: 1;
                    transform: translateX(0);
                    color: #06B6D4;
                }
                
                .ai-custom-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
                    border: 1px solid rgba(6, 182, 212, 0.3);
                    border-radius: 10px;
                    color: #22D3EE;
                    font-weight: 600;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .ai-custom-btn:hover {
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%);
                    border-color: rgba(6, 182, 212, 0.5);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
                }
            `}</style>
        </div>
    );
};

export default AIAssistantPanel;
