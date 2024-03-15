/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappPaginateMessagesHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/messages/paginate')
@Auth('whatsapp.message.get')
export class WhatsappPaginateMessagesController
{
    constructor(
        private readonly handler: WhatsappPaginateMessagesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate messages' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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
