/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingDeleteHttpCommunicationsHandler, AuditingHttpCommunicationDto } from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/delete')
@Auth('auditing.httpCommunication.delete')
export class AuditingDeleteHttpCommunicationsController
{
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete http-communications in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AuditingHttpCommunicationDto]})
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
