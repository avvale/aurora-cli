/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappFindMessageByIdHandler, WhatsappMessageDto } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/find')
@Auth('whatsapp.message.get')
export class WhatsappFindMessageByIdController
{
    constructor(
        private readonly handler: WhatsappFindMessageByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find message by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: WhatsappMessageDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
