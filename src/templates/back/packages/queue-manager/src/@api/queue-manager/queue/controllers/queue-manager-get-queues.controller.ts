/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerGetQueuesHandler,
    QueueManagerQueueDto,
} from '@api/queue-manager/queue';
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

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/get')
@Auth('queueManager.queue.get')
export class QueueManagerGetQueuesController {
    constructor(private readonly handler: QueueManagerGetQueuesHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get queues according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
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
