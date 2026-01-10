import React from 'react';

export const SellerDashboard: React.FC = () => {
    return (
        <div className="bg-[#0F172A] min-h-screen p-8 text-slate-200">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Panel de Vendedor (Planta)</h1>
                        <p className="text-slate-400">Gestiona tus activos y ventas de créditos.</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-blue-900/40 flex items-center gap-2">
                        <span>+</span> Listar Nuevo Crédito
                    </button>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Ingresos este mes', value: '$23,450 USD', change: '+18% vs mes anterior', color: 'text-green-400' },
                        { label: 'Créditos Vendidos', value: '847 tCO2eq', change: '12 transacciones', color: 'text-white' },
                        { label: 'Créditos Disponibles', value: '1,653 tCO2eq', change: 'Stock saludable', color: 'text-blue-400' },
                        { label: 'Rating Promedio', value: '4.9 ★★★★★', change: 'Top Seller', color: 'text-yellow-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                            <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                            <div className={`text-2xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                            <div className="text-xs text-slate-500">{stat.change}</div>
                        </div>
                    ))}
                </div>

                {/* Listings Table */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-10">
                    <div className="p-5 border-b border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-white">Mis Créditos Listados</h3>
                        <button className="text-sm text-blue-400 hover:text-white">Ver todos</button>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Tipo</th>
                                <th className="px-6 py-3">Vintage</th>
                                <th className="px-6 py-3">Cantidad</th>
                                <th className="px-6 py-3">Precio</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {[
                                { type: 'CarbonLINK', vintage: '2025', qty: '500 tCO2eq', price: '$28.00', status: 'active' },
                                { type: 'CircularLINK', vintage: '2025', qty: '1,200 tons', price: '$12.00', status: 'active' },
                                { type: 'BioLINK', vintage: '2024', qty: '0 ha (Agotado)', price: '$65.00', status: 'inactive' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{item.type}</td>
                                    <td className="px-6 py-4 text-slate-400">{item.vintage}</td>
                                    <td className="px-6 py-4 text-slate-300">{item.qty}</td>
                                    <td className="px-6 py-4 text-slate-300">{item.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                            {item.status === 'active' ? 'Disponible' : 'Agotado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-400 hover:text-white mr-3">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Transactions */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="p-5 border-b border-slate-700">
                        <h3 className="font-bold text-white">Transacciones Recientes</h3>
                    </div>
                    <div className="p-5 text-center text-slate-500 text-sm italic">
                        Cargando historial de blockchain...
                    </div>
                </div>
            </div>
        </div>
    );
};
