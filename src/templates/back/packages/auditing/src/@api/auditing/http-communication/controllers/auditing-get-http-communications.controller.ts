/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto } from '../dto';

// @app
import { AuditingGetHttpCommunicationsHandler } from '../handlers/auditing-get-http-communications.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/get')
@Permissions('auditing.httpCommunication.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingGetHttpCommunicationsController
{
    constructor(
        private readonly handler: AuditingGetHttpCommunicationsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get http-communications according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AuditingHttpCommunicationDto]})
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