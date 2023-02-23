/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto, OAuthCreateApplicationDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/create')
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateApplicationsController
{
    constructor(
        private readonly handler: OAuthCreateApplicationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthApplicationDto]})
    @ApiBody({ type: [OAuthCreateApplicationDto]})
    async main(
        @Body() payload: OAuthCreateApplicationDto[],
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