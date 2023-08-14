/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto, QueueManagerUpdateJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/update')
@Auth('queueManager.jobRegistry.update')
export class QueueManagerUpdateJobRegistryByIdController
{
    constructor(
        private readonly handler: QueueManagerUpdateJobRegistryByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update job-registry by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: QueueManagerJobRegistryDto })
    async main(
        @Body() payload: QueueManagerUpdateJobRegistryByIdDto,
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
