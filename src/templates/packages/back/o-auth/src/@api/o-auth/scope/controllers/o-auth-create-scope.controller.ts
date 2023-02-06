/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/create')
@Permissions('oAuth.scope.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateScopeController
{
    constructor(
        private readonly handler: OAuthCreateScopeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create scope' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthCreateScopeDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}