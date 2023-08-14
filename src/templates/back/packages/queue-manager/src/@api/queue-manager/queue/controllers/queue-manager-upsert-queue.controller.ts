/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto, QueueManagerUpsertQueueHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queue/upsert')
@Auth('queueManager.queue.upsert')
export class QueueManagerUpsertQueueController
{
    constructor(
        private readonly handler: QueueManagerUpsertQueueHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert queue' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: QueueManagerQueueDto })
    async main(
        @Body() payload: QueueManagerUpdateQueueByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
