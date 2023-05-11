/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { QueueManagerQueueDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteQueuesHandler } from '../handlers/queue-manager-delete-queues.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/delete')
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueuesController
{
    constructor(
        private readonly handler: QueueManagerDeleteQueuesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete queues in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [QueueManagerQueueDto]})
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