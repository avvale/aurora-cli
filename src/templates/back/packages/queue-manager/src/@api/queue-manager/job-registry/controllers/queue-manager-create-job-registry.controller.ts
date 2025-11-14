/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerCreateJobRegistryDto,
    QueueManagerCreateJobRegistryHandler,
    QueueManagerJobRegistryDto,
} from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/create')
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobRegistryController {
    constructor(
        private readonly handler: QueueManagerCreateJobRegistryHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job-registry' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: QueueManagerJobRegistryDto,
    })
    async main(
        @Body() payload: QueueManagerCreateJobRegistryDto,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, timezone);
    }
}
