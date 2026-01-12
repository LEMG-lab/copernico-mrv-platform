import axios from 'axios';

interface AlertConfig {
    telegramChatId?: string;
    telegramBotToken?: string;
    emailServiceId?: string;
    emailTemplateId?: string;
    emailPublicKey?: string;
    emailTo?: string; // Recipient email
}

export class NotificationService {
    private config: AlertConfig;

    constructor() {
        this.config = {
            telegramChatId: import.meta.env.VITE_TELEGRAM_CHAT_ID,
            telegramBotToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
            emailServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            emailTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            emailPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            emailTo: import.meta.env.VITE_EMAIL_TO
        };
    }

    updateConfig(newConfig: Partial<AlertConfig>) {
        this.config = { ...this.config, ...newConfig };
    }

    async sendTelegramAlert(message: string): Promise<boolean> {
        if (!this.config.telegramBotToken || !this.config.telegramChatId) {
            console.warn('[NotificationService] Telegram credentials missing');
            return false;
        }

        try {
            const url = `https://api.telegram.org/bot${this.config.telegramBotToken}/sendMessage`;
            await axios.post(url, {
                chat_id: this.config.telegramChatId,
                text: `🚨 *ALERTA LARVALINK* 🚨\n\n${message}`,
                parse_mode: 'Markdown'
            });
            console.log('[NotificationService] Telegram message sent.');
            return true;
        } catch (error) {
            console.error('[NotificationService] Error sending Telegram:', error);
            return false;
        }
    }

    async sendEmailAlert(subject: string, message: string): Promise<boolean> {
        if (!this.config.emailServiceId || !this.config.emailTemplateId || !this.config.emailPublicKey) {
            console.warn('[NotificationService] EmailJS credentials missing');
            return false;
        }

        try {
            const data = {
                service_id: this.config.emailServiceId,
                template_id: this.config.emailTemplateId,
                user_id: this.config.emailPublicKey,
                template_params: {
                    to_email: this.config.emailTo,
                    subject: subject,
                    message: message
                }
            };

            await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
            console.log('[NotificationService] Email sent.');
            return true;
        } catch (error) {
            console.error('[NotificationService] Error sending Email:', error);
            return false;
        }
    }

    async broadcastAlert(subject: string, message: string) {
        console.log(`[NotificationService] Broadcasting Alert: ${subject}`);

        const telegramSuccess = await this.sendTelegramAlert(message);
        const emailSuccess = await this.sendEmailAlert(subject, message);

        return { telegram: telegramSuccess, email: emailSuccess };
    }
}

export const notificationService = new NotificationService();
