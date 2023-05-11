/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobsRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateJobsRegistryHandler } from '../handlers/queue-manager-update-jobs-registry.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/jobs-registry/update')
@Auth('queueManager.jobRegistry.update')
export class QueueManagerUpdateJobsRegistryController
{
    constructor(
        private readonly handler: QueueManagerUpdateJobsRegistryHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update jobs-registry' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: QueueManagerJobRegistryDto })
    async main(
        @Body() payload: QueueManagerUpdateJobsRegistryDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}