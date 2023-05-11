/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { AuditingHttpCommunicationDto, AuditingCreateHttpCommunicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateHttpCommunicationsHandler } from '../handlers/auditing-create-http-communications.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/create')
@Auth('auditing.httpCommunication.create')
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