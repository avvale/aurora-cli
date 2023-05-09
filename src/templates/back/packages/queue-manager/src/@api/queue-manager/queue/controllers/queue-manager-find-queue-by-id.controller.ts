/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerQueueDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindQueueByIdHandler } from '../handlers/queue-manager-find-queue-by-id.handler';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queue/find')
@Auth('queueManager.queue.get')
export class QueueManagerFindQueueByIdController
{
    constructor(
        private readonly handler: QueueManagerFindQueueByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find queue by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: QueueManagerQueueDto })
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