/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthCreateScopeDto, OAuthCreateScopesHandler, OAuthScopeDto } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
