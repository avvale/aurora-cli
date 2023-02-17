/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions,Timezone } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto } from '../dto';

// @app
import { AuditingUpsertHttpCommunicationHandler } from '../handlers/auditing-upsert-http-communication.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/upsert')
@Permissions('auditing.httpCommunication.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpsertHttpCommunicationController
{
    constructor(
        private readonly handler: AuditingUpsertHttpCommunicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert http-communication' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AuditingHttpCommunicationDto })
    async main(
        @Body() payload: AuditingUpdateHttpCommunicationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}