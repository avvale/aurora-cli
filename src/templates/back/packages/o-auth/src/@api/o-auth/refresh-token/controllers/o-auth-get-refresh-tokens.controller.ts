/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthRefreshTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetRefreshTokensHandler } from '../handlers/o-auth-get-refresh-tokens.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/get')
@Auth('oAuth.refreshToken.get')
export class OAuthGetRefreshTokensController
{
    constructor(
        private readonly handler: OAuthGetRefreshTokensHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get refresh-tokens according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [OAuthRefreshTokenDto]})
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