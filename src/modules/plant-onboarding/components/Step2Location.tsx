import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { LocationPicker } from './LocationPicker';
import { useTranslation } from '../hooks/useTranslations';

export const Step2Location: React.FC = () => {
    const { location, updateLocation, setStep, saveProgress } = useOnboarding();
    const { t } = useTranslation();

    const handleLocationSelect = (lat: number, lng: number) => {
        updateLocation({
            coordinates: { lat, lng },
            country: 'Mexico', // Autodetect mock
        });
        // Also update address fields with mock reverse geocode if needed
    };

    const handleNext = () => {
        if (!location.address || !location.city || !location.coordinates) {
            alert(t('modules.plantOnboarding.wizard.step2.validation'));
            return;
        }
        saveProgress();
        setStep('operations');
    };

    return (
        <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('modules.plantOnboarding.wizard.step2.title')}</h2>
            <p className="text-slate-500 mb-6">{t('modules.plantOnboarding.wizard.step2.subtitle')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Map Column */}
                <div className="order-2 lg:order-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('modules.plantOnboarding.wizard.step2.pinpoint')} *</label>
                    <LocationPicker
                        lat={location.coordinates?.lat}
                        lng={location.coordinates?.lng}
                        onLocationSelect={handleLocationSelect}
                    />
                    <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg mt-4 flex items-start gap-2">
                        <span className="text-lg">🛰️</span>
                        <p>{t('modules.plantOnboarding.wizard.step2.satelliteNote')}</p>
                    </div>
                </div>

                {/* Form Column */}
                <div className="order-1 lg:order-2 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step2.address')} *</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={location.address || ''}
                            onChange={(e) => updateLocation({ address: e.target.value })}
                            placeholder={t('modules.plantOnboarding.wizard.step2.placeholders.address')}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step2.city')} *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={location.city || ''}
                                onChange={(e) => updateLocation({ city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step2.state')} *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={location.state || ''}
                                onChange={(e) => updateLocation({ state: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step2.zip')} *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={location.postal_code || ''}
                                onChange={(e) => updateLocation({ postal_code: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step2.country')}</label>
                            <input
                                type="text"
                                disabled
                                className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-500 shadow-sm cursor-not-allowed"
                                value={location.country || 'México'}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => setStep('basic_info')}
                    className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2"
                >
                    ← {t('modules.plantOnboarding.wizard.common.prev')}
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#1E3A5F] hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                    {t('modules.plantOnboarding.wizard.common.next')} →
                </button>
            </div>
        </div>
    );
};
