/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { WhatsappInboxMessageHandler } from '../handlers/whatsapp-inbox-message.handler';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/inbox')
export class WhatsappInboxMessageController
{
    constructor(
        private readonly handler: WhatsappInboxMessageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Get whatsapp response' })
    @ApiCreatedResponse({ description: 'Get whatsapp response to customer conversation.' })
    async main(
        @Body() object:  string,
        @Body() entry:  any[],
    )
    {
        return await this.handler.main(
            object,
            entry,
        );
    }
}