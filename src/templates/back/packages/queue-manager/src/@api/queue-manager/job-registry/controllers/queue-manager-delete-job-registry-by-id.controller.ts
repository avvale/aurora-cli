/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerDeleteJobRegistryByIdHandler,
    QueueManagerJobRegistryDto,
} from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/delete')
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobRegistryByIdController {
    constructor(
        private readonly handler: QueueManagerDeleteJobRegistryByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job-registry by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: QueueManagerJobRegistryDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
