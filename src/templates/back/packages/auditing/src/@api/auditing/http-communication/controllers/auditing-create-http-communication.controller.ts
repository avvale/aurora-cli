/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto, AuditingCreateHttpCommunicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateHttpCommunicationHandler } from '../handlers/auditing-create-http-communication.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/create')
@Auth('auditing.httpCommunication.create')
export class AuditingCreateHttpCommunicationController
{
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create http-communication' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AuditingHttpCommunicationDto })
    async main(
        @Body() payload: AuditingCreateHttpCommunicationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}