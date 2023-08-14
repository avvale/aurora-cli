/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobsRegistryDto, QueueManagerUpdateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
