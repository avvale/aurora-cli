/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerUpsertJobRegistryHandler } from '../handlers/queue-manager-upsert-job-registry.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/upsert')
@Auth('queueManager.jobRegistry.upsert')
export class QueueManagerUpsertJobRegistryController
{
    constructor(
        private readonly handler: QueueManagerUpsertJobRegistryHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert job-registry' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: QueueManagerJobRegistryDto })
    async main(
        @Body() payload: QueueManagerUpdateJobRegistryByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}