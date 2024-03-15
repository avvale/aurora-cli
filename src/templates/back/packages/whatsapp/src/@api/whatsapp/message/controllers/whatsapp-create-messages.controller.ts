/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappCreateMessageDto, WhatsappCreateMessagesHandler, WhatsappMessageDto } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/messages/create')
@Auth('whatsapp.message.create')
export class WhatsappCreateMessagesController
{
    constructor(
        private readonly handler: WhatsappCreateMessagesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create messages in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [WhatsappMessageDto]})
    @ApiBody({ type: [WhatsappCreateMessageDto]})
    async main(
        @Body() payload: WhatsappCreateMessageDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
