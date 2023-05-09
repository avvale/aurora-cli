/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerJobRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerDeleteJobsRegistryHandler } from '../handlers/queue-manager-delete-jobs-registry.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/jobs-registry/delete')
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobsRegistryController
{
    constructor(
        private readonly handler: QueueManagerDeleteJobsRegistryHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete jobs-registry in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [QueueManagerJobRegistryDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}