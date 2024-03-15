/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappConversationDto, WhatsappCreateConversationDto, WhatsappCreateConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversations/create')
@Auth('whatsapp.conversation.create')
export class WhatsappCreateConversationsController
{
    constructor(
        private readonly handler: WhatsappCreateConversationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create conversations in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [WhatsappConversationDto]})
    @ApiBody({ type: [WhatsappCreateConversationDto]})
    async main(
        @Body() payload: WhatsappCreateConversationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
