/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthAccessTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindAccessTokenByIdHandler } from '../handlers/o-auth-find-access-token-by-id.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/find')
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenByIdController
{
    constructor(
        private readonly handler: OAuthFindAccessTokenByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find access-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: OAuthAccessTokenDto })
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