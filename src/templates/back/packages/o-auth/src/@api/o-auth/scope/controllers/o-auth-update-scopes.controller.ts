/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthUpdateScopesDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scopes/update')
@Auth('oAuth.scope.update')
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