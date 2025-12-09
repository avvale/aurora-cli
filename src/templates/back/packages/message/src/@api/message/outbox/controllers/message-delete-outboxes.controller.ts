/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageDeleteOutboxesHandler,
    MessageOutboxDto,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outboxes/delete')
@Auth('message.outbox.delete')
export class MessageDeleteOutboxesController {
    constructor(private readonly handler: MessageDeleteOutboxesHandler) {}

    @Delete()
    @ApiOperation({ summary: 'Delete outboxes in batch according to query' })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [MessageOutboxDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
