/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthScopeDto } from '../dto';

// @apps
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/delete')
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
        @Constraint() constraint?: QueryStatement,
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