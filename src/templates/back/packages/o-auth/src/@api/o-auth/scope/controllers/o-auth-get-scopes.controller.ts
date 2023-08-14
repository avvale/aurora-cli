/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthGetScopesHandler, OAuthScopeDto } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/get')
@Auth('oAuth.scope.get')
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
