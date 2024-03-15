import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappVerificationWebhooksHandler
{
    async main(
        hubMode: string,
        hubChallenge: number,
        hubVerifyToken: string,
    ): Promise<number>
    {
        if (hubMode !== 'subscribe') throw new BadRequestException('Invalid hub mode');
        if (hubVerifyToken !== process.env.WHATSAPP_WEBHOOK_TOKEN) throw new BadRequestException('Invalid verify token');
        if (hubChallenge === undefined) throw new BadRequestException('Invalid hub challenge');

        return hubChallenge;
    }
}