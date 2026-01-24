import { WhatsappWebhooksController } from './controllers/whatsapp-webhooks.controller';
import { WhatsappDigestWebhooksHandler } from './handlers/whatsapp-digest-webhooks.handler';
import { WhatsappVerificationWebhooksHandler } from './handlers/whatsapp-verification-webhooks.handler';

export const WhatsappWebhookApiControllers = [WhatsappWebhooksController];

export const WhatsappWebhookApiHandlers = [
  WhatsappDigestWebhooksHandler,
  WhatsappVerificationWebhooksHandler,
];
