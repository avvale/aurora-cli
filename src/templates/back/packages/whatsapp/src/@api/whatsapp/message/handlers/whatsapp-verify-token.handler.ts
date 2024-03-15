import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappVerifyTokenHandler
{
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async main(
        verifyToken: string,
        challenge: string,
    ): Promise<string>
    {
        if (verifyToken === this.configService.get('WHATSAPP_VERIFY_TOKEN'))
        {
            return challenge;
        }
        else
        {
            throw new BadRequestException(`The token ${verifyToken} does not match the whatsapp verification token`);
        }
    }
}