/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthScopeDto, OAuthUpdateScopeByIdDto, OAuthUpsertScopeHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
