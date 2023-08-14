/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthPaginateScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

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
