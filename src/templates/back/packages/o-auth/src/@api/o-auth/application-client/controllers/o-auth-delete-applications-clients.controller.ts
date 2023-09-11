/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthApplicationClientDto, OAuthDeleteApplicationsClientsHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/applications-clients/delete')
@Auth('oAuth.applicationClient.delete')
export class OAuthDeleteApplicationsClientsController
{
    constructor(
        private readonly handler: OAuthDeleteApplicationsClientsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete applications-clients in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [OAuthApplicationClientDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
