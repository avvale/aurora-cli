/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthAccessTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetAccessTokensHandler } from '../handlers/o-auth-get-access-tokens.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens/get')
@Auth('oAuth.accessToken.get')
export class OAuthGetAccessTokensController
{
    constructor(
        private readonly handler: OAuthGetAccessTokensHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get access-tokens according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [OAuthAccessTokenDto]})
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