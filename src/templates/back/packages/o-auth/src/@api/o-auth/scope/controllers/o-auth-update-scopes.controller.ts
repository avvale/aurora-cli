/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthScopeDto, OAuthUpdateScopesDto, OAuthUpdateScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
