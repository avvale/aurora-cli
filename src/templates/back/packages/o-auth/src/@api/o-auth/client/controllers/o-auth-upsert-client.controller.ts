/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/upsert')
@Permissions('oAuth.client.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpsertClientController
{
    constructor(
        private readonly handler: OAuthUpsertClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert client' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientByIdDto,
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