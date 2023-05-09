/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerJobRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindJobRegistryByIdHandler } from '../handlers/queue-manager-find-job-registry-by-id.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/find')
@Auth('queueManager.jobRegistry.get')
export class QueueManagerFindJobRegistryByIdController
{
    constructor(
        private readonly handler: QueueManagerFindJobRegistryByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find job-registry by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: QueueManagerJobRegistryDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}