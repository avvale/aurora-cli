/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageFindOutboxHandler,
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
@Controller('message/outbox/find')
@Auth('message.outbox.get')
export class MessageFindOutboxController {
    constructor(private readonly handler: MessageFindOutboxHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find outbox according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: MessageOutboxDto,
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
