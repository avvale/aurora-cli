/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { QueueManagerJobRegistryDto, QueueManagerCreateJobRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateJobRegistryHandler } from '../handlers/queue-manager-create-job-registry.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/create')
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobRegistryController
{
    constructor(
        private readonly handler: QueueManagerCreateJobRegistryHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job-registry' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: QueueManagerJobRegistryDto })
    async main(
        @Body() payload: QueueManagerCreateJobRegistryDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}