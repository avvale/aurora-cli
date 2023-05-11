/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { QueueManagerQueueDto, QueueManagerCreateQueueDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateQueuesHandler } from '../handlers/queue-manager-create-queues.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/create')
@Auth('queueManager.queue.create')
export class QueueManagerCreateQueuesController
{
    constructor(
        private readonly handler: QueueManagerCreateQueuesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create queues in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [QueueManagerQueueDto]})
    @ApiBody({ type: [QueueManagerCreateQueueDto]})
    async main(
        @Body() payload: QueueManagerCreateQueueDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}