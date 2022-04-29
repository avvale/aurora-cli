/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto, OAuthCreateRefreshTokenDto } from '../dto';

// @apps
import { OAuthCreateRefreshTokensHandler } from '../handlers/o-auth-create-refresh-tokens.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/create')
export class OAuthCreateRefreshTokensController
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokensHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create refresh-tokens in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthRefreshTokenDto]})
    @ApiBody({ type: [OAuthCreateRefreshTokenDto]})
    async main(
        @Body() payload: OAuthCreateRefreshTokenDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}