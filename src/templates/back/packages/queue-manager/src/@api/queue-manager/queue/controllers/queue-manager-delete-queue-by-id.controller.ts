/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerDeleteQueueByIdHandler,
    QueueManagerQueueDto,
} from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queue/delete')
@Auth('queueManager.queue.delete')
export class QueueManagerDeleteQueueByIdController {
    constructor(private readonly handler: QueueManagerDeleteQueueByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete queue by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: QueueManagerQueueDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
