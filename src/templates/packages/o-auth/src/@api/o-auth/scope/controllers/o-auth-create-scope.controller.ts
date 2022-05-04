/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

// @apps
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/create')
export class OAuthCreateScopeController
{
    constructor(
        private readonly handler: OAuthCreateScopeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create scope' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthCreateScopeDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}