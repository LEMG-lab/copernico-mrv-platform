import React from 'react';
import { OnboardingStep } from '../types/onboarding.types';
import { useTranslation } from '../hooks/useTranslations';

interface ProgressStepperProps {
    currentStep: OnboardingStep;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
    const { t } = useTranslation();

    const STEPS: { id: OnboardingStep; label: string; number: number }[] = [
        { id: 'basic_info', label: t('modules.plantOnboarding.wizard.steps.basic'), number: 1 },
        { id: 'location', label: t('modules.plantOnboarding.wizard.steps.location'), number: 2 },
        { id: 'operations', label: t('modules.plantOnboarding.wizard.steps.operations'), number: 3 },
        { id: 'sensors', label: t('modules.plantOnboarding.wizard.steps.sensors'), number: 4 },
        { id: 'verification', label: t('modules.plantOnboarding.wizard.steps.verification'), number: 5 },
        { id: 'plan', label: t('modules.plantOnboarding.wizard.steps.plan'), number: 6 },
    ];

    const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between relative">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 transition-all duration-500 ease-out -z-10 rounded-full"
                    style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                ></div>

                {STEPS.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white border-green-500' :
                                    isCurrent ? 'bg-white text-green-600 border-2 border-green-500 scale-110 shadow-lg' :
                                        'bg-white text-slate-400 border border-slate-300'
                                    }`}
                            >
                                {isCompleted ? '✓' : step.number}
                            </div>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isCurrent ? 'text-green-700' : isCompleted ? 'text-green-600' : 'text-slate-400'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
