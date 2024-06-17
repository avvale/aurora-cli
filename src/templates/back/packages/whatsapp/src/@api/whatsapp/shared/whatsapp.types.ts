import { CountryCode } from 'libphonenumber-js';

export interface WhatsappTemplateParameters
{
    to: string;
    templateName: string;
    language: string;
    country: CountryCode;
    headerParameters?: any[];
    bodyParameters?: any[];
    buttons?: any[];
}