import { OnboardingState, PlantApplication } from '../types/onboarding.types';

export class OnboardingService {

    async createApplication(): Promise<string> {
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 800));
        return `app_${Math.random().toString(36).substr(2, 9)}`;
    }

    async saveProgress(appId: string, data: Partial<OnboardingState>): Promise<void> {
        console.log(`Guardando progreso para app ${appId}:`, data);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async getApplication(appId: string): Promise<PlantApplication | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Retornar mock data o null
        return null;
    }

    async submitApplication(appId: string): Promise<void> {
        console.log(`Enviando aplicacion ${appId}`);
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
}

export const onboardingService = new OnboardingService();
