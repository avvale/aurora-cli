/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto, OAuthCreateApplicationDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/create')
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateApplicationController
{
    constructor(
        private readonly handler: OAuthCreateApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthCreateApplicationDto,
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