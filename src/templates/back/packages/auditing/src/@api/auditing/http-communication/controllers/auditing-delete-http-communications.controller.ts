/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteHttpCommunicationsHandler } from '../handlers/auditing-delete-http-communications.handler';

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