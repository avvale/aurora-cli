/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerQueueDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteQueueByIdHandler } from '../handlers/queue-manager-delete-queue-by-id.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queue/delete')
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueueByIdController
{
    constructor(
        private readonly handler: QueueManagerDeleteQueueByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete queue by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: QueueManagerQueueDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}