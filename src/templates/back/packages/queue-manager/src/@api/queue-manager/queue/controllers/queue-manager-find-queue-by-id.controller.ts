/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerFindQueueByIdHandler, QueueManagerQueueDto } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
