/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { QueueManagerJobRegistryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { QueueManagerFindJobRegistryHandler } from '../handlers/queue-manager-find-job-registry.handler';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/job-registry/find')
@Auth('queueManager.jobRegistry.get')
export class QueueManagerFindJobRegistryController
{
    constructor(
        private readonly handler: QueueManagerFindJobRegistryHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find job-registry according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: QueueManagerJobRegistryDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}