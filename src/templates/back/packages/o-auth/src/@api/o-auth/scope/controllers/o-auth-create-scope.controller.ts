/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/create')
@Auth('oAuth.scope.create')
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
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}