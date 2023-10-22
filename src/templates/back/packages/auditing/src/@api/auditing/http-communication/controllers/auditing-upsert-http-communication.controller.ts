/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto, AuditingUpsertHttpCommunicationHandler } from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/upsert')
@Auth('auditing.httpCommunication.upsert')
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
