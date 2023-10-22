/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingGetHttpCommunicationsHandler, AuditingHttpCommunicationDto } from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/get')
@Auth('auditing.httpCommunication.get')
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
