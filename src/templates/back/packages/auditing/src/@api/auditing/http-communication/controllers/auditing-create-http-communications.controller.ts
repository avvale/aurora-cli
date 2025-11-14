/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingCreateHttpCommunicationDto,
    AuditingCreateHttpCommunicationsHandler,
    AuditingHttpCommunicationDto,
} from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/create')
@Auth('auditing.httpCommunication.create')
export class AuditingCreateHttpCommunicationsController {
    constructor(
        private readonly handler: AuditingCreateHttpCommunicationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create http-communications in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [AuditingHttpCommunicationDto],
    })
    @ApiBody({ type: [AuditingCreateHttpCommunicationDto] })
    async main(
        @Body() payload: AuditingCreateHttpCommunicationDto[],
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, timezone);
    }
}
