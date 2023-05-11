/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpdateJobRegistryByIdHandler } from '../handlers/queue-manager-update-job-registry-by-id.handler';

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