/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/create')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateClientController
{
    constructor(
        private readonly handler: OAuthCreateClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthCreateClientDto,
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