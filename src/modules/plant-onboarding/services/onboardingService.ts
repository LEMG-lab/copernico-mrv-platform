import { OnboardingState, PlantApplication } from '../types/onboarding.types';
import { supabase } from '../../../lib/supabase';

export class OnboardingService {

    async createApplication(): Promise<string> {
        // Crear una nueva aplicación en estado Draft en la DB real
        const { data, error } = await supabase
            .from('plant_applications')
            .insert([
                {
                    status: 'draft',
                    current_step: 'basic_info',
                    form_state: {}
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating application:', error);
            throw new Error('No se pudo iniciar la aplicación en la base de datos.');
        }

        return data.id;
    }

    async saveProgress(appId: string, data: Partial<OnboardingState>): Promise<void> {
        console.log(`Guardando progreso en DB para app ${appId}...`);

        // Mapeamos el partial state al campo JSONB 'form_state'
        // Nota: En un caso real, haríamos un merge profundo o usaríamos jsonb_set, 
        // pero aquí actualizamos el blob completo del estado actual para simplicidad.
        const { error } = await supabase
            .from('plant_applications')
            .update({
                current_step: data.current_step, // Columna explícita
                form_state: data,                // Todo el JSON blob
                updated_at: new Date().toISOString()
            })
            .eq('id', appId);

        if (error) {
            console.error('Error saving progress:', error);
            throw new Error('Error guardando progreso.');
        }
    }

    async getApplication(appId: string): Promise<PlantApplication | null> {
        const { data, error } = await supabase
            .from('plant_applications')
            .select('*')
            .eq('id', appId)
            .single();

        if (error) return null;

        // Mapear de la estructura BD a la estructura TypeScript de la app
        return {
            id: data.id,
            status: data.status as any,
            onboarding: data.form_state as OnboardingState,
            verification: {
                satellite_check: false,
                document_check: false,
                video_call_completed: false
            },
            created_at: data.created_at,
            updated_at: data.updated_at
        };
    }

    async submitApplication(appId: string): Promise<void> {
        const { error } = await supabase
            .from('plant_applications')
            .update({
                status: 'submitted',
                submitted_at: new Date().toISOString()
            })
            .eq('id', appId);

        if (error) throw new Error('Error enviando aplicación.');
    }
}

export const onboardingService = new OnboardingService();
