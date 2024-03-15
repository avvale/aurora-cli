/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappGetMessagesHandler, WhatsappMessageDto } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/messages/get')
@Auth('whatsapp.message.get')
export class WhatsappGetMessagesController
{
    constructor(
        private readonly handler: WhatsappGetMessagesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get messages according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [WhatsappMessageDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
