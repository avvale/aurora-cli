/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerDeleteJobsRegistryHandler,
    QueueManagerJobRegistryDto,
} from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/jobs-registry/delete')
@Auth('queueManager.jobRegistry.delete')
export class QueueManagerDeleteJobsRegistryController {
    constructor(
        private readonly handler: QueueManagerDeleteJobsRegistryHandler,
    ) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete jobs-registry in batch according to query',
    })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [QueueManagerJobRegistryDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
