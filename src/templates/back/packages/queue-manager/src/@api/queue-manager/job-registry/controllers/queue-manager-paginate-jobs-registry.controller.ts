/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerPaginateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/jobs-registry/paginate')
@Auth('queueManager.jobRegistry.get')
export class QueueManagerPaginateJobsRegistryController
{
    constructor(
        private readonly handler: QueueManagerPaginateJobsRegistryHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate jobs-registry' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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
