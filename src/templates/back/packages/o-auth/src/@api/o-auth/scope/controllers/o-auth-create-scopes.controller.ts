/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/create')
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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