/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { QueueManagerQueueDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerGetQueuesHandler } from '../handlers/queue-manager-get-queues.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/get')
@Auth('queueManager.queue.get')
export class QueueManagerGetQueuesController
{
    constructor(
        private readonly handler: QueueManagerGetQueuesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get queues according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [QueueManagerQueueDto]})
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