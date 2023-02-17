/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto } from '../dto';

// @app
import { AuditingFindHttpCommunicationHandler } from '../handlers/auditing-find-http-communication.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/find')
@Permissions('auditing.httpCommunication.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingFindHttpCommunicationController
{
    constructor(
        private readonly handler: AuditingFindHttpCommunicationHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find http-communication according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AuditingHttpCommunicationDto })
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