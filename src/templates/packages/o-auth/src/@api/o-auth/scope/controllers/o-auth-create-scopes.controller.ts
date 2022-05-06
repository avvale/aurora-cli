/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/create')
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateScopesController
{
    constructor(
        private readonly handler: OAuthCreateScopesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create scopes in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthScopeDto]})
    @ApiBody({ type: [OAuthCreateScopeDto]})
    async main(
        @Body() payload: OAuthCreateScopeDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}