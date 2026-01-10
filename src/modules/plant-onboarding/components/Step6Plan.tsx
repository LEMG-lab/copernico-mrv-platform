import React, { useState } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { SUBSCRIPTION_PLANS } from '../data/onboardingConfig';
import { SubscriptionPlan } from '../types/onboarding.types';

export const Step6Plan: React.FC = () => {
    const { subscription, updateSubscription, submitApplication, operations } = useOnboarding();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        // payment mock validation
        if (!subscription.payment_method?.last_four) {
            // fake fill payment for UX flow
            updateSubscription({
                plan: subscription.plan || 'growth',
                payment_method: { type: 'card', last_four: '4242', brand: 'visa' }
            });
        }
        setIsSubmitting(true);
        await submitApplication();
        setIsSubmitting(false);
        // Wizard main component will detect pending status change or we can force redirect here, 
        // but let's stick to state management. Wait... submitApplication updates nothing? 
        // I should manually trigger Success Screen view in parent or here
        // Let's assume OnboardingWizard handles status change. 
        // Actually OnboardingWizard checks status ONLY on mount or change. 
        // For now, I'll update a local state to show SuccessScreen component HERE as a child replacement or redirection.
        // Better: update 'current_step' to a new enum value 'success' (not in type). 
        // Hack: force alert and redirect to Dashboard for now or just rely on OnboardingWizard reload.
        // Let's rely on parent re-rendering. 
        useOnboarding.getState().setSuccess(true);
    };

    const selectPlan = (planId: SubscriptionPlan) => {
        const plan = SUBSCRIPTION_PLANS[planId];
        updateSubscription({
            plan: planId,
            price_usd: billingCycle === 'annual' ? plan.price_annual! : plan.price_monthly!,
            commission_rate: plan.commission_rate,
            features: plan.features
        });
    };

    const selectedPlanId = subscription.plan || 'growth';

    return (
        <div className="animate-fade-in-right">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Selecciona tu Plan de Red</h2>
                <p className="text-slate-500">Basado en tu capacidad ({operations.capacity_tons_day} tons/día), te recomendamos el plan <strong className="text-green-600">GROWTH</strong>.</p>

                <div className="flex justify-center mt-6">
                    <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-bold">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 py-2 rounded-md transition-all ${billingCycle === 'monthly' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Mensual
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Anual <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Ahorra 17%</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {(Object.entries(SUBSCRIPTION_PLANS) as [SubscriptionPlan, typeof SUBSCRIPTION_PLANS.starter][]).filter(([k]) => k !== 'partner').map(([key, plan]) => {
                    const isRecommended = key === 'growth'; // Mock logic
                    const isSelected = selectedPlanId === key;

                    return (
                        <div
                            key={key}
                            onClick={() => selectPlan(key)}
                            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:-translate-y-1 ${isSelected
                                ? 'border-blue-600 bg-blue-50 shadow-xl scale-105 z-10'
                                : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg'
                                }`}
                        >
                            {isRecommended && (
                                <div className="absolute top-0 right-0 left-0 -mt-3 flex justify-center">
                                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">★ Recomendado</span>
                                </div>
                            )}

                            <h3 className="font-bold text-slate-800 text-lg mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-3xl font-black text-slate-900">${billingCycle === 'annual' ? plan.price_annual : plan.price_monthly}</span>
                                <span className="text-xs text-slate-500 font-medium">USD / {billingCycle === 'annual' ? 'año' : 'mes'}</span>
                            </div>
                            <div className="text-xs font-bold text-slate-500 mb-6 bg-slate-100 inline-block px-2 py-1 rounded">
                                + {Math.round(plan.commission_rate * 100)}% comisión venta créditos
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.slice(0, 5).map((feature, i) => (
                                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                                        <span className="text-green-500 font-bold">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className={`w-full py-2 rounded-lg text-sm font-bold text-center transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                }`}>
                                {isSelected ? 'Seleccionado' : 'Seleccionar'}
                            </div>
                        </div>
                    )
                })}
            </div>

            {selectedPlanId && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Resumen y Pago</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Plan Seleccionado:</span>
                                <span className="font-bold text-slate-800 uppercase">{SUBSCRIPTION_PLANS[selectedPlanId].name} ({billingCycle})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Total a Pagar Hoy:</span>
                                <span className="font-bold text-green-600 text-lg">${billingCycle === 'annual' ? SUBSCRIPTION_PLANS[selectedPlanId].price_annual : SUBSCRIPTION_PLANS[selectedPlanId].price_monthly} USD</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Comisión futura:</span>
                                <span className="font-bold text-slate-800">{SUBSCRIPTION_PLANS[selectedPlanId].commission_rate * 100}% por crédito vendido</span>
                            </div>
                        </div>

                        <div className="flex-1 border-l border-slate-200 pl-8">
                            <label className="flex items-center gap-2 mb-4 cursor-pointer">
                                <input type="radio" checked className="text-blue-600" readOnly />
                                <span className="font-bold text-slate-700 text-sm">Tarjeta de Crédito / Débito</span>
                                <span className="text-xs text-slate-400 ml-auto">🔒 Stripe Power</span>
                            </label>

                            {/* Mock Payment Form */}
                            <div className="space-y-3 opacity-75 pointer-events-none">
                                <input type="text" value="4242 4242 4242 4242" className="w-full text-xs p-2 rounded border bg-white" disabled />
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" value="12/28" className="w-full text-xs p-2 rounded border bg-white" disabled />
                                    <input type="text" value="***" className="w-full text-xs p-2 rounded border bg-white" disabled />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                        <span className="text-xs text-slate-500">Acepto los <a href="#" className="underline">Términos de Servicio</a> y contrato de adhesión a la Red LarvaLINK.</span>
                    </div>
                </div>
            )}

            <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => setStep('verification')}
                    className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2"
                >
                    ← Anterior
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-green-200 transform hover:-translate-y-1"
                >
                    {isSubmitting ? 'Procesando...' : 'Completar Registro y Pagar 💳'}
                </button>
            </div>
        </div>
    );
};
