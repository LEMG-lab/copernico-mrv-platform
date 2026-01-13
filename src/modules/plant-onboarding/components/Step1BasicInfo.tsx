import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { useTranslation } from '../hooks/useTranslations';

export const Step1BasicInfo: React.FC = () => {
    const { basic_info, updateBasicInfo, setStep, saveProgress } = useOnboarding();
    const { t } = useTranslation();

    const handleChange = (field: string, value: any) => {
        updateBasicInfo({ [field]: value });
    };

    const handleContactChange = (field: string, value: any) => {
        updateBasicInfo({
            contact: {
                ...(basic_info.contact || {}),
                [field]: value
            }
        });
    };

    const handleNext = () => {
        // Basic validation
        if (!basic_info.company_name || !basic_info.plant_name || !basic_info.contact?.email) {
            alert(t('modules.plantOnboarding.wizard.step1.validation'));
            return;
        }
        saveProgress();
        setStep('location');
    };

    return (
        <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('modules.plantOnboarding.wizard.step1.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Company Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('modules.plantOnboarding.wizard.step1.corpData')}</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.companyName')} *</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.company_name || ''}
                            onChange={(e) => handleChange('company_name', e.target.value)}
                            placeholder={t('modules.plantOnboarding.wizard.step1.placeholders.companyName')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.plantName')} *</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.plant_name || ''}
                            onChange={(e) => handleChange('plant_name', e.target.value)}
                            placeholder={t('modules.plantOnboarding.wizard.step1.placeholders.plantName')}
                        />
                        <p className="text-xs text-slate-400 mt-1">{t('modules.plantOnboarding.wizard.step1.plantNameDesc')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.taxId')} *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={basic_info.tax_id || ''}
                                onChange={(e) => handleChange('tax_id', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.founded')}</label>
                            <input
                                type="number"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={basic_info.year_founded || 2024}
                                onChange={(e) => handleChange('year_founded', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.website')}</label>
                        <input
                            type="url"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.website || ''}
                            onChange={(e) => handleChange('website', e.target.value)}
                            placeholder="https://"
                        />
                    </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('modules.plantOnboarding.wizard.step1.contactData')}</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.contactName')} *</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.contact?.name || ''}
                            onChange={(e) => handleContactChange('name', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.contactRole')} *</label>
                        <select
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.contact?.role || ''}
                            onChange={(e) => handleContactChange('role', e.target.value)}
                        >
                            <option value="">{t('modules.plantOnboarding.wizard.step1.placeholders.selectRole')}</option>
                            <option value="owner">{t('modules.plantOnboarding.wizard.step1.roles.owner')}</option>
                            <option value="manager">{t('modules.plantOnboarding.wizard.step1.roles.manager')}</option>
                            <option value="ops">{t('modules.plantOnboarding.wizard.step1.roles.ops')}</option>
                            <option value="admin">{t('modules.plantOnboarding.wizard.step1.roles.admin')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.contactEmail')} *</label>
                        <input
                            type="email"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.contact?.email || ''}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('modules.plantOnboarding.wizard.step1.contactPhone')} *</label>
                        <input
                            type="tel"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={basic_info.contact?.phone || ''}
                            onChange={(e) => handleContactChange('phone', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100">
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
