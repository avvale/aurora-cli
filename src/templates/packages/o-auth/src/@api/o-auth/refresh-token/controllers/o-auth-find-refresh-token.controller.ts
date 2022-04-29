/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto } from '../dto';

// @apps
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/find')
export class OAuthFindRefreshTokenController
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find refresh-token according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: OAuthRefreshTokenDto })
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