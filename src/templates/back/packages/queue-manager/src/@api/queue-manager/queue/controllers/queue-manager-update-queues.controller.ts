/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { QueueManagerQueueDto, QueueManagerUpdateQueuesDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateQueuesHandler } from '../handlers/queue-manager-update-queues.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/update')
@Auth('queueManager.queue.update')
export class QueueManagerUpdateQueuesController
{
    constructor(
        private readonly handler: QueueManagerUpdateQueuesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update queues' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: QueueManagerQueueDto })
    async main(
        @Body() payload: QueueManagerUpdateQueuesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}