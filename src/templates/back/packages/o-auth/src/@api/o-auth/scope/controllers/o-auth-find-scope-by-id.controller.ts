/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto } from '../dto';

// @app
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/find')
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindScopeByIdController
{
    constructor(
        private readonly handler: OAuthFindScopeByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find scope by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: OAuthScopeDto })
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