/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappConversationDto, WhatsappUpdateConversationsDto, WhatsappUpdateConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversations/update')
@Auth('whatsapp.conversation.update')
export class WhatsappUpdateConversationsController
{
    constructor(
        private readonly handler: WhatsappUpdateConversationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update conversations' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: WhatsappConversationDto })
    async main(
        @Body() payload: WhatsappUpdateConversationsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
