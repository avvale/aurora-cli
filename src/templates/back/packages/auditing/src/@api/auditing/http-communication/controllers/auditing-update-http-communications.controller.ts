/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationsDto, AuditingUpdateHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
