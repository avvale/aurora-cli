/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/delete')
@Permissions('oAuth.scope.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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