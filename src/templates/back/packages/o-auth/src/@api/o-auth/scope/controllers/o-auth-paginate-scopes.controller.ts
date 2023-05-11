/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthPaginateScopesHandler } from '../handlers/o-auth-paginate-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/paginate')
@Auth('oAuth.scope.get')
export class OAuthPaginateScopesController
{
    constructor(
        private readonly handler: OAuthPaginateScopesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate scopes' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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