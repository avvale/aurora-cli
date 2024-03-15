import * as crypto from 'crypto';

const WHATSAPP_WEBHOOK_TOKEN: string = process.env.WHATSAPP_WEBHOOK_TOKEN;

export const verifyWebhookSignature = (
    xHubSignature256: string,
    payload: object,
): boolean =>
{
    if (!xHubSignature256) return false;

    const signature = crypto
        .createHmac('sha256', WHATSAPP_WEBHOOK_TOKEN)
        .update(JSON.stringify(payload))
        .digest('hex');

    const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    const untrusted =  Buffer.from(xHubSignature256, 'ascii');

    return crypto.timingSafeEqual(trusted, untrusted);
};