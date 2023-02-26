/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/delete')
@Auth('oAuth.application.delete')
export class OAuthDeleteApplicationsController
{
    constructor(
        private readonly handler: OAuthDeleteApplicationsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete applications in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [OAuthApplicationDto]})
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