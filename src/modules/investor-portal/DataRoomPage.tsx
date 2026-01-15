import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import {
    FileText,
    TrendingUp,
    Shield,
    Cpu,
    HelpCircle,
    Download,
    Lock,
    Eye,
    Clock,
    ChevronRight,
    FolderOpen,
    Search,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { AIAssistantModal } from './components/AIAssistantModal';
import AnimatedBackground from './components/AnimatedBackground';
import AIAssistantPanel from './components/AIAssistantPanel';
import { getDocumentPrompt, MASTER_PROMPT, DocumentPrompt, CategoryPrompt } from './data/dataRoomPrompts';
import { hasDocumentContent } from './data/documentContents';

// Types
interface Document {
    id: string;
    name: string;
    category: 'pitch' | 'financial' | 'legal' | 'technical' | 'qa';
    type: 'pdf' | 'xlsx' | 'pptx' | 'docx' | 'video';
    size: string;
    uploadedAt: string;
    restricted: boolean;
    views: number;
    description?: string;
}

// Mock Data
const MOCK_DOCUMENTS: Document[] = [
    // Pitch Deck
    { id: '1', name: 'LarvaLINK Investor Deck Q4 2025', category: 'pitch', type: 'pptx', size: '24.5 MB', uploadedAt: '2025-12-15', restricted: false, views: 342, description: 'Full investor deck with business model, market analysis, and projections' },
    { id: '2', name: 'One-Pager Executive Summary', category: 'pitch', type: 'pdf', size: '1.2 MB', uploadedAt: '2025-12-10', restricted: false, views: 891 },
    { id: '3', name: 'Video Pitch (5 min)', category: 'pitch', type: 'video', size: '156 MB', uploadedAt: '2025-11-20', restricted: false, views: 127 },

    // Financial Documents
    { id: '4', name: 'Financial Model 5-Year Projections', category: 'financial', type: 'xlsx', size: '8.3 MB', uploadedAt: '2025-12-01', restricted: true, views: 45, description: 'DCF model with sensitivity analysis and multiple scenarios' },
    { id: '5', name: 'P&L Statement YTD 2025', category: 'financial', type: 'pdf', size: '2.1 MB', uploadedAt: '2025-11-30', restricted: true, views: 38 },
    { id: '6', name: 'Carbon Credit Revenue Forecast', category: 'financial', type: 'xlsx', size: '4.7 MB', uploadedAt: '2025-11-25', restricted: true, views: 29 },
    { id: '7', name: 'Use of Funds Breakdown', category: 'financial', type: 'pdf', size: '890 KB', uploadedAt: '2025-12-12', restricted: false, views: 156 },
    { id: '8', name: 'Cap Table (Current)', category: 'financial', type: 'xlsx', size: '156 KB', uploadedAt: '2025-12-14', restricted: true, views: 12 },

    // Legal Documents
    { id: '9', name: 'Articles of Incorporation', category: 'legal', type: 'pdf', size: '3.4 MB', uploadedAt: '2024-03-15', restricted: true, views: 8 },
    { id: '10', name: 'IP Portfolio Summary', category: 'legal', type: 'pdf', size: '5.6 MB', uploadedAt: '2025-10-01', restricted: true, views: 15 },
    { id: '11', name: 'SAFE Agreement Template', category: 'legal', type: 'docx', size: '245 KB', uploadedAt: '2025-11-01', restricted: false, views: 67 },
    { id: '12', name: 'Environmental Permits (All Plants)', category: 'legal', type: 'pdf', size: '12.8 MB', uploadedAt: '2025-09-20', restricted: true, views: 11 },
    { id: '13', name: 'Carbon Credit Certification (Verra)', category: 'legal', type: 'pdf', size: '4.2 MB', uploadedAt: '2025-08-15', restricted: false, views: 89 },

    // Technical Documents
    { id: '14', name: 'Technology Whitepaper v2.3', category: 'technical', type: 'pdf', size: '7.8 MB', uploadedAt: '2025-11-10', restricted: false, views: 234, description: 'BSF bioconversion process, yield optimization, and IoT integration' },
    { id: '15', name: 'Satellite Verification Methodology', category: 'technical', type: 'pdf', size: '3.1 MB', uploadedAt: '2025-10-05', restricted: false, views: 178 },
    { id: '16', name: 'IoT Architecture Blueprint', category: 'technical', type: 'pdf', size: '5.4 MB', uploadedAt: '2025-09-12', restricted: true, views: 23 },
    { id: '17', name: 'Blockchain Smart Contract Audit', category: 'technical', type: 'pdf', size: '2.9 MB', uploadedAt: '2025-07-20', restricted: false, views: 56 },

    // Due Diligence Q&A
    { id: '18', name: 'Technical Due Diligence FAQ', category: 'qa', type: 'pdf', size: '1.8 MB', uploadedAt: '2025-12-08', restricted: false, views: 134 },
    { id: '19', name: 'Regulatory Compliance FAQ', category: 'qa', type: 'pdf', size: '980 KB', uploadedAt: '2025-12-05', restricted: false, views: 98 },
    { id: '20', name: 'ESG & Impact Metrics Report', category: 'qa', type: 'pdf', size: '4.5 MB', uploadedAt: '2025-11-28', restricted: false, views: 167 },

    // Roadmap
    { id: '21', name: 'Roadmap de Ejecución 2025-2027', category: 'pitch', type: 'pdf', size: '2.1 MB', uploadedAt: '2026-01-14', restricted: false, views: 45, description: 'Hoja de ruta de escalabilidad y expansión' },

    // Research Reports
    { id: '22', name: 'AXA Future Risks Report 2025', category: 'qa', type: 'pdf', size: '8.7 MB', uploadedAt: '2026-01-14', restricted: false, views: 12, description: 'Análisis global de riesgos futuros y relevancia para LarvaLINK' },
];

const CATEGORIES = [
    { id: 'pitch', label: 'Pitch & Summary', icon: FileText, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'financial', label: 'Financial', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'legal', label: 'Legal', icon: Shield, gradient: 'from-purple-500 to-violet-500' },
    { id: 'technical', label: 'Technical', icon: Cpu, gradient: 'from-orange-500 to-amber-500' },
    { id: 'qa', label: 'Q&A', icon: HelpCircle, gradient: 'from-cyan-500 to-blue-500' },
] as const;

const SUGGESTED_QUESTIONS = [
    '¿Cuál es la propuesta de valor única de LarvaLINK?',
    '¿Cuáles son las proyecciones financieras a 5 años?',
    '¿Cómo funciona la estructura de inversión con RPUs?',
    '¿Qué certificaciones ambientales tiene el proyecto?',
];

const FileTypeIcon: React.FC<{ type: Document['type'] }> = ({ type }) => {
    const colors: Record<Document['type'], string> = {
        pdf: 'text-red-400 bg-red-500/20 border-red-500/30',
        xlsx: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
        pptx: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
        docx: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
        video: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    };

    return (
        <span className={`${colors[type]} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border backdrop-blur-sm`}>
            {type}
        </span>
    );
};

export const DataRoomPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // AI Assistant state
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [activePrompt, setActivePrompt] = useState<DocumentPrompt | CategoryPrompt | null>(null);
    const [activeDocumentName, setActiveDocumentName] = useState<string>('');

    const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryStats = (catId: string) => {
        return MOCK_DOCUMENTS.filter(d => d.category === catId).length;
    };

    const handleDocumentClick = (doc: Document) => {
        if (hasDocumentContent(doc.id)) {
            navigate(`/data-room/doc/${doc.id}`);
        }
    };

    const openMasterAI = () => {
        setActivePrompt(MASTER_PROMPT);
        setActiveDocumentName('');
        setIsAIModalOpen(true);
    };

    const handleQuestionClick = (question: string) => {
        setActivePrompt(MASTER_PROMPT);
        setActiveDocumentName('');
        setIsAIModalOpen(true);
        // Note: In a real implementation, you'd pass the question to the modal
    };

    const closeAIModal = () => {
        setIsAIModalOpen(false);
        setActivePrompt(null);
        setActiveDocumentName('');
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Content Layer */}
            <div className="relative z-10">
                <Navigation />

                <main className="max-w-[1600px] mx-auto px-6 py-8">
                    <div className="flex gap-8">
                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0">
                            {/* Premium Header */}
                            <div className="mb-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                            <FolderOpen className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                                            <Lock className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-white tracking-tight">
                                            Investor Data Room
                                        </h1>
                                        <p className="text-slate-400 mt-1 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-cyan-400" />
                                            <span>Acceso completo a documentación para due diligence</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Access Banner */}
                                <div className="glass-card p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-emerald-300">Acceso Completo Autorizado</p>
                                            <p className="text-xs text-slate-400">NDA firmado el 1 de Diciembre, 2025</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        22 documentos disponibles
                                    </div>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
                                <div className="relative glass-card p-1">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar documentos..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Category Pills */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
                                >
                                    <span>Todos</span>
                                    <span className="count">{MOCK_DOCUMENTS.length}</span>
                                </button>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                                    >
                                        <cat.icon className="w-4 h-4" />
                                        <span>{cat.label}</span>
                                        <span className="count">{getCategoryStats(cat.id)}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Documents Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredDocs.map(doc => (
                                    <div
                                        key={doc.id}
                                        onClick={() => handleDocumentClick(doc)}
                                        className={`document-card group ${hasDocumentContent(doc.id) ? 'clickable' : ''}`}
                                    >
                                        <div className="card-glow" />
                                        <div className="card-content">
                                            <div className="flex justify-between items-start mb-3">
                                                <FileTypeIcon type={doc.type} />
                                                {doc.restricted && (
                                                    <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                                                        <Lock className="w-3 h-3" /> NDA
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2 flex items-center gap-2">
                                                {doc.name}
                                                {hasDocumentContent(doc.id) && (
                                                    <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </h3>

                                            {doc.description && (
                                                <p className="text-xs text-slate-400 mb-3 line-clamp-2">{doc.description}</p>
                                            )}

                                            <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-3 border-t border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(doc.uploadedAt).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span>{doc.size}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {doc.views}
                                                    </span>
                                                    <button
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                                                    >
                                                        <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredDocs.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="glass-card inline-block p-8">
                                        <FolderOpen className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                                        <p className="text-slate-400">No se encontraron documentos.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* AI Assistant Sidebar */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-24">
                                <AIAssistantPanel
                                    suggestedQuestions={SUGGESTED_QUESTIONS}
                                    onQuestionClick={handleQuestionClick}
                                    onOpenChat={openMasterAI}
                                />

                                {/* Quick Actions */}
                                <div className="mt-6 space-y-3">
                                    <button className="w-full glass-card p-4 flex items-center gap-3 hover:border-cyan-500/30 transition-colors group">
                                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                                            <Download className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="text-white font-semibold text-sm">Descargar Todo</p>
                                            <p className="text-xs text-slate-400">Paquete completo ZIP</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                    </button>

                                    <button className="w-full glass-card p-4 flex items-center gap-3 hover:border-cyan-500/30 transition-colors group">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="text-white font-semibold text-sm">Agendar Llamada</p>
                                            <p className="text-xs text-slate-400">Con el equipo fundador</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* AI Assistant Modal */}
            <AIAssistantModal
                isOpen={isAIModalOpen}
                onClose={closeAIModal}
                prompt={activePrompt}
                documentName={activeDocumentName}
            />

            {/* Premium Styles */}
            <style>{`
                .glass-card {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                }
                
                .category-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #94A3B8;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    transition: all 0.2s ease;
                }
                
                .category-pill:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.1);
                    color: white;
                }
                
                .category-pill.active {
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
                    border-color: rgba(6, 182, 212, 0.4);
                    color: white;
                    box-shadow: 0 0 20px rgba(6, 182, 212, 0.15);
                }
                
                .category-pill .count {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 2px 8px;
                    border-radius: 20px;
                    font-size: 11px;
                }
                
                .category-pill.active .count {
                    background: rgba(6, 182, 212, 0.3);
                }
                
                .document-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .document-card.clickable {
                    cursor: pointer;
                }
                
                .document-card .card-glow {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .document-card:hover .card-glow {
                    opacity: 1;
                }
                
                .document-card .card-content {
                    position: relative;
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 16px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }
                
                .document-card:hover .card-content {
                    border-color: rgba(6, 182, 212, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
};

export default DataRoomPage;
