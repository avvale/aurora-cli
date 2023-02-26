/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthAccessTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindAccessTokenHandler } from '../handlers/o-auth-find-access-token.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/find')
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenController
{
    constructor(
        private readonly handler: OAuthFindAccessTokenHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find access-token according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: OAuthAccessTokenDto })
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