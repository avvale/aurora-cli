/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto } from '../dto';

// @app
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/get')
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthGetScopesController
{
    constructor(
        private readonly handler: OAuthGetScopesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get scopes according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [OAuthScopeDto]})
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