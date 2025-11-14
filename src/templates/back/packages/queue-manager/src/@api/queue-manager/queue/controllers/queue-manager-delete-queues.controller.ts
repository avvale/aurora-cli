/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerDeleteQueuesHandler,
    QueueManagerQueueDto,
} from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/delete')
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueuesController {
    constructor(private readonly handler: QueueManagerDeleteQueuesHandler) {}

    @Delete()
    @ApiOperation({ summary: 'Delete queues in batch according to query' })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [QueueManagerQueueDto],
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
