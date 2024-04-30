import { WhatsappMessageType } from '@api/graphql';
import { Logger } from '@nestjs/common';

export type WhatsappMessageOriginTypes =
    'button' |
    'contacts' |
    'image'  |
    'interactive' |
    'location' |
    'order' |
    'reaction' |
    'sticker' |
    'system' |
    'template' |
    'text' |
    'unknown';

export const mapMessageType = (
    type: string,
): WhatsappMessageType =>
{
    switch (type)
    {
        case 'audio':
            return WhatsappMessageType.AUDIO;

        case 'button':
            return WhatsappMessageType.BUTTON;

        case 'contacts':
            return WhatsappMessageType.CONTACTS;

        case 'document':
            return WhatsappMessageType.DOCUMENT;

        case 'image':
            return WhatsappMessageType.IMAGE;

        case 'interactive':
            return WhatsappMessageType.INTERACTIVE;

        case 'location':
            return WhatsappMessageType.LOCATION;

        case 'order':
            return WhatsappMessageType.ORDER;

        case 'reaction':
            return WhatsappMessageType.REACTION;

        case 'sticker':
            return WhatsappMessageType.STICKER;

        case 'system':
            return WhatsappMessageType.SYSTEM;

        case 'template':
            return WhatsappMessageType.TEMPLATE;

        case 'text':
            return WhatsappMessageType.TEXT;

        case 'unknown':
            return WhatsappMessageType.UNKNOWN;

        case 'video':
            return WhatsappMessageType.VIDEO;

        default:
            Logger.error(`Error to map message type, Error: Invalid message type ${type}. Include message type ${type} in message type enum database colum.`, 'mapMessageType');
            return WhatsappMessageType.UNKNOWN;
    }
};