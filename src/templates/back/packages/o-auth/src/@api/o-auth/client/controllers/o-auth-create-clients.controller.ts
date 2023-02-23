/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/create')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateClientsController
{
    constructor(
        private readonly handler: OAuthCreateClientsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create clients in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthClientDto]})
    @ApiBody({ type: [OAuthCreateClientDto]})
    async main(
        @Body() payload: OAuthCreateClientDto[],
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