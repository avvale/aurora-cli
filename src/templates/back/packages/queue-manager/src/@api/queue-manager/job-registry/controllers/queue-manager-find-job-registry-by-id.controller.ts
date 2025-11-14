/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerFindJobRegistryByIdHandler,
    QueueManagerJobRegistryDto,
} from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/find')
@Auth('queueManager.jobRegistry.get')
export class QueueManagerFindJobRegistryByIdController {
    constructor(
        private readonly handler: QueueManagerFindJobRegistryByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find job-registry by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: QueueManagerJobRegistryDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
