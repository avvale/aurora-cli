/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto, OAuthCreateRefreshTokenDto } from '../dto';

// @apps
import { OAuthCreateRefreshTokenHandler } from '../handlers/o-auth-create-refresh-token.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/create')
export class OAuthCreateRefreshTokenController
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokenHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create refresh-token' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthRefreshTokenDto })
    async main(
        @Body() payload: OAuthCreateRefreshTokenDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}