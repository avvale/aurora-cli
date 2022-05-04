/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

// @apps
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/create')
export class OAuthCreateScopesController
{
    constructor(
        private readonly handler: OAuthCreateScopesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create scopes in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthScopeDto]})
    @ApiBody({ type: [OAuthCreateScopeDto]})
    async main(
        @Body() payload: OAuthCreateScopeDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}