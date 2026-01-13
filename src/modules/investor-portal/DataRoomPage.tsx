import React, { useState } from 'react';
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
    Search
} from 'lucide-react';

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
];

const CATEGORIES = [
    { id: 'pitch', label: 'Pitch & Summary', icon: FileText, color: 'blue' },
    { id: 'financial', label: 'Financial Documents', icon: TrendingUp, color: 'green' },
    { id: 'legal', label: 'Legal & Compliance', icon: Shield, color: 'purple' },
    { id: 'technical', label: 'Technical Documentation', icon: Cpu, color: 'orange' },
    { id: 'qa', label: 'Due Diligence Q&A', icon: HelpCircle, color: 'cyan' },
] as const;

const FileTypeIcon: React.FC<{ type: Document['type'] }> = ({ type }) => {
    const colors: Record<Document['type'], string> = {
        pdf: 'text-red-500 bg-red-50',
        xlsx: 'text-green-600 bg-green-50',
        pptx: 'text-orange-500 bg-orange-50',
        docx: 'text-blue-500 bg-blue-50',
        video: 'text-purple-500 bg-purple-50',
    };

    return (
        <span className={`${colors[type]} text-[10px] font-bold px-2 py-1 rounded uppercase`}>
            {type}
        </span>
    );
};

export const DataRoomPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [accessGranted] = useState(true); // Mock: In real app, check auth

    const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryStats = (catId: string) => {
        const docs = MOCK_DOCUMENTS.filter(d => d.category === catId);
        return {
            count: docs.length,
            restricted: docs.filter(d => d.restricted).length
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                            <FolderOpen className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white">Investor Data Room</h1>
                    </div>
                    <p className="text-slate-400">
                        Secure access to LarvaLINK documentation for due diligence. Last updated Dec 15, 2025.
                    </p>
                </div>

                {/* Access Status Banner */}
                {accessGranted ? (
                    <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-green-400" />
                            <div>
                                <p className="font-bold text-green-300">Full Access Granted</p>
                                <p className="text-xs text-green-400/70">You have access to restricted documents. NDA signed on Dec 1, 2025.</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-green-300 hover:text-green-200 underline">
                            View NDA
                        </button>
                    </div>
                ) : (
                    <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl p-4 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="font-bold text-amber-300">Limited Access</p>
                                <p className="text-xs text-amber-400/70">Sign NDA to access restricted documents.</p>
                            </div>
                        </div>
                        <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-4 py-2 rounded-lg">
                            Request Full Access
                        </button>
                    </div>
                )}

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        All Documents ({MOCK_DOCUMENTS.length})
                    </button>
                    {CATEGORIES.map(cat => {
                        const stats = getCategoryStats(cat.id);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeCategory === cat.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label} ({stats.count})
                            </button>
                        );
                    })}
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocs.map(doc => (
                        <div
                            key={doc.id}
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-blue-500/50 transition-all group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <FileTypeIcon type={doc.type} />
                                {doc.restricted && (
                                    <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded">
                                        <Lock className="w-3 h-3" /> NDA
                                    </span>
                                )}
                            </div>

                            <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {doc.name}
                            </h3>

                            {doc.description && (
                                <p className="text-xs text-slate-400 mb-3 line-clamp-2">{doc.description}</p>
                            )}

                            <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-3 border-t border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                    <span>{doc.size}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {doc.views}
                                    </span>
                                    <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold">
                                        <Download className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDocs.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No documents found matching your criteria.</p>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-between group">
                        <div className="text-left">
                            <p className="text-sm opacity-80">Download All</p>
                            <p className="text-lg">Complete Data Package</p>
                        </div>
                        <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    </button>

                    <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-between group">
                        <div className="text-left">
                            <p className="text-sm text-slate-400">Schedule</p>
                            <p className="text-lg">Management Call</p>
                        </div>
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-between group">
                        <div className="text-left">
                            <p className="text-sm text-slate-400">Ask</p>
                            <p className="text-lg">Due Diligence Questions</p>
                        </div>
                        <HelpCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DataRoomPage;
