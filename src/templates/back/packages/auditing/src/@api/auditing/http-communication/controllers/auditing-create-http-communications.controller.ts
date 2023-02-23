/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto, AuditingCreateHttpCommunicationDto } from '../dto';

// @app
import { AuditingCreateHttpCommunicationsHandler } from '../handlers/auditing-create-http-communications.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/create')
@Permissions('auditing.httpCommunication.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateHttpCommunicationsController
{
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create http-communications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AuditingHttpCommunicationDto]})
    @ApiBody({ type: [AuditingCreateHttpCommunicationDto]})
    async main(
        @Body() payload: AuditingCreateHttpCommunicationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}