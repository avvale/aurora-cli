/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappConversationDto, WhatsappUpdateConversationByIdDto, WhatsappUpsertConversationHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversation/upsert')
@Auth('whatsapp.conversation.upsert')
export class WhatsappUpsertConversationController
{
    constructor(
        private readonly handler: WhatsappUpsertConversationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert conversation' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: WhatsappConversationDto })
    async main(
        @Body() payload: WhatsappUpdateConversationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
