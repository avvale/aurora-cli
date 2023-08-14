/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerCreateQueueDto, QueueManagerCreateQueuesHandler, QueueManagerQueueDto } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
