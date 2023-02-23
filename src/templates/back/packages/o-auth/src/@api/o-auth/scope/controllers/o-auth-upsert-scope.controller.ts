/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/upsert')
@Permissions('oAuth.scope.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpsertScopeController
{
    constructor(
        private readonly handler: OAuthUpsertScopeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert scope' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthUpdateScopeByIdDto,
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