/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthScopeDto, OAuthUpdateScopesDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/update')
@Permissions('oAuth.scope.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateScopesController
{
    constructor(
        private readonly handler: OAuthUpdateScopesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update scopes' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthUpdateScopesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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