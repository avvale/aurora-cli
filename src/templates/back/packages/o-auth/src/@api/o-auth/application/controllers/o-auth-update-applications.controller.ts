/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto, OAuthUpdateApplicationsDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/update')
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpdateApplicationsController
{
    constructor(
        private readonly handler: OAuthUpdateApplicationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update applications' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthUpdateApplicationsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}