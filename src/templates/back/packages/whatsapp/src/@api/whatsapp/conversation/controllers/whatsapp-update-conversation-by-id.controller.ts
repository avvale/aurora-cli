/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappConversationDto, WhatsappUpdateConversationByIdDto, WhatsappUpdateConversationByIdHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversation/update')
@Auth('whatsapp.conversation.update')
export class WhatsappUpdateConversationByIdController
{
    constructor(
        private readonly handler: WhatsappUpdateConversationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update conversation by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: WhatsappConversationDto })
    async main(
        @Body() payload: WhatsappUpdateConversationByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
