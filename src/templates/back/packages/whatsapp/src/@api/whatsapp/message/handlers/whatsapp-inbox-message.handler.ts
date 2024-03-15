import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappInboxMessageHandler
{
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async main(
        object: string,
        entry: any[],
    ): Promise<void>
    {
        if (!object || !entry?.[0]?.changes?.[0]?.value) throw new BadRequestException('The inbox message request is not valid');
    }
}