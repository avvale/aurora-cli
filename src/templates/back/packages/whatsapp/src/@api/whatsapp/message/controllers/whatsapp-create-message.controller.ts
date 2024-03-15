/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappCreateMessageDto, WhatsappCreateMessageHandler, WhatsappMessageDto } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/create')
@Auth('whatsapp.message.create')
export class WhatsappCreateMessageController
{
    constructor(
        private readonly handler: WhatsappCreateMessageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create message' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: WhatsappMessageDto })
    async main(
        @Body() payload: WhatsappCreateMessageDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
