/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthDeleteScopesHandler, OAuthScopeDto } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/delete')
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopesController
{
    constructor(
        private readonly handler: OAuthDeleteScopesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete scopes in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [OAuthScopeDto]})
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
