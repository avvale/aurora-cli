/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthAccessTokenDto, OAuthCreateAccessTokenDto } from '../dto';

// @apps
import { OAuthCreateAccessTokensHandler } from '../handlers/o-auth-create-access-tokens.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens/create')
export class OAuthCreateAccessTokensController
{
    constructor(
        private readonly handler: OAuthCreateAccessTokensHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create access-tokens in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthAccessTokenDto]})
    @ApiBody({ type: [OAuthCreateAccessTokenDto]})
    async main(
        @Body() payload: OAuthCreateAccessTokenDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}