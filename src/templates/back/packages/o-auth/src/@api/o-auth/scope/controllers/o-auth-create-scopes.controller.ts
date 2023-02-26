/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/create')
@Auth('oAuth.scope.create')
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