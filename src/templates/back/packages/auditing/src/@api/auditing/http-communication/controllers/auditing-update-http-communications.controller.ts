/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateHttpCommunicationsHandler } from '../handlers/auditing-update-http-communications.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/update')
@Auth('auditing.httpCommunication.update')
export class AuditingUpdateHttpCommunicationsController
{
    constructor(
        private readonly handler: AuditingUpdateHttpCommunicationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update http-communications' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AuditingHttpCommunicationDto })
    async main(
        @Body() payload: AuditingUpdateHttpCommunicationsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}