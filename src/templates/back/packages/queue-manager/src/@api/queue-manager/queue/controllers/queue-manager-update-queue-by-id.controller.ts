/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto, QueueManagerUpdateQueueByIdHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
