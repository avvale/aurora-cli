/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateQueueByIdHandler } from '../handlers/queue-manager-update-queue-by-id.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queue/update')
@Auth('queueManager.queue.update')
export class QueueManagerUpdateQueueByIdController
{
    constructor(
        private readonly handler: QueueManagerUpdateQueueByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update queue by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: QueueManagerQueueDto })
    async main(
        @Body() payload: QueueManagerUpdateQueueByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}