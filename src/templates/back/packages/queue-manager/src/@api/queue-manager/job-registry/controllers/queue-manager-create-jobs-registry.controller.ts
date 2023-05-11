/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { QueueManagerJobRegistryDto, QueueManagerCreateJobRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerCreateJobsRegistryHandler } from '../handlers/queue-manager-create-jobs-registry.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/jobs-registry/create')
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobsRegistryController
{
    constructor(
        private readonly handler: QueueManagerCreateJobsRegistryHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create jobs-registry in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [QueueManagerJobRegistryDto]})
    @ApiBody({ type: [QueueManagerCreateJobRegistryDto]})
    async main(
        @Body() payload: QueueManagerCreateJobRegistryDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}