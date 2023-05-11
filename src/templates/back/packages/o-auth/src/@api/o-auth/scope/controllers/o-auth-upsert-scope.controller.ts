/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/upsert')
@Auth('oAuth.scope.upsert')
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