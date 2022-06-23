/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthApplicationDto, OAuthUpdateApplicationsDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/update')
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}