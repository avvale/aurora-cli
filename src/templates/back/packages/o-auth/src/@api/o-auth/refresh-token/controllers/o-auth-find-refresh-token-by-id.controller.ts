/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthRefreshTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindRefreshTokenByIdHandler } from '../handlers/o-auth-find-refresh-token-by-id.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/find')
@Auth('oAuth.refreshToken.get')
export class OAuthFindRefreshTokenByIdController
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: OAuthRefreshTokenDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}