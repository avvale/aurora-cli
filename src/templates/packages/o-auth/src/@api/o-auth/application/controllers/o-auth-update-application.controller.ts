/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthApplicationDto, OAuthUpdateApplicationDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateApplicationHandler } from '../handlers/o-auth-update-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/update')
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateApplicationController
{
    constructor(
        private readonly handler: OAuthUpdateApplicationHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthApplicationDto})
    async main(
        @Body() payload: OAuthUpdateApplicationDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}