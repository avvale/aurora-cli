/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateScopeByIdHandler } from '../handlers/o-auth-update-scope-by-id.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/update')
@Permissions('oAuth.scope.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateScopeByIdController
{
    constructor(
        private readonly handler: OAuthUpdateScopeByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update scope by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthUpdateScopeByIdDto,
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