import { parseWebhookPayload } from '@api/whatsapp/shared';
import * as crypto from 'crypto';

const WHATSAPP_APPLICATION_SECRET_KEY: string =
  process.env.WHATSAPP_APPLICATION_SECRET_KEY;

export const verifyWebhookSignature = (
  xHubSignature256: string,
  payload: object,
): boolean => {
  if (!xHubSignature256) return false;

  const signature = crypto
    .createHmac('sha256', WHATSAPP_APPLICATION_SECRET_KEY)
    .update(parseWebhookPayload(payload))
    .digest('hex');

  try {
    const trusted = Buffer.from(signature, 'utf8');
    const untrusted = Buffer.from(
      xHubSignature256.replace('sha256=', ''),
      'utf8',
    );

    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (error) {
    return false;
  }
};
