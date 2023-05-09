/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpsertQueueHandler } from '../handlers/queue-manager-upsert-queue.handler';

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