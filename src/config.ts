
const eeUiConfig = (window as any).eeUiConfig;

export interface Config {
    environment: 'development'|'production';
    schemaUrl: string|null;
    messageBoxUrl: string|null;
}

export const config: Config = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    schemaUrl: eeUiConfig.env.schemaUrl || null,
    messageBoxUrl: eeUiConfig.env.messageBoxUrl || null,
};
