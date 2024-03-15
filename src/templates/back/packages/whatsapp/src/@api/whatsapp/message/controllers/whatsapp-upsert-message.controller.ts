/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappMessageDto, WhatsappUpdateMessageByIdDto, WhatsappUpsertMessageHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/upsert')
@Auth('whatsapp.message.upsert')
export class WhatsappUpsertMessageController
{
    constructor(
        private readonly handler: WhatsappUpsertMessageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert message' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: WhatsappMessageDto })
    async main(
        @Body() payload: WhatsappUpdateMessageByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
