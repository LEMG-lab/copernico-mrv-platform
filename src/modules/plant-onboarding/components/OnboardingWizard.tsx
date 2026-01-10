import React, { useEffect } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { ProgressStepper } from './ProgressStepper';
import { WelcomeScreen } from './WelcomeScreen';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Location } from './Step2Location';
import { Step3Operations } from './Step3Operations';
import { Step4Sensors } from './Step4Sensors';
import { Step5Verification } from './Step5Verification';
import { Step6Plan } from './Step6Plan';
import { SuccessScreen } from './SuccessScreen';
import { Navigation } from '../../../components/Navigation';

export const OnboardingWizard: React.FC = () => {
    const { current_step, appId, isSuccess, startOnboarding, last_saved_at } = useOnboarding();

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navigation />
                <SuccessScreen />
            </div>
        );
    }
    // Si no hay appId, mostramos bienvenida (excepto si ya completamos y estamos en success screen, 
    // pero success screen suele ser un estado post-submit. Manejémoslo con lógica simple).
    // Asumiremos que si current_step es null o inicial sin appId, mostramos Welcome.

    if (!appId && current_step === 'basic_info') { // Simulación simple de inicio
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navigation />
                <WelcomeScreen />
            </div>
        );
    }

    // Si ya terminamos (post-submit) o status es 'pending_verification', mostrar Success.
    // Por ahora lo manejamos si el paso es null o un estado especial 'completed' (que no definí en types, ups).
    // Usaré un flag interno o checkearé si se ha hecho submit.
    // Para simplificar, si current_step es 'plan' y se hace submit, el componente Step6 llamará a una función que cambie a SuccessScreen
    // O mejor, agregon un estado 'success' local o en el store.

    // Vamos a renderizar el paso actual
    const renderStep = () => {
        switch (current_step) {
            case 'basic_info': return <Step1BasicInfo />;
            case 'location': return <Step2Location />;
            case 'operations': return <Step3Operations />;
            case 'sensors': return <Step4Sensors />;
            case 'verification': return <Step5Verification />;
            case 'plan': return <Step6Plan />;
            default: return <Step1BasicInfo />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navigation />

            <div className="flex-1 flex flex-col items-center py-10 px-4">
                {/* Status de guardado */}
                <div className="w-full max-w-4xl flex justify-end items-center mb-4">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                        {last_saved_at && <span>☁️ Guardado {new Date(last_saved_at).toLocaleTimeString()}</span>}
                    </div>
                </div>

                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">

                    {/* Progress Bar Container */}
                    <div className="bg-slate-50 border-b border-slate-100 px-8 py-2">
                        <ProgressStepper currentStep={current_step} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        {renderStep()}
                    </div>

                </div>

                <div className="mt-8 text-center text-slate-400 text-xs">
                    ¿Necesitas ayuda? <a href="#" className="text-blue-500 hover:underline">Contactar soporte</a> o <a href="#" className="text-blue-500 hover:underline">Ver preguntas frecuentes</a>
                </div>
            </div>
        </div>
    );
};
