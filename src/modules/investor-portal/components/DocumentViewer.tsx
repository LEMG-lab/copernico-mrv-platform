import React, { useState } from 'react';
import {
    ArrowLeft,
    MessageSquare,
    FileText,
    Lock,
    Calendar,
    Download,
    Share2,
    Bookmark,
    ChevronDown,
    ChevronUp,
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    Info,
    TrendingUp,
    Shield,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DocumentContent } from '../data/documentContents';
import { getDocumentPrompt, MASTER_PROMPT } from '../data/dataRoomPrompts';
import AIAssistantModal from './AIAssistantModal';
import AnimatedBackground from './AnimatedBackground';
import AIAssistantPanel from './AIAssistantPanel';

interface DocumentViewerProps {
    document: DocumentContent;
}

// Icon mapping for section titles
const getSectionIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('advertencia') || lower.includes('riesgo')) return AlertTriangle;
    if (lower.includes('problema') || lower.includes('desafío')) return AlertTriangle;
    if (lower.includes('solución') || lower.includes('propuesta')) return CheckCircle2;
    if (lower.includes('financ') || lower.includes('revenue') || lower.includes('ingreso')) return TrendingUp;
    if (lower.includes('legal') || lower.includes('permit') || lower.includes('cumplimiento')) return Shield;
    if (lower.includes('tecnolog') || lower.includes('técnic')) return Zap;
    if (lower.includes('resumen') || lower.includes('ejecutivo')) return Sparkles;
    return Info;
};

// Get accent color based on section
const getSectionAccent = (index: number) => {
    const accents = [
        { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/10' },
        { bg: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
        { bg: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/10' },
        { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/10' },
        { bg: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30', text: 'text-rose-400', glow: 'shadow-rose-500/10' },
    ];
    return accents[index % accents.length];
};

// Rich markdown-like renderer with enhanced styling
const renderContent = (content: string): JSX.Element => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inTable = false;
    let tableRows: string[] = [];

    const processLine = (line: string, index: number): JSX.Element | null => {
        // Facebook Video Embed
        if (line.trim().startsWith('[FACEBOOK:') && line.trim().endsWith(']')) {
            const videoId = line.trim().slice(10, -1);
            return (
                <div key={index} className="my-8 rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/50 shadow-xl shadow-cyan-500/10">
                    <div className="relative pb-[56.25%] h-0">
                        <iframe
                            src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${videoId}&show_text=false&width=560`}
                            className="absolute top-0 left-0 w-full h-full"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                    </div>
                    <div className="p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">f</span>
                            </div>
                            <span className="text-slate-400 text-sm">Video de Facebook</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Facebook Post Embed
        if (line.trim().startsWith('[FBPOST:') && line.trim().endsWith(']')) {
            const postUrl = line.trim().slice(8, -1);
            return (
                <div key={index} className="my-8 rounded-2xl overflow-hidden border border-blue-500/30 bg-slate-900/50 shadow-xl shadow-blue-500/10">
                    <iframe
                        src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}&show_text=true&width=500`}
                        width="100%"
                        height="600"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                    <div className="p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">f</span>
                            </div>
                            <span className="text-slate-400 text-sm">Publicación de Facebook</span>
                        </div>
                    </div>
                </div>
            );
        }

        // YouTube/Vimeo Video Embed
        if (line.trim().startsWith('[VIDEO:') && line.trim().endsWith(']')) {
            const videoUrl = line.trim().slice(7, -1);
            return (
                <div key={index} className="my-8 rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/50 shadow-xl shadow-cyan-500/10">
                    <div className="relative pb-[56.25%] h-0">
                        <iframe
                            src={videoUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            );
        }

        // NotebookLM Podcast Link
        if (line.trim().startsWith('[NOTEBOOKLM:') && line.trim().endsWith(']')) {
            const notebookUrl = line.trim().slice(12, -1);
            return (
                <div key={index} className="my-8">
                    <a
                        href={notebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 hover:border-purple-400/50 transition-all hover:scale-[1.01] shadow-xl shadow-purple-500/10"
                    >
                        <div className="p-6 flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <span className="text-3xl">🎙️</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">NotebookLM Podcast</span>
                                    <span className="text-xs text-slate-500">by Google</span>
                                </div>
                                <p className="text-white font-semibold text-lg">Escuchar Podcast Generado por IA →</p>
                                <p className="text-slate-400 text-sm mt-1">Abre en NotebookLM para reproducir</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            );
        }

        // Local Image Embed
        if (line.trim().startsWith('[IMG:') && line.trim().endsWith(']')) {
            const imagePath = line.trim().slice(5, -1);
            return (
                <div key={index} className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-black/30 shadow-xl">
                    <img
                        src={imagePath}
                        alt="Document image"
                        className="w-full h-auto"
                    />
                </div>
            );
        }

        // Image Gallery
        if (line.trim().startsWith('[GALLERY:') && line.trim().endsWith(']')) {
            const images = line.trim().slice(9, -1).split('|');
            return (
                <div key={index} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 shadow-xl hover:border-cyan-500/30 transition-all hover:scale-[1.02] cursor-pointer group">
                            <img
                                src={img.trim()}
                                alt={`Gallery image ${i + 1}`}
                                className="w-full h-auto group-hover:opacity-90 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            );
        }

        // External Link Card
        if (line.trim().startsWith('[LINK:') && line.trim().endsWith(']')) {
            const parts = line.trim().slice(6, -1).split('|');
            const url = parts[0];
            const title = parts[1] || 'Ver Enlace';
            const description = parts[2] || '';
            return (
                <div key={index} className="my-6">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-cyan-400/50 transition-all hover:scale-[1.01] shadow-xl shadow-cyan-500/10"
                    >
                        <div className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-lg truncate">{title} →</p>
                                {description && <p className="text-slate-400 text-sm mt-1 truncate">{description}</p>}
                                <p className="text-cyan-400 text-xs mt-2 truncate">{url}</p>
                            </div>
                        </div>
                    </a>
                </div>
            );
        }

        // Headers
        if (line.startsWith('## ')) {
            return (
                <h3 key={index} className="text-lg font-bold text-white mt-8 mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                    {line.slice(3)}
                </h3>
            );
        }
        if (line.startsWith('# ')) {
            return (
                <h2 key={index} className="text-2xl font-black text-white mt-8 mb-4">
                    {line.slice(2)}
                </h2>
            );
        }

        // Table detection
        if (line.startsWith('|') && line.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableRows = [];
            }
            tableRows.push(line);
            return null;
        } else if (inTable) {
            inTable = false;
            const table = renderTable(tableRows, index);
            tableRows = [];
            return table;
        }

        // Lists with better styling
        if (line.startsWith('* ') || line.startsWith('- ')) {
            const text = line.slice(2);
            return (
                <li key={index} className="flex items-start gap-3 text-slate-300 mb-3 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mt-2 flex-shrink-0" />
                    <span>{renderInlineFormatting(text)}</span>
                </li>
            );
        }
        if (/^\d+\. /.test(line)) {
            const match = line.match(/^(\d+)\. /);
            const num = match ? match[1] : '1';
            const text = line.replace(/^\d+\. /, '');
            return (
                <li key={index} className="flex items-start gap-3 text-slate-300 mb-3 leading-relaxed">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-sm font-bold flex-shrink-0">
                        {num}
                    </span>
                    <span className="pt-0.5">{renderInlineFormatting(text)}</span>
                </li>
            );
        }

        // Blockquotes
        if (line.startsWith('> ')) {
            return (
                <blockquote key={index} className="border-l-4 border-cyan-500/50 pl-4 py-2 my-4 bg-cyan-500/5 rounded-r-lg">
                    <p className="text-slate-300 italic">{renderInlineFormatting(line.slice(2))}</p>
                </blockquote>
            );
        }

        // Empty lines
        if (line.trim() === '') {
            return <div key={index} className="h-4" />;
        }

        // Regular paragraphs
        return (
            <p key={index} className="text-slate-300 mb-4 leading-relaxed text-base">
                {renderInlineFormatting(line)}
            </p>
        );
    };

    const renderInlineFormatting = (text: string): React.ReactNode => {
        // Bold
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            // Check marks with badges
            if (part.includes('✅')) {
                return <span key={i} className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-sm">{part}</span>;
            }
            if (part.includes('❌')) {
                return <span key={i} className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full text-sm">{part}</span>;
            }
            if (part.includes('🔄')) {
                return <span key={i} className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full text-sm">{part}</span>;
            }
            // Currency/numbers highlighting
            if (/\$[\d,]+/.test(part)) {
                return <span key={i} className="text-emerald-400 font-semibold">{part}</span>;
            }
            // Percentages
            if (/\d+%/.test(part)) {
                return <span key={i} className="text-cyan-400 font-semibold">{part}</span>;
            }
            return part;
        });
    };

    const renderTable = (rows: string[], keyBase: number): JSX.Element => {
        const headers = rows[0].split('|').filter(cell => cell.trim());
        const dataRows = rows.slice(2); // Skip header and separator

        return (
            <div key={keyBase} className="my-8 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10">
                                {headers.map((header, i) => (
                                    <th key={i} className="text-left py-4 px-5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                                        {header.trim()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataRows.map((row, rowIndex) => {
                                const cells = row.split('|').filter(cell => cell.trim());
                                return (
                                    <tr key={rowIndex} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        {cells.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="py-4 px-5 text-slate-300">
                                                {renderInlineFormatting(cell.trim())}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    lines.forEach((line, index) => {
        const element = processLine(line, index);
        if (element) {
            elements.push(element);
        }
    });

    // Handle table at end of content
    if (inTable && tableRows.length > 0) {
        elements.push(renderTable(tableRows, lines.length));
    }

    return <>{elements}</>;
};

const SUGGESTED_QUESTIONS_FOR_DOCUMENT = [
    '¿Cuáles son los puntos clave de este documento?',
    '¿Qué riesgos menciona este documento?',
    '¿Puedes resumir las métricas principales?',
    '¿Qué preguntas de due diligence aplican aquí?',
];

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
    const navigate = useNavigate();
    const [showAIModal, setShowAIModal] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set(document.sections.map((_, i) => i)));

    const prompt = getDocumentPrompt(document.id) || MASTER_PROMPT;

    const toggleSection = (index: number) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedSections(newExpanded);
    };

    const handleQuestionClick = (_question: string) => {
        setShowAIModal(true);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Content Layer */}
            <div className="relative z-10">
                {/* Premium Sticky Header */}
                <div className="sticky top-0 z-20">
                    <div className="doc-header-glass">
                        <div className="max-w-[1600px] mx-auto px-6 py-4">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => navigate('/data-room')}
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                                >
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-medium">Volver al Data Room</span>
                                </button>

                                <div className="flex items-center gap-3">
                                    <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                    <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setShowAIModal(true)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Ask AI</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="max-w-[1600px] mx-auto px-6 py-8">
                    <div className="flex gap-8">
                        {/* Document Content */}
                        <div className="flex-1 min-w-0">
                            {/* Premium Document Header Card */}
                            <div className="doc-hero-card mb-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl" />
                                <div className="relative p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/25">
                                                <FileText className="w-10 h-10 text-white" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center border-2 border-slate-900">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                {document.confidential && (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                                                        <Lock className="w-3 h-3" /> CONFIDENCIAL
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                                                    <Calendar className="w-3 h-3" /> {document.lastUpdated}
                                                </span>
                                            </div>
                                            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
                                                {document.title}
                                            </h1>
                                            <p className="text-lg text-slate-400">{document.subtitle}</p>

                                            {/* Document Stats */}
                                            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-cyan-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-white">{document.sections.length}</p>
                                                        <p className="text-xs text-slate-500">Secciones</p>
                                                    </div>
                                                </div>
                                                <div className="w-px h-12 bg-white/10" />
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                                        <Sparkles className="w-5 h-5 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-white">AI</p>
                                                        <p className="text-xs text-slate-500">Asistido</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sections */}
                            <div className="space-y-6">
                                {document.sections.map((section, index) => {
                                    const accent = getSectionAccent(index);
                                    const SectionIcon = getSectionIcon(section.title);
                                    const isExpanded = expandedSections.has(index);

                                    return (
                                        <section key={index} className="doc-section-card group">
                                            {/* Section Header */}
                                            <button
                                                onClick={() => toggleSection(index)}
                                                className="w-full p-6 flex items-center gap-4 text-left hover:bg-white/5 transition-colors rounded-t-2xl"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.bg} border ${accent.border} flex items-center justify-center shadow-lg ${accent.glow} group-hover:scale-105 transition-transform`}>
                                                    <SectionIcon className={`w-6 h-6 ${accent.text}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-xs font-bold ${accent.text} uppercase tracking-wider`}>
                                                            Sección {index + 1}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                        {section.title}
                                                    </h2>
                                                </div>
                                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${accent.text} group-hover:bg-white/10 transition-all`}>
                                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                </div>
                                            </button>

                                            {/* Section Content */}
                                            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="px-6 pb-6">
                                                    <div className={`p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/30 border ${accent.border} border-opacity-50`}>
                                                        <div className="prose prose-invert max-w-none">
                                                            {renderContent(section.content)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>

                            {/* Premium Footer */}
                            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-white/5 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                                    <Shield className="w-8 h-8 text-cyan-400" />
                                </div>
                                <p className="text-white font-semibold mb-1">
                                    © 2025 Rendón Agroenlace S.A. de C.V.
                                </p>
                                <p className="text-slate-500 text-sm">
                                    DOCUMENTO CONFIDENCIAL | NO CONSTITUYE OFERTA PÚBLICA DE VALORES
                                </p>
                            </div>
                        </div>

                        {/* AI Assistant Sidebar */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-24">
                                <AIAssistantPanel
                                    suggestedQuestions={SUGGESTED_QUESTIONS_FOR_DOCUMENT}
                                    onQuestionClick={handleQuestionClick}
                                    onOpenChat={() => setShowAIModal(true)}
                                    documentName={document.title}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* AI Assistant Modal */}
            <AIAssistantModal
                isOpen={showAIModal}
                onClose={() => setShowAIModal(false)}
                prompt={prompt}
                documentName={document.title}
            />

            {/* Premium Styles */}
            <style>{`
                .doc-header-glass {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }
                
                .doc-hero-card {
                    position: relative;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    overflow: hidden;
                }
                
                .doc-section-card {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .doc-section-card:hover {
                    border-color: rgba(6, 182, 212, 0.2);
                    box-shadow: 0 0 40px rgba(6, 182, 212, 0.05);
                }
            `}</style>
        </div>
    );
};

export default DocumentViewer;
