/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto, QueueManagerUpsertJobRegistryHandler } from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
