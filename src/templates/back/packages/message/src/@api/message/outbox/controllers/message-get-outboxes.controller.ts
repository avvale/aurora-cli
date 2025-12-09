/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageGetOutboxesHandler,
    MessageOutboxDto,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outboxes/get')
@Auth('message.outbox.get')
export class MessageGetOutboxesController {
    constructor(private readonly handler: MessageGetOutboxesHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get outboxes according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [MessageOutboxDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
