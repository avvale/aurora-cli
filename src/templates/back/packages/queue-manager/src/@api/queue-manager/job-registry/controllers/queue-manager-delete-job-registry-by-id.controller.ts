/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerJobRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteJobRegistryByIdHandler } from '../handlers/queue-manager-delete-job-registry-by-id.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/delete')
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobRegistryByIdController
{
    constructor(
        private readonly handler: QueueManagerDeleteJobRegistryByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job-registry by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: QueueManagerJobRegistryDto })
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