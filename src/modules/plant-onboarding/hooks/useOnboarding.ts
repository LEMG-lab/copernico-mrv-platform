import { create } from 'zustand';
import { OnboardingState, OnboardingStep } from '../types/onboarding.types';
import { onboardingService } from '../services/onboardingService';

interface OnboardingStore extends OnboardingState {
    appId: string | null;
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;

    // Actions
    setStep: (step: OnboardingStep) => void;
    setSuccess: (success: boolean) => void;
    updateBasicInfo: (data: Partial<OnboardingState['basic_info']>) => void;
    updateLocation: (data: Partial<OnboardingState['location']>) => void;
    updateOperations: (data: Partial<OnboardingState['operations']>) => void;
    updateSensors: (data: Partial<OnboardingState['sensors']>) => void;
    updateDocuments: (data: Partial<OnboardingState['documents']>) => void;
    updateSubscription: (data: Partial<OnboardingState['subscription']>) => void;
    startOnboarding: () => Promise<void>;
    saveProgress: () => Promise<void>;
    submitApplication: () => Promise<void>;
}

const INITIAL_STATE: OnboardingState = {
    current_step: 'basic_info',
    completed_steps: [],
    basic_info: {},
    location: {},
    operations: {
        waste_types: [],
        products: [],
        employees: { total: 0, women_count: 0 },
        certifications: []
    },
    sensors: {
        has_sensors: false,
        sensors: [],
        data_frequency: 'manual',
        integration_method: 'manual_upload'
    },
    documents: {
        facility_photos: []
    },
    subscription: {},
    started_at: new Date().toISOString(),
    last_saved_at: new Date().toISOString()
};

export const useOnboarding = create<OnboardingStore>((set, get) => ({
    ...INITIAL_STATE,
    appId: null,
    isLoading: false,
    isSuccess: false,
    error: null,

    setStep: (step) => set({ current_step: step }),
    setSuccess: (success) => set({ isSuccess: success }),

    updateBasicInfo: (data) => set((state) => ({ basic_info: { ...state.basic_info, ...data } })),
    updateLocation: (data) => set((state) => ({ location: { ...state.location, ...data } })),
    updateOperations: (data) => set((state) => ({ operations: { ...state.operations, ...data } })),
    updateSensors: (data) => set((state) => ({ sensors: { ...state.sensors, ...data } })),
    updateDocuments: (data) => set((state) => ({ documents: { ...state.documents, ...data } })),
    updateSubscription: (data) => set((state) => ({ subscription: { ...state.subscription, ...data } })),

    startOnboarding: async () => {
        set({ isLoading: true, error: null });
        try {
            const appId = await onboardingService.createApplication();
            set({ appId, isLoading: false, started_at: new Date().toISOString() });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    saveProgress: async () => {
        const state = get();
        if (!state.appId) return;

        try {
            // Extraer solo el estado relevante para guardar
            const dataToSave = {
                current_step: state.current_step,
                basic_info: state.basic_info,
                location: state.location,
                operations: state.operations,
                sensors: state.sensors,
                documents: state.documents,
                subscription: state.subscription,
                last_saved_at: new Date().toISOString()
            };

            await onboardingService.saveProgress(state.appId, dataToSave);
            set({ last_saved_at: new Date().toISOString() });
        } catch (err) {
            console.error("Error saving progress", err);
        }
    },

    submitApplication: async () => {
        const { appId } = get();
        if (!appId) return;

        set({ isLoading: true });
        try {
            await onboardingService.submitApplication(appId);
            set({ isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    }
}));
