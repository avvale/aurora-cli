/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappConversationDto, WhatsappCreateConversationDto, WhatsappCreateConversationHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversation/create')
@Auth('whatsapp.conversation.create')
export class WhatsappCreateConversationController
{
    constructor(
        private readonly handler: WhatsappCreateConversationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create conversation' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: WhatsappConversationDto })
    async main(
        @Body() payload: WhatsappCreateConversationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
