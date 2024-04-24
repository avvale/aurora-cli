import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsappVerificationWebhooksHandler
{
    async main(
        hubMode: string,
        hubChallenge: number,
        hubVerifyToken: string,
    ): Promise<number>
    {
        try
        {
            if (hubMode !== 'subscribe') throw new BadRequestException('Invalid hub mode');
            if (hubVerifyToken !== process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) throw new BadRequestException('Invalid verify token');
            if (hubChallenge === undefined) throw new BadRequestException('Invalid hub challenge');
        }
        catch (error)
        {
            // eslint-disable-next-line max-len
            Logger.error(`Invalid Verification Webhooks: WhatsappVerificationWebhooksHandler.
hubMode: ${hubMode}
hubChallenge: ${hubChallenge}
hubVerifyToken: ${hubVerifyToken}
            `);

            throw error;
        }

        return hubChallenge;
    }
}