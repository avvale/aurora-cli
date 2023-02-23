/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/create')
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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