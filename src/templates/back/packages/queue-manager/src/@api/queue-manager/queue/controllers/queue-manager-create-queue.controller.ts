/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { QueueManagerQueueDto, QueueManagerCreateQueueDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateQueueHandler } from '../handlers/queue-manager-create-queue.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queue/create')
@Auth('queueManager.queue.create')
export class QueueManagerCreateQueueController
{
    constructor(
        private readonly handler: QueueManagerCreateQueueHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create queue' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: QueueManagerQueueDto })
    async main(
        @Body() payload: QueueManagerCreateQueueDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}